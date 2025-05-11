import { redirect } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { getUser, logout } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, LogOut, Settings, User } from "lucide-react"
import MainNav from "@/components/main-nav"
import EventCard from "@/components/event-card"
import { sampleEvents } from "@/lib/sample-data"

export default function ProfilePage() {
  const user = getUser()

  if (!user) {
    redirect("/login")
  }

  // Get events the user has registered for
  const registeredEvents = user.registeredEvents
    ? sampleEvents.filter((event) => user.registeredEvents.includes(event.id))
    : []

  // Get events the user has organized (if they're an organizer)
  const organizedEvents = user.role === "organizer" ? sampleEvents.filter((event) => event.organizerId === user.id) : []

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav />
          <div className="flex items-center gap-4">
            <form action={logout}>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </form>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container px-4 py-8 md:px-6 md:py-12">
          <div className="grid gap-8 md:grid-cols-[300px_1fr]">
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative h-24 w-24 overflow-hidden rounded-full">
                      <Image
                        src={user.profileImage || "/placeholder.svg?height=96&width=96"}
                        alt={user.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="space-y-1 text-center">
                      <h2 className="text-xl font-bold">{user.name}</h2>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                      <Badge variant={user.role === "organizer" ? "default" : "secondary"} className="mt-2">
                        {user.role === "organizer" ? "Event Organizer" : "Attendee"}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <nav className="flex flex-col space-y-1">
                    <Button variant="ghost" className="justify-start" asChild>
                      <Link href="/profile">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </Button>
                    <Button variant="ghost" className="justify-start" asChild>
                      <Link href="/profile/events">
                        <CalendarDays className="mr-2 h-4 w-4" />
                        My Events
                      </Link>
                    </Button>
                    <Button variant="ghost" className="justify-start" asChild>
                      <Link href="/profile/settings">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Link>
                    </Button>
                  </nav>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Overview</CardTitle>
                  <CardDescription>Manage your profile and events</CardDescription>
                </CardHeader>
                <CardContent>
                  {user.role === "organizer" && user.organizationName && (
                    <div className="mb-6 space-y-2">
                      <h3 className="text-lg font-medium">Organization Details</h3>
                      <div className="rounded-lg border p-4">
                        <h4 className="font-medium">{user.organizationName}</h4>
                        <p className="text-sm text-muted-foreground">{user.organizationDescription}</p>
                      </div>
                    </div>
                  )}

                  <Tabs defaultValue="events" className="w-full">
                    <TabsList className="w-full grid grid-cols-2">
                      <TabsTrigger value="events">
                        {user.role === "organizer" ? "My Events" : "Registered Events"}
                      </TabsTrigger>
                      {user.role === "organizer" ? (
                        <TabsTrigger value="analytics">Analytics</TabsTrigger>
                      ) : (
                        <TabsTrigger value="interests">Interests</TabsTrigger>
                      )}
                    </TabsList>
                    <TabsContent value="events" className="space-y-4">
                      <div className="pt-4">
                        {user.role === "organizer" ? (
                          <>
                            <div className="flex items-center justify-between mb-4">
                              <h3 className="text-lg font-medium">Events You're Organizing</h3>
                              <Button asChild>
                                <Link href="/submit-event">Create New Event</Link>
                              </Button>
                            </div>
                            {organizedEvents.length > 0 ? (
                              <div className="grid gap-4 sm:grid-cols-2">
                                {organizedEvents.map((event) => (
                                  <EventCard key={event.id} event={event} />
                                ))}
                              </div>
                            ) : (
                              <div className="rounded-lg border border-dashed p-8 text-center">
                                <h4 className="font-medium">No events yet</h4>
                                <p className="text-sm text-muted-foreground mt-1">
                                  Start creating your first event to reach tech enthusiasts in Bengaluru.
                                </p>
                                <Button className="mt-4" asChild>
                                  <Link href="/submit-event">Create Event</Link>
                                </Button>
                              </div>
                            )}
                          </>
                        ) : (
                          <>
                            <h3 className="text-lg font-medium mb-4">Events You're Attending</h3>
                            {registeredEvents.length > 0 ? (
                              <div className="grid gap-4 sm:grid-cols-2">
                                {registeredEvents.map((event) => (
                                  <EventCard key={event.id} event={event} />
                                ))}
                              </div>
                            ) : (
                              <div className="rounded-lg border border-dashed p-8 text-center">
                                <h4 className="font-medium">No registered events</h4>
                                <p className="text-sm text-muted-foreground mt-1">
                                  Browse and register for tech events in Bengaluru.
                                </p>
                                <Button className="mt-4" asChild>
                                  <Link href="/events">Explore Events</Link>
                                </Button>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </TabsContent>
                    <TabsContent value="analytics" className="space-y-4">
                      {user.role === "organizer" && (
                        <div className="pt-4">
                          <h3 className="text-lg font-medium mb-4">Event Analytics</h3>
                          <div className="grid gap-4 sm:grid-cols-3">
                            <Card>
                              <CardContent className="p-6">
                                <div className="text-center">
                                  <p className="text-sm font-medium text-muted-foreground">Total Events</p>
                                  <h4 className="text-3xl font-bold mt-1">{organizedEvents.length}</h4>
                                </div>
                              </CardContent>
                            </Card>
                            <Card>
                              <CardContent className="p-6">
                                <div className="text-center">
                                  <p className="text-sm font-medium text-muted-foreground">Total Attendees</p>
                                  <h4 className="text-3xl font-bold mt-1">
                                    {organizedEvents.reduce((sum, event) => sum + event.attendees, 0)}
                                  </h4>
                                </div>
                              </CardContent>
                            </Card>
                            <Card>
                              <CardContent className="p-6">
                                <div className="text-center">
                                  <p className="text-sm font-medium text-muted-foreground">Upcoming Events</p>
                                  <h4 className="text-3xl font-bold mt-1">
                                    {organizedEvents.filter((event) => new Date(event.date) > new Date()).length}
                                  </h4>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        </div>
                      )}
                    </TabsContent>
                    <TabsContent value="interests" className="space-y-4">
                      {user.role === "attendee" && (
                        <div className="pt-4">
                          <h3 className="text-lg font-medium mb-4">Your Interests</h3>
                          <div className="flex flex-wrap gap-2">
                            <Badge>Web Development</Badge>
                            <Badge>AI & Machine Learning</Badge>
                            <Badge>Cloud Computing</Badge>
                            <Badge>Mobile Development</Badge>
                          </div>
                          <div className="mt-6">
                            <h4 className="font-medium mb-2">Recommended Events</h4>
                            <div className="grid gap-4 sm:grid-cols-2">
                              {sampleEvents.slice(0, 2).map((event) => (
                                <EventCard key={event.id} event={event} />
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 Bengaluru Tech Events. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/about" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              About
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Contact
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
