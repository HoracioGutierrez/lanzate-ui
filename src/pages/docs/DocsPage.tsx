import { useState, useEffect } from "react"
import { useParams, Navigate, Link } from "react-router-dom"
import { ChevronRight } from "lucide-react"
import { Header } from "@/components/layout/Header"
import { ScrollArea } from "@/components/ui/scroll-area"
import { docsNav, allSections, titleMap } from "./docs-config"
import { IntroductionSection } from "./sections/IntroductionSection"
import { InstallationSection } from "./sections/InstallationSection"
import { ThemingSection } from "./sections/ThemingSection"
import { ButtonSection } from "./sections/ButtonSection"
import { TextSection } from "./sections/TextSection"

const sectionComponents: Record<string, React.ComponentType> = {
  introduction: IntroductionSection,
  installation: InstallationSection,
  theming: ThemingSection,
  button: ButtonSection,
  text: TextSection,
}

export function DocsPage() {
  const { section = "introduction" } = useParams()
  const [filter, setFilter] = useState("")
  const [activeTocId, setActiveTocId] = useState("")

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior })
  }, [section])

  useEffect(() => {
    const links = getTocLinks(section)
    const ids = links.map((l) => l.href.slice(1)).filter(Boolean)
    if (ids.length === 0) return

    const onScroll = () => {
      const HEADER_OFFSET = 80
      let currentId = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        if (el.getBoundingClientRect().top <= HEADER_OFFSET) {
          currentId = id
        } else {
          break
        }
      }
      setActiveTocId(currentId)
    }

    const timer = setTimeout(onScroll, 0)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      clearTimeout(timer)
      window.removeEventListener("scroll", onScroll)
    }
  }, [section])

  const currentIndex = allSections.findIndex((s) => s.id === section)

  if (currentIndex === -1) return <Navigate to="/docs/introduction" replace />

  const SectionComponent = sectionComponents[section]
  const prev = currentIndex > 0 ? allSections[currentIndex - 1] : null
  const next = currentIndex < allSections.length - 1 ? allSections[currentIndex + 1] : null

  const filterLower = filter.toLowerCase()
  const visibleComponents = filterLower
    ? docsNav.map((g) => ({
        ...g,
        items: g.items.filter((item) => item.label.toLowerCase().includes(filterLower)),
      })).filter((g) => g.items.length > 0)
    : docsNav

  const totalVisible = visibleComponents.reduce((acc, g) => acc + g.items.length, 0)

  return (
    <div className="font-sans bg-background text-foreground min-h-screen">
      <Header />

      <div className="pt-14">
        <div className="mx-auto max-w-400 px-6 flex gap-10">

          {/* ===== SIDEBAR ===== */}
          <aside className="hidden md:block w-60 shrink-0 sticky top-14 self-start h-[calc(100vh-3.5rem)] py-8 pr-3">
            <ScrollArea className="h-full">
              <div className="mb-5">
                <input
                  type="text"
                  placeholder="Filter..."
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="w-full h-8 pl-3 pr-2 text-xs rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring/30 placeholder:text-muted-foreground"
                />
              </div>

              <div className="space-y-6">
                {visibleComponents.map((group) => (
                  <div key={group.group}>
                    <div className="flex items-center justify-between px-2 mb-2">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground/70">
                        {group.group}
                      </span>
                      {filter && (
                        <span className="text-[10px] font-mono text-muted-foreground">
                          {group.items.length}
                        </span>
                      )}
                    </div>
                    <ul className="space-y-0.5">
                      {group.items.map((item) => {
                        const isActive = section === item.id
                        return (
                          <li key={item.id}>
                            <Link
                              to={`/docs/${item.id}`}
                              className={`flex items-center gap-2.5 px-2 py-1.5 rounded-md text-sm transition ${
                                isActive
                                  ? "bg-accent text-foreground font-medium"
                                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
                              }`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors ${
                                  isActive ? "bg-brand" : "bg-border"
                                }`}
                              />
                              {item.label}
                              {item.badge && (
                                <span className="ml-auto text-[9px] font-mono px-1 py-0.5 rounded bg-brand/15 text-brand">
                                  {item.badge}
                                </span>
                              )}
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                ))}

                {filter && totalVisible === 0 && (
                  <p className="px-2 text-xs text-muted-foreground">
                    No results for "{filter}".
                  </p>
                )}
              </div>
            </ScrollArea>
          </aside>

          {/* ===== MAIN CONTENT ===== */}
          <main className="flex-1 min-w-0 py-10 lg:pr-10">

            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6">
              <Link to="/" className="hover:text-foreground transition">
                Lanzate UI
              </Link>
              <ChevronRight size={12} />
              <Link to="/docs" className="hover:text-foreground transition">
                Docs
              </Link>
              <ChevronRight size={12} />
              <span className="text-foreground font-medium">{titleMap[section]}</span>
            </div>

            {/* Section content */}
            {SectionComponent && <SectionComponent />}

            {/* Pager */}
            <div className="mt-20 pt-6 border-t border-border flex items-center justify-between gap-4">
              {prev ? (
                <Link
                  to={`/docs/${prev.id}`}
                  className="flex-1 max-w-xs rounded-lg border border-border bg-card p-4 hover:bg-accent transition"
                >
                  <div className="text-[11px] text-muted-foreground">← Previous</div>
                  <div className="text-sm font-medium mt-0.5">{prev.label}</div>
                </Link>
              ) : (
                <div className="flex-1 max-w-xs" />
              )}

              {next ? (
                <Link
                  to={`/docs/${next.id}`}
                  className="flex-1 max-w-xs text-right rounded-lg border border-border bg-card p-4 hover:bg-accent transition"
                >
                  <div className="text-[11px] text-muted-foreground">Next →</div>
                  <div className="text-sm font-medium mt-0.5">{next.label}</div>
                </Link>
              ) : (
                <div className="flex-1 max-w-xs" />
              )}
            </div>
          </main>

          {/* ===== TOC RIGHT ===== */}
          <aside className="hidden xl:block w-48 shrink-0 sticky top-14 self-start h-[calc(100vh-3.5rem)] py-10">
            <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground/70 mb-3 px-1">
              On this page
            </div>
            <nav className="space-y-px">
              {getTocLinks(section).map((link) => {
                const id = link.href.slice(1)
                const isActive = activeTocId === id
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      const el = document.getElementById(id)
                      if (el) {
                        const top = el.getBoundingClientRect().top + window.scrollY - 80
                        window.scrollTo({ top, behavior: "smooth" })
                      }
                    }}
                    className={`block text-[13px] border-l-2 px-3 py-1 transition ${
                      isActive
                        ? "border-brand text-foreground"
                        : "text-muted-foreground border-transparent hover:text-foreground hover:border-border"
                    }`}
                  >
                    {link.label}
                  </a>
                )
              })}
            </nav>

            <div className="mt-8 mx-1 p-3 rounded-lg border border-border bg-card">
              <div className="text-[11px] font-mono uppercase tracking-wide text-muted-foreground">
                Edit
              </div>
              <a
                href="https://github.com/HoracioGutierrez/lanzate-ui"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-medium hover:text-brand transition"
              >
                Improve this page
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M7 17 17 7M8 7h9v9" />
                </svg>
              </a>
            </div>
          </aside>

        </div>
      </div>
    </div>
  )
}

function getTocLinks(section: string): { label: string; href: string }[] {
  const tocMap: Record<string, { label: string; href: string }[]> = {
    introduction: [
      { label: "What is Lanzate UI?", href: "#" },
      { label: "Philosophy", href: "#" },
      { label: "Stack", href: "#" },
    ],
    installation: [
      { label: "Set up shadcn/ui", href: "#" },
      { label: "Add a component", href: "#" },
      { label: "Import and use", href: "#" },
      { label: "Requirements", href: "#" },
    ],
    theming: [
      { label: "CSS Variables", href: "#" },
      { label: "Fluid Typography", href: "#" },
      { label: "Customize Colors", href: "#" },
      { label: "Dark mode", href: "#" },
    ],
    button: [
      { label: "Preview",        href: "#vista-previa" },
      { label: "Colors",         href: "#colores" },
      { label: "Sizes",          href: "#tamanos" },
      { label: "Radius",         href: "#redondeado" },
      { label: "Text Size",      href: "#tamano-de-texto" },
      { label: "Icon Size",      href: "#tamano-de-icono" },
      { label: "States",         href: "#estados" },
      { label: "Icons",          href: "#iconos" },
      { label: "Icon Only",      href: "#solo-icono" },
      { label: "With Tooltip",   href: "#con-tooltip" },
      { label: "Responsive",     href: "#responsive" },
      { label: "Custom Styles",  href: "#estilos-personalizados" },
      { label: "Installation",   href: "#instalacion" },
      { label: "Usage",          href: "#uso" },
      { label: "API",            href: "#api" },
    ],
    text: [
      { label: "Sizes",          href: "#tamanos" },
      { label: "Colors",         href: "#colores" },
      { label: "HTML Element",   href: "#elemento-html" },
      { label: "Customization",  href: "#personalizacion" },
      { label: "Installation",   href: "#instalacion" },
      { label: "Usage",          href: "#uso" },
      { label: "API",            href: "#api" },
    ],
    "scroll-area": [
      { label: "Preview", href: "#" },
      { label: "Installation", href: "#" },
      { label: "Usage", href: "#" },
      { label: "API", href: "#" },
    ],
    tooltip: [
      { label: "Preview", href: "#" },
      { label: "Installation", href: "#" },
      { label: "Usage", href: "#" },
      { label: "API", href: "#" },
    ],
  }
  return tocMap[section] ?? []
}
