import Link from "next/link"
import Image from "next/image"
import type { ReactNode } from "react"
import { requireOrganizer } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import {
  CalendarClock,
  LayoutDashboard,
  CalendarDays,
  Users,
  BarChart3,
  Settings,
  MessageSquare,
  HelpCircle,
  LogOut,
} from "lucide-react"
import { logout } from "@/lib/auth"

export default function OrganizerLayout({ children }: { children: ReactNode }) {
  const user = requireOrganizer()

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 px-2">
              <CalendarClock className="h-6 w-6 text-purple-500" />
              <span className="font-bold">BengaluruTechEvents</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/organizer/dashboard">
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/organizer/events">
                    <CalendarDays className="h-4 w-4" />
                    <span>Events</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/organizer/attendees">
                    <Users className="h-4 w-4" />
                    <span>Attendees</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/organizer/analytics">
                    <BarChart3 className="h-4 w-4" />
                    <span>Analytics</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/organizer/messages">
                    <MessageSquare className="h-4 w-4" />
                    <span>Messages</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
            <SidebarSeparator />
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/organizer/settings">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/organizer/help">
                    <HelpCircle className="h-4 w-4" />
                    <span>Help & Support</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <div className="px-3 py-2">
              <div className="flex items-center gap-3 mb-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-full">
                  <Image
                    src={user.profileImage || "/placeholder.svg?height=40&width=40"}
                    alt={user.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm font-medium truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                </div>
              </div>
              <form action={logout}>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </Button>
              </form>
            </div>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1 overflow-auto">
          <div className="container py-6 md:py-8 lg:py-10">{children}</div>
        </div>
      </div>
    </SidebarProvider>
  )
}
