"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from "lucide-react"

export default function SummaryPanel({
  executiveSummary,
  keyFindings,
  recommendations,
}: {
  executiveSummary: string
  keyFindings: string[]
  recommendations: string[]
}) {
  const [sections, setSections] = useState([
    {
      key: "executive",
      title: "Executive Summary",
      content: executiveSummary || "No summary available.",
      expanded: true,
      type: "text" as const,
    },
    // The following sections are intentionally commented out per requirement
    // to show only the Executive Summary.
    // {
    //   key: "findings",
    //   title: "Key Findings",
    //   content: keyFindings || [],
    //   expanded: true,
    //   type: "list" as const,
    // },
    // {
    //   key: "recs",
    //   title: "Recommendations",
    //   content: recommendations || [],
    //   expanded: true,
    //   type: "list" as const,
    // },
  ])

  const toggleSection = (key: string) => {
    setSections((prev) =>
      prev.map((section) => (section.key === key ? { ...section, expanded: !section.expanded } : section)),
    )
  }

  return (
    <div className="space-y-3">
      {sections.map((section, index) => (
        <motion.div
          key={section.key}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="glass-card overflow-hidden h-[70vh] flex flex-col">
            <button
              onClick={() => toggleSection(section.key)}
              className="w-full p-4 flex items-center justify-between hover:bg-accent/5 transition-colors"
            >
              <h4 className="font-semibold font-poppins text-foreground text-left">{section.title}</h4>
              {section.expanded ? (
                <ChevronUp className="w-5 h-5 text-accent flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              )}
            </button>

            {section.expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="px-4 pb-4 border-t border-border flex-1 overflow-y-auto pr-2"
              >
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-sm text-foreground leading-relaxed"
                >
                  {section.content as string}
                </motion.p>
              </motion.div>
            )}
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
