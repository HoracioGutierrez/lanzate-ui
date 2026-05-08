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
