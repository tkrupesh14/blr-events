import Link from "next/link"
import Image from "next/image"
import { CalendarDays, MapPin, Users } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Event } from "@/lib/types"

interface EventCardProps {
  event: Event
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={event.image || "/placeholder.svg"}
          alt={event.title}
          fill
          className="object-cover transition-transform hover:scale-105"
        />
        <div className="absolute top-2 right-2">
          <Badge variant={event.isFree ? "secondary" : "default"}>{event.isFree ? "Free" : `₹${event.price}`}</Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="font-bold line-clamp-1">{event.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>
          <div className="flex items-center text-xs text-muted-foreground">
            <CalendarDays className="mr-1 h-3 w-3" />
            {event.date}
          </div>
          <div className="flex items-center text-xs text-muted-foreground">
            <MapPin className="mr-1 h-3 w-3" />
            {event.location}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div className="flex items-center text-xs text-muted-foreground">
          <Users className="mr-1 h-3 w-3" />
          {event.attendees} attending
        </div>
        <Link href={`/events/${event.id}`}>
          <Button size="sm" variant="outline">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
