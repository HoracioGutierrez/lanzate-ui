"use client"

import { useState } from "react"
import { CircleCheckIcon, CircleXIcon, ClockIcon } from "lucide-react"

import { ButtonGroup, ButtonGroupAll, ButtonGroupItem } from "@/components/ui/button-group"

const orders = [
  { id: 4189, status: "pending" },
  { id: 4190, status: "paid" },
  { id: 4191, status: "paid" },
  { id: 4192, status: "cancelled" },
  { id: 4193, status: "pending" },
]

const count = (status: string) => orders.filter((order) => order.status === status).length

export function ButtonGroupFiltersDemo() {
  const [status, setStatus] = useState<string[]>([])
  const shown = status.length === 0 ? orders : orders.filter((order) => status.includes(order.status))

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <ButtonGroup selection="multiple" aria-label="Order status" value={status} onValueChange={setStatus}>
        <ButtonGroupAll>All · {orders.length}</ButtonGroupAll>
        <ButtonGroupItem value="pending" startIcon={<ClockIcon />}>Pending · {count("pending")}</ButtonGroupItem>
        <ButtonGroupItem value="paid" startIcon={<CircleCheckIcon />}>Paid · {count("paid")}</ButtonGroupItem>
        <ButtonGroupItem value="cancelled" startIcon={<CircleXIcon />}>Cancelled · {count("cancelled")}</ButtonGroupItem>
      </ButtonGroup>
      <p className="text-sm text-muted-foreground">
        Showing {shown.map((order) => `#${order.id}`).join(", ")}
      </p>
    </div>
  )
}
