# lanzate-ui

Componentes para proyectos React + Tailwind CSS v4, instalables via shadcn CLI.

## Requisitos

- React 18+
- Tailwind CSS v4
- shadcn configurado en el proyecto (`components.json` presente)

## Componentes

### Button

Componente de botón con variantes de color semántico, padding, íconos, estados de carga y tooltips integrados, construido sobre [CVA](https://cva.style).

**Instalación:**

```bash
npx shadcn@latest add https://lanzate-ui.vercel.app/r/button.json
```

**Importación de tipos:**

```tsx
import { Button, buttonVariants } from "@/components/ui/button"
import type { ButtonProps } from "@/components/ui/button"
```

Instala automáticamente el componente `tooltip` de shadcn como dependencia.

**Configuración CSS requerida:**

Mismo bloque `@theme inline` y variables de color que el componente `Text` (ver abajo). Adicionalmente, el componente usa `animate-spin` de Tailwind (built-in) para el estado de carga.

**Uso básico:**

```tsx
import { Button } from "@/components/ui/button"

<Button>Guardar</Button>
<Button color="error" startIcon={<Trash2 />}>Eliminar</Button>
```

**Props:**

| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `color` | ver abajo | `primary` | Color semántico del botón |
| `padding` | ver abajo | `base` | Tamaño de padding (controla también el font-size) |
| `radius` | ver abajo | `md` | Redondeado del borde del botón |
| `textSize` | `xs \| sm \| base \| lg \| xl \| 2xl \| display` | — | Override del tamaño de texto independiente del padding |
| `iconSize` | `xs \| sm \| base \| md \| lg \| xl` | — | Override del tamaño de los SVG dentro del botón |
| `startIcon` | `ReactNode` | — | Ícono antes del texto |
| `endIcon` | `ReactNode` | — | Ícono después del texto |
| `icon` | `ReactNode` | — | Ícono único — oculta el texto y usa padding cuadrado automático |
| `mobile` | `only-icon \| full-width \| hidden` | — | Comportamiento responsivo en viewports < 640px |
| `elevated` | `boolean` | — | Sombra elevada (profundidad) |
| `glow` | `boolean` | — | Efecto glow/neon usando el color del botón |
| `isLoading` | `boolean` | — | Muestra spinner animado en lugar del `startIcon` y deshabilita el botón |
| `loadingText` | `string` | — | Reemplaza el texto del botón cuando `isLoading` es `true` |
| `tooltip` | `ReactNode` | — | Contenido del tooltip que aparece al hacer hover |
| `tapAnimation` | `boolean` | `true` | Animación de scale (spring) al hacer click/tap. Se desactiva automáticamente cuando el botón está `disabled` o `isLoading` |
| `className` | `string` | — | Clases adicionales para el elemento `<button>` raíz |
| `iconClassName` | `string` | — | Clases aplicadas al wrapper de todos los íconos (`startIcon`, `endIcon`, `icon`). Útil para cambiar color, tamaño o spacing de los íconos de forma independiente al texto |
| `textClassName` | `string` | — | Clases aplicadas al wrapper del texto (`children`/`loadingText`). Compatibles con `mobile="only-icon"` — se mergean con `hidden sm:inline` automáticamente |

Acepta además todos los atributos nativos de `<button>` (`onClick`, `disabled`, `type`, etc.) y props de Framer Motion (`whileHover`, `animate`, `variants`, etc.).

**Colores disponibles (`color`):**

| Valor | Descripción |
|---|---|
| `primary` | Color principal del tema |
| `secondary` | Color secundario del tema |
| `muted` | Apagado / neutro |
| `info` | Informativo (azul) |
| `warning` | Advertencia (amarillo) |
| `success` | Éxito (verde) |
| `error` | Error / destructivo (rojo) |

**Padding disponibles (`padding`):**

| Valor | Clases aplicadas |
|---|---|
| `none` | `px-0 py-0` + `text-sm` |
| `xs` | `px-2 py-1` + `text-xs` |
| `sm` | `px-3 py-1.5` + `text-sm` |
| `base` | `px-4 py-2` + `text-sm` |
| `md` | `px-5 py-2.5` + `text-base` |
| `lg` | `px-6 py-3` + `text-lg` |
| `xl` | `px-8 py-4` + `text-xl` |

**Redondeados disponibles (`radius`):**

| Valor | Clases aplicadas |
|---|---|
| `none` | `rounded-none` |
| `sm` | `rounded-sm` |
| `md` | `rounded-md` |
| `lg` | `rounded-lg` |
| `xl` | `rounded-xl` |
| `full` | `rounded-full` |

**`mobile` prop:**

| Valor | Comportamiento |
|---|---|
| `only-icon` | Oculta el texto en mobile (`< 640px`), solo muestra el `startIcon`. Requiere `startIcon`. |
| `full-width` | El botón ocupa el ancho completo en mobile, `auto` en `sm+`. |
| `hidden` | Oculta el botón completamente en mobile, visible en `sm+`. |

**Interacción entre props:**

- `icon` tiene precedencia total: si está presente, `children`, `startIcon` y `endIcon` son ignorados.
- `isLoading` reemplaza el `startIcon` (o el `icon`) por un spinner con animación de entrada (scale + fade). Si también hay `icon`, el spinner se muestra como botón cuadrado.
- `loadingText` solo tiene efecto cuando `isLoading` es `true`.
- `mobile="only-icon"` requiere `startIcon` — sin él, el botón queda visualmente vacío en mobile.
- Botones con `icon` o `mobile="only-icon"` deberían incluir `tooltip` o `aria-label` para accesibilidad con lectores de pantalla.
- Cuando el botón está deshabilitado (`disabled` o `isLoading`), el tooltip sigue funcionando gracias a un `<span>` wrapper interno.

**Ejemplos:**

```tsx
// Ícono solo con tooltip (recomendado para accesibilidad)
<Button icon={<Trash2 />} color="error" tooltip="Eliminar registro" />

// Estado de carga
<Button isLoading loadingText="Guardando...">Guardar</Button>

// Redondeado completo
<Button radius="full">Continuar</Button>

// Responsive: texto en desktop, solo ícono en mobile
<Button mobile="only-icon" startIcon={<Search />} tooltip="Buscar">
  Buscar
</Button>

// Tooltip con contenido JSX
<Button
  startIcon={<Star />}
  tooltip={<><strong>Favorito</strong> — guardar para después</>}
>
  Agregar
</Button>

// Botón ancho completo en mobile
<Button color="primary" mobile="full-width">Continuar</Button>

// Extender ButtonProps en un componente propio
import type { ButtonProps } from "@/components/ui/button"

type SaveButtonProps = ButtonProps & { onSave: () => void }

// Ícono con color distinto al texto
<Button startIcon={<Star />} iconClassName="text-yellow-400">
  Favorito
</Button>

// Texto con estilo tipográfico personalizado
<Button textClassName="tracking-widest uppercase text-xs font-bold">
  Acción
</Button>

// Combinar ambos para control total
<Button
  startIcon={<Sparkles />}
  iconClassName="text-purple-400"
  textClassName="italic font-light"
  variant="outline"
>
  Especial
</Button>
```

---

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
  --color-primary-foreground:  var(--primary-foreground);
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
  --primary:              oklch(0.62 0.18 35);
  --primary-foreground:   oklch(0.985 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted-foreground:     oklch(0.556 0 0);
  --destructive:          oklch(0.577 0.245 27.325);

  /* Estos tres suelen no estar en proyectos shadcn/ui por defecto */
  --info:    oklch(0.60 0.15 240);
  --warning: oklch(0.70 0.15 85);
  --success: oklch(0.55 0.15 142);
}

.dark {
  --primary:            oklch(0.66 0.18 35);
  --primary-foreground: oklch(0.98 0.01 80);
}
```

**Actualización de `utils.ts` requerida:**

`text-display` es un tamaño tipográfico personalizado que `tailwind-merge` no reconoce por defecto. Sin registrarlo, pasar `className="text-xl"` a un `<Text size="display">` no eliminaría `text-xl` — ambas clases quedarían aplicadas.

Reemplazá el `twMerge` estándar en tu `lib/utils.ts` por `extendTailwindMerge`:

```ts
import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": ["text-display"],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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
| `className` | `string` | — | Clases de Tailwind adicionales. Se mergean después de las clases de variante, por lo que pueden sobreescribir o extender cualquier estilo base del componente |

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
