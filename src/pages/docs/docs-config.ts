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
    group: "Empezar",
    items: [
      { id: "introduction", label: "Introducción" },
      { id: "installation", label: "Instalación" },
      { id: "theming", label: "Theming" },
    ],
  },
  {
    group: "Componentes",
    items: [
      { id: "button", label: "Button" },
      { id: "text", label: "Text" },
    ],
  },
]

export const allSections: DocItem[] = docsNav.flatMap((g) => g.items)

export const titleMap: Record<string, string> = {
  introduction: "Introducción",
  installation: "Instalación",
  theming: "Theming",
  button: "Button",
  text: "Text",
}
