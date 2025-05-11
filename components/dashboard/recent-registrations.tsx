import Image from "next/image"
import { Badge } from "@/components/ui/badge"

export function RecentRegistrations() {
  const registrations = [
    {
      id: "reg1",
      name: "Priya Sharma",
      email: "priya@example.com",
      event: "AI & Machine Learning Workshop",
      time: "2 hours ago",
      image: "/user-profile-1.png",
    },
    {
      id: "reg2",
      name: "Rahul Mehta",
      email: "rahul@example.com",
      event: "Web Development Meetup",
      time: "5 hours ago",
      image: "/user-profile-2.png",
    },
    {
      id: "reg3",
      name: "Aisha Khan",
      email: "aisha@example.com",
      event: "Blockchain & Crypto Conference",
      time: "1 day ago",
      image: "/diverse-group-meeting.png",
    },
  ]

  return (
    <div className="space-y-4">
      {registrations.map((registration) => (
        <div key={registration.id} className="rounded-lg border p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative h-10 w-10 overflow-hidden rounded-full">
              <Image
                src={registration.image || "/placeholder.svg"}
                alt={registration.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-medium">{registration.name}</p>
              <p className="text-sm text-muted-foreground">{registration.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge>{registration.event}</Badge>
            <p className="text-sm text-muted-foreground">{registration.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
