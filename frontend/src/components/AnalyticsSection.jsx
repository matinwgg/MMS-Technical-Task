"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart"

const USAGE_DATA = [
  { month: "Dec 15", executions: 240, cost: 18 },
  { month: "Dec 20", executions: 390, cost: 29 },
  { month: "Dec 25", executions: 450, cost: 35 },
  { month: "Jan 5", executions: 520, cost: 41 },
  { month: "Jan 10", executions: 680, cost: 52 },
]

const CATEGORY_DATA = [
  { category: "Customer Support", count: 1240 },
  { category: "Product Description", count: 890 },
  { category: "Fraud Analysis", count: 650 },
  { category: "Marketing", count: 520 },
  { category: "Data Analysis", count: 380 },
]

export default function AnalyticsSection() {
  return (
    <Card className="border border-border shadow-sm mb-6">
      <CardHeader className="border-b border-border">
        <CardTitle>Prompt Performance</CardTitle>
        <CardDescription>Analytics from the last 30 days</CardDescription>
      </CardHeader>

      <CardContent className="p-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-muted rounded-lg p-4 border border-border">
            <p className="text-sm text-muted-foreground font-medium">Avg. Response Time</p>
            <p className="text-2xl font-bold text-foreground mt-2">242ms</p>
          </div>

          <div className="bg-muted rounded-lg p-4 border border-border">
            <p className="text-sm text-muted-foreground font-medium">Total Executions</p>
            <p className="text-2xl font-bold text-foreground mt-2">3,780</p>
          </div>

          <div className="bg-muted rounded-lg p-4 border border-border">
            <p className="text-sm text-muted-foreground font-medium">User Satisfaction</p>
            <p className="text-2xl font-bold text-foreground mt-2">4.2/5.0</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Line Chart */}
          <div className="border border-border rounded-lg p-4 bg-background">
            <h3 className="text-sm font-semibold text-foreground mb-4">
              Usage & Cost Trend
            </h3>

            <ChartContainer
              config={{
                executions: {
                  label: "Executions",
                  color: "hsl(var(--chart-1))",
                },
                cost: {
                  label: "Est. Cost ($)",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-64"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={USAGE_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
                  <YAxis stroke="var(--color-muted-foreground)" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />

                  <Line
                    type="monotone"
                    dataKey="executions"
                    stroke="var(--color-chart-1)"
                    strokeWidth={2}
                    dot={{ fill: "var(--color-chart-1)", r: 4 }}
                  />

                  <Line
                    type="monotone"
                    dataKey="cost"
                    stroke="var(--color-chart-2)"
                    strokeWidth={2}
                    dot={{ fill: "var(--color-chart-2)", r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>

          {/* Bar Chart */}
          <div className="border border-border rounded-lg p-4 bg-background">
            <h3 className="text-sm font-semibold text-foreground mb-4">
              Top Used Prompts by Category
            </h3>

            <ChartContainer
              config={{
                count: {
                  label: "Executions",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-64"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={CATEGORY_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis
                    dataKey="category"
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    stroke="var(--color-muted-foreground)"
                    fontSize={12}
                  />
                  <YAxis stroke="var(--color-muted-foreground)" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar
                    dataKey="count"
                    fill="var(--color-chart-3)"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
