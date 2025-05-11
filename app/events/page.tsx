import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Filter, Search } from "lucide-react"
import EventCard from "@/components/event-card"
import MainNav from "@/components/main-nav"
import { sampleEvents } from "@/lib/sample-data"

export default function EventsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav />
          
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tighter">All Events</h1>
                <p className="text-muted-foreground">Browse and discover tech events happening in Bengaluru</p>
              </div>

              <div className="flex flex-col gap-4 md:flex-row md:items-end">
                <div className="grid gap-2 flex-1">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search events..." className="w-full bg-background pl-8" />
                  </div>
                </div>
                <div className="grid gap-2 md:w-[200px]">
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="webdev">Web Development</SelectItem>
                      <SelectItem value="ai">AI & Machine Learning</SelectItem>
                      <SelectItem value="mobile">Mobile Development</SelectItem>
                      <SelectItem value="cloud">Cloud Computing</SelectItem>
                      <SelectItem value="blockchain">Blockchain</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2 md:w-[200px]">
                  <Button variant="outline" className="flex gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Date</span>
                  </Button>
                </div>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Filter className="h-4 w-4" />
                  <span className="sr-only">Filter</span>
                </Button>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {sampleEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>

              <div className="flex justify-center mt-8">
                <Button variant="outline" className="mx-2">
                  Previous
                </Button>
                <Button variant="outline" className="mx-2">
                  1
                </Button>
                <Button className="mx-2">2</Button>
                <Button variant="outline" className="mx-2">
                  3
                </Button>
                <Button variant="outline" className="mx-2">
                  Next
                </Button>
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
