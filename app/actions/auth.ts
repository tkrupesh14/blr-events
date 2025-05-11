"use server"

import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { cookies as cookiesHeader } from "next/headers"
import { redirect } from "next/navigation"

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const cookieStore = await cookiesHeader()
  const supabase = createServerActionClient({ cookies: () => cookieStore })

  const { data, error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return { status: "error", message: error.message }
  }

  // On success, redirect based on role
  const role = (data.user.user_metadata as any)?.role
  redirect(role === "organizer" ? "/organizer/dashboard" : "/events")
}

export async function registerAction(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const role = formData.get("role") as string
  const cookieStore = await cookiesHeader()
  const supabase = createServerActionClient({ cookies: () => cookieStore })

  const { data, error } = await supabase.auth.signUp(
    { email, password },
    { data: { name, role } }
  )

  if (error) {
    return { status: "error", message: error.message }
  }

  // After signup, Supabase automatically logs in the user
  // Redirect based on role
  redirect(role === "organizer" ? "/organizer/dashboard" : "/events")
}

export async function logoutAction() {
  const cookieStore = await cookiesHeader()
  const supabase = createServerActionClient({ cookies: () => cookieStore })
  await supabase.auth.signOut()
  redirect("/")
} 