import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { Text } from "@/components/ui/text"

export function IntroductionSection() {
  return (
    <div>
      <Text as="h1" size="display" className="tracking-tight">
        Introduction
      </Text>
      <Text size="lg" color="muted" className="mt-3 max-w-2xl leading-relaxed">
        Lanzate UI is an open-source collection of{" "}
        <em className="font-serif not-italic italic">copy-paste</em> components for building
        interfaces that take off.
      </Text>

      <div className="mt-10 grid sm:grid-cols-2 gap-4 max-w-3xl">
        <Link
          to="/docs/installation"
          className="rounded-lg border border-border bg-card p-5 hover:bg-accent transition"
        >
          <div className="flex items-center gap-2 text-sm font-medium">
            Installation
            <ArrowRight size={14} className="opacity-60" />
          </div>
          <Text size="xs" color="muted" className="mt-1.5 leading-relaxed">
            Set up your project in under 60 seconds.
          </Text>
        </Link>
        <Link
          to="/docs/button"
          className="rounded-lg border border-border bg-card p-5 hover:bg-accent transition"
        >
          <div className="flex items-center gap-2 text-sm font-medium">
            Components
            <ArrowRight size={14} className="opacity-60" />
          </div>
          <Text size="xs" color="muted" className="mt-1.5 leading-relaxed">
            Explore the available accessible components.
          </Text>
        </Link>
      </div>

      <div className="mt-14 space-y-6 max-w-2xl">
        <div>
          <Text as="h2" size="2xl" className="tracking-tight">
            What is Lanzate UI?
          </Text>
          <Text color="muted" className="mt-2 leading-relaxed">
            A React component library built on Radix UI and Tailwind CSS. It's not installed as a
            dependency — components live directly in your repo so you can freely modify them.
          </Text>
        </div>

        <div>
          <Text as="h2" size="2xl" className="tracking-tight">
            Philosophy
          </Text>
          <Text color="muted" className="mt-2 leading-relaxed">
            Copy, paste, and own. No unnecessary abstractions, no vendor lock-in. Each component
            is your code from day one.
          </Text>
        </div>

        <div>
          <Text as="h2" size="2xl" className="tracking-tight">
            Stack
          </Text>
          <div className="mt-3 flex flex-wrap gap-2">
            {[
              "React 19",
              "TypeScript 6",
              "Tailwind v4",
              "Radix UI",
              "Framer Motion",
              "CVA",
            ].map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-md border border-border bg-card text-xs font-mono text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
