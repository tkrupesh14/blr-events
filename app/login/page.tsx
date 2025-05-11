"use client"

import { useTransition } from "react"
import Link from "next/link"
import { loginAction } from "@/app/actions/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2 } from "lucide-react"
import MainNav from "@/components/main-nav"

export default function LoginPage() {
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (formData: FormData) => {
    startTransition(() => {
      loginAction(formData)
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
              <h1 className="text-3xl font-bold">Welcome Back</h1>
              <p className="text-muted-foreground">Sign in to your account to continue</p>
            </div>

            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <Card>
                  <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>Enter your credentials to access your account</CardDescription>
                  </CardHeader>
                  <form action={handleSubmit}>
                    <CardContent className="space-y-4">
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
                        <div className="flex items-center justify-between">
                          <Label htmlFor="password">Password</Label>
                          <Link
                            href="/forgot-password"
                            className="text-sm text-primary underline-offset-4 hover:underline"
                          >
                            Forgot password?
                          </Link>
                        </div>
                        <Input
                          id="password"
                          name="password"
                          type="password"
                          placeholder="••••••••"
                          required
                          autoComplete="current-password"
                        />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" type="submit" disabled={isPending}>
                        {isPending ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Signing in...
                          </>
                        ) : (
                          "Sign In"
                        )}
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>
              <TabsContent value="register">
                <Card>
                  <CardHeader>
                    <CardTitle>Create an Account</CardTitle>
                    <CardDescription>Register to start exploring tech events in Bengaluru</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-name">Name</Label>
                      <Input id="register-name" placeholder="Enter your name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-email">Email</Label>
                      <Input id="register-email" type="email" placeholder="name@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-password">Password</Label>
                      <Input id="register-password" type="password" placeholder="••••••••" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-confirm-password">Confirm Password</Label>
                      <Input id="register-confirm-password" type="password" placeholder="••••••••" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" asChild>
                      <Link href="/register">Continue to Register</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="text-center text-sm">
              <p className="text-muted-foreground">
                By continuing, you agree to our{" "}
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
