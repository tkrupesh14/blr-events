"use client"

import { useState } from "react"
import { requireOrganizer } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Send, Plus, MoreHorizontal, Paperclip } from "lucide-react"
import OrganizerLayout from "@/components/layouts/organizer-layout"
import Image from "next/image"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Message {
  id: string
  senderId: string
  senderName: string
  senderImage?: string
  content: string
  timestamp: string
  isRead: boolean
}

interface Conversation {
  id: string
  participantId: string
  participantName: string
  participantImage?: string
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  messages: Message[]
}

export default function OrganizerMessagesPage() {
  const user = requireOrganizer()
  const [activeConversation, setActiveConversation] = useState<string>("conv1")
  const [messageInput, setMessageInput] = useState("")

  // Mock conversations data
  const conversations: Conversation[] = [
    {
      id: "conv1",
      participantId: "user1",
      participantName: "Priya Sharma",
      participantImage: "/user-profile-1.png",
      lastMessage: "I have a question about the AI workshop",
      lastMessageTime: "10:30 AM",
      unreadCount: 2,
      messages: [
        {
          id: "msg1",
          senderId: "user1",
          senderName: "Priya Sharma",
          senderImage: "/user-profile-1.png",
          content: "Hi there! I'm interested in your AI & Machine Learning Workshop.",
          timestamp: "10:15 AM",
          isRead: true,
        },
        {
          id: "msg2",
          senderId: "org1",
          senderName: "TechConnect Bengaluru",
          senderImage: "/abstract-logo.png",
          content: "Hello Priya! Thanks for your interest. How can I help you?",
          timestamp: "10:20 AM",
          isRead: true,
        },
        {
          id: "msg3",
          senderId: "user1",
          senderName: "Priya Sharma",
          senderImage: "/user-profile-1.png",
          content:
            "I have a question about the workshop prerequisites. Do I need to have prior experience with Python?",
          timestamp: "10:25 AM",
          isRead: true,
        },
        {
          id: "msg4",
          senderId: "user1",
          senderName: "Priya Sharma",
          senderImage: "/user-profile-1.png",
          content: "Also, will there be hands-on exercises during the workshop?",
          timestamp: "10:30 AM",
          isRead: false,
        },
      ],
    },
    {
      id: "conv2",
      participantId: "user2",
      participantName: "Rahul Mehta",
      participantImage: "/user-profile-2.png",
      lastMessage: "Thanks for the information",
      lastMessageTime: "Yesterday",
      unreadCount: 0,
      messages: [
        {
          id: "msg5",
          senderId: "user2",
          senderName: "Rahul Mehta",
          senderImage: "/user-profile-2.png",
          content: "Hello, I'd like to know if there are any group discounts available for the Blockchain Conference?",
          timestamp: "Yesterday, 3:45 PM",
          isRead: true,
        },
        {
          id: "msg6",
          senderId: "org1",
          senderName: "TechConnect Bengaluru",
          senderImage: "/abstract-logo.png",
          content:
            "Hi Rahul! Yes, we offer a 15% discount for groups of 5 or more. You can register your group through our website.",
          timestamp: "Yesterday, 4:00 PM",
          isRead: true,
        },
        {
          id: "msg7",
          senderId: "user2",
          senderName: "Rahul Mehta",
          senderImage: "/user-profile-2.png",
          content: "Thanks for the information!",
          timestamp: "Yesterday, 4:05 PM",
          isRead: true,
        },
      ],
    },
    {
      id: "conv3",
      participantId: "user3",
      participantName: "Aisha Khan",
      participantImage: "/diverse-group-meeting.png",
      lastMessage: "Is there parking available at the venue?",
      lastMessageTime: "Yesterday",
      unreadCount: 1,
      messages: [
        {
          id: "msg8",
          senderId: "user3",
          senderName: "Aisha Khan",
          senderImage: "/diverse-group-meeting.png",
          content: "Hi, I've registered for the Web Development Meetup. Is there parking available at the venue?",
          timestamp: "Yesterday, 5:30 PM",
          isRead: false,
        },
      ],
    },
  ]

  const currentConversation = conversations.find((conv) => conv.id === activeConversation)

  const handleSendMessage = () => {
    if (!messageInput.trim()) return
    // In a real app, we would send the message to the API
    console.log("Sending message:", messageInput)
    setMessageInput("")
  }

  return (
    <OrganizerLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
            <p className="text-muted-foreground">Communicate with your event attendees</p>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Message
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-[300px_1fr]">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search messages..." className="w-full bg-background pl-8" />
            </div>

            <Card className="h-[calc(100vh-280px)]">
              <ScrollArea className="h-full">
                {conversations.map((conversation) => (
                  <div key={conversation.id}>
                    <button
                      className={`w-full p-3 text-left flex items-start gap-3 hover:bg-muted/50 ${
                        activeConversation === conversation.id ? "bg-muted" : ""
                      }`}
                      onClick={() => setActiveConversation(conversation.id)}
                    >
                      <div className="relative">
                        <div className="relative h-10 w-10 overflow-hidden rounded-full">
                          <Image
                            src={conversation.participantImage || "/placeholder.svg?height=40&width=40"}
                            alt={conversation.participantName}
                            fill
                            className="object-cover"
                          />
                        </div>
                        {conversation.unreadCount > 0 && (
                          <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium flex items-center justify-center text-primary-foreground">
                            {conversation.unreadCount}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium truncate">{conversation.participantName}</p>
                          <p className="text-xs text-muted-foreground">{conversation.lastMessageTime}</p>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                      </div>
                    </button>
                    <Separator />
                  </div>
                ))}
              </ScrollArea>
            </Card>
          </div>

          <Card className="flex flex-col h-[calc(100vh-280px)]">
            {currentConversation ? (
              <>
                <CardHeader className="border-b px-4 py-3 flex flex-row items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full">
                      <Image
                        src={currentConversation.participantImage || "/placeholder.svg?height=40&width=40"}
                        alt={currentConversation.participantName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <CardTitle className="text-base">{currentConversation.participantName}</CardTitle>
                      <CardDescription>Online</CardDescription>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {currentConversation.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.senderId === user.id ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`flex gap-2 max-w-[80%] ${
                            message.senderId === user.id ? "flex-row-reverse" : "flex-row"
                          }`}
                        >
                          {message.senderId !== user.id && (
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={message.senderImage || "/placeholder.svg"} />
                              <AvatarFallback>
                                {message.senderName
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                          )}
                          <div>
                            <div
                              className={`rounded-lg p-3 ${
                                message.senderId === user.id
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted text-foreground"
                              }`}
                            >
                              <p className="text-sm">{message.content}</p>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">{message.timestamp}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <div className="border-t p-4">
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Input
                      placeholder="Type a message..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault()
                          handleSendMessage()
                        }
                      }}
                    />
                    <Button onClick={handleSendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <div className="text-center">
                  <h3 className="text-lg font-medium">No conversation selected</h3>
                  <p className="text-muted-foreground">Select a conversation to start messaging</p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </OrganizerLayout>
  )
}
