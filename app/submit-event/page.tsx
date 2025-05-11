"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { CalendarIcon, Upload } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import MainNav from "@/components/main-nav"

export default function SubmitEventPage() {
  const [date, setDate] = useState<Date>()

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav />
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-2xl space-y-8">
              <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Submit Your Event</h1>
                <p className="text-muted-foreground">
                  List your tech event and reach thousands of tech enthusiasts in Bengaluru
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Event Details</CardTitle>
                  <CardDescription>Provide the details of your event to get it listed on our platform</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Event Title</Label>
                    <Input id="title" placeholder="Enter the title of your event" />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select>
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="webdev">Web Development</SelectItem>
                          <SelectItem value="ai">AI & Machine Learning</SelectItem>
                          <SelectItem value="mobile">Mobile Development</SelectItem>
                          <SelectItem value="cloud">Cloud Computing</SelectItem>
                          <SelectItem value="blockchain">Blockchain</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="type">Event Type</Label>
                      <Select>
                        <SelectTrigger id="type">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="conference">Conference</SelectItem>
                          <SelectItem value="workshop">Workshop</SelectItem>
                          <SelectItem value="meetup">Meetup</SelectItem>
                          <SelectItem value="hackathon">Hackathon</SelectItem>
                          <SelectItem value="webinar">Webinar</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Event Description</Label>
                    <Textarea id="description" placeholder="Describe your event in detail" className="min-h-[150px]" />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Event Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !date && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="time">Event Time</Label>
                      <Input id="time" type="time" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Event Location</Label>
                    <Input id="location" placeholder="Enter the venue address" />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="price">Ticket Price (₹)</Label>
                      <Input id="price" type="number" placeholder="0" />
                      <div className="flex items-center space-x-2 pt-2">
                        <Checkbox id="free" />
                        <label
                          htmlFor="free"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          This is a free event
                        </label>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="capacity">Event Capacity</Label>
                      <Input id="capacity" type="number" placeholder="100" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image">Event Banner</Label>
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="image"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/40 hover:bg-muted/60"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                          <p className="mb-2 text-sm text-muted-foreground">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-muted-foreground">SVG, PNG, JPG or GIF (MAX. 2MB)</p>
                        </div>
                        <Input id="image" type="file" className="hidden" />
                      </label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Event Website (Optional)</Label>
                    <Input id="website" type="url" placeholder="https://" />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to the{" "}
                      <Link href="/terms" className="text-primary hover:underline">
                        terms and conditions
                      </Link>
                    </label>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Save as Draft</Button>
                  <Button>Submit Event</Button>
                </CardFooter>
              </Card>
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
