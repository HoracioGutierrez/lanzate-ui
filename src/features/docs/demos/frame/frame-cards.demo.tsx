import { Frame, FrameContent, FrameHeader, FrameMenu, FrameMenuItem, FrameTitle } from "@/components/ui/frame"

const orders = [
  { id: "4189", items: "3 items", total: "$84.00" },
  { id: "4190", items: "1 item", total: "$18.00" },
  { id: "4191", items: "5 items", total: "$212.50" },
]

export function FrameCardsDemo() {
  return (
    <div className="grid w-full gap-4 sm:grid-cols-3">
      {orders.map((order, index) => (
        <Frame key={order.id} size="sm" collapsible defaultOpen={index === 0}>
          <FrameHeader>
            <FrameTitle>Order {order.id}</FrameTitle>
            <FrameMenu label={`Order ${order.id} actions`}>
              <FrameMenuItem value="open">Open</FrameMenuItem>
              <FrameMenuItem value="refund">Refund</FrameMenuItem>
            </FrameMenu>
          </FrameHeader>
          <FrameContent>
            <dl className="grid grid-cols-2 gap-1 text-sm">
              <dt className="text-muted-foreground">Items</dt>
              <dd className="text-end">{order.items}</dd>
              <dt className="text-muted-foreground">Total</dt>
              <dd className="text-end font-mono">{order.total}</dd>
            </dl>
          </FrameContent>
        </Frame>
      ))}
    </div>
  )
}
