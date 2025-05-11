"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, Clock, MapPin, ArrowLeft, CreditCard } from "lucide-react"
import MainNav from "@/components/main-nav"
import { sampleEvents } from "@/lib/sample-data"

export default function EventRegistrationPage({ params }: { params: { id: string } }) {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const router = useRouter()

  // In a real app, you would fetch the event by ID from a database
  const event = sampleEvents.find((e) => e.id === params.id) || sampleEvents[0]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsLoading(false)
    setIsSuccess(true)

    // Redirect after successful registration
    setTimeout(() => {
      router.push(`/events/${params.id}?registered=true`)
    }, 2000)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav />
        </div>
      </header>
      <main className="flex-1">
        <div className="container px-4 py-8 md:px-6 md:py-12">
          <Link
            href={`/events/${params.id}`}
            className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Event
          </Link>

          <div className="grid gap-8 md:grid-cols-[1fr_400px]">
            <div className="space-y-6">
              {isSuccess ? (
                <Card>
                  <CardContent className="pt-6 text-center">
                    <div className="mb-4 flex justify-center">
                      <div className="rounded-full bg-primary/10 p-3">
                        <CalendarDays className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold">Registration Successful!</h2>
                    <p className="mt-2 text-muted-foreground">
                      You have successfully registered for {event.title}. We've sent a confirmation email with all the
                      details.
                    </p>
                    <Button className="mt-6" asChild>
                      <Link href={`/events/${params.id}`}>Return to Event</Link>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Register for Event</CardTitle>
                    <CardDescription>Complete your registration for {event.title}</CardDescription>
                  </CardHeader>
                  <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="font-medium">Personal Information</h3>
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input id="firstName" placeholder="Enter your first name" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input id="lastName" placeholder="Enter your last name" required />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" placeholder="name@example.com" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input id="phone" type="tel" placeholder="+91 98765 43210" required />
                        </div>
                      </div>

                      {!event.isFree && (
                        <div className="space-y-4">
                          <h3 className="font-medium">Payment Information</h3>
                          <RadioGroup defaultValue="card" className="space-y-3">
                            <div className="flex items-center space-x-2 rounded-md border p-3">
                              <RadioGroupItem value="card" id="card" />
                              <Label htmlFor="card" className="flex-1 cursor-pointer">
                                Credit/Debit Card
                              </Label>
                              <CreditCard className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <div className="flex items-center space-x-2 rounded-md border p-3">
                              <RadioGroupItem value="upi" id="upi" />
                              <Label htmlFor="upi" className="flex-1 cursor-pointer">
                                UPI
                              </Label>
                              <Image src="/upi-icon.png" alt="UPI" width={20} height={20} />
                            </div>
                            <div className="flex items-center space-x-2 rounded-md border p-3">
                              <RadioGroupItem value="netbanking" id="netbanking" />
                              <Label htmlFor="netbanking" className="flex-1 cursor-pointer">
                                Net Banking
                              </Label>
                              <Image src="/bank-icon.png" alt="Net Banking" width={20} height={20} />
                            </div>
                          </RadioGroup>

                          <div className="space-y-2">
                            <Label htmlFor="cardNumber">Card Number</Label>
                            <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                          </div>
                          <div className="grid gap-4 md:grid-cols-3">
                            <div className="space-y-2">
                              <Label htmlFor="expiryMonth">Expiry Month</Label>
                              <Input id="expiryMonth" placeholder="MM" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="expiryYear">Expiry Year</Label>
                              <Input id="expiryYear" placeholder="YY" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="cvv">CVV</Label>
                              <Input id="cvv" placeholder="123" />
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="space-y-4">
                        <h3 className="font-medium">Additional Information</h3>
                        <div className="space-y-2">
                          <Label htmlFor="company">Company/Organization (Optional)</Label>
                          <Input id="company" placeholder="Enter your company name" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="jobTitle">Job Title (Optional)</Label>
                          <Input id="jobTitle" placeholder="Enter your job title" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="terms" required />
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
                        <div className="flex items-center space-x-2">
                          <Checkbox id="marketing" />
                          <label
                            htmlFor="marketing"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            I want to receive updates about future events
                          </label>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" type="submit" disabled={isLoading}>
                        {isLoading ? "Processing..." : event.isFree ? "Register Now" : `Pay ₹${event.price} & Register`}
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              )}
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Event Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="relative aspect-video overflow-hidden rounded-md">
                    <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                  </div>
                  <h3 className="text-xl font-bold">{event.title}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between py-1">
                      <span>Ticket Price</span>
                      <span className="font-medium">{event.isFree ? "Free" : `₹${event.price}`}</span>
                    </div>
                    {!event.isFree && (
                      <>
                        <div className="flex justify-between py-1">
                          <span>Processing Fee</span>
                          <span className="font-medium">₹{Math.round(event.price * 0.02)}</span>
                        </div>
                        <div className="flex justify-between border-t pt-2 font-bold">
                          <span>Total</span>
                          <span>₹{event.price + Math.round(event.price * 0.02)}</span>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-medium mb-2">Need Help?</h3>
                  <p className="text-sm text-muted-foreground">
                    If you have any questions about the registration process, please contact our support team.
                  </p>
                  <Button variant="outline" className="mt-4 w-full" asChild>
                    <Link href="/contact">Contact Support</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
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
