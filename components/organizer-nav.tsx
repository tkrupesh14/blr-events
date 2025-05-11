import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, CalendarDays, Users, BarChart3, Settings, MessageSquare, HelpCircle } from "lucide-react"

export default function OrganizerNav() {
  return (
    <aside className="flex flex-col gap-2">
      <Button variant="ghost" className="justify-start" asChild>
        <Link href="/organizer/dashboard">
          <LayoutDashboard className="mr-2 h-4 w-4" />
          Dashboard
        </Link>
      </Button>
      <Button variant="ghost" className="justify-start" asChild>
        <Link href="/organizer/events">
          <CalendarDays className="mr-2 h-4 w-4" />
          Events
        </Link>
      </Button>
      <Button variant="ghost" className="justify-start" asChild>
        <Link href="/organizer/attendees">
          <Users className="mr-2 h-4 w-4" />
          Attendees
        </Link>
      </Button>
      <Button variant="ghost" className="justify-start" asChild>
        <Link href="/organizer/analytics">
          <BarChart3 className="mr-2 h-4 w-4" />
          Analytics
        </Link>
      </Button>
      <Button variant="ghost" className="justify-start" asChild>
        <Link href="/organizer/messages">
          <MessageSquare className="mr-2 h-4 w-4" />
          Messages
        </Link>
      </Button>
      <Button variant="ghost" className="justify-start" asChild>
        <Link href="/organizer/settings">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Link>
      </Button>
      <Button variant="ghost" className="justify-start" asChild>
        <Link href="/organizer/help">
          <HelpCircle className="mr-2 h-4 w-4" />
          Help & Support
        </Link>
      </Button>
    </aside>
  )
}
