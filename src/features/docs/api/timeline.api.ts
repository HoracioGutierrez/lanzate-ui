import type { ApiRow } from "../types/docs.types"

const colors = '"primary" | "secondary" | "muted" | "info" | "success" | "warning" | "error"'
const status = '"complete" | "failed" | "current" | "upcoming"'

export const timelineApi: ApiRow[] = [
  { prop: "Timeline aria-label", type: "string", description: "Names the list. Required in practice: screen readers and agents find the timeline by it." },
  { prop: "Timeline orientation", type: '"vertical" | "horizontal"', default: '"vertical"', description: "Which way the events run, and which arrow keys move between them." },
  { prop: "Timeline variant", type: '"line" | "tiles"', default: '"line"', description: "line: markers joined by a line, content beside or under them. tiles: each event is a card with its content inside; horizontal tiles share the row equally." },
  { prop: "Timeline size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Scales markers and gaps, or the tiles' height and padding." },
  { prop: "Timeline appear", type: "boolean", default: "false", description: "Staggers the events in on first paint (tiles grow out of dots). Inside a TimelineCollapsiblePanel they stagger in on every open. Off under reduced motion." },
  { prop: "Timeline loop", type: "boolean", default: "true", description: "Whether arrow keys wrap from the last event to the first." },
  { prop: "Timeline controller", type: "TimelineController", description: "Focuses an event by its value from anywhere. Create one with createTimelineController()." },
  { prop: "Timeline feed / busy", type: "boolean", description: "Turns the list into a WAI-ARIA feed of articles; busy sets aria-busy while it loads." },
  { prop: "TimelineItem status", type: status, description: 'Where the event stands, and its color: complete success, failed error, current warning, upcoming muted. current sets aria-current="step" and takes the tab stop; failed counts as done and shows as data-status="failed".' },
  { prop: "TimelineItem color", type: colors, description: "Overrides the status color for this event. Without a status it defaults to primary." },
  { prop: "TimelineItem value", type: "string", description: "Names the event for the controller's focus()." },
  { prop: "TimelineMarker shape", type: '"circle" | "square"', default: '"circle"', description: "Dot or tile. Children (an icon or a number) are decorative." },
  { prop: "TimelineMarker variant", type: '"solid" | "soft" | "outline"', description: "Fill style. Without it the marker follows the status: complete solid, current soft, upcoming outline." },
  { prop: "TimelineMarker pulse", type: "boolean", default: "false", description: "Rings the marker for a live step. Off under reduced motion." },
  { prop: "TimelineMarker tooltip", type: "ReactNode", description: "Extra info in a tooltip. The marker becomes a button Tab reaches after its event; a press toggles it on touch screens." },
  { prop: "TimelineMarker tooltipLabel", type: "string", description: "Name of the marker's button. Without it the tooltip names it; pass one when the tooltip isn't plain text." },
  { prop: "TimelineMarker tooltipOptions", type: "{ side, align, sideOffset, arrow, delay, toggleable, className }", description: "Settings passed to the Tooltip and its content." },
  { prop: "TimelineCollapsible open / defaultOpen", type: "boolean", default: "false", description: "Whether the panel is open, controlled or at first. onOpenChange reports changes." },
  { prop: "TimelineStackItem color / status / shape", type: `${colors} / ${status} / "circle" | "square"`, description: "One dot of the closed summary, colored like an item. Keep them in the events' order: each leaves just before its event appears." },
  { prop: "--timeline-stagger / --timeline-handoff", type: "CSS time", default: "80ms / 150ms", description: "Set on any ancestor: time between events, and from a stack dot leaving to its event appearing." },
  { prop: "render", type: "ReactElement | (props) => ReactElement", description: "Every part takes it to change its element, like a title as a heading: render={<h3 />}." },
  { prop: "className", type: "string", description: "Every part merges it after its own classes. TimelineCollapsiblePanel puts it on its padded inner box." },
]
