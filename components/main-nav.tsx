"use client"
import Link from "next/link"
import { CalendarClock } from "lucide-react"
import { useSession } from "@supabase/auth-helpers-react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export default function MainNav() {
  const session = useSession()
  const user = session?.user
  console.log(user)
  const metadata = (user?.user_metadata as any) || {}
  const role = metadata.role as string | undefined
  const name = metadata.name as string | undefined
  const avatarUrl = metadata.avatar_url as string | undefined
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : ""

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-6 md:gap-10">
        <Link href="/" className="flex items-center space-x-2">
          <CalendarClock className="h-6 w-6 text-purple-500" />
          <span className="font-bold inline-block">BengaluruTechEvents</span>
        </Link>
        <nav className="hidden gap-6 md:flex">
          <Link href="/events" className="text-sm font-medium transition-colors hover:text-primary">
            Events
          </Link>
          <Link href="/organizers" className="text-sm font-medium transition-colors hover:text-primary">
            Organizers
          </Link>
          <Link href="/categories" className="text-sm font-medium transition-colors hover:text-primary">
            Categories
          </Link>
          <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
            About
          </Link>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            {role === "organizer" && (
              <Link
                href="/organizer/dashboard"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Dashboard
              </Link>
            )}
            <Avatar>
              {avatarUrl && <AvatarImage src={avatarUrl} alt={name} />}
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          </>
        ) : (
          <>  
            <Link href="/login" className="text-sm font-medium transition-colors hover:text-primary">
              Sign In
            </Link>
            <Link href="/register" className="text-sm font-medium transition-colors hover:text-primary">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  )
}
