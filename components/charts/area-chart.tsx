"use client"

import { Area, AreaChart as RechartsAreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { ChartTooltip } from "@/components/ui/chart"

const data = [
  { date: "2025-04-01", registrations: 5 },
  { date: "2025-04-02", registrations: 8 },
  { date: "2025-04-03", registrations: 12 },
  { date: "2025-04-04", registrations: 10 },
  { date: "2025-04-05", registrations: 15 },
  { date: "2025-04-06", registrations: 20 },
  { date: "2025-04-07", registrations: 18 },
  { date: "2025-04-08", registrations: 25 },
  { date: "2025-04-09", registrations: 30 },
  { date: "2025-04-10", registrations: 28 },
  { date: "2025-04-11", registrations: 35 },
  { date: "2025-04-12", registrations: 40 },
  { date: "2025-04-13", registrations: 45 },
  { date: "2025-04-14", registrations: 50 },
]

export function AreaChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsAreaChart data={data}>
        <defs>
          <linearGradient id="colorRegistrations" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="date"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
        />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip content={<ChartTooltip />} />
        <Area
          type="monotone"
          dataKey="registrations"
          stroke="hsl(var(--primary))"
          fillOpacity={1}
          fill="url(#colorRegistrations)"
        />
      </RechartsAreaChart>
    </ResponsiveContainer>
  )
}
