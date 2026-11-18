import { DARK_CLASS, THEME_STORAGE_KEY } from "./theme.constants"

// Runs before first paint: applies the saved theme, or the system one, to <html>.
const script = `(function(){try{var t=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});var d=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle(${JSON.stringify(DARK_CLASS)},d)}catch(e){}})()`

/** Render inside <head> to avoid a flash of the wrong theme. */
export function ThemeScript() {
  // eslint-disable-next-line @eslint-react/dom-no-dangerously-set-innerhtml -- static, trusted script built from constants
  return <script dangerouslySetInnerHTML={{ __html: script }} />
}
