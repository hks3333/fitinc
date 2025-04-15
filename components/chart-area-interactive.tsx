"use client"

import * as React from "react"
// Import BarChart and Bar instead of AreaChart and Area
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

export const description = "An interactive bar chart showing daily steps" // Updated description

// Mock data for daily steps over 90 days
const chartData = [
  { date: "2024-04-01", steps: 8234 }, { date: "2024-04-02", steps: 7598 },
  { date: "2024-04-03", steps: 10234 }, { date: "2024-04-04", steps: 9876 },
  { date: "2024-04-05", steps: 11567 }, { date: "2024-04-06", steps: 6789 },
  { date: "2024-04-07", steps: 8912 }, { date: "2024-04-08", steps: 10056 },
  { date: "2024-04-09", steps: 5432 }, { date: "2024-04-10", steps: 9321 },
  { date: "2024-04-11", steps: 12087 }, { date: "2024-04-12", steps: 8765 },
  { date: "2024-04-13", steps: 10543 }, { date: "2024-04-14", steps: 7123 },
  { date: "2024-04-15", steps: 9987 }, { date: "2024-04-16", steps: 10345 },
  { date: "2024-04-17", steps: 13456 }, { date: "2024-04-18", steps: 11234 },
  { date: "2024-04-19", steps: 8567 }, { date: "2024-04-20", steps: 6987 },
  { date: "2024-04-21", steps: 9012 }, { date: "2024-04-22", steps: 10876 },
  { date: "2024-04-23", steps: 7890 }, { date: "2024-04-24", Tsteps: 11987 }, // Typo fixed below
  { date: "2024-04-25", steps: 9567 }, { date: "2024-04-26", steps: 6123 },
  { date: "2024-04-27", steps: 12876 }, { date: "2024-04-28", steps: 8345 },
  { date: "2024-04-29", steps: 10987 }, { date: "2024-04-30", steps: 13987 },
  { date: "2024-05-01", steps: 8054 }, { date: "2024-05-02", steps: 10678 },
  { date: "2024-05-03", steps: 9234 }, { date: "2024-05-04", steps: 12456 },
  { date: "2024-05-05", steps: 13123 }, { date: "2024-05-06", steps: 14001 },
  { date: "2024-05-07", steps: 11567 }, { date: "2024-05-08", steps: 7890 },
  { date: "2024-05-09", steps: 9876 }, { date: "2024-05-10", steps: 10876 },
  { date: "2024-05-11", steps: 11345 }, { date: "2024-05-12", steps: 8912 },
  { date: "2024-05-13", steps: 8123 }, { date: "2024-05-14", steps: 13876 },
  { date: "2024-05-15", steps: 12987 }, { date: "2024-05-16", steps: 11054 },
  { date: "2024-05-17", steps: 14234 }, { date: "2024-05-18", steps: 10987 },
  { date: "2024-05-19", steps: 9345 }, { date: "2024-05-20", steps: 8765 },
  { date: "2024-05-21", steps: 6543 }, { date: "2024-05-22", steps: 7123 },
  { date: "2024-05-23", steps: 10234 }, { date: "2024-05-24", steps: 10876 },
  { date: "2024-05-25", steps: 9012 }, { date: "2024-05-26", steps: 8567 },
  { date: "2024-05-27", steps: 13567 }, { date: "2024-05-28", steps: 9876 },
  { date: "2024-05-29", steps: 6789 }, { date: "2024-05-30", steps: 11567 },
  { date: "2024-05-31", steps: 8912 }, { date: "2024-06-01", steps: 8888 },
  { date: "2024-06-02", steps: 13999 }, { date: "2024-06-03", steps: 7500 },
  { date: "2024-06-04", steps: 12800 }, { date: "2024-06-05", steps: 6900 },
  { date: "2024-06-06", steps: 10500 }, { date: "2024-06-07", steps: 11800 },
  { date: "2024-06-08", steps: 11200 }, { date: "2024-06-09", steps: 13600 },
  { date: "2024-06-10", steps: 8100 }, { date: "2024-06-11", steps: 7200 },
  { date: "2024-06-12", steps: 14100 }, { date: "2024-06-13", steps: 6800 },
  { date: "2024-06-14", steps: 12500 }, { date: "2024-06-15", steps: 11000 },
  { date: "2024-06-16", steps: 11500 }, { date: "2024-06-17", steps: 14500 },
  { date: "2024-06-18", steps: 7700 }, { date: "2024-06-19", steps: 10900 },
  { date: "2024-06-20", steps: 13200 }, { date: "2024-06-21", steps: 8400 },
  { date: "2024-06-22", steps: 10600 }, { date: "2024-06-23", steps: 14800 },
  { date: "2024-06-24", steps: 7900 }, { date: "2024-06-25", steps: 8300 },
  { date: "2024-06-26", steps: 12900 }, { date: "2024-06-27", steps: 13700 },
  { date: "2024-06-28", steps: 8000 }, { date: "2024-06-29", steps: 7600 },
  { date: "2024-06-30", steps: 13500 },
].map(item => ({ ...item, steps: item.steps || item.Tsteps || 0 })); // Fix typo and ensure steps is a number


const chartConfig = {
  steps: {
    label: "Steps",
    color: "var(--primary)", // Use primary color for steps
  },
} satisfies ChartConfig

export function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  // Default to 30 days view, or 7 days on mobile
  const [timeRange, setTimeRange] = React.useState(isMobile ? "7d" : "30d")

  React.useEffect(() => {
    // Adjust time range if mobile status changes after initial render
    setTimeRange(isMobile ? "7d" : "30d")
  }, [isMobile])

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30") // Keep reference date for mock data
    let daysToSubtract = 90 // Default to 90 days if timeRange is somehow invalid
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate && item.steps !== undefined // Ensure item has steps data
  })

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Daily Steps Trend</CardTitle> {/* Updated Title */}
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Your step count over the selected period. {/* Updated Description */}
          </span>
          <span className="@[540px]/card:hidden">Steps over time.</span> {/* Updated Description */}
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange} // Keep time range selection
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            {/* <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem> Optionally remove 90d */}
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select time range" // Updated aria-label
            >
              <SelectValue placeholder="Select time range" /> {/* Updated placeholder */}
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              {/* <SelectItem value="90d" className="rounded-lg">Last 3 months</SelectItem> */}
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          {/* Use BarChart instead of AreaChart */}
          <BarChart data={filteredData}>
            {/* Remove defs for gradient fill, not needed for basic bar */}
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32} // Keep existing XAxis formatting
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              defaultIndex={isMobile ? -1 : 10} // Keep default index logic
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => { // Keep label formatter
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                  formatter={(value) => `${value.toLocaleString()} steps`} // Format tooltip value
                />
              }
            />
            {/* Use Bar instead of Area */} 
            <Bar
              dataKey="steps" // Use 'steps' data key
              fill="var(--color-chart-2)" // Use direct fill color
              radius={2} // Optional: add slight rounding to bars
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
