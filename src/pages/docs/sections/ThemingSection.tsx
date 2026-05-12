import { Text } from "@/components/ui/text"
import { CodeBlock } from "../DocComponents"

export function ThemingSection() {
  return (
    <div>
      <Text as="h1" size="display" className="tracking-tight">
        Theming
      </Text>
      <Text size="lg" color="muted" className="mt-3 max-w-2xl leading-relaxed">
        CSS variable-based tokens in the{" "}
        <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">oklch()</code> color
        space. Override them in your{" "}
        <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">globals.css</code>.
      </Text>

      <div className="mt-10 space-y-10 max-w-2xl">
        <div>
          <Text as="h2" size="2xl" className="tracking-tight">
            CSS Variables
          </Text>
          <Text color="muted" className="mt-2 leading-relaxed">
            All tokens are defined in{" "}
            <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">:root</code> with
            dark mode support via the{" "}
            <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">.dark</code> class.
          </Text>
          <CodeBlock>{`:root {
  /* Base */
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);

  /* Semantic */
  --primary: oklch(0.62 0.18 35);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);

  /* Status */
  --destructive: oklch(0.577 0.245 27.325);
  --info:        oklch(0.60 0.15 240);
  --warning:     oklch(0.70 0.15 85);
  --success:     oklch(0.55 0.15 142);

  /* Brand */
  --brand:          oklch(0.62 0.18 35);
  --brand-foreground: oklch(1 0 0);

  /* Radius */
  --radius: 0.625rem;
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --primary: oklch(0.66 0.18 35);
  --primary-foreground: oklch(0.98 0.01 80);
  --info:    oklch(0.70 0.15 240);
  --warning: oklch(0.75 0.14 85);
  --success: oklch(0.65 0.14 142);
  --brand:          oklch(0.66 0.18 35);
  --brand-foreground: oklch(0.98 0.01 80);
  /* ... (rest of shadcn tokens) */
}`}</CodeBlock>
        </div>

        <div>
          <Text as="h2" size="2xl" className="tracking-tight">
            Fluid Typography
          </Text>
          <Text color="muted" className="mt-2 leading-relaxed">
            Text sizes use{" "}
            <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">clamp()</code> to
            scale automatically without breakpoints.
          </Text>
          <CodeBlock>{`@theme inline {
  --text-xs:      clamp(0.75rem, calc(0.708rem + 0.208vw), 0.875rem);
  --text-sm:      clamp(0.875rem, calc(0.833rem + 0.208vw), 1rem);
  --text-base:    clamp(1rem, calc(0.958rem + 0.208vw), 1.125rem);
  --text-lg:      clamp(1.125rem, calc(1.042rem + 0.417vw), 1.375rem);
  --text-xl:      clamp(1.25rem, calc(1.125rem + 0.625vw), 1.625rem);
  --text-2xl:     clamp(1.5rem, calc(1.25rem + 1.25vw), 2.25rem);
  --text-display: clamp(2rem, calc(1.417rem + 2.917vw), 3.75rem);
}`}</CodeBlock>
        </div>

        <div>
          <Text as="h2" size="2xl" className="tracking-tight">
            Tailwind Color Mappings
          </Text>
          <Text color="muted" className="mt-2 leading-relaxed">
            For Tailwind utilities like{" "}
            <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">bg-info</code>,{" "}
            <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">text-brand</code>,
            etc. to work, the CSS custom properties must be mapped into the{" "}
            <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">@theme inline</code>{" "}
            block. These are already included when you install a component via the CLI.
          </Text>
          <CodeBlock>{`@theme inline {
  /* Required for Tailwind to generate bg-info, text-brand, etc. */
  --color-info:              var(--info);
  --color-warning:           var(--warning);
  --color-success:           var(--success);
  --color-brand:             var(--brand);
  --color-brand-foreground:  var(--brand-foreground);
}`}</CodeBlock>
        </div>

        <div>
          <Text as="h2" size="2xl" className="tracking-tight">
            Customize Colors
          </Text>
          <Text color="muted" className="mt-2 leading-relaxed">
            Override any token in your global CSS. For example, to change the brand color to blue:
          </Text>
          <CodeBlock>{`:root {
  --brand: oklch(0.6 0.2 240);   /* blue */
  --brand-foreground: oklch(1 0 0);
}`}</CodeBlock>
        </div>

        <div>
          <Text as="h2" size="2xl" className="tracking-tight">
            Dark mode
          </Text>
          <Text color="muted" className="mt-2 leading-relaxed">
            Dark mode is activated by adding the{" "}
            <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">.dark</code> class
            to the{" "}
            <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">
              &lt;html&gt;
            </code>{" "}
            element. The Header manages it automatically and persists in{" "}
            <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">
              localStorage
            </code>
            .
          </Text>
        </div>
      </div>
    </div>
  )
}
