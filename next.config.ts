import createMDX from "@next/mdx"
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactStrictMode: true,
}

// MDX is imported by the docs (src/features/docs/content), not used as routes.
// Plugins are named by string so Turbopack can load them.
const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm"],
    // rehype-slug gives every heading an id; the docs table of contents uses the same slugger.
    rehypePlugins: ["rehype-slug"],
  },
})

export default withMDX(nextConfig)
