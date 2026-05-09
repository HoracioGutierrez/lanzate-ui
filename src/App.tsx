import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "./components/ui/button"
import { Text } from "./components/ui/text"
import { ArrowRight, Copy, Check, Sun, Moon, Search } from "lucide-react"
import pkg from "../package.json"

function App() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("lanzate-theme")
    if (saved) return saved === "dark"
    return window.matchMedia("(prefers-color-scheme: dark)").matches
  })

  const [floating, setFloating] = useState(false)
  const [copied, setCopied] = useState(false)
  const [subscribed, setSubscribed] = useState(false)
  const emailRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
    localStorage.setItem("lanzate-theme", dark ? "dark" : "light")
  }, [dark])

  useEffect(() => {
    const onScroll = () => setFloating(window.scrollY > 80)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  function handleCopy() {
    navigator.clipboard?.writeText("npx shadcn@latest add https://lanzate-ui.vercel.app/r/button.json")
    setCopied(true)
    setTimeout(() => setCopied(false), 1400)
  }

  function handleSubscribe(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()
    if (emailRef.current) emailRef.current.value = ""
    setSubscribed(true)
  }

  return (
    <div className="font-sans bg-background text-foreground min-h-screen">

      {/* ===== HEADER ===== */}
      <header className="fixed left-0 right-0 top-0 z-50">
        <motion.div
          className="relative mx-auto"
          style={{ overflow: "hidden" }}
          animate={floating ? {
            maxWidth: 960,
            borderRadius: 9999,
            marginTop: 14,
          } : {
            maxWidth: 10000,
            borderRadius: 0,
            marginTop: 0,
          }}
          transition={floating ? {
            type: "spring",
            stiffness: 300,
            damping: 30,
          } : {
            maxWidth:     { type: "tween", ease: "easeOut", duration: 0.35 },
            borderRadius: { type: "spring", stiffness: 260, damping: 34 },
            marginTop:    { type: "spring", stiffness: 260, damping: 34 },
          }}
        >
          {/* Background layer — CSS transition handles color/blur, FM handles shape */}
          <div
            className={[
              "absolute inset-0 transition-[background-color,backdrop-filter,box-shadow,border-color] duration-200",
              floating
                ? "bg-background/80 backdrop-blur-md border border-border shadow-[0_8px_24px_-10px_oklch(0_0_0/0.2)]"
                : "bg-background border-b border-border/70",
            ].join(" ")}
            style={{ borderRadius: "inherit" }}
          />

          {/* Nav content */}
          <div className="relative flex items-center justify-between gap-4 h-14 px-6">
            <a href="#top" className="flex items-center gap-2.5 shrink-0">
              <span className="bg-foreground text-background w-7 h-7 rounded-md grid place-items-center font-mono text-[13px] font-semibold tracking-tight">L</span>
              <span className="font-semibold tracking-tight text-[15px]">Lanzate <span className="text-muted-foreground font-normal">UI</span></span>
            </a>


            <div className="flex items-center gap-2 ml-auto">
              <AnimatePresence>
                {!floating && (
                  <motion.div
                    key="search"
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                    className="hidden xl:flex items-center gap-2 text-xs text-muted-foreground border border-border rounded-md px-2.5 py-1.5 w-56 bg-card/60 overflow-hidden"
                  >
                    <Search size={14} className="shrink-0" />
                    <span className="whitespace-nowrap">Buscar componentes...</span>
                    <span className="ml-auto font-mono text-[10px] border border-border rounded px-1.5 py-0.5 whitespace-nowrap">⌘K</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                onClick={() => setDark(d => !d)}
                aria-label="Toggle theme"
                className="h-9 w-9 grid place-items-center rounded-md border border-border hover:bg-accent transition shrink-0"
              >
                {dark ? <Sun size={16} /> : <Moon size={16} />}
              </button>

              <AnimatePresence>
                {!floating && (
                  <motion.a
                    key="github"
                    href="https://github.com"
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                    className="hidden sm:inline-flex h-9 items-center px-3.5 rounded-md border border-border bg-card text-sm font-medium hover:bg-accent transition overflow-hidden whitespace-nowrap"
                  >
                    GitHub
                  </motion.a>
                )}
              </AnimatePresence>

              <a href="#docs" className="inline-flex h-9 items-center px-3.5 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition gap-1.5 shrink-0 whitespace-nowrap">
                Empezar
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </motion.div>
      </header>

      <main id="top" className="pt-14">

        {/* ===== HERO ===== */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 grid-bg pointer-events-none" />
          <div
            className="absolute -top-40 left-1/2 -translate-x-1/2 w-175 h-175 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(closest-side, oklch(0.65 0.22 28 / 0.15), transparent 70%)" }}
          />

          <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-28 md:pt-32 md:pb-36">
            <div className="flex flex-col items-center text-center">

              <a href="#changelog" className="inline-flex items-center gap-2 text-xs font-medium border border-border rounded-full pl-1 pr-3 py-1 bg-card/70 backdrop-blur shadow-soft hover:bg-accent transition">
                <span className="bg-brand text-brand-foreground rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase">Nuevo</span>
                <span className="text-muted-foreground">v{pkg.version} · 2 componentes accesibles</span>
                <ArrowRight size={12} className="text-muted-foreground" />
              </a>

              <h1
                className="mt-6 font-semibold tracking-tight text-5xl md:text-7xl lg:text-[88px] leading-[0.95] max-w-5xl"
                style={{
                  background: "linear-gradient(180deg, var(--foreground) 0%, oklch(from var(--foreground) l c h / 0.65) 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                Componentes <em className="font-serif font-normal not-italic" style={{ fontStyle: "italic" }}>que despegan</em>
                <br />tu próxima interfaz.
              </h1>

              <p className="mt-7 max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed">
                Lanzate UI es una colección open source de componentes copy-paste para React,
                construidos sobre Radix y Tailwind. Diseño limpio, accesible y 100% tuyo.
              </p>

              <div className="mt-9 flex flex-col sm:flex-row items-center gap-3">
                <a href="#docs" className="h-11 px-5 inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground font-medium shadow-soft hover:opacity-90 transition">
                  Empezar ahora
                  <ArrowRight size={14} />
                </a>
                <button
                  onClick={handleCopy}
                  className="h-11 px-4 inline-flex items-center gap-3 rounded-md border border-border bg-card font-mono text-sm hover:bg-accent transition"
                >
                  <span className="text-muted-foreground">$</span>
                  <span className="truncate">npx shadcn@latest add https://lanzate-ui.vercel.app/r/button.json</span>
                  <span className="ml-1 text-muted-foreground">
                    {copied
                      ? <Check size={14} className="text-brand" />
                      : <Copy size={14} />
                    }
                  </span>
                </button>
              </div>

              {/* Stats row */}
              <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-border/70 border border-border rounded-xl overflow-hidden w-full max-w-3xl">
                {[
                  { value: "2",    label: "Componentes" },
                  { value: "100%", label: "Accesibles · WCAG AA" },
                  { value: "0kb",  label: "Runtime extra" },
                  { value: "MIT",  label: "Licencia open" },
                ].map(({ value, label }) => (
                  <div key={label} className="bg-background p-5 text-left">
                    <div className="text-2xl font-semibold tracking-tight">{value}</div>
                    <div className="text-xs text-muted-foreground mt-1">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Marquee — tech stack ticker */}
          <div className="border-y border-border bg-muted/30 overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 py-5 flex items-center gap-8">
              <div className="hidden md:block text-xs text-muted-foreground font-mono whitespace-nowrap shrink-0 tracking-wide">
                STACK
              </div>
              <div className="flex-1 overflow-hidden mask-[linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]">
                <div className="marquee-track flex items-center gap-10 w-max">
                  {[...Array(2)].flatMap((_, di) =>
                    [
                      {
                        name: "React 19",
                        icon: (
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                            <ellipse cx="12" cy="12" rx="10" ry="3.5"/>
                            <ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(60 12 12)"/>
                            <ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(120 12 12)"/>
                            <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/>
                          </svg>
                        ),
                      },
                      {
                        name: "TypeScript 6",
                        icon: (
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                            <rect x="2" y="2" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="1.4" fill="currentColor" fillOpacity="0.1"/>
                            <path d="M6.5 9.5H11M8.75 9.5V16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
                            <path d="M13.5 13.5c0 1.1 1.2 2 2.5 2s2.5-.9 2.5-2-1.2-1.5-2.5-2-2.5-.9-2.5-2 1.2-2 2.5-2 2.5.9 2.5 2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
                          </svg>
                        ),
                      },
                      {
                        name: "Tailwind v4",
                        icon: (
                          <svg width="15" height="15" viewBox="0 0 54 33" fill="currentColor">
                            <path d="M27 0C19.8 0 15.3 3.6 13.5 10.8c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C30.744 12.672 33.548 15.6 40.5 15.6c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.514-3.522-2.004-5.147-3.653C37.256 2.928 34.452 0 27 0zM13.5 15.6C6.3 15.6 1.8 19.2 0 26.4c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C16.744 28.272 19.548 31.2 26.5 31.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.514-3.522-2.004-5.147-3.653C23.756 18.528 20.952 15.6 13.5 15.6z"/>
                          </svg>
                        ),
                      },
                      {
                        name: "Vite 8",
                        icon: (
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                          </svg>
                        ),
                      },
                      {
                        name: "Radix UI",
                        icon: (
                          <svg width="15" height="15" viewBox="0 0 25 25" fill="currentColor">
                            <path d="M12 1a11 11 0 1 0 0 22V1z"/>
                            <circle cx="20.5" cy="20.5" r="4.5"/>
                          </svg>
                        ),
                      },
                      {
                        name: "Framer Motion",
                        icon: (
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M4 0h16v8h-8zm0 8h8l8 8H4zm0 8h8v8z"/>
                          </svg>
                        ),
                      },
                      {
                        name: "shadcn/ui",
                        icon: (
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <path d="M21 8L3 8"/>
                            <path d="M21 16L12 16"/>
                          </svg>
                        ),
                      },
                      {
                        name: "CVA",
                        icon: (
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 9l7 7 7-7"/>
                            <path d="M5 15l7 7 7-7"/>
                          </svg>
                        ),
                      },
                    ].map((item, i) => (
                      <span key={`${di}-${i}`} className="inline-flex items-center gap-2 text-sm font-medium text-foreground/55 shrink-0">
                        {item.icon}
                        {item.name}
                      </span>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* ===== COMPONENTS GRID ===== */}
        <section id="components" className="relative">
          <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                  COMPONENTES · 01 — 02
                </div>
                <h2 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
                  Una pieza para cada<br />parte de la interfaz.
                </h2>
              </div>
              <p className="md:max-w-sm text-muted-foreground leading-relaxed">
                Cada componente vive en tu repo, no en un node_module.
                Copia, pega, modifica. Sin lock-in, sin sorpresas.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border border border-border rounded-2xl overflow-hidden">

              {/* 01 BUTTON */}
              <article className="bg-card">
                <div className="relative h-52 grid place-items-center p-6"
                  style={{
                    background: "radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0) 0 0 / 16px 16px, var(--muted)",
                  }}
                >
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <Button padding="sm">Primary</Button>
                    <Button variant="outline" padding="sm">Outline</Button>
                    <Button variant="ghost" padding="sm">Ghost</Button>
                    <Button color="success" variant="secondary" padding="sm">Success</Button>
                    <Button color="error" variant="outline" padding="sm">Error</Button>
                    <Button padding="sm" isLoading loadingText="Cargando…" tapAnimation={false}>-</Button>
                  </div>
                </div>
                <div className="px-5 py-4 border-t border-border flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">Button</div>
                    <div className="text-xs text-muted-foreground mt-0.5">6 variantes, 7 colores y loading.</div>
                  </div>
                  <span className="font-mono text-[10px] text-muted-foreground">01</span>
                </div>
              </article>

              {/* 02 TEXT */}
              <article className="bg-card">
                <div className="relative h-52 grid place-items-center p-6"
                  style={{
                    background: "radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0) 0 0 / 16px 16px, var(--muted)",
                  }}
                >
                  <div className="w-full max-w-65 space-y-0.5">
                    <Text as="h1" size="display" className="leading-none">Display</Text>
                    <Text as="h2" size="2xl">2XL — Heading</Text>
                    <Text size="lg" color="muted">Large body text</Text>
                    <Text size="sm" color="muted">Small · tracking</Text>
                    <Text size="xs" color="info">xs · info color</Text>
                  </div>
                </div>
                <div className="px-5 py-4 border-t border-border flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">Text</div>
                    <div className="text-xs text-muted-foreground mt-0.5">7 tamaños fluidos, 9 colores.</div>
                  </div>
                  <span className="font-mono text-[10px] text-muted-foreground">02</span>
                </div>
              </article>

            </div>

            <div className="mt-10 flex justify-center">
              <a href="#docs" className="inline-flex items-center gap-2 h-10 px-4 rounded-md border border-border bg-card hover:bg-accent text-sm font-medium transition">
                Ver la documentación
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </section>


        {/* ===== INSTALL / CTA ===== */}
        <section id="docs" className="border-y border-border bg-muted/40">
          <div className="mx-auto max-w-7xl px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                INSTALACIÓN
              </div>
              <h3 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight">
                Un comando<br />y estás en órbita.
              </h3>
              <p className="mt-4 text-muted-foreground leading-relaxed max-w-md">
                Lanzate UI no se instala como dependencia. Trae los componentes a tu repo,
                edítalos a tu gusto y mantén control total del código que envías a producción.
              </p>
              <div className="mt-6 flex flex-wrap gap-2 text-xs font-mono text-muted-foreground">
                {["React 18+", "Next.js", "Vite", "Remix", "Tailwind 4+"].map(tag => (
                  <span key={tag} className="px-2 py-1 rounded border border-border bg-background">{tag}</span>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-border bg-background overflow-hidden shadow-soft">
              <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-border bg-muted/50">
                <span className="w-2.5 h-2.5 rounded-full bg-border" />
                <span className="w-2.5 h-2.5 rounded-full bg-border" />
                <span className="w-2.5 h-2.5 rounded-full bg-border" />
                <span className="ml-3 text-xs font-mono text-muted-foreground">terminal</span>
              </div>
              <pre className="p-5 text-sm font-mono leading-relaxed overflow-x-auto">
                <code>
                  <span className="text-muted-foreground"># Agrega el componente Button</span>{"\n"}
                  <span className="text-brand">$</span>{" npx shadcn@latest add \\\n  https://lanzate-ui.vercel.app/r/button.json\n\n"}
                  <span className="text-muted-foreground"># O el componente Text</span>{"\n"}
                  <span className="text-brand">$</span>{" npx shadcn@latest add \\\n  https://lanzate-ui.vercel.app/r/text.json\n\n"}
                  <span className="text-muted-foreground"># Importa y úsalos</span>{"\n"}
                  <span className="text-foreground">{"import"}</span>{" { Button } "}
                  <span className="text-foreground">{"from"}</span>
                  {" "}<span className="text-brand">"@/components/ui/button"</span>{"\n"}
                  <span className="text-foreground">{"import"}</span>{" { Text } "}
                  <span className="text-foreground">{"from"}</span>
                  {" "}<span className="text-brand">"@/components/ui/text"</span>
                </code>
              </pre>
            </div>
          </div>
        </section>


        {/* ===== FOOTER ===== */}
        <footer id="changelog" className="bg-background">
          <div className="mx-auto max-w-7xl px-6 pt-20 pb-10">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
              <div className="col-span-2">
                <div className="flex items-center gap-2.5">
                  <span className="bg-foreground text-background w-7 h-7 rounded-md grid place-items-center font-mono text-[13px] font-semibold">L</span>
                  <span className="font-semibold tracking-tight">Lanzate <span className="text-muted-foreground font-normal">UI</span></span>
                </div>
                <p className="mt-4 text-sm text-muted-foreground max-w-xs leading-relaxed">
                  Componentes copy-paste para construir interfaces que despegan. Open source bajo licencia MIT.
                </p>
                <form onSubmit={handleSubscribe} className="mt-6 flex gap-2 max-w-sm">
                  <input
                    ref={emailRef}
                    type="email"
                    required
                    placeholder="tu@email.com"
                    className="flex-1 h-9 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/30"
                  />
                  <button className="h-9 px-3.5 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 whitespace-nowrap transition">
                    {subscribed ? "✓ Suscrito" : "Newsletter"}
                  </button>
                </form>
              </div>

              {[
                {
                  title: "Producto",
                  links: ["Componentes", "Docs", "Themes", "Bloques"],
                  hrefs: ["#components", "#docs", "#", "#"],
                },
                {
                  title: "Comunidad",
                  links: ["GitHub", "Discord", "X / Twitter", "Showcase"],
                  hrefs: ["#", "#", "#", "#"],
                },
                {
                  title: "Legal",
                  links: ["Licencia MIT", "Código de conducta", "Privacidad", "Contribuir"],
                  hrefs: ["#", "#", "#", "#"],
                },
              ].map(({ title, links, hrefs }) => (
                <div key={title}>
                  <div className="text-xs font-mono uppercase tracking-wide text-muted-foreground mb-3">{title}</div>
                  <ul className="space-y-2 text-sm">
                    {links.map((link, i) => (
                      <li key={link}>
                        <a href={hrefs[i]} className="hover:text-brand transition">{link}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-16 pt-6 border-t border-border flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-muted-foreground">
              <div>© 2026 Lanzate UI · Construido con Radix, Tailwind y café.</div>
              <div className="flex items-center gap-4 font-mono">
                <span>v0.1.0</span>
                <span>·</span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                  Todos los sistemas operativos
                </span>
              </div>
            </div>
          </div>
        </footer>

      </main>
    </div>
  )
}

export default App
