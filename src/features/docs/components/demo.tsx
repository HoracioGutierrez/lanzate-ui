import { readFile } from "node:fs/promises"
import path from "node:path"

import { demoRegistry } from "../demos/demo-registry"
import type { DemoEntry, DemoProps } from "../types/docs.types"
import { CodeBlock } from "./code-block"
import { DemoTabs } from "./demo-tabs"
import { PreviewPane } from "./preview-pane"

/** A live demo and its own source file, behind a Preview / Code switch. Server-only: reads the file at build time. */
export async function Demo({ name }: DemoProps) {
  const { component: Component, file, layout }: DemoEntry = demoRegistry[name]
  // A literal folder lets the build trace only the demos, not the whole project.
  const source = await readFile(path.join(process.cwd(), "src/features/docs/demos", file), "utf8")

  return (
    <DemoTabs
      preview={
        <PreviewPane layout={layout}>
          <Component />
        </PreviewPane>
      }
      code={<CodeBlock code={source.trim()} />}
    />
  )
}
