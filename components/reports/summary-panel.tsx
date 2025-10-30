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
    {
      key: "findings",
      title: "Key Findings",
      content: keyFindings || [],
      expanded: true,
      type: "list" as const,
    },
    {
      key: "recs",
      title: "Recommendations",
      content: recommendations || [],
      expanded: true,
      type: "list" as const,
    },
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
          <Card className="glass-card overflow-hidden">
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
                className="px-4 pb-4 border-t border-border"
              >
                {section.type === "text" ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-sm text-foreground leading-relaxed"
                  >
                    {section.content as string}
                  </motion.p>
                ) : (
                  <ul className="list-disc pl-6 space-y-2">
                    {(section.content as string[]).length ? (
                      (section.content as string[]).map((item, i) => (
                        <li key={i} className="text-sm text-foreground leading-relaxed">
                          {item}
                        </li>
                      ))
                    ) : (
                      <li className="text-sm text-muted-foreground">No items available.</li>
                    )}
                  </ul>
                )}
              </motion.div>
            )}
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
