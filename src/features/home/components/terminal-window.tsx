import { Text } from "@/components/ui/text"

/** Fake terminal with the install commands and the imports, as decoration for the install section. */
export function TerminalWindow() {
  return (
    <figure className="overflow-hidden rounded-xl border border-border bg-background shadow-soft">
      <div className="flex items-center gap-1.5 border-b border-border bg-muted/50 px-4 py-2.5">
        <span aria-hidden="true" className="size-2.5 rounded-full bg-border" />
        <span aria-hidden="true" className="size-2.5 rounded-full bg-border" />
        <span aria-hidden="true" className="size-2.5 rounded-full bg-border" />
        <Text render={<figcaption />} size="xs" font="mono" color="muted" className="ml-3">
          terminal
        </Text>
      </div>
      <pre className="overflow-x-auto p-5 font-mono text-sm leading-relaxed">
        <code>
          <Text render={<span />} size="inherit" color="muted"># Add the Button component</Text>
          {"\n"}
          <span className="text-brand">$</span>
          {" npx shadcn@latest add \\\n  https://lanzate-ui.vercel.app/r/button.json\n\n"}
          <Text render={<span />} size="inherit" color="muted"># Or the Text component</Text>
          {"\n"}
          <span className="text-brand">$</span>
          {" npx shadcn@latest add \\\n  https://lanzate-ui.vercel.app/r/text.json\n\n"}
          <Text render={<span />} size="inherit" color="muted"># Import and use them</Text>
          {"\n"}
          {"import { Button } from "}
          <span className="text-brand">&quot;@/components/ui/button&quot;</span>
          {"\n"}
          {"import { Text } from "}
          <span className="text-brand">&quot;@/components/ui/text&quot;</span>
        </code>
      </pre>
    </figure>
  )
}
