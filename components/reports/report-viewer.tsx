"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Download, Copy, Search } from "lucide-react"
import TranscriptPanel from "./transcript-panel"
import SummaryPanel from "./summary-panel"
import type { Report } from "@/types/api"

export default function ReportViewer({ report }: { report: Report }) {
  const [searchQuery, setSearchQuery] = useState("")

  const copySummary = async () => {
    try {
      await navigator.clipboard.writeText(report.executiveSummary || "")
    } catch {
      // ignore
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      {/* Controls */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search entities or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-input text-foreground placeholder:text-muted-foreground glow-border"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="border-border text-foreground hover:bg-accent/10 hover:text-accent bg-transparent"
              onClick={copySummary}
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy Summary
            </Button>
            <Button className="glow-button bg-gradient-to-r from-primary to-secondary" disabled>
              <Download className="w-4 h-4 mr-2" />
              PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Content Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TranscriptPanel searchQuery={searchQuery} transcript={report.transcript} />
        <SummaryPanel
          executiveSummary={report.executiveSummary}
          keyFindings={report.keyFindings}
          recommendations={report.recommendations}
        />
      </div>
    </motion.div>
  )
}
