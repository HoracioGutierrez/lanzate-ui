import type { ComponentType, ReactNode } from "react"

import type { IconProps } from "@/features/shell/shell.types"

export type StackItem = {
  name: string
  icon: ComponentType<IconProps>
}

export type StatItem = {
  value: string
  label: string
}

export type SectionEyebrowProps = { children: ReactNode }

export type ShowcaseCardProps = {
  title: string
  description: string
  number: string
  children: ReactNode
}

export type InstallCommandButtonProps = { command: string }
