"use client"

import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { logout } from "@/lib/auth"
import type { User } from "@/lib/types"

interface UserAuthButtonProps {
  user: User | null
}

export default function UserAuthButton({ user }: UserAuthButtonProps) {
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.refresh()
  }

  if (!user) {
    return (
      <div className="flex items-center gap-4">
        <Link href="/login">
          <Button variant="outline">Login</Button>
        </Link>
        <Link href="/register">
          <Button>Sign Up</Button>
        </Link>
      </div>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Image
            src={user.profileImage || "/placeholder.svg?height=32&width=32"}
            alt={user.name}
            fill
            className="rounded-full object-cover"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile">Profile</Link>
        </DropdownMenuItem>
        {user.role === "organizer" && (
          <DropdownMenuItem asChild>
            <Link href="/organizer/dashboard">Organizer Dashboard</Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem asChild>
          <Link href="/profile/events">My Events</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/profile/settings">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={(e) => {
            e.preventDefault()
            handleLogout()
          }}
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
