import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, MapPin, Search, TrendingUp } from "lucide-react"
import EventCard from "@/components/event-card"
import MainNav from "@/components/main-nav"
import FeaturedEvent from "@/components/featured-event"
import { sampleEvents } from "@/lib/sample-data"

export default function Home() {
  const featuredEvent = sampleEvents[0]
  const upcomingEvents = sampleEvents.slice(1, 5)
  const trendingEvents = [...sampleEvents].sort(() => 0.5 - Math.random()).slice(0, 4)

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav />
          
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-background/80">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500">
                    Discover Tech Events in Bengaluru
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Find the best tech meetups, conferences, and workshops happening in the Silicon Valley of India.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search events..."
                      className="w-full bg-background pl-8 rounded-lg border border-input"
                    />
                  </div>
                  <Button type="submit">Search</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">
                    <CalendarDays className="mr-2 h-4 w-4" />
                    This Weekend
                  </Button>
                  <Button variant="outline" size="sm">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Trending
                  </Button>
                  <Button variant="outline" size="sm">
                    <MapPin className="mr-2 h-4 w-4" />
                    Near Me
                  </Button>
                </div>
              </div>
              <FeaturedEvent event={featuredEvent} />
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <Tabs defaultValue="upcoming" className="w-full">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tighter">Explore Events</h2>
                <TabsList>
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="trending">Trending</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="upcoming" className="mt-6">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {upcomingEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="trending" className="mt-6">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {trendingEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
            <div className="mt-12 text-center">
              <Link href="/events">
                <Button size="lg">View All Events</Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Stay Updated</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Subscribe to receive updates about the latest tech events in Bengaluru
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input type="email" placeholder="Enter your email" className="max-w-lg flex-1 bg-background" />
                  <Button type="submit">Subscribe</Button>
                </form>
                <p className="text-xs text-muted-foreground">
                  By subscribing, you agree to our terms and privacy policy.
                </p>
              </div>
            </div>
          </div>
        </section>
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
