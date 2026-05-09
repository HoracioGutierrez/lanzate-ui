import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link, useLocation } from "react-router-dom"
import { Sun, Moon, ArrowRight } from "lucide-react"

export function Header() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("lanzate-theme")
    if (saved) return saved === "dark"
    return window.matchMedia("(prefers-color-scheme: dark)").matches
  })
  const [floating, setFloating] = useState(false)
  const location = useLocation()

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
    localStorage.setItem("lanzate-theme", dark ? "dark" : "light")
  }, [dark])

  useEffect(() => {
    const onScroll = () => setFloating(window.scrollY > 80)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const isDocsActive = location.pathname.startsWith("/docs")

  return (
    <header className="fixed left-0 right-0 top-0 z-50">
      <motion.div
        className="relative mx-auto"
        style={{ overflow: "hidden" }}
        animate={
          floating
            ? { maxWidth: 960, borderRadius: 9999, marginTop: 14 }
            : { maxWidth: 10000, borderRadius: 0, marginTop: 0 }
        }
        transition={
          floating
            ? { type: "spring", stiffness: 300, damping: 30 }
            : {
                maxWidth: { type: "tween", ease: "easeOut", duration: 0.35 },
                borderRadius: { type: "spring", stiffness: 260, damping: 34 },
                marginTop: { type: "spring", stiffness: 260, damping: 34 },
              }
        }
      >
        <div
          className={[
            "absolute inset-0 transition-[background-color,backdrop-filter,box-shadow,border-color] duration-200",
            floating
              ? "bg-background/80 backdrop-blur-md border border-border shadow-[0_8px_24px_-10px_oklch(0_0_0/0.2)]"
              : "bg-background border-b border-border/70",
          ].join(" ")}
          style={{ borderRadius: "inherit" }}
        />

        <div className="relative flex items-center justify-between gap-4 h-14 px-6">
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <span className="bg-foreground text-background w-7 h-7 rounded-md grid place-items-center font-mono text-[13px] font-semibold tracking-tight">
              L
            </span>
            <span className="font-semibold tracking-tight text-[15px]">
              Lanzate <span className="text-muted-foreground font-normal">UI</span>
            </span>
          </Link>

          <AnimatePresence>
            {!floating && (
              <motion.nav
                key="nav"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="hidden md:flex items-center gap-1 text-sm"
              >
                <a
                  href="/#components"
                  className="px-3 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition"
                >
                  Componentes
                </a>
                <Link
                  to="/docs"
                  className={`px-3 py-1.5 rounded-md hover:bg-accent transition ${
                    isDocsActive
                      ? "font-medium text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Docs
                </Link>
              </motion.nav>
            )}
          </AnimatePresence>

          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={() => setDark((d) => !d)}
              aria-label="Toggle theme"
              className="h-9 w-9 grid place-items-center rounded-md border border-border hover:bg-accent transition shrink-0"
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <AnimatePresence>
              {!floating && (
                <motion.a
                  key="github"
                  href="https://github.com/HoracioGutierrez/lanzate-ui"
                  target="_blank"
                  rel="noopener noreferrer"
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

            <Link
              to="/docs"
              className="inline-flex h-9 items-center px-3.5 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition gap-1.5 shrink-0 whitespace-nowrap"
            >
              Get Started
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </motion.div>
    </header>
  )
}
