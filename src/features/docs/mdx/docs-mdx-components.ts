import type { MDXComponents } from "mdx/types"

import { ApiTable } from "../components/api-table"
import { ComponentBadge } from "../components/component-badge"
import { Demo } from "../components/demo"
import { DependencyList } from "../components/dependency-list"
import { InfoGrid } from "../components/info-grid"
import { Lead } from "../components/lead"
import { LinkCard } from "../components/link-card"
import { MdxA } from "./mdx-a"
import { MdxCode } from "./mdx-code"
import { MdxH1 } from "./mdx-h1"
import { MdxH2 } from "./mdx-h2"
import { MdxH3 } from "./mdx-h3"
import { MdxOl } from "./mdx-ol"
import { MdxP } from "./mdx-p"
import { MdxPre } from "./mdx-pre"
import { MdxUl } from "./mdx-ul"

/**
 * What every docs MDX file renders with: styled Markdown elements, plus the
 * components MDX can use without importing them (<Demo>, <ApiTable>, <Lead>…).
 */
export const docsMdxComponents: MDXComponents = {
  h1: MdxH1,
  h2: MdxH2,
  h3: MdxH3,
  p: MdxP,
  a: MdxA,
  code: MdxCode,
  pre: MdxPre,
  ul: MdxUl,
  ol: MdxOl,
  ApiTable,
  ComponentBadge,
  Demo,
  DependencyList,
  InfoGrid,
  Lead,
  LinkCard,
}
