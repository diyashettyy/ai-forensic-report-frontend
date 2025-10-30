"use client"

import { useState } from "react"
import type { KeyboardEvent } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { askChat } from "@/lib/api"

type Message = { role: "user" | "assistant"; content: string }

export default function ChatPanel({ jobId }: { jobId: string }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const sendMessage = async () => {
    const q = input.trim()
    if (!q || !jobId) return

    setMessages((prev: Message[]) => [...prev, { role: "user", content: q }])
    setInput("")
    setIsTyping(true)

    try {
      const res = await askChat(jobId, q)
      setMessages((prev: Message[]) => [...prev, { role: "assistant", content: res.answer }])
    } catch (err: any) {
      setMessages((prev: Message[]) => [
        ...prev,
        { role: "assistant", content: `Error: ${err?.message || "Failed to get response"}` },
      ])
    } finally {
      setIsTyping(false)
    }
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      void sendMessage()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="glass-card p-4 space-y-4 mt-6"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold font-poppins text-foreground">Case Chatbot</h3>
        {isTyping && <span className="text-xs text-muted-foreground">Assistant is typing…</span>}
      </div>

      <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
        {messages.map((m: Message, idx: number) => (
          <div
            key={idx}
            className={`rounded-md p-3 border ${
              m.role === "assistant" ? "bg-card/60 border-border" : "bg-accent/10 border-accent/40"
            }`}
          >
            <p className="text-xs font-medium mb-1 text-muted-foreground">{m.role === "assistant" ? "Assistant" : "You"}</p>
            <p className="text-sm text-foreground whitespace-pre-wrap">{m.content}</p>
          </div>
        ))}
        {isTyping && (
          <div className="rounded-md p-3 border bg-card/60 border-border">
            <p className="text-xs font-medium mb-1 text-muted-foreground">Assistant</p>
            <p className="text-sm text-foreground">…</p>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <Input
          placeholder="Ask a question about this case…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          className="bg-input text-foreground placeholder:text-muted-foreground"
        />
        <Button onClick={sendMessage} disabled={!jobId || isTyping}>
          Send
        </Button>
      </div>
    </motion.div>
  )
}
