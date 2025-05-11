"use server"

import { createServerSupabase } from "./supabase-server"
import { redirect } from "next/navigation"

/**
 * Retrieves the current authenticated user from Supabase session.
 * Returns the user object or null if not authenticated.
 */
export async function getUser() {
  const supabase = createServerSupabase()
  const {
    data: { session },
  } = await supabase.auth.getSession()
  return session?.user ?? null
}

/**
 * Returns the current user, redirecting to login if unauthenticated.
 */
export async function getUserOrRedirect(redirectTo = "/login") {
  const user = await getUser()
  if (!user) redirect(redirectTo)
  return user
}

/**
 * Checks if the current user has the "organizer" role.
 */
export async function isOrganizer() {
  const user = await getUser()
  return (user?.user_metadata as any)?.role === "organizer"
}

/**
 * Ensures the current user is an organizer, redirecting otherwise.
 */
export async function requireOrganizer(redirectTo = "/login") {
  const user = await getUser()
  if (!user || (user.user_metadata as any)?.role !== "organizer") {
    redirect(redirectTo)
  }
  return user
}
