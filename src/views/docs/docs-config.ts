export type DocItem = {
  id: string
  label: string
  badge?: string
}

export type DocGroup = {
  group: string
  items: DocItem[]
}

export const docsNav: DocGroup[] = [
  {
    group: "Get Started",
    items: [
      { id: "introduction", label: "Introduction" },
      { id: "installation", label: "Installation" },
      { id: "theming", label: "Theming" },
    ],
  },
  {
    group: "Components",
    items: [
      { id: "button", label: "Button" },
      { id: "text", label: "Text" },
    ],
  },
]

export const allSections: DocItem[] = docsNav.flatMap((g) => g.items)

export const titleMap: Record<string, string> = {
  introduction: "Introduction",
  installation: "Installation",
  theming: "Theming",
  button: "Button",
  text: "Text",
}
