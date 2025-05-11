"use client"

import { Line, LineChart as RechartsLineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { ChartTooltip } from "@/components/ui/chart"

const data = [
  { name: "Jan", revenue: 25000 },
  { name: "Feb", revenue: 30000 },
  { name: "Mar", revenue: 35000 },
  { name: "Apr", revenue: 40000 },
  { name: "May", revenue: 50000 },
  { name: "Jun", revenue: 45000 },
  { name: "Jul", revenue: 60000 },
  { name: "Aug", revenue: 70000 },
  { name: "Sep", revenue: 65000 },
  { name: "Oct", revenue: 80000 },
  { name: "Nov", revenue: 90000 },
  { name: "Dec", revenue: 100000 },
]

export function LineChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsLineChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `₹${value / 1000}k`}
        />
        <Tooltip content={<ChartTooltip />} />
        <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} activeDot={{ r: 8 }} />
      </RechartsLineChart>
    </ResponsiveContainer>
  )
}
