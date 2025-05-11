"use client"

import { useState } from "react"
import { requireOrganizer } from "@/lib/auth"
import OrganizerLayout from "@/components/layouts/organizer-layout"

export default function OrganizerSettingsPage() {
  const user = requireOrganizer()
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return (
    <OrganizerLayout>
      <div className="space">
      </div>
    </OrganizerLayout>
  )
}
