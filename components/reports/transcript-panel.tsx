"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import type { TranscriptEntry } from "@/types/api"

export default function TranscriptPanel({
  searchQuery,
  transcript,
}: {
  searchQuery: string
  transcript: TranscriptEntry[]
}) {
  const q = (searchQuery || "").toLowerCase()

  return (
    <Card className="glass-card p-6 space-y-4">
      <h3 className="text-lg font-semibold font-poppins text-foreground">Transcript</h3>

      <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
        {transcript.map((entry, index) => {
          const highlighted =
            !!q &&
            (entry.text.toLowerCase().includes(q) ||
              entry.speaker.toLowerCase().includes(q) ||
              entry.timestamp.toLowerCase().includes(q))

          return (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.02 }}
              className={`p-3 rounded-lg border transition-all ${
                highlighted ? "border-accent bg-accent/10" : "border-border bg-card/50"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <span className="text-xs font-mono text-muted-foreground">{entry.timestamp}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-accent">{entry.speaker}</p>
                  <p className="text-sm text-foreground mt-1 leading-relaxed">{entry.text}</p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Jump to Timestamp Button (placeholder) */}
      <button className="w-full py-2 px-3 rounded-lg border border-border text-foreground hover:bg-accent/10 hover:border-accent transition-colors text-sm font-medium">
        Jump to Timestamp
      </button>
    </Card>
  )
}
