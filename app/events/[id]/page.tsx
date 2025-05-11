import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, Clock, MapPin, Share2, Users, Calendar, Building, ExternalLink } from "lucide-react"
import MainNav from "@/components/main-nav"
import { sampleEvents } from "@/lib/sample-data"

export default function EventPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the event by ID from a database
  const event = sampleEvents.find((e) => e.id === params.id) || sampleEvents[0]

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav />
          
        </div>
      </header>
      <main className="flex-1">
        <div className="relative h-[300px] w-full overflow-hidden md:h-[400px]">
          <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        </div>

        <div className="container px-4 md:px-6 -mt-20 relative z-10">
          <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-purple-600">{event.category}</Badge>
                  <Badge variant={event.isFree ? "secondary" : "default"}>
                    {event.isFree ? "Free" : `₹${event.price}`}
                  </Badge>
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{event.title}</h1>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <CalendarDays className="mr-2 h-4 w-4" />
                    {event.date}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="mr-2 h-4 w-4" />
                    {event.time}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="mr-2 h-4 w-4" />
                    {event.location}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Users className="mr-2 h-4 w-4" />
                    {event.attendees} attending
                  </div>
                </div>
              </div>

              <Tabs defaultValue="about" className="w-full">
                <TabsList className="w-full justify-start border-b rounded-none h-auto p-0">
                  <TabsTrigger
                    value="about"
                    className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
                  >
                    About
                  </TabsTrigger>
                  <TabsTrigger
                    value="schedule"
                    className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
                  >
                    Schedule
                  </TabsTrigger>
                  <TabsTrigger
                    value="speakers"
                    className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
                  >
                    Speakers
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="about" className="pt-6">
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold">About This Event</h2>
                    <p className="text-muted-foreground">{event.description}</p>
                    <p className="text-muted-foreground">
                      Join us for an exciting tech event where industry experts will share insights on the latest
                      technologies and trends. Network with like-minded professionals and enhance your knowledge in a
                      collaborative environment.
                    </p>
                    <h3 className="text-lg font-bold mt-6">What You'll Learn</h3>
                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                      <li>Latest trends in technology and their practical applications</li>
                      <li>Hands-on experience with cutting-edge tools and frameworks</li>
                      <li>Best practices for implementing new technologies in your projects</li>
                      <li>Networking opportunities with industry leaders and peers</li>
                    </ul>
                  </div>
                </TabsContent>
                <TabsContent value="schedule" className="pt-6">
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold">Event Schedule</h2>
                    <div className="space-y-4">
                      <div className="border-l-2 border-muted pl-4 py-2">
                        <p className="text-sm text-muted-foreground">09:00 AM - 09:30 AM</p>
                        <h3 className="font-medium">Registration & Networking</h3>
                      </div>
                      <div className="border-l-2 border-muted pl-4 py-2">
                        <p className="text-sm text-muted-foreground">09:30 AM - 10:30 AM</p>
                        <h3 className="font-medium">Keynote: Future of Tech in Bengaluru</h3>
                        <p className="text-sm text-muted-foreground">By Priya Sharma, CTO at TechInnovate</p>
                      </div>
                      <div className="border-l-2 border-muted pl-4 py-2">
                        <p className="text-sm text-muted-foreground">10:30 AM - 11:30 AM</p>
                        <h3 className="font-medium">Panel Discussion: Emerging Technologies</h3>
                        <p className="text-sm text-muted-foreground">
                          Industry experts discuss AI, Blockchain, and Cloud
                        </p>
                      </div>
                      <div className="border-l-2 border-muted pl-4 py-2">
                        <p className="text-sm text-muted-foreground">11:30 AM - 12:30 PM</p>
                        <h3 className="font-medium">Workshop: Hands-on with Latest Tools</h3>
                        <p className="text-sm text-muted-foreground">
                          Interactive session with practical demonstrations
                        </p>
                      </div>
                      <div className="border-l-2 border-muted pl-4 py-2">
                        <p className="text-sm text-muted-foreground">12:30 PM - 01:30 PM</p>
                        <h3 className="font-medium">Lunch & Networking</h3>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="speakers" className="pt-6">
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold">Speakers</h2>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      <Card>
                        <CardContent className="p-4 flex flex-col items-center text-center">
                          <div className="relative h-24 w-24 rounded-full overflow-hidden mb-4">
                            <Image src="/diverse-group.png" alt="Speaker" fill className="object-cover" />
                          </div>
                          <h3 className="font-bold">Priya Sharma</h3>
                          <p className="text-sm text-muted-foreground">CTO, TechInnovate</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 flex flex-col items-center text-center">
                          <div className="relative h-24 w-24 rounded-full overflow-hidden mb-4">
                            <Image src="/diverse-group-conversation.png" alt="Speaker" fill className="object-cover" />
                          </div>
                          <h3 className="font-bold">Rahul Mehta</h3>
                          <p className="text-sm text-muted-foreground">AI Research Lead, DataTech</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 flex flex-col items-center text-center">
                          <div className="relative h-24 w-24 rounded-full overflow-hidden mb-4">
                            <Image src="/diverse-group-meeting.png" alt="Speaker" fill className="object-cover" />
                          </div>
                          <h3 className="font-bold">Aisha Khan</h3>
                          <p className="text-sm text-muted-foreground">Founder, CloudScale</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold">Register for this Event</h2>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Price</span>
                      <span className="font-bold">{event.isFree ? "Free" : `₹${event.price}`}</span>
                    </div>
                    <Button className="w-full">Register Now</Button>
                    <Button variant="outline" className="w-full flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Add to Calendar
                    </Button>
                    <Button variant="outline" className="w-full flex items-center gap-2">
                      <Share2 className="h-4 w-4" />
                      Share Event
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold">Organizer</h2>
                    <div className="flex items-center gap-4">
                      <div className="relative h-12 w-12 rounded-full overflow-hidden">
                        <Image src="/abstract-logo.png" alt="Organizer" fill className="object-cover" />
                      </div>
                      <div>
                        <h3 className="font-bold">TechConnect Bengaluru</h3>
                        <p className="text-sm text-muted-foreground">Event Organizer</p>
                      </div>
                    </div>
                    <div className="pt-2">
                      <Link
                        href="/organizers/techconnect"
                        className="text-sm text-primary hover:underline flex items-center gap-1"
                      >
                        <ExternalLink className="h-3 w-3" />
                        View organizer profile
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold">Venue</h2>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <span>Tech Hub, 4th Floor, Koramangala</span>
                    </div>
                    <div className="relative h-[150px] w-full rounded-md overflow-hidden">
                      <Image src="/bengaluru-map.png" alt="Map" fill className="object-cover" />
                    </div>
                    <Button variant="outline" className="w-full">
                      Get Directions
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <footer className="border-t py-6 md:py-0 mt-16">
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
