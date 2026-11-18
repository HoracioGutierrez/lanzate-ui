import type { Metadata, Viewport } from "next"
import "@/index.css"

const description =
  "Open source collection of copy-paste React components built on ui-sdk and Tailwind. Accessible (WCAG AA), zero runtime dependencies, 100% yours."

export const metadata: Metadata = {
  metadataBase: new URL("https://lanzate-ui.vercel.app"),
  title: {
    default: "Lanzate UI — Accessible React Components",
    template: "%s · Lanzate UI",
  },
  description,
  authors: [{ name: "Lanzate UI" }],
  icons: { icon: "/favicon.svg" },
  openGraph: {
    type: "website",
    url: "/",
    title: "Lanzate UI — Accessible React Components",
    description:
      "Copy-paste React components built on ui-sdk and Tailwind. Accessible, zero runtime, 100% yours.",
  },
  twitter: {
    card: "summary",
    title: "Lanzate UI — Accessible React Components",
    description: "Accessible React components ready to copy. shadcn CLI · Tailwind v4 · React 19.",
  },
}

export const viewport: Viewport = {
  themeColor: "#7c3aed",
}

// Applies the saved (or system) theme before first paint to avoid a flash.
const themeScript = `(function(){try{var t=localStorage.getItem("lanzate-theme");var d=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d)}catch(e){}})()`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
