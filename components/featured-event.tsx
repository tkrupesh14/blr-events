import Image from "next/image"
import Link from "next/link"
import { CalendarDays, Clock, MapPin, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Event } from "@/lib/types"

interface FeaturedEventProps {
  event: Event
}

export default function FeaturedEvent({ event }: FeaturedEventProps) {
  return (
    <Card className="overflow-hidden border-purple-500/20">
      <div className="relative aspect-video overflow-hidden">
        <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/20" />
        <div className="absolute top-2 left-2">
          <Badge className="bg-purple-600">Featured</Badge>
        </div>
        <div className="absolute top-2 right-2">
          <Badge variant={event.isFree ? "secondary" : "default"}>{event.isFree ? "Free" : `₹${event.price}`}</Badge>
        </div>
      </div>
      <CardContent className="p-6">
        <div className="space-y-4">
          <h3 className="text-2xl font-bold">{event.title}</h3>
          <p className="text-muted-foreground">{event.description}</p>
          <div className="grid grid-cols-2 gap-2 text-sm">
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
          <div className="flex gap-2">
            <Link href={`/events/${event.id}`} className="flex-1">
              <Button className="w-full">Register Now</Button>
            </Link>
            <Link href={`/events/${event.id}`}>
              <Button variant="outline">Learn More</Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
