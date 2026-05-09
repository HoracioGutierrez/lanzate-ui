import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Copy, Check, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Header } from "@/components/layout/Header"
import pkg from "../../package.json"

export function HomePage() {
  const [copied, setCopied] = useState(false)
  const navigate = useNavigate()

  function handleCopy() {
    navigator.clipboard?.writeText(
      "npx shadcn@latest add https://lanzate-ui.vercel.app/r/button.json"
    )
    setCopied(true)
    setTimeout(() => setCopied(false), 1400)
  }

  return (
    <div className="font-sans bg-background text-foreground min-h-screen">
      <Header />

      <main id="top" className="pt-14">
        {/* ===== HERO ===== */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 grid-bg pointer-events-none" />
          <div
            className="absolute -top-40 left-1/2 -translate-x-1/2 w-175 h-175 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(closest-side, oklch(0.65 0.22 28 / 0.15), transparent 70%)",
            }}
          />

          <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-28 md:pt-32 md:pb-36">
            <div className="flex flex-col items-center text-center">
              <a
                href="#changelog"
                className="inline-flex items-center gap-2 text-xs font-medium border border-border rounded-full pl-1 pr-3 py-1 bg-card/70 backdrop-blur shadow-soft hover:bg-accent transition"
              >
                <span className="bg-brand text-brand-foreground rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase">
                  New
                </span>
                <span className="text-muted-foreground">
                  v{pkg.version} · 2 accessible components
                </span>
                <ArrowRight size={12} className="text-muted-foreground" />
              </a>

              <h1
                className="mt-6 font-semibold tracking-tight text-5xl md:text-7xl lg:text-[88px] leading-[0.95] max-w-5xl"
                style={{
                  background:
                    "linear-gradient(180deg, var(--foreground) 0%, oklch(from var(--foreground) l c h / 0.65) 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                Components{" "}
                <em className="font-serif font-normal not-italic" style={{ fontStyle: "italic" }}>
                  that take off
                </em>
                <br />
                your next interface.
              </h1>

              <p className="mt-7 max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed">
                Lanzate UI is an open source collection of copy-paste components for React, built
                on Radix and Tailwind. Clean design, accessible, and 100% yours.
              </p>

              <div className="mt-9 flex flex-col sm:flex-row items-center gap-3">
                <a
                  href="#docs"
                  className="h-11 px-5 inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground font-medium shadow-soft hover:opacity-90 transition"
                >
                  Get Started Now
                  <ArrowRight size={14} />
                </a>
                <button
                  onClick={handleCopy}
                  className="h-11 px-4 inline-flex items-center gap-3 rounded-md border border-border bg-card font-mono text-sm hover:bg-accent transition w-full sm:w-auto max-w-full overflow-hidden"
                >
                  <span className="text-muted-foreground shrink-0">$</span>
                  <span className="truncate min-w-0">
                    npx shadcn@latest add https://lanzate-ui.vercel.app/r/button.json
                  </span>
                  <span className="ml-1 text-muted-foreground shrink-0">
                    {copied ? (
                      <Check size={14} className="text-brand" />
                    ) : (
                      <Copy size={14} />
                    )}
                  </span>
                </button>
              </div>

              {/* Stats row */}
              <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-border/70 border border-border rounded-xl overflow-hidden w-full max-w-3xl">
                {[
                  { value: "2", label: "Components" },
                  { value: "100%", label: "Accessible · WCAG AA" },
                  { value: "0kb", label: "Extra Runtime" },
                  { value: "MIT", label: "Open License" },
                ].map(({ value, label }) => (
                  <div key={label} className="bg-background p-5 text-left">
                    <div className="text-2xl font-semibold tracking-tight">{value}</div>
                    <div className="text-xs text-muted-foreground mt-1">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Marquee */}
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
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.4"
                          >
                            <ellipse cx="12" cy="12" rx="10" ry="3.5" />
                            <ellipse
                              cx="12"
                              cy="12"
                              rx="10"
                              ry="3.5"
                              transform="rotate(60 12 12)"
                            />
                            <ellipse
                              cx="12"
                              cy="12"
                              rx="10"
                              ry="3.5"
                              transform="rotate(120 12 12)"
                            />
                            <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
                          </svg>
                        ),
                      },
                      {
                        name: "TypeScript 6",
                        icon: (
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                            <rect
                              x="2"
                              y="2"
                              width="20"
                              height="20"
                              rx="3"
                              stroke="currentColor"
                              strokeWidth="1.4"
                              fill="currentColor"
                              fillOpacity="0.1"
                            />
                            <path
                              d="M6.5 9.5H11M8.75 9.5V16"
                              stroke="currentColor"
                              strokeWidth="1.7"
                              strokeLinecap="round"
                            />
                            <path
                              d="M13.5 13.5c0 1.1 1.2 2 2.5 2s2.5-.9 2.5-2-1.2-1.5-2.5-2-2.5-.9-2.5-2 1.2-2 2.5-2 2.5.9 2.5 2"
                              stroke="currentColor"
                              strokeWidth="1.7"
                              strokeLinecap="round"
                            />
                          </svg>
                        ),
                      },
                      {
                        name: "Tailwind v4",
                        icon: (
                          <svg width="15" height="15" viewBox="0 0 54 33" fill="currentColor">
                            <path d="M27 0C19.8 0 15.3 3.6 13.5 10.8c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C30.744 12.672 33.548 15.6 40.5 15.6c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.514-3.522-2.004-5.147-3.653C37.256 2.928 34.452 0 27 0zM13.5 15.6C6.3 15.6 1.8 19.2 0 26.4c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C16.744 28.272 19.548 31.2 26.5 31.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.514-3.522-2.004-5.147-3.653C23.756 18.528 20.952 15.6 13.5 15.6z" />
                          </svg>
                        ),
                      },
                      {
                        name: "Vite 8",
                        icon: (
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                          </svg>
                        ),
                      },
                      {
                        name: "Radix UI",
                        icon: (
                          <svg width="15" height="15" viewBox="0 0 25 25" fill="currentColor">
                            <path d="M12 1a11 11 0 1 0 0 22V1z" />
                            <circle cx="20.5" cy="20.5" r="4.5" />
                          </svg>
                        ),
                      },
                      {
                        name: "Framer Motion",
                        icon: (
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M4 0h16v8h-8zm0 8h8l8 8H4zm0 8h8v8z" />
                          </svg>
                        ),
                      },
                      {
                        name: "shadcn/ui",
                        icon: (
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          >
                            <path d="M21 8L3 8" />
                            <path d="M21 16L12 16" />
                          </svg>
                        ),
                      },
                      {
                        name: "CVA",
                        icon: (
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M5 9l7 7 7-7" />
                            <path d="M5 15l7 7 7-7" />
                          </svg>
                        ),
                      },
                    ].map((item, i) => (
                      <span
                        key={`${di}-${i}`}
                        className="inline-flex items-center gap-2 text-sm font-medium text-foreground/55 shrink-0"
                      >
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
                  COMPONENTS · 01 — 02
                </div>
                <h2 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
                  One piece for every
                  <br />
                  part of the interface.
                </h2>
              </div>
              <p className="md:max-w-sm text-muted-foreground leading-relaxed">
                Each component lives in your repo, not in a node_module. Copy, paste, modify. No
                lock-in, no surprises.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border border border-border rounded-2xl overflow-hidden">
              {/* 01 BUTTON */}
              <article className="bg-card">
                <div
                  className="relative h-52 overflow-hidden"
                  style={{
                    background:
                      "radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0) 0 0 / 16px 16px, var(--muted)",
                  }}
                >
                  <ScrollArea className="h-full w-full scroll-fade">
                    <div className="flex flex-col items-center gap-3 py-8 px-6">
                      <Button padding="sm">Solid</Button>
                      <Button variant="outline" padding="sm">Outline</Button>
                      <Button variant="ghost" padding="sm">Ghost</Button>
                      <Button variant="secondary" padding="sm">Secondary</Button>
                      <Button variant="dashed" padding="sm">Dashed</Button>
                      <Button variant="surface" padding="sm">Surface</Button>
                      <Button color="info" padding="sm">Info</Button>
                      <Button color="warning" padding="sm">Warning</Button>
                      <Button color="success" padding="sm">Success</Button>
                      <Button color="error" padding="sm">Error</Button>
                      <Button color="muted" padding="sm">Muted</Button>
                      <Button color="success" variant="outline" padding="sm">Success outline</Button>
                      <Button color="error" variant="secondary" padding="sm">Error secondary</Button>
                      <Button color="info" variant="ghost" padding="sm">Info ghost</Button>
                      <Button elevated padding="sm">Elevated</Button>
                      <Button padding="sm" isLoading loadingText="Loading…" tapAnimation={false}>
                        -
                      </Button>
                      <Button padding="sm" disabled>Disabled</Button>
                    </div>
                  </ScrollArea>
                </div>
                <div className="px-5 py-4 border-t border-border flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">Button</div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      6 variants, 7 colors and loading.
                    </div>
                  </div>
                  <span className="font-mono text-[10px] text-muted-foreground">01</span>
                </div>
              </article>

              {/* 02 TEXT */}
              <article className="bg-card">
                <div
                  className="relative h-52 overflow-hidden"
                  style={{
                    background:
                      "radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0) 0 0 / 16px 16px, var(--muted)",
                  }}
                >
                  <ScrollArea className="h-full w-full scroll-fade">
                    <div className="w-full px-6 py-8 space-y-2">
                      <Text as="h1" size="display" className="leading-none">Display</Text>
                      <Text as="h2" size="2xl">2XL — Heading</Text>
                      <Text size="xl">XL — Subheading</Text>
                      <Text size="lg">LG — Body large</Text>
                      <Text size="md">MD — Body default</Text>
                      <Text size="sm" color="muted">SM — Small text</Text>
                      <Text size="xs" color="muted">XS — Caption · tracking wide</Text>
                      <Text size="sm" color="info">Info · informational</Text>
                      <Text size="sm" color="warning">Warning · caution</Text>
                      <Text size="sm" color="success">Success · confirmation</Text>
                      <Text size="sm" color="error">Error · attention</Text>
                      <Text size="sm" color="primary-muted">Primary muted</Text>
                      <Text size="sm" color="secondary">Secondary</Text>
                    </div>
                  </ScrollArea>
                </div>
                <div className="px-5 py-4 border-t border-border flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">Text</div>
                    <div className="text-xs text-muted-foreground mt-0.5">7 fluid sizes, 9 colors.</div>
                  </div>
                  <span className="font-mono text-[10px] text-muted-foreground">02</span>
                </div>
              </article>
            </div>

            <div className="mt-8 flex justify-center">
              <Button endIcon={<ArrowRight size={14} />} onClick={() => navigate("/docs")}>
                Ir a documentación
              </Button>
            </div>
          </div>
        </section>

        {/* ===== INSTALL / CTA ===== */}
        <section id="docs" className="border-y border-border bg-muted/40">
          <div className="mx-auto max-w-7xl px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                INSTALLATION
              </div>
              <h3 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight">
                One command
                <br />
                and you're in orbit.
              </h3>
              <p className="mt-4 text-muted-foreground leading-relaxed max-w-md">
                Lanzate UI is not installed as a dependency. Bring the components to your repo,
                edit them to your liking, and maintain full control of the code you ship to
                production.
              </p>
              <div className="mt-6 flex flex-wrap gap-2 text-xs font-mono text-muted-foreground">
                {["React 18+", "Next.js", "Vite", "Remix", "Tailwind 4+"].map((tag) => (
                  <span key={tag} className="px-2 py-1 rounded border border-border bg-background">
                    {tag}
                  </span>
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
                  <span className="text-muted-foreground"># Add the Button component</span>
                  {"\n"}
                  <span className="text-brand">$</span>
                  {" npx shadcn@latest add \\\n  https://lanzate-ui.vercel.app/r/button.json\n\n"}
                  <span className="text-muted-foreground"># Or the Text component</span>
                  {"\n"}
                  <span className="text-brand">$</span>
                  {" npx shadcn@latest add \\\n  https://lanzate-ui.vercel.app/r/text.json\n\n"}
                  <span className="text-muted-foreground"># Import and use them</span>
                  {"\n"}
                  <span className="text-foreground">{"import"}</span>
                  {" { Button } "}
                  <span className="text-foreground">{"from"}</span>
                  {" "}
                  <span className="text-brand">"@/components/ui/button"</span>
                  {"\n"}
                  <span className="text-foreground">{"import"}</span>
                  {" { Text } "}
                  <span className="text-foreground">{"from"}</span>
                  {" "}
                  <span className="text-brand">"@/components/ui/text"</span>
                </code>
              </pre>
            </div>
          </div>
        </section>

        {/* ===== FOOTER ===== */}
        <footer id="changelog" className="bg-background">
          <div className="mx-auto max-w-7xl px-6 pt-20 pb-10">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
              <div className="col-span-2">
                <div className="flex items-center gap-2.5">
                  <span className="bg-foreground text-background w-7 h-7 rounded-md grid place-items-center font-mono text-[13px] font-semibold">
                    L
                  </span>
                  <span className="font-semibold tracking-tight">
                    Lanzate <span className="text-muted-foreground font-normal">UI</span>
                  </span>
                </div>
                <p className="mt-4 text-sm text-muted-foreground max-w-xs leading-relaxed">
                  Copy-paste components to build interfaces that take off. Open source under MIT
                  license.
                </p>
              </div>

              <div>
                <div className="text-xs font-mono uppercase tracking-wide text-muted-foreground mb-3">
                  Community
                </div>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="https://github.com/HoracioGutierrez/lanzate-ui"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 hover:text-brand transition"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4 shrink-0"
                        aria-hidden="true"
                      >
                        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c.98.006 1.967.138 2.888.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                      </svg>
                      GitHub
                    </a>
                  </li>
                  <li>
                    <span className="inline-flex items-center gap-2 text-muted-foreground/50 cursor-not-allowed select-none">
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4 shrink-0"
                        aria-hidden="true"
                      >
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                      X / Twitter
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-16 pt-6 border-t border-border flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-muted-foreground">
              <div>© 2026 Lanzate UI · Built with Radix, Tailwind and coffee.</div>
              <div className="inline-flex items-center gap-2 text-xs font-medium border border-border rounded-full pl-1 pr-3 py-1 bg-card/30">
                <span className="bg-brand text-brand-foreground rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase">
                  v{pkg.version}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                  All operating systems
                </span>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
