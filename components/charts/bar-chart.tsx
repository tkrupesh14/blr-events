"use client"

import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { ChartTooltip } from "@/components/ui/chart"

const data = [
  { name: "18-24", value: 120 },
  { name: "25-34", value: 240 },
  { name: "35-44", value: 180 },
  { name: "45-54", value: 100 },
  { name: "55-64", value: 60 },
  { name: "65+", value: 30 },
]

export function BarChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsBarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip content={<ChartTooltip />} />
        <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
      </RechartsBarChart>
    </ResponsiveContainer>
  )
}
