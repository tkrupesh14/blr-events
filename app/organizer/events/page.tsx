"use client"

import Link from "next/link"
import { requireOrganizer } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Filter, Calendar, ArrowUpDown, MoreHorizontal, Edit, Trash2, Copy } from "lucide-react"
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
import type { Event } from "@/lib/types"

export default function OrganizerEventsPage() {
  const user = requireOrganizer()

  // Get events the user has organized
  const organizedEvents = sampleEvents.filter((event) => event.organizerId === user.id)

  // Split events into upcoming and past
  const currentDate = new Date()
  const upcomingEvents = organizedEvents.filter((event) => new Date(event.date) >= currentDate)
  const pastEvents = organizedEvents.filter((event) => new Date(event.date) < currentDate)

  // Define columns for the events table
  const columns: ColumnDef<Event>[] = [
    {
      accessorKey: "title",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="pl-0">
          Event Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div className="font-medium">{row.original.title}</div>
          {row.original.isFree && <Badge variant="secondary">Free</Badge>}
        </div>
      ),
    },
    {
      accessorKey: "date",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => <Badge variant="outline">{row.original.category}</Badge>,
    },
    {
      accessorKey: "attendees",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Attendees
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "price",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (row.original.isFree ? "Free" : `₹${row.original.price}`),
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
            <DropdownMenuItem asChild>
              <Link href={`/events/${row.original.id}`}>View Event</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/organizer/events/${row.original.id}/attendees`}>View Attendees</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/organizer/events/${row.original.id}/edit`} className="flex items-center">
                <Edit className="mr-2 h-4 w-4" /> Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/organizer/events/${row.original.id}/duplicate`} className="flex items-center">
                <Copy className="mr-2 h-4 w-4" /> Duplicate
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive flex items-center">
              <Trash2 className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
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
            <h1 className="text-3xl font-bold tracking-tight">Events</h1>
            <p className="text-muted-foreground">Manage and monitor all your events</p>
          </div>
          <Button asChild>
            <Link href="/organizer/events/create">
              <Plus className="mr-2 h-4 w-4" /> Create Event
            </Link>
          </Button>
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
              <span>Date Range</span>
            </Button>
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Events</CardTitle>
            <CardDescription>Manage and monitor your tech events</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="upcoming" className="w-full">
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="past">Past</TabsTrigger>
                <TabsTrigger value="draft">Drafts</TabsTrigger>
              </TabsList>
              <TabsContent value="upcoming" className="pt-4">
                {upcomingEvents.length > 0 ? (
                  <DataTable columns={columns} data={upcomingEvents} />
                ) : (
                  <div className="rounded-lg border border-dashed p-8 text-center">
                    <h4 className="font-medium">No upcoming events</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Start creating your first event to reach tech enthusiasts in Bengaluru.
                    </p>
                    <Button className="mt-4" asChild>
                      <Link href="/organizer/events/create">Create Event</Link>
                    </Button>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="past" className="pt-4">
                {pastEvents.length > 0 ? (
                  <DataTable columns={columns} data={pastEvents} />
                ) : (
                  <div className="rounded-lg border border-dashed p-8 text-center">
                    <h4 className="font-medium">No past events</h4>
                    <p className="text-sm text-muted-foreground mt-1">Your completed events will appear here.</p>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="draft" className="pt-4">
                <div className="rounded-lg border border-dashed p-8 text-center">
                  <h4 className="font-medium">No draft events</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Save events as drafts to continue editing them later.
                  </p>
                  <Button className="mt-4" asChild>
                    <Link href="/organizer/events/create">Create Event</Link>
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </OrganizerLayout>
  )
}
