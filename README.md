# lanzate-ui

Componentes para proyectos React + Tailwind CSS v4, instalables via shadcn CLI.

## Requisitos

- React 18+
- Tailwind CSS v4
- shadcn configurado en el proyecto (`components.json` presente)

## Componentes

### Text

Componente de texto polimórfico con variantes de tamaño y color, construido sobre [CVA](https://cva.style).

**Instalación:**

```bash
npx shadcn@latest add https://lanzate-ui.vercel.app/r/text.json
```

**Configuración CSS requerida:**

El componente depende de variables CSS que deben estar definidas en tu `globals.css`. Si ya usás shadcn/ui en tu proyecto, la mayoría ya las tenés — solo verificá que estén los tokens de `info`, `warning`, `success` y el tamaño `display`.

Agregá esto en tu `globals.css`:

```css
/* Dentro del bloque @theme inline existente */
@theme inline {
  /* Tamaños tipográficos (fluid) */
  --text-xs:      clamp(0.75rem,  calc(0.708rem + 0.208vw), 0.875rem);
  --text-sm:      clamp(0.875rem, calc(0.833rem + 0.208vw), 1rem);
  --text-base:    clamp(1rem,     calc(0.958rem + 0.208vw), 1.125rem);
  --text-lg:      clamp(1.125rem, calc(1.042rem + 0.417vw), 1.375rem);
  --text-xl:      clamp(1.25rem,  calc(1.125rem + 0.625vw), 1.625rem);
  --text-2xl:     clamp(1.5rem,   calc(1.25rem  + 1.25vw),  2.25rem);
  --text-display: clamp(2rem,     calc(1.417rem + 2.917vw), 3.75rem);

  /* Mapeos de color necesarios */
  --color-foreground:          var(--foreground);
  --color-primary:             var(--primary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted-foreground:    var(--muted-foreground);
  --color-info:                var(--info);
  --color-warning:             var(--warning);
  --color-success:             var(--success);
  --color-destructive:         var(--destructive);
}

/* Dentro de :root */
:root {
  --foreground:           oklch(0.145 0 0);
  --primary:              oklch(0.205 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted-foreground:     oklch(0.556 0 0);
  --destructive:          oklch(0.577 0.245 27.325);

  /* Estos tres suelen no estar en proyectos shadcn/ui por defecto */
  --info:    oklch(0.60 0.15 240);
  --warning: oklch(0.70 0.15 85);
  --success: oklch(0.55 0.15 142);
}
```

**Uso básico:**

```tsx
import { Text } from "@/components/ui/text"

<Text>Hola mundo</Text>
```

**Props:**

| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `as` | `p \| span \| label \| h1 \| h2 \| h3 \| h4` | `p` | Elemento HTML que se renderiza |
| `size` | ver abajo | `md` | Tamaño tipográfico |
| `color` | ver abajo | — | Color semántico del texto |

**Tamaños disponibles (`size`):**

| Valor | Descripción |
|---|---|
| `xs` | Extra pequeño, tracking wide |
| `sm` | Pequeño |
| `md` | Base (default) |
| `lg` | Grande |
| `xl` | Extra grande |
| `2xl` | Doble extra grande, tracking tight |
| `display` | Tamaño de display, tracking tighter |

Todos los tamaños usan `clamp()` para escalar fluidamente con el viewport.

**Colores disponibles (`color`):**

| Valor | Token CSS |
|---|---|
| `primary` | `--primary` |
| `secondary` | `--secondary-foreground` |
| `muted` | `--muted-foreground` |
| `primary-muted` | `--primary` al 60% |
| `secondary-muted` | `--secondary-foreground` al 60% |
| `info` | `--info` |
| `warning` | `--warning` |
| `success` | `--success` |
| `error` | `--destructive` |

Sin `color`, hereda `--foreground`.

**Ejemplos:**

```tsx
// Heading semántico en tamaño display
<Text as="h1" size="display">Bienvenido</Text>

// Label muted
<Text as="label" size="sm" color="muted">Correo electrónico</Text>

// Texto de estado
<Text size="sm" color="success">Guardado correctamente</Text>
<Text size="sm" color="error">Algo salió mal</Text>

// Texto secundario atenuado
<Text color="secondary-muted">Información adicional</Text>
```
