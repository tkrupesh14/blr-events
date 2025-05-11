import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays } from "lucide-react"
import MainNav from "@/components/main-nav"
import { sampleUsers } from "@/lib/sample-data"
import { getUser } from "@/lib/auth"
import UserAuthButton from "@/components/user-auth-button"

export default function OrganizersPage() {
  const user = getUser()

  // Filter only organizers from sample users
  const organizers = sampleUsers.filter((user) => user.role === "organizer")

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav />
          <UserAuthButton user={user} />
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tighter">Event Organizers</h1>
                <p className="text-muted-foreground">Discover the best tech event organizers in Bengaluru</p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {organizers.map((organizer) => (
                  <Link href={`/organizers/${organizer.id}`} key={organizer.id}>
                    <Card className="overflow-hidden transition-all hover:shadow-lg h-full">
                      <CardContent className="p-6">
                        <div className="flex flex-col items-center text-center space-y-4">
                          <div className="relative h-24 w-24 overflow-hidden rounded-full">
                            <Image
                              src={organizer.profileImage || "/placeholder.svg?height=96&width=96"}
                              alt={organizer.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-bold text-xl">{organizer.organizationName || organizer.name}</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              {organizer.organizationDescription || "Tech event organizer in Bengaluru"}
                            </p>
                          </div>
                          <div className="flex items-center justify-center">
                            <CalendarDays className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              {
                                sampleUsers
                                  .filter((user) => user.id === organizer.id)
                                  .flatMap((user) => user.registeredEvents || []).length
                              }{" "}
                              events
                            </span>
                          </div>
                          <Badge variant="secondary">View Events</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
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
