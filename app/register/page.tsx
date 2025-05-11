"use client"

import { useTransition } from "react"
import Link from "next/link"
import { registerAction } from "@/app/actions/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Loader2 } from "lucide-react"
import MainNav from "@/components/main-nav"

export default function RegisterPage() {
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (formData: FormData) => {
    startTransition(() => {
      registerAction(formData)
    })
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav />
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-md space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold">Create an Account</h1>
              <p className="text-muted-foreground">Join the Bengaluru tech events community</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Register</CardTitle>
                <CardDescription>Fill in your details to create an account</CardDescription>
              </CardHeader>
              <form action={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" name="name" placeholder="Enter your name" required autoComplete="name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="name@example.com"
                      required
                      autoComplete="email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      required
                      autoComplete="new-password"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      required
                      autoComplete="new-password"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Account Type</Label>
                    <RadioGroup defaultValue="attendee" name="role" className="flex flex-col space-y-1">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="attendee" id="attendee" />
                        <Label htmlFor="attendee" className="font-normal">
                          Attendee - I want to discover and attend events
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="organizer" id="organizer" />
                        <Label htmlFor="organizer" className="font-normal">
                          Organizer - I want to create and manage events
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button className="w-full" type="submit" disabled={isPending}>
                    {isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                  <div className="text-center text-sm">
                    <p className="text-muted-foreground">
                      Already have an account?{" "}
                      <Link href="/login" className="text-primary underline-offset-4 hover:underline">
                        Sign in
                      </Link>
                    </p>
                  </div>
                </CardFooter>
              </form>
            </Card>

            <div className="text-center text-sm">
              <p className="text-muted-foreground">
                By registering, you agree to our{" "}
                <Link href="/terms" className="text-primary underline-offset-4 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-primary underline-offset-4 hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>
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
