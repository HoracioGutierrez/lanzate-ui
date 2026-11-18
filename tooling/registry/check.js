// Checks registry.json against src/components/ui. See docs/architecture/registry.md
//
//   node tooling/registry/check.js         report problems, exit 1 if any
//   node tooling/registry/check.js --fix   rewrite each item's `files` list from its folder, then report
//
// Rules:
// - every folder in src/components/ui has a registry:ui item with the same name, and vice versa
// - an item lists exactly the folder's files (tests and agent docs excluded), with no `target`
// - registry:ui items declare no cssVars (they come from the lanzate-theme item)
// - importing another component (@/components/ui/<name>/<file>) requires it in registryDependencies,
//   and the import names the exact file, never the folder (see decision 0003)
// - importing @/lib/<file> requires the registry item that ships src/lib/<file>.ts in
//   registryDependencies; @/lib/utils is forbidden: use @/lib/cn (see decision 0004)
// - every file a registry:lib or registry:theme item lists exists

import { readdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..")
const UI_DIR = "src/components/ui"
const REGISTRY_JSON = path.join(ROOT, "registry.json")
const REGISTRY_URL = "https://lanzate-ui.vercel.app/r"
const EXCLUDED = [/\.test\.tsx?$/, /^AGENTS\.md$/, /^CLAUDE\.md$/]

const fix = process.argv.includes("--fix")
const registry = JSON.parse(await readFile(REGISTRY_JSON, "utf8"))
const problems = []

// src/lib/<file>.ts → the item that ships it
const libShippers = new Map()
for (const item of registry.items) {
  if (item.type === "registry:ui") continue
  for (const f of item.files ?? []) {
    const exists = await readFile(path.join(ROOT, f.path), "utf8").then(() => true, () => false)
    if (!exists) problems.push(`item "${item.name}" lists ${f.path}, which doesn't exist`)
    const lib = f.path.match(/^src\/lib\/(.+)\.tsx?$/)
    if (lib) libShippers.set(lib[1], item.name)
  }
}

const folders = (await readdir(path.join(ROOT, UI_DIR), { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort()

for (const folder of folders) {
  const item = registry.items.find((i) => i.name === folder)
  if (!item) {
    problems.push(`${UI_DIR}/${folder} has no item in registry.json`)
    continue
  }
  if (item.type !== "registry:ui") problems.push(`${folder}: type must be "registry:ui"`)
  if (item.cssVars) problems.push(`${folder}: remove cssVars; shared variables come from the lanzate-theme item`)

  const files = (await readdir(path.join(ROOT, UI_DIR, folder)))
    .filter((f) => !EXCLUDED.some((re) => re.test(f)))
    .sort()
    .map((f) => `${UI_DIR}/${folder}/${f}`)

  if (fix) item.files = files.map((p) => ({ path: p, type: "registry:ui" }))

  const listed = (item.files ?? []).map((f) => f.path).sort()
  for (const f of files) if (!listed.includes(f)) problems.push(`${folder}: ${f} is missing from files`)
  for (const f of listed) if (!files.includes(f)) problems.push(`${folder}: ${f} is listed but doesn't exist (or is excluded)`)
  for (const f of item.files ?? []) {
    if (f.target) problems.push(`${folder}: ${f.path} sets target; remove it (see decision 0001)`)
    if (f.type !== "registry:ui") problems.push(`${folder}: ${f.path} must have type "registry:ui"`)
  }

  const deps = item.registryDependencies ?? []
  for (const file of files) {
    const source = await readFile(path.join(ROOT, file), "utf8")
    for (const [, other, subpath] of source.matchAll(/from\s+["']@\/components\/ui\/([\w-]+)(\/[\w.-]+)?["']/g)) {
      const url = `${REGISTRY_URL}/${other}.json`
      if (other !== folder && !deps.includes(url)) problems.push(`${folder}: imports ${other}; add "${url}" to registryDependencies`)
      if (!subpath) {
        problems.push(
          `${file}: import "@/components/ui/${other}" by exact file (e.g. "@/components/ui/${other}/${other}"); the shadcn CLI rewrites a folder import to <ui>/${other}/${other} and drops the other exports`
        )
      }
    }
    for (const [, lib] of source.matchAll(/from\s+["']@\/lib\/([\w./-]+)["']/g)) {
      if (lib === "utils") {
        problems.push(`${file}: import cn from "@/lib/cn", not "@/lib/utils" (a consumer's own cn() mangles token classes; see decision 0004)`)
        continue
      }
      const shipper = libShippers.get(lib)
      if (!shipper) {
        problems.push(`${file}: imports "@/lib/${lib}", which no registry item ships`)
        continue
      }
      const url = `${REGISTRY_URL}/${shipper}.json`
      if (!deps.includes(url)) problems.push(`${folder}: imports "@/lib/${lib}"; add "${url}" to registryDependencies`)
    }
  }
}

for (const item of registry.items) {
  if (item.type === "registry:ui" && !folders.includes(item.name)) {
    problems.push(`registry.json item "${item.name}" has no folder in ${UI_DIR}`)
  }
}

if (fix) {
  await writeFile(REGISTRY_JSON, `${JSON.stringify(registry, null, 2)}\n`)
  console.log("registry: rewrote file lists in registry.json")
}

if (problems.length) {
  console.error(`registry: ${problems.length} problem(s)\n${problems.map((p) => `  - ${p}`).join("\n")}`)
  process.exit(1)
}
console.log("registry: registry.json matches src/components/ui")
