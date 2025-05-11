import Link from "next/link"
import { requireOrganizer } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, Users, DollarSign, TrendingUp, Plus, ArrowUpRight } from "lucide-react"
import EventCard from "@/components/event-card"
import { sampleEvents } from "@/lib/sample-data"
import OrganizerLayout from "@/components/layouts/organizer-layout"
import { BarChart } from "@/components/charts/bar-chart"
import { LineChart } from "@/components/charts/line-chart"
import { DonutChart } from "@/components/charts/donut-chart"
import { RecentRegistrations } from "@/components/dashboard/recent-registrations"

export default function OrganizerDashboardPage() {
  const user = requireOrganizer()

  // Get events the user has organized
  const organizedEvents = sampleEvents.filter((event) => event.organizerId === user.id)

  // Calculate some stats
  const totalAttendees = organizedEvents.reduce((sum, event) => sum + event.attendees, 0)
  const totalRevenue = organizedEvents.reduce(
    (sum, event) => sum + (event.isFree ? 0 : event.price * event.attendees),
    0,
  )
  const upcomingEvents = organizedEvents.filter((event) => new Date(event.date) > new Date())

  return (
    <OrganizerLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user.name}!</p>
          </div>
          <Button asChild>
            <Link href="/organizer/events/create">
              <Plus className="mr-2 h-4 w-4" /> Create Event
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Events</p>
                  <h3 className="text-2xl font-bold mt-1">{organizedEvents.length}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="text-green-500">+2</span> from last month
                  </p>
                </div>
                <div className="rounded-full bg-primary/10 p-3">
                  <CalendarDays className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Attendees</p>
                  <h3 className="text-2xl font-bold mt-1">{totalAttendees}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="text-green-500">+15%</span> from last month
                  </p>
                </div>
                <div className="rounded-full bg-primary/10 p-3">
                  <Users className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                  <h3 className="text-2xl font-bold mt-1">₹{totalRevenue.toLocaleString()}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="text-green-500">+12%</span> from last month
                  </p>
                </div>
                <div className="rounded-full bg-primary/10 p-3">
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Upcoming Events</p>
                  <h3 className="text-2xl font-bold mt-1">{upcomingEvents.length}</h3>
                  <p className="text-xs text-muted-foreground mt-1">Next event in 5 days</p>
                </div>
                <div className="rounded-full bg-primary/10 p-3">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          <Card className="lg:col-span-4">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>Monthly revenue from your events</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  Monthly
                </Button>
                <Button variant="outline" size="sm">
                  Yearly
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <LineChart />
            </CardContent>
          </Card>
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Attendance by Event Type</CardTitle>
              <CardDescription>Distribution of attendees across event categories</CardDescription>
            </CardHeader>
            <CardContent>
              <DonutChart />
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle>Recent Registrations</CardTitle>
              <CardDescription>Latest attendees for your events</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentRegistrations />
            </CardContent>
          </Card>
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Attendee Demographics</CardTitle>
              <CardDescription>Age distribution of your event attendees</CardDescription>
            </CardHeader>
            <CardContent>
              <BarChart />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Your Events</CardTitle>
              <CardDescription>Manage and monitor your tech events</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/organizer/events">
                View All <ArrowUpRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="upcoming" className="w-full">
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="past">Past</TabsTrigger>
                <TabsTrigger value="draft">Drafts</TabsTrigger>
              </TabsList>
              <TabsContent value="upcoming" className="pt-4">
                {upcomingEvents.length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {upcomingEvents.slice(0, 3).map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>
                ) : (
                  <div className="rounded-lg border border-dashed p-8 text-center">
                    <h4 className="font-medium">No upcoming events</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Start creating your first event to reach tech enthusiasts in Bengaluru.
                    </p>
                    <Button className="mt-4" asChild>
                      <Link href="/organizer/events/create">Create Event</Link>
                    </Button>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="past" className="pt-4">
                {organizedEvents.filter((event) => new Date(event.date) <= new Date()).length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {organizedEvents
                      .filter((event) => new Date(event.date) <= new Date())
                      .slice(0, 3)
                      .map((event) => (
                        <EventCard key={event.id} event={event} />
                      ))}
                  </div>
                ) : (
                  <div className="rounded-lg border border-dashed p-8 text-center">
                    <h4 className="font-medium">No past events</h4>
                    <p className="text-sm text-muted-foreground mt-1">Your completed events will appear here.</p>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="draft" className="pt-4">
                <div className="rounded-lg border border-dashed p-8 text-center">
                  <h4 className="font-medium">No draft events</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Save events as drafts to continue editing them later.
                  </p>
                  <Button className="mt-4" asChild>
                    <Link href="/organizer/events/create">Create Event</Link>
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </OrganizerLayout>
  )
}
