import type { DemoEntry } from "../types/docs.types"
import { ButtonGroupFiltersDemo } from "./button-group/button-group-filters.demo"
import { ButtonGroupIconsDemo } from "./button-group/button-group-icons.demo"
import { ButtonGroupSizesDemo } from "./button-group/button-group-sizes.demo"
import { ButtonGroupStatesDemo } from "./button-group/button-group-states.demo"
import { ButtonGroupSwitchDemo } from "./button-group/button-group-switch.demo"
import { ButtonGroupVerticalDemo } from "./button-group/button-group-vertical.demo"
import { ButtonColorsDemo } from "./button/button-colors.demo"
import { ButtonCustomStylesDemo } from "./button/button-custom-styles.demo"
import { ButtonGlowDemo } from "./button/button-glow.demo"
import { ButtonIconOnlyDemo } from "./button/button-icon-only.demo"
import { ButtonIconSizeDemo } from "./button/button-icon-size.demo"
import { ButtonIconsDemo } from "./button/button-icons.demo"
import { ButtonRadiusDemo } from "./button/button-radius.demo"
import { ButtonResponsiveDemo } from "./button/button-responsive.demo"
import { ButtonSizesDemo } from "./button/button-sizes.demo"
import { ButtonStatesDemo } from "./button/button-states.demo"
import { ButtonTextSizeDemo } from "./button/button-text-size.demo"
import { ButtonTooltipDemo } from "./button/button-tooltip.demo"
import { ButtonVariantsDemo } from "./button/button-variants.demo"
import { FloatingToolbarBasicDemo } from "./floating-toolbar/floating-toolbar-basic.demo"
import { FloatingToolbarNumberingDemo } from "./floating-toolbar/floating-toolbar-numbering.demo"
import { FrameBasicDemo } from "./frame/frame-basic.demo"
import { FrameCardsDemo } from "./frame/frame-cards.demo"
import { FrameColorsDemo } from "./frame/frame-colors.demo"
import { FramePlainDemo } from "./frame/frame-plain.demo"
import { TextColorsDemo } from "./text/text-colors.demo"
import { TextCustomizationDemo } from "./text/text-customization.demo"
import { TextElementDemo } from "./text/text-element.demo"
import { TextSizesDemo } from "./text/text-sizes.demo"
import { TextVariantsDemo } from "./text/text-variants.demo"

/**
 * Every demo MDX can show with <Demo name="…" />. The Demo renders the component
 * and, below it, the source of `file` — so the code shown is the code that runs.
 */
export const demoRegistry = {
  "button-variants": { component: ButtonVariantsDemo, file: "button/button-variants.demo.tsx" },
  "button-colors": { component: ButtonColorsDemo, file: "button/button-colors.demo.tsx" },
  "button-sizes": { component: ButtonSizesDemo, file: "button/button-sizes.demo.tsx" },
  "button-radius": { component: ButtonRadiusDemo, file: "button/button-radius.demo.tsx" },
  "button-text-size": { component: ButtonTextSizeDemo, file: "button/button-text-size.demo.tsx" },
  "button-icon-size": { component: ButtonIconSizeDemo, file: "button/button-icon-size.demo.tsx" },
  "button-states": { component: ButtonStatesDemo, file: "button/button-states.demo.tsx" },
  "button-glow": { component: ButtonGlowDemo, file: "button/button-glow.demo.tsx" },
  "button-icons": { component: ButtonIconsDemo, file: "button/button-icons.demo.tsx" },
  "button-icon-only": { component: ButtonIconOnlyDemo, file: "button/button-icon-only.demo.tsx" },
  "button-tooltip": { component: ButtonTooltipDemo, file: "button/button-tooltip.demo.tsx" },
  "button-responsive": { component: ButtonResponsiveDemo, file: "button/button-responsive.demo.tsx" },
  "button-custom-styles": { component: ButtonCustomStylesDemo, file: "button/button-custom-styles.demo.tsx" },
  "text-sizes": { component: TextSizesDemo, file: "text/text-sizes.demo.tsx", layout: "stack" },
  "text-colors": { component: TextColorsDemo, file: "text/text-colors.demo.tsx", layout: "stack" },
  "text-variants": { component: TextVariantsDemo, file: "text/text-variants.demo.tsx", layout: "stack" },
  "text-element": { component: TextElementDemo, file: "text/text-element.demo.tsx", layout: "stack" },
  "text-customization": { component: TextCustomizationDemo, file: "text/text-customization.demo.tsx", layout: "stack" },
  "floating-toolbar-basic": { component: FloatingToolbarBasicDemo, file: "floating-toolbar/floating-toolbar-basic.demo.tsx" },
  "floating-toolbar-numbering": { component: FloatingToolbarNumberingDemo, file: "floating-toolbar/floating-toolbar-numbering.demo.tsx" },
  "frame-basic": { component: FrameBasicDemo, file: "frame/frame-basic.demo.tsx" },
  "frame-cards": { component: FrameCardsDemo, file: "frame/frame-cards.demo.tsx" },
  "frame-colors": { component: FrameColorsDemo, file: "frame/frame-colors.demo.tsx" },
  "frame-plain": { component: FramePlainDemo, file: "frame/frame-plain.demo.tsx" },
  "button-group-filters": { component: ButtonGroupFiltersDemo, file: "button-group/button-group-filters.demo.tsx" },
  "button-group-switch": { component: ButtonGroupSwitchDemo, file: "button-group/button-group-switch.demo.tsx" },
  "button-group-icons": { component: ButtonGroupIconsDemo, file: "button-group/button-group-icons.demo.tsx" },
  "button-group-vertical": { component: ButtonGroupVerticalDemo, file: "button-group/button-group-vertical.demo.tsx" },
  "button-group-sizes": { component: ButtonGroupSizesDemo, file: "button-group/button-group-sizes.demo.tsx" },
  "button-group-states": { component: ButtonGroupStatesDemo, file: "button-group/button-group-states.demo.tsx" },
} satisfies Record<string, DemoEntry>
