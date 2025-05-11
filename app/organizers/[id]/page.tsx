import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MapPin, Mail, Globe, Phone } from "lucide-react"
import MainNav from "@/components/main-nav"
import EventCard from "@/components/event-card"
import { sampleEvents, sampleUsers } from "@/lib/sample-data"
import { getUser } from "@/lib/auth"
import UserAuthButton from "@/components/user-auth-button"

export default function OrganizerDetailPage({ params }: { params: { id: string } }) {
  const user = getUser()

  // Find the organizer by ID
  const organizer = sampleUsers.find((user) => user.id === params.id && user.role === "organizer")

  // If organizer not found, we could handle this better in a real app
  if (!organizer) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background">
        <h1 className="text-2xl font-bold">Organizer not found</h1>
        <p className="text-muted-foreground mt-2">The organizer you're looking for doesn't exist.</p>
        <Button className="mt-4" asChild>
          <Link href="/organizers">Back to Organizers</Link>
        </Button>
      </div>
    )
  }

  // Get events organized by this organizer
  const organizerEvents = sampleEvents.filter((event) => event.organizerId === organizer.id)

  // Split events into upcoming and past
  const currentDate = new Date()
  const upcomingEvents = organizerEvents.filter((event) => new Date(event.date) >= currentDate)
  const pastEvents = organizerEvents.filter((event) => new Date(event.date) < currentDate)

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav />
          <UserAuthButton user={user} />
        </div>
      </header>
      <main className="flex-1">
        <div className="container px-4 py-8 md:px-6 md:py-12">
          <Link
            href="/organizers"
            className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-4 w-4"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back to Organizers
          </Link>

          <div className="grid gap-8 md:grid-cols-[300px_1fr]">
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative h-32 w-32 overflow-hidden rounded-full">
                      <Image
                        src={organizer.profileImage || "/placeholder.svg?height=128&width=128"}
                        alt={organizer.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="space-y-1 text-center">
                      <h2 className="text-2xl font-bold">{organizer.organizationName || organizer.name}</h2>
                      <p className="text-sm text-muted-foreground">{organizer.email}</p>
                      <Badge className="mt-2">Event Organizer</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-medium">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">{organizer.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">+91 98765 43210</span>
                    </div>
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">www.example.com</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">Bengaluru, Karnataka</span>
                    </div>
                  </div>
                  <Button className="w-full" variant="outline">
                    Contact Organizer
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-medium mb-2">About</h3>
                  <p className="text-sm text-muted-foreground">
                    {organizer.organizationDescription ||
                      "A leading tech event organizer in Bengaluru, specializing in creating meaningful connections and knowledge sharing opportunities for the tech community."}
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{organizer.organizationName || organizer.name}</CardTitle>
                  <CardDescription>Events organized by {organizer.organizationName || organizer.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="upcoming" className="w-full">
                    <TabsList className="w-full grid grid-cols-2">
                      <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
                      <TabsTrigger value="past">Past Events</TabsTrigger>
                    </TabsList>
                    <TabsContent value="upcoming" className="pt-4">
                      {upcomingEvents.length > 0 ? (
                        <div className="grid gap-4 sm:grid-cols-2">
                          {upcomingEvents.map((event) => (
                            <EventCard key={event.id} event={event} />
                          ))}
                        </div>
                      ) : (
                        <div className="rounded-lg border border-dashed p-8 text-center">
                          <h4 className="font-medium">No upcoming events</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            This organizer doesn't have any upcoming events at the moment.
                          </p>
                          <Button className="mt-4" asChild>
                            <Link href="/events">Explore Other Events</Link>
                          </Button>
                        </div>
                      )}
                    </TabsContent>
                    <TabsContent value="past" className="pt-4">
                      {pastEvents.length > 0 ? (
                        <div className="grid gap-4 sm:grid-cols-2">
                          {pastEvents.map((event) => (
                            <EventCard key={event.id} event={event} />
                          ))}
                        </div>
                      ) : (
                        <div className="rounded-lg border border-dashed p-8 text-center">
                          <h4 className="font-medium">No past events</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            This organizer hasn't hosted any events in the past.
                          </p>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Reviews & Ratings</CardTitle>
                  <CardDescription>
                    What attendees say about events by {organizer.organizationName || organizer.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="relative h-10 w-10 overflow-hidden rounded-full mr-3">
                          <Image src="/user-profile-1.png" alt="User" fill className="object-cover" />
                        </div>
                        <div>
                          <p className="font-medium">Priya Sharma</p>
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <svg
                                key={star}
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill={star <= 5 ? "currentColor" : "none"}
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-yellow-500"
                              >
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                              </svg>
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">2 weeks ago</span>
                    </div>
                    <p className="text-sm">
                      "The AI & Machine Learning Workshop was incredibly well-organized. The speakers were knowledgeable
                      and the hands-on sessions were very helpful. Looking forward to more events!"
                    </p>
                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="relative h-10 w-10 overflow-hidden rounded-full mr-3">
                            <Image src="/user-profile-2.png" alt="User" fill className="object-cover" />
                          </div>
                          <div>
                            <p className="font-medium">Rahul Mehta</p>
                            <div className="flex items-center">
                              {[1, 2, 3, 4].map((star) => (
                                <svg
                                  key={star}
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="text-yellow-500"
                                >
                                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                </svg>
                              ))}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-yellow-500"
                              >
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">1 month ago</span>
                      </div>
                      <p className="text-sm mt-2">
                        "Great networking opportunity at the Web Development Meetup. The venue was perfect and the
                        discussions were insightful. Would recommend their events to anyone in the tech industry."
                      </p>
                    </div>
                  </div>
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
