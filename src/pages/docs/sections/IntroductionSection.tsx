import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { Text } from "@/components/ui/text"

export function IntroductionSection() {
  return (
    <div>
      <Text as="h1" size="display" className="tracking-tight">
        Introducción
      </Text>
      <Text size="lg" color="muted" className="mt-3 max-w-2xl leading-relaxed">
        Lanzate UI es una colección open-source de componentes{" "}
        <em className="font-serif not-italic italic">copy-paste</em> para construir interfaces que
        despegan.
      </Text>

      <div className="mt-10 grid sm:grid-cols-2 gap-4 max-w-3xl">
        <Link
          to="/docs/installation"
          className="rounded-lg border border-border bg-card p-5 hover:bg-accent transition"
        >
          <div className="flex items-center gap-2 text-sm font-medium">
            Instalación
            <ArrowRight size={14} className="opacity-60" />
          </div>
          <Text size="xs" color="muted" className="mt-1.5 leading-relaxed">
            Configura tu proyecto en menos de 60 segundos.
          </Text>
        </Link>
        <Link
          to="/docs/button"
          className="rounded-lg border border-border bg-card p-5 hover:bg-accent transition"
        >
          <div className="flex items-center gap-2 text-sm font-medium">
            Componentes
            <ArrowRight size={14} className="opacity-60" />
          </div>
          <Text size="xs" color="muted" className="mt-1.5 leading-relaxed">
            Explora los componentes accesibles disponibles.
          </Text>
        </Link>
      </div>

      <div className="mt-14 space-y-6 max-w-2xl">
        <div>
          <Text as="h2" size="2xl" className="tracking-tight">
            ¿Qué es Lanzate UI?
          </Text>
          <Text color="muted" className="mt-2 leading-relaxed">
            Es una biblioteca de componentes React construida sobre Radix UI y Tailwind CSS. No se
            instala como dependencia — los componentes viven directamente en tu repo para que
            puedas modificarlos libremente.
          </Text>
        </div>

        <div>
          <Text as="h2" size="2xl" className="tracking-tight">
            Filosofía
          </Text>
          <Text color="muted" className="mt-2 leading-relaxed">
            Copy, paste, and own. Sin abstracciones innecesarias, sin vendor lock-in. Cada
            componente es código tuyo desde el primer día.
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
