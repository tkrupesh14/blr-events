"use client"

import { requireOrganizer } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, ArrowUpDown, MoreHorizontal, Mail, Download } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import OrganizerLayout from "@/components/layouts/organizer-layout"
import { sampleEvents } from "@/lib/sample-data"
import { DataTable } from "@/components/ui/data-table"
import type { ColumnDef } from "@tanstack/react-table"
import Image from "next/image"

interface Attendee {
  id: string
  name: string
  email: string
  eventId: string
  eventName: string
  registrationDate: string
  status: "confirmed" | "pending" | "cancelled"
  profileImage?: string
}

export default function OrganizerAttendeesPage() {
  const user = requireOrganizer()

  // Get events the user has organized
  const organizedEvents = sampleEvents.filter((event) => event.organizerId === user.id)

  // Create mock attendees data
  const attendees: Attendee[] = [
    {
      id: "att1",
      name: "Priya Sharma",
      email: "priya@example.com",
      eventId: "1",
      eventName: "Bengaluru Tech Summit 2025",
      registrationDate: "2025-04-15",
      status: "confirmed",
      profileImage: "/user-profile-1.png",
    },
    {
      id: "att2",
      name: "Rahul Mehta",
      email: "rahul@example.com",
      eventId: "1",
      eventName: "Bengaluru Tech Summit 2025",
      registrationDate: "2025-04-16",
      status: "confirmed",
      profileImage: "/user-profile-2.png",
    },
    {
      id: "att3",
      name: "Aisha Khan",
      email: "aisha@example.com",
      eventId: "2",
      eventName: "AI & Machine Learning Workshop",
      registrationDate: "2025-04-18",
      status: "confirmed",
      profileImage: "/diverse-group-meeting.png",
    },
    {
      id: "att4",
      name: "Vikram Singh",
      email: "vikram@example.com",
      eventId: "2",
      eventName: "AI & Machine Learning Workshop",
      registrationDate: "2025-04-19",
      status: "pending",
      profileImage: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "att5",
      name: "Neha Patel",
      email: "neha@example.com",
      eventId: "3",
      eventName: "Web Development Meetup",
      registrationDate: "2025-04-20",
      status: "confirmed",
      profileImage: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "att6",
      name: "Arjun Reddy",
      email: "arjun@example.com",
      eventId: "3",
      eventName: "Web Development Meetup",
      registrationDate: "2025-04-21",
      status: "cancelled",
      profileImage: "/placeholder.svg?height=40&width=40",
    },
  ]

  // Define columns for the attendees table
  const columns: ColumnDef<Attendee>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="pl-0">
          Attendee
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="relative h-8 w-8 overflow-hidden rounded-full">
            <Image
              src={row.original.profileImage || "/placeholder.svg?height=32&width=32"}
              alt={row.original.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <div className="font-medium">{row.original.name}</div>
            <div className="text-xs text-muted-foreground">{row.original.email}</div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "eventName",
      header: "Event",
    },
    {
      accessorKey: "registrationDate",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Registration Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status
        return (
          <Badge variant={status === "confirmed" ? "default" : status === "pending" ? "outline" : "destructive"}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        )
      },
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem className="flex items-center">
              <Mail className="mr-2 h-4 w-4" /> Send Email
            </DropdownMenuItem>
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Resend Confirmation</DropdownMenuItem>
            {row.original.status === "pending" && <DropdownMenuItem>Confirm Registration</DropdownMenuItem>}
            {row.original.status !== "cancelled" && (
              <DropdownMenuItem className="text-destructive">Cancel Registration</DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  return (
    <OrganizerLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Attendees</h1>
            <p className="text-muted-foreground">Manage all attendees across your events</p>
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Attendees
          </Button>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-end">
          <div className="grid gap-2 flex-1">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search attendees..." className="w-full bg-background pl-8" />
            </div>
          </div>
          <div className="grid gap-2 md:w-[200px]">
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="Event" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Events</SelectItem>
                {organizedEvents.map((event) => (
                  <SelectItem key={event.id} value={event.id}>
                    {event.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2 md:w-[200px]">
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Attendees</CardTitle>
            <CardDescription>Manage attendees across all your events</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={attendees} />
          </CardContent>
        </Card>
      </div>
    </OrganizerLayout>
  )
}
