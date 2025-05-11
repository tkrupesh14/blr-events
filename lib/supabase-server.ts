import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies as cookiesHeader } from 'next/headers'

export async function createServerSupabase() {
  const cookieStore = await cookiesHeader()
  return createServerComponentClient({ cookies: () => cookieStore })
} 