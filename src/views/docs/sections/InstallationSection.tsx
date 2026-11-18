import { Text } from "@/components/ui/text"
import { CodeBlock } from "../DocComponents"

export function InstallationSection() {
  return (
    <div>
      <Text as="h1" size="display" className="tracking-tight">
        Installation
      </Text>
      <Text size="lg" color="muted" className="mt-3 max-w-2xl leading-relaxed">
        Lanzate UI works with any stack using React + Tailwind. Add components directly to your
        project with the shadcn CLI.
      </Text>

      <div className="mt-10 space-y-10 max-w-2xl">
        <div>
          <Text as="h2" size="2xl" className="tracking-tight">
            1. Set up shadcn/ui
          </Text>
          <Text color="muted" className="mt-2 leading-relaxed">
            If you don't have it yet, initialize shadcn/ui in your project. This creates the{" "}
            <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">
              components.json
            </code>{" "}
            file and sets up the required paths and aliases.
          </Text>
          <CodeBlock>{`$ npx shadcn@latest init`}</CodeBlock>
        </div>

        <div>
          <Text as="h2" size="2xl" className="tracking-tight">
            2. Add a component
          </Text>
          <Text color="muted" className="mt-2 leading-relaxed">
            Use the CLI to copy components directly from the Lanzate UI registry into your project.
          </Text>
          <CodeBlock>{`# Add the Button component
$ npx shadcn@latest add https://lanzate-ui.vercel.app/r/button.json

# Add the Text component
$ npx shadcn@latest add https://lanzate-ui.vercel.app/r/text.json

# Add multiple at once
$ npx shadcn@latest add \\
  https://lanzate-ui.vercel.app/r/button.json \\
  https://lanzate-ui.vercel.app/r/text.json`}</CodeBlock>
        </div>

        <div>
          <Text as="h2" size="2xl" className="tracking-tight">
            3. Import and use
          </Text>
          <Text color="muted" className="mt-2 leading-relaxed">
            Components are copied to{" "}
            <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">
              src/components/ui/
            </code>
            . Import them directly.
          </Text>
          <CodeBlock>{`// app/page.tsx
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

export default function Page() {
  return (
    <div>
      <Text as="h1" size="2xl">Taking off!</Text>
      <Button>Get Started</Button>
    </div>
  );
}`}</CodeBlock>
        </div>

        <div>
          <Text as="h2" size="2xl" className="tracking-tight">
            Requirements
          </Text>
          <div className="mt-3 grid sm:grid-cols-2 gap-3">
            {[
              { label: "React", value: "18 or higher" },
              { label: "Tailwind CSS", value: "v4 recommended" },
              { label: "TypeScript", value: "Optional but recommended" },
              { label: "shadcn/ui CLI", value: "To install components" },
            ].map((req) => (
              <div
                key={req.label}
                className="rounded-lg border border-border bg-card px-4 py-3"
              >
                <div className="text-xs font-mono text-muted-foreground uppercase tracking-wide">
                  {req.label}
                </div>
                <div className="text-sm font-medium mt-0.5">{req.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
