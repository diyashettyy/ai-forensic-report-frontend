"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye, Trash2, Download } from "lucide-react"

interface Report {
  id: string
  file: string
  date: string
  investigator: string
  status: "completed" | "analyzing" | "failed"
  accuracy: number
}

export default function ReportHistoryTable({
  filterStatus,
}: {
  filterStatus: string
}) {
  const reports: Report[] = [
    {
      id: "1",
      file: "interview_2024_01_15.mp3",
      date: "2024-01-15",
      investigator: "Agent Smith",
      status: "completed",
      accuracy: 94.2,
    },
    {
      id: "2",
      file: "evidence_recording.wav",
      date: "2024-01-14",
      investigator: "Agent Johnson",
      status: "completed",
      accuracy: 91.8,
    },
    {
      id: "3",
      file: "witness_statement.mp4",
      date: "2024-01-13",
      investigator: "Agent Williams",
      status: "analyzing",
      accuracy: 0,
    },
    {
      id: "4",
      file: "scene_audio.mp3",
      date: "2024-01-12",
      investigator: "Agent Brown",
      status: "completed",
      accuracy: 96.1,
    },
    {
      id: "5",
      file: "corrupted_file.wav",
      date: "2024-01-11",
      investigator: "Agent Davis",
      status: "failed",
      accuracy: 0,
    },
  ]

  const filteredReports = reports.filter((report) => {
    if (filterStatus === "all") return true
    return report.status === filterStatus
  })

  const getStatusBadge = (status: string) => {
    const styles = {
      completed: "bg-primary/20 text-primary border border-primary/30",
      analyzing: "bg-accent/20 text-accent border border-accent/30",
      failed: "bg-destructive/20 text-destructive border border-destructive/30",
    }
    return styles[status as keyof typeof styles] || styles.completed
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-3">
      {filteredReports.length === 0 ? (
        <Card className="glass-card p-8 text-center">
          <p className="text-muted-foreground">No reports found</p>
        </Card>
      ) : (
        filteredReports.map((report) => (
          <motion.div key={report.id} variants={itemVariants}>
            <Card className="glass-card card-hover p-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">{report.file}</p>
                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                    <span>{report.date}</span>
                    <span>{report.investigator}</span>
                    {report.accuracy > 0 && <span>Accuracy: {report.accuracy}%</span>}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(report.status)}`}>
                    {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                  </span>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-foreground hover:text-accent hover:bg-accent/10"
                      onClick={() => (window.location.href = "/reports")}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-foreground hover:text-accent hover:bg-accent/10">
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-foreground hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))
      )}
    </motion.div>
  )
}
