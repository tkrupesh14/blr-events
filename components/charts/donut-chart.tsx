"use client"

import { Cell, Pie, PieChart as RechartsPieChart, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { ChartTooltip } from "@/components/ui/chart"

const data = [
  { name: "Conference", value: 450 },
  { name: "Workshop", value: 300 },
  { name: "Meetup", value: 200 },
  { name: "Hackathon", value: 150 },
  { name: "Webinar", value: 100 },
]

const COLORS = [
  "hsl(var(--primary))",
  "hsl(262, 80%, 60%)",
  "hsl(262, 70%, 70%)",
  "hsl(262, 60%, 80%)",
  "hsl(262, 50%, 90%)",
]

export function DonutChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsPieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<ChartTooltip />} />
        <Legend />
      </RechartsPieChart>
    </ResponsiveContainer>
  )
}
