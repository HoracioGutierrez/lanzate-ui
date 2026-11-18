import type { Metadata, Viewport } from "next"

import { SiteHeader } from "@/features/shell/components/site-header"
import { BROWSER_THEME_COLORS, SITE_NAME, SITE_URL } from "@/features/shell/shell.constants"
import { ThemeScript } from "@/features/shell/theme/theme-script"
import "@/styles/globals.css"

const title = `${SITE_NAME} — Accessible React Components`

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: `%s · ${SITE_NAME}` },
  description:
    "Open source collection of copy-paste React components built on ui-sdk and Tailwind. Accessible (WCAG AA), zero runtime dependencies, 100% yours.",
  authors: [{ name: SITE_NAME }],
  icons: { icon: "/favicon.svg" },
  openGraph: {
    type: "website",
    url: "/",
    title,
    description: "Copy-paste React components built on ui-sdk and Tailwind. Accessible, zero runtime, 100% yours.",
  },
  twitter: {
    card: "summary",
    title,
    description: "Accessible React components ready to copy. shadcn CLI · Tailwind v4 · React 19.",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: BROWSER_THEME_COLORS.light },
    { media: "(prefers-color-scheme: dark)", color: BROWSER_THEME_COLORS.dark },
  ],
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body>
        <SiteHeader />
        {children}
      </body>
    </html>
  )
}
