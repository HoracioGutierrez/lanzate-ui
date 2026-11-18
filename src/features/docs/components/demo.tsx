import { readFile } from "node:fs/promises"
import path from "node:path"

import { demoRegistry } from "../demos/demo-registry"
import type { DemoEntry, DemoProps } from "../types/docs.types"
import { CodeBlock } from "./code-block"
import { PreviewPane } from "./preview-pane"

/** A live demo and, below it, its own source file. Server-only: reads the file at build time. */
export async function Demo({ name }: DemoProps) {
  const { component: Component, file, layout }: DemoEntry = demoRegistry[name]
  // A literal folder lets the build trace only the demos, not the whole project.
  const source = await readFile(path.join(process.cwd(), "src/features/docs/demos", file), "utf8")

  return (
    <>
      <PreviewPane layout={layout}>
        <Component />
      </PreviewPane>
      <CodeBlock code={source.trim()} />
    </>
  )
}
