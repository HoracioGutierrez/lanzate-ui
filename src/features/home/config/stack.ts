import type { StackItem } from "../home.types"
import { CvaIcon } from "../icons/cva-icon"
import { NextjsIcon } from "../icons/nextjs-icon"
import { ReactIcon } from "../icons/react-icon"
import { ShadcnIcon } from "../icons/shadcn-icon"
import { TailwindIcon } from "../icons/tailwind-icon"
import { TypescriptIcon } from "../icons/typescript-icon"
import { UiSdkIcon } from "../icons/ui-sdk-icon"

/** Technologies in the home page marquee. */
export const STACK: StackItem[] = [
  { name: "React 19", icon: ReactIcon },
  { name: "TypeScript 6", icon: TypescriptIcon },
  { name: "Tailwind v4", icon: TailwindIcon },
  { name: "Next.js 16", icon: NextjsIcon },
  { name: "ui-sdk", icon: UiSdkIcon },
  { name: "shadcn/ui", icon: ShadcnIcon },
  { name: "CVA", icon: CvaIcon },
]
