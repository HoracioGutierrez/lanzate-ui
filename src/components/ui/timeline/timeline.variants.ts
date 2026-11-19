import type {
  TimelineColor,
  TimelineMarkerShape,
  TimelineMarkerVariant,
  TimelineSize,
  TimelineStatus,
  TimelineVariant,
} from "./timeline.types"

// Each color sets three local variables the parts read:
// --timeline-color (fill), --timeline-fg (text on the fill), --timeline-accent (edges, lines and text
// on light fills: the intent's -text token, which keeps contrast where the fill wouldn't).
export const timelineColorClasses = {
  primary: "[--timeline-color:var(--primary)] [--timeline-fg:var(--primary-foreground)] [--timeline-accent:var(--primary-text)]",
  secondary: "[--timeline-color:var(--secondary)] [--timeline-fg:var(--secondary-foreground)] [--timeline-accent:var(--secondary-text)]",
  muted: "[--timeline-color:var(--muted)] [--timeline-fg:var(--muted-text)] [--timeline-accent:var(--muted-text)]",
  info: "[--timeline-color:var(--info)] [--timeline-fg:var(--info-foreground)] [--timeline-accent:var(--info-text)]",
  warning: "[--timeline-color:var(--warning)] [--timeline-fg:var(--warning-foreground)] [--timeline-accent:var(--warning-text)]",
  success: "[--timeline-color:var(--success)] [--timeline-fg:var(--success-foreground)] [--timeline-accent:var(--success-text)]",
  error: "[--timeline-color:var(--error)] [--timeline-fg:var(--error-foreground)] [--timeline-accent:var(--error-text)]",
} satisfies Record<TimelineColor, string>

// One meaning per color: done well, done with an error, happening now, still to come.
export const timelineStatusColors = {
  complete: "success",
  failed: "error",
  current: "warning",
  upcoming: "muted",
} satisfies Record<TimelineStatus, TimelineColor>

// --timeline-marker sizes the marker; --timeline-line is the title's line height, which the marker
// centers on in a vertical line timeline; --timeline-gap spaces the events.
const timelineLineSizeClasses = {
  sm: "[--timeline-marker:--spacing(3)] [--timeline-gap:--spacing(4)]",
  md: "[--timeline-marker:--spacing(7)] [--timeline-gap:--spacing(6)]",
  lg: "[--timeline-marker:--spacing(14)] [--timeline-gap:--spacing(4)]",
} satisfies Record<TimelineSize, string>

// --timeline-tile is a tile's least height, --timeline-tile-width the narrowest it gets before the
// row wraps.
const timelineTileSizeClasses = {
  sm: "gap-1.5 [--timeline-marker:--spacing(1.5)] [--timeline-pad:--spacing(2.5)] [--timeline-tile:--spacing(14)] [--timeline-tile-width:--spacing(26)]",
  md: "gap-2 [--timeline-marker:--spacing(2)] [--timeline-pad:--spacing(3)] [--timeline-tile:--spacing(20)] [--timeline-tile-width:--spacing(28)]",
  lg: "gap-3 [--timeline-marker:--spacing(2.5)] [--timeline-pad:--spacing(4)] [--timeline-tile:--spacing(28)] [--timeline-tile-width:--spacing(36)]",
} satisfies Record<TimelineSize, string>

const timelineBaseClasses = "group/timeline relative min-w-0 [--timeline-line:--spacing(5)]"

// A line keeps one row of equal columns. Tiles fill the width equally too, but wrap onto more rows
// (auto-fit) when they'd get narrower than --timeline-tile-width, so text stays readable on phones.
const timelineLayoutClasses = {
  line: "data-[orientation=horizontal]:grid data-[orientation=horizontal]:auto-cols-fr data-[orientation=horizontal]:grid-flow-col",
  tiles:
    "data-[orientation=horizontal]:grid data-[orientation=horizontal]:grid-cols-[repeat(auto-fit,minmax(min(100%,var(--timeline-tile-width)),1fr))]",
} satisfies Record<TimelineVariant, string>

export const timelineClasses = (variant: TimelineVariant, size: TimelineSize) =>
  [
    timelineBaseClasses,
    "data-[orientation=vertical]:flex data-[orientation=vertical]:flex-col",
    timelineLayoutClasses[variant],
    variant === "tiles" ? timelineTileSizeClasses[size] : timelineLineSizeClasses[size],
  ].join(" ")

// Entrance, shared by both variants: on first paint with `appear`, and every time a
// TimelineCollapsiblePanel opens. Each event waits its turn through --timeline-index, which ui-sdk
// writes on every item. In a panel, --timeline-handoff lets the matching TimelineStackItem leave first.
const timelineItemEntranceClasses = [
  "[--timeline-delay:calc(var(--timeline-index,0)*var(--timeline-stagger,80ms))]",
  "in-data-[slot=collapsible-panel]:[--timeline-delay:calc(var(--timeline-index,0)*var(--timeline-stagger,80ms)+var(--timeline-handoff,150ms))]",
  "group-data-appear/timeline:delay-(--timeline-delay) in-data-[slot=collapsible-panel]:delay-(--timeline-delay)",
  "in-data-ending-style:delay-0 motion-reduce:transition-none",
].join(" ")

// The marker is absolutely placed at the start of the event, so the content flows beside it (vertical)
// or under it (horizontal). In a vertical timeline the smaller of marker and title line is centered on
// the other through --timeline-marker-top and the content's top padding.
const timelineLineItemClasses = [
  "group/timeline-item relative min-w-0 rounded-md outline-none",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
  "data-[orientation=vertical]:[--timeline-marker-top:max(0px,calc((var(--timeline-line)-var(--timeline-marker))/2))]",
  "data-[orientation=vertical]:min-h-[calc(var(--timeline-marker)+var(--timeline-gap))] data-[orientation=vertical]:last:min-h-(--timeline-marker) data-[orientation=vertical]:data-last:min-h-(--timeline-marker)",
  "data-[orientation=vertical]:ps-[calc(var(--timeline-marker)+--spacing(3))]",
  "data-[orientation=vertical]:pt-[max(0px,calc((var(--timeline-marker)-var(--timeline-line))/2))]",
  "data-[orientation=vertical]:pb-(--timeline-gap) data-[orientation=vertical]:last:pb-0 data-[orientation=vertical]:data-last:pb-0",
  "data-[orientation=horizontal]:[--timeline-marker-top:0px]",
  "data-[orientation=horizontal]:flex data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:gap-0.5",
  "data-[orientation=horizontal]:pt-[calc(var(--timeline-marker)+--spacing(2))] data-[orientation=horizontal]:pe-(--timeline-gap)",
  timelineItemEntranceClasses,
  "transition-[opacity,translate] duration-300 ease-out",
  "group-data-appear/timeline:starting:opacity-0",
  "group-data-appear/timeline:data-[orientation=vertical]:starting:-translate-y-2",
  "group-data-appear/timeline:data-[orientation=horizontal]:starting:-translate-x-3 rtl:group-data-appear/timeline:data-[orientation=horizontal]:starting:translate-x-3",
  "in-data-starting-style:opacity-0 in-data-ending-style:opacity-0",
  "data-[orientation=vertical]:in-data-starting-style:-translate-y-2",
  "data-[orientation=horizontal]:in-data-starting-style:-translate-x-3 rtl:data-[orientation=horizontal]:in-data-starting-style:translate-x-3",
  "motion-reduce:in-data-starting-style:translate-0",
].join(" ")

// The tile follows Frame's industrial look: square edges, a 1px border in the status color at 40%
// over a card with a 10% wash of it, and registration marks in the full color on two opposite
// corners, like the crop marks of a technical drawing. The current event is a little brighter; an
// upcoming one is a plain dashed card. Keyed on data-status, which the item carries.
// Duplicated from Frame and Button Group on purpose: each registry component installs on its own.
const timelineTileSurfaceClasses = [
  "border border-(--timeline-accent)/40 bg-card bg-linear-to-b from-(--timeline-accent)/10 to-(--timeline-accent)/10",
  "data-[status=current]:border-(--timeline-accent)/70 data-[status=current]:from-(--timeline-accent)/20 data-[status=current]:to-(--timeline-accent)/20",
  "data-[status=upcoming]:border-dashed data-[status=upcoming]:border-border data-[status=upcoming]:from-transparent data-[status=upcoming]:to-transparent",
].join(" ")

const timelineTileCornerClasses = [
  "before:pointer-events-none before:absolute before:-start-px before:-top-px before:size-2 before:border-s before:border-t before:border-(--timeline-accent)",
  "after:pointer-events-none after:absolute after:-end-px after:-bottom-px after:size-2 after:border-e after:border-b after:border-(--timeline-accent)",
  "group-data-[size=lg]/timeline:before:size-3 group-data-[size=lg]/timeline:after:size-3",
].join(" ")

// The tile grows out of a square dot by animating clip-path between two inset() shapes, which
// interpolate smoothly. Its background starts as the solid status color and settles on the card,
// so the dot reads as the stack's dot. The inset is negative at rest so the focus ring isn't clipped.
const timelineTileItemClasses = [
  "group/timeline-item relative isolate flex min-h-(--timeline-tile) min-w-0 flex-col justify-start gap-0.5 p-(--timeline-pad) outline-none",
  timelineTileSurfaceClasses,
  timelineTileCornerClasses,
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
  "[clip-path:inset(-8px)]",
  timelineItemEntranceClasses,
  "transition-[clip-path,translate,opacity,background-color] duration-500 ease-out",
  "in-data-starting-style:[clip-path:inset(calc(50%-8px))] in-data-starting-style:-translate-y-3 in-data-starting-style:bg-(--timeline-accent)",
  "in-data-ending-style:[clip-path:inset(calc(50%-8px))] in-data-ending-style:opacity-0 in-data-ending-style:duration-200",
  "group-data-appear/timeline:starting:[clip-path:inset(calc(50%-8px))] group-data-appear/timeline:starting:bg-(--timeline-accent)",
  "motion-reduce:in-data-starting-style:[clip-path:inset(-8px)] motion-reduce:in-data-starting-style:translate-0 motion-reduce:in-data-starting-style:bg-card",
].join(" ")

export const timelineItemClasses = {
  line: timelineLineItemClasses,
  tiles: timelineTileItemClasses,
} satisfies Record<TimelineVariant, string>

// In a tile the LED sits in the top-end corner, centered on the overline title's first line.
export const timelineMarkerPositionClasses = {
  line: "absolute start-0 top-(--timeline-marker-top) z-10",
  tiles: "absolute end-(--timeline-pad) top-[calc(var(--timeline-pad)+(--spacing(4)-var(--timeline-marker))/2)]",
} satisfies Record<TimelineVariant, string>

// In a tile the marker is a square LED, like Button Group's: lit in the status color, dim while
// upcoming. Icons and labels inside it don't fit, so they're hidden.
export const timelineTileMarkerClasses = (pulse: boolean) =>
  [
    "inline-block size-(--timeline-marker) shrink-0 bg-(--timeline-color) *:hidden",
    "data-upcoming:bg-(--timeline-accent) data-upcoming:opacity-30",
    pulse
      ? "before:pointer-events-none before:absolute before:-inset-0.5 before:border before:border-(--timeline-accent) motion-safe:before:animate-ping"
      : "",
  ].join(" ")

const timelineMarkerShapeClasses = {
  circle: "rounded-full",
  square: "rounded-[calc(var(--timeline-marker)/4)]",
} satisfies Record<TimelineMarkerShape, string>

export const timelineMarkerRadiusClasses = timelineMarkerShapeClasses

const solid = "border-(--timeline-color) bg-(--timeline-color) text-(--timeline-fg)"
// Soft and outline paint over the page background first, so the connector never shows through.
const soft = "border-(--timeline-accent) bg-background bg-linear-to-b from-(--timeline-accent)/15 to-(--timeline-accent)/15 text-(--timeline-accent)"
const outline = "border-(--timeline-accent)/50 bg-background text-(--timeline-accent)"

const timelineMarkerVariantClasses = {
  solid,
  soft,
  outline,
} satisfies Record<TimelineMarkerVariant, string>

// Without a variant, the marker follows its event's status: done (complete or failed) solid, current
// soft, upcoming outline. Spelled out in full: Tailwind only generates classes it finds in the source.
const timelineMarkerStatusClasses = [
  solid,
  "data-current:border-(--timeline-accent) data-current:bg-linear-to-b data-current:from-(--timeline-accent)/15 data-current:to-(--timeline-accent)/15 data-current:bg-background data-current:text-(--timeline-accent)",
  "data-upcoming:border-(--timeline-accent)/50 data-upcoming:bg-background data-upcoming:text-(--timeline-accent)",
].join(" ")

// A circle stays round; a square morphs from a radius of half its size, a length that interpolates
// smoothly (rounded-full's huge radius would snap at the end).
export const timelineMarkerClasses = (shape: TimelineMarkerShape, variant: TimelineMarkerVariant | undefined, pulse: boolean) =>
  [
    "inline-flex size-(--timeline-marker) shrink-0 items-center justify-center border-2 text-2xs font-semibold",
    "[&_svg]:size-3/5 [&_svg]:shrink-0 group-data-[size=sm]/timeline:[&_svg]:hidden",
    "transition-[background-color,border-color,color,scale,border-radius] duration-500 ease-out motion-reduce:transition-none",
    "in-data-[slot=collapsible-panel]:delay-(--timeline-delay) in-data-ending-style:delay-0",
    "group-data-[variant=line]/timeline:in-data-starting-style:scale-50 motion-reduce:in-data-starting-style:scale-100",
    timelineMarkerShapeClasses[shape],
    shape === "square" ? "in-data-starting-style:rounded-[calc(var(--timeline-marker)/2)]" : "",
    variant ? timelineMarkerVariantClasses[variant] : timelineMarkerStatusClasses,
    pulse
      ? "before:pointer-events-none before:absolute before:-inset-0.5 before:rounded-[inherit] before:border-2 before:border-(--timeline-accent) motion-safe:before:animate-ping"
      : "",
  ].join(" ")

// In a tile the button covers the whole card, so hovering anywhere on it shows the tooltip.
export const timelineMarkerTriggerClasses = {
  line: [
    timelineMarkerPositionClasses.line,
    "inline-flex cursor-help outline-none",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
    "[&>[data-slot=timeline-marker]]:hover:brightness-95 dark:[&>[data-slot=timeline-marker]]:hover:brightness-110",
  ].join(" "),
  tiles: [
    "absolute -inset-0.5 z-10 cursor-help rounded-[inherit] outline-none",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
    "transition-colors duration-150 ease-out hover:bg-(--timeline-accent)/5 motion-reduce:transition-none",
  ].join(" "),
} satisfies Record<TimelineVariant, string>

// A track in the border color with the accent drawn over it; a done event fills its line, so moving
// the current step animates the progress along the timeline.
export const timelineConnectorClasses = [
  "pointer-events-none absolute overflow-hidden rounded-full bg-border",
  "after:absolute after:inset-0 after:bg-(--timeline-accent) after:transition-transform after:duration-500 after:ease-out motion-reduce:after:transition-none",
  "group-last/timeline-item:hidden group-data-last/timeline-item:hidden group-data-[variant=tiles]/timeline:hidden",
  "data-[orientation=vertical]:start-[calc(var(--timeline-marker)/2)] data-[orientation=vertical]:w-0.5 data-[orientation=vertical]:-translate-x-1/2 rtl:data-[orientation=vertical]:translate-x-1/2",
  "data-[orientation=vertical]:top-[calc(var(--timeline-marker-top)+var(--timeline-marker)+--spacing(1))]",
  "data-[orientation=vertical]:bottom-[calc(--spacing(1)-var(--timeline-marker-top))]",
  "data-[orientation=vertical]:after:origin-top data-[orientation=vertical]:after:scale-y-0 data-[orientation=vertical]:data-complete:after:scale-y-100",
  "data-[orientation=horizontal]:top-[calc(var(--timeline-marker)/2)] data-[orientation=horizontal]:h-0.5 data-[orientation=horizontal]:-translate-y-1/2",
  "data-[orientation=horizontal]:start-[calc(var(--timeline-marker)+--spacing(1))] data-[orientation=horizontal]:end-1",
  "data-[orientation=horizontal]:after:origin-left rtl:data-[orientation=horizontal]:after:origin-right",
  "data-[orientation=horizontal]:after:scale-x-0 data-[orientation=horizontal]:data-complete:after:scale-x-100",
].join(" ")

export const timelineContentClasses = "flex min-w-0 flex-col gap-0.5"

// In a tile every line is one line, truncated, so titles and times start at the same height across
// the row. The full title still names the event for screen readers.
export const timelineTitleClasses = [
  "block min-w-0 text-foreground data-upcoming:text-muted-text group-data-[variant=tiles]/timeline:truncate group-data-[variant=tiles]/timeline:pe-[calc(var(--timeline-marker)+--spacing(2))]",
  "group-data-[variant=tiles]/timeline:text-(--timeline-accent) group-data-[variant=tiles]/timeline:data-upcoming:text-muted-text",
].join(" ")

export const timelineTimeClasses = "block min-w-0 tabular-nums group-data-[variant=tiles]/timeline:mt-auto group-data-[variant=tiles]/timeline:truncate"

export const timelineDescriptionClasses =
  "block min-w-0 group-data-[variant=tiles]/timeline:truncate group-data-[variant=tiles]/timeline:text-foreground group-data-[variant=tiles]/timeline:data-upcoming:text-muted-text"

export const timelineCollapsibleClasses = "group/timeline-collapsible flex min-w-0 flex-col"

export const timelineCollapsibleTriggerClasses = [
  "flex w-full min-w-0 cursor-pointer items-center gap-2 rounded-sm text-start outline-none select-none",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
].join(" ")

export const timelineCollapsiblePanelClasses = [
  "h-(--collapsible-panel-height) overflow-hidden",
  "transition-[height] duration-300 ease-out motion-reduce:transition-none",
  "data-starting-style:h-0 data-ending-style:h-0",
].join(" ")

// Room for the focus rings and the markers' pulse, which the panel's overflow would clip.
export const timelineCollapsibleContentClasses = "p-1 pt-3"

// The summary in a trigger steps out of the way once it opens: the leader at once, the stack's dots
// one by one, each just before its event appears below (same --timeline-index and stagger).
// Spelled out: Tailwind only generates classes written literally in the source.
// Each dot gets its place from :nth-child, the same --timeline-index ui-sdk writes on the events.
// Twelve covers any summary that still reads as one; later dots leave with the twelfth.
export const timelineStackClasses = [
  "inline-flex shrink-0 items-center -space-x-1.5 rtl:space-x-reverse",
  "*:[--timeline-index:11] [&>:nth-child(1)]:[--timeline-index:0] [&>:nth-child(2)]:[--timeline-index:1]",
  "[&>:nth-child(3)]:[--timeline-index:2] [&>:nth-child(4)]:[--timeline-index:3] [&>:nth-child(5)]:[--timeline-index:4]",
  "[&>:nth-child(6)]:[--timeline-index:5] [&>:nth-child(7)]:[--timeline-index:6] [&>:nth-child(8)]:[--timeline-index:7]",
  "[&>:nth-child(9)]:[--timeline-index:8] [&>:nth-child(10)]:[--timeline-index:9] [&>:nth-child(11)]:[--timeline-index:10]",
].join(" ")

export const timelineStackItemClasses = (shape: TimelineMarkerShape) =>
  [
    // A tile in miniature: its edge in the full status color, since 40% would vanish at this size,
    // over the same wash. An upcoming dot keeps a solid gray edge: dashes turn to noise at 16px.
    "relative inline-block size-4 shrink-0 border border-(--timeline-accent) bg-card ring-2 ring-background",
    "bg-linear-to-b from-(--timeline-accent)/20 to-(--timeline-accent)/20",
    "data-[status=current]:from-(--timeline-accent)/35 data-[status=current]:to-(--timeline-accent)/35",
    "data-[status=upcoming]:border-(--timeline-accent)/60 data-[status=upcoming]:from-transparent data-[status=upcoming]:to-transparent",
    "[--timeline-delay:calc(var(--timeline-index,0)*var(--timeline-stagger,80ms))]",
    "transition-[opacity,scale,translate] duration-200 ease-out delay-(--timeline-delay) motion-reduce:transition-none",
    "[[data-slot=collapsible-trigger][data-open]_&]:translate-y-2 [[data-slot=collapsible-trigger][data-open]_&]:scale-50 [[data-slot=collapsible-trigger][data-open]_&]:opacity-0",
    shape === "circle" ? "rounded-full" : "rounded-none",
  ].join(" ")

export const timelineLeaderClasses = [
  "mb-[0.35em] h-0 min-w-4 flex-1 self-end border-b-2 border-dotted border-muted-foreground/50",
  "transition-opacity duration-200 ease-out motion-reduce:transition-none",
  "[[data-slot=collapsible-trigger][data-open]_&]:opacity-0",
].join(" ")
