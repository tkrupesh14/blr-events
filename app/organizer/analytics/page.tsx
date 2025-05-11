import { requireOrganizer } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Calendar } from "lucide-react"
import OrganizerLayout from "@/components/layouts/organizer-layout"
import { sampleEvents } from "@/lib/sample-data"
import { LineChart } from "@/components/charts/line-chart"
import { BarChart } from "@/components/charts/bar-chart"
import { DonutChart } from "@/components/charts/donut-chart"
import { AreaChart } from "@/components/charts/area-chart"

export default function OrganizerAnalyticsPage() {
  const user = requireOrganizer()

  // Get events the user has organized
  const organizedEvents = sampleEvents.filter((event) => event.organizerId === user.id)

  // Calculate some stats
  const totalAttendees = organizedEvents.reduce((sum, event) => sum + event.attendees, 0)
  const totalRevenue = organizedEvents.reduce(
    (sum, event) => sum + (event.isFree ? 0 : event.price * event.attendees),
    0,
  )
  const averageAttendees = Math.round(totalAttendees / (organizedEvents.length || 1))

  return (
    <OrganizerLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
            <p className="text-muted-foreground">Detailed insights about your events and attendees</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Last 30 Days
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <h3 className="text-2xl font-bold">₹{totalRevenue.toLocaleString()}</h3>
                <p className="text-xs text-green-500">+12% from last month</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium text-muted-foreground">Total Attendees</p>
                <h3 className="text-2xl font-bold">{totalAttendees}</h3>
                <p className="text-xs text-green-500">+15% from last month</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium text-muted-foreground">Average Attendees</p>
                <h3 className="text-2xl font-bold">{averageAttendees}</h3>
                <p className="text-xs text-green-500">+5% from last month</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium text-muted-foreground">Conversion Rate</p>
                <h3 className="text-2xl font-bold">24.8%</h3>
                <p className="text-xs text-green-500">+3.2% from last month</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="w-full grid grid-cols-4 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="attendees">Attendees</TabsTrigger>
            <TabsTrigger value="marketing">Marketing</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Overview</CardTitle>
                  <CardDescription>Monthly revenue from your events</CardDescription>
                </CardHeader>
                <CardContent>
                  <LineChart />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Attendance by Event Type</CardTitle>
                  <CardDescription>Distribution of attendees across event categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <DonutChart />
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Registration Trends</CardTitle>
                  <CardDescription>Daily registration activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <AreaChart />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Attendee Demographics</CardTitle>
                  <CardDescription>Age distribution of your event attendees</CardDescription>
                </CardHeader>
                <CardContent>
                  <BarChart />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="revenue" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="lg:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Revenue by Event</CardTitle>
                    <CardDescription>Breakdown of revenue across your events</CardDescription>
                  </div>
                  <Select defaultValue="6months">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30days">Last 30 days</SelectItem>
                      <SelectItem value="3months">Last 3 months</SelectItem>
                      <SelectItem value="6months">Last 6 months</SelectItem>
                      <SelectItem value="year">Last year</SelectItem>
                    </SelectContent>
                  </Select>
                </CardHeader>
                <CardContent>
                  <BarChart />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Sources</CardTitle>
                  <CardDescription>Breakdown by ticket type</CardDescription>
                </CardHeader>
                <CardContent>
                  <DonutChart />
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trends</CardTitle>
                <CardDescription>Monthly revenue growth over time</CardDescription>
              </CardHeader>
              <CardContent>
                <LineChart />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="attendees" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Attendance Trends</CardTitle>
                  <CardDescription>Monthly attendance across all events</CardDescription>
                </CardHeader>
                <CardContent>
                  <AreaChart />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Attendee Demographics</CardTitle>
                  <CardDescription>Breakdown by age group</CardDescription>
                </CardHeader>
                <CardContent>
                  <DonutChart />
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Registration Timeline</CardTitle>
                  <CardDescription>When attendees register for events</CardDescription>
                </CardHeader>
                <CardContent>
                  <LineChart />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Attendance by Location</CardTitle>
                  <CardDescription>Geographic distribution of attendees</CardDescription>
                </CardHeader>
                <CardContent>
                  <BarChart />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="marketing" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Marketing Channel Performance</CardTitle>
                  <CardDescription>Registrations by marketing channel</CardDescription>
                </CardHeader>
                <CardContent>
                  <BarChart />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Traffic Sources</CardTitle>
                  <CardDescription>Where your visitors come from</CardDescription>
                </CardHeader>
                <CardContent>
                  <DonutChart />
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Conversion Rates</CardTitle>
                  <CardDescription>Visitor to registration conversion</CardDescription>
                </CardHeader>
                <CardContent>
                  <LineChart />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Email Campaign Performance</CardTitle>
                  <CardDescription>Open, click, and conversion rates</CardDescription>
                </CardHeader>
                <CardContent>
                  <AreaChart />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </OrganizerLayout>
  )
}
