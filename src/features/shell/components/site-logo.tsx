import Link from "next/link"

import { SITE_NAME } from "../shell.constants"

export function SiteLogo() {
  return (
    <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label={`${SITE_NAME} home`}>
      <span
        aria-hidden="true"
        className="grid size-7 place-items-center rounded-md bg-foreground font-mono text-xs font-semibold tracking-tight text-background"
      >
        L
      </span>
      <span aria-hidden="true" className="text-sm font-semibold tracking-tight">
        Lanzate <span className="font-normal text-muted-foreground">UI</span>
      </span>
    </Link>
  )
}
