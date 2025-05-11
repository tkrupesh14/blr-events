"use client"

import { useState } from "react"
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs"
import { SessionContextProvider } from "@supabase/auth-helpers-react"
import React from "react"
import type { Session } from "@supabase/supabase-js"

export function SupabaseProvider({
  children,
  initialSession,
}: {
  children: React.ReactNode
  initialSession: Session | null
}) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient())
  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={initialSession}
    >
      {children}
    </SessionContextProvider>
  )
} 