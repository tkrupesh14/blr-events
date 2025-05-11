export interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  category: string
  image: string
  price: number
  isFree: boolean
  attendees: number
  organizer: string
  organizerId: string
}

export interface User {
  id: string
  name: string
  email: string
  password: string
  role: "attendee" | "organizer"
  registeredEvents: string[]
  profileImage?: string
  organizationName?: string
  organizationDescription?: string
}
