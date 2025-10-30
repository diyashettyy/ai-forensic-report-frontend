"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Upload, File, X, CheckCircle, AlertCircle, Upload as UploadIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import DashboardNav from "@/components/dashboard/dashboard-nav"
import ReportViewer from "@/components/reports/report-viewer"
import ChatPanel from "@/components/chat/chat-panel"
import { uploadAudio, getStatus, getReport } from "@/lib/api"
import type { Report } from "@/types/api"

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  progress: number
  status: "uploading" | "completed" | "failed"
}

export default function ReportPage() {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [reportData, setReportData] = useState<Report | null>(null)
  const [reportId, setReportId] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const acceptedFormats = ["audio/mpeg", "audio/wav", "video/mp4", "video/quicktime"]

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const processFiles = async (fileList: FileList) => {
    const file = fileList[0] // Only process the first file for simplicity
    if (!file) return

    if (!acceptedFormats.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: `${file.name} is not a supported format. Please upload audio or video files.`,
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)

    const fileId = Math.random().toString(36).substr(2, 9)
    const uploadedFile: UploadedFile = {
      id: fileId,
      name: file.name,
      size: file.size,
      type: file.type,
      progress: 0,
      status: "uploading",
    }

    setFiles([uploadedFile])

    // Simulate upload progress visually while the network request runs
    let visualProgress = 0
    const interval = setInterval(() => {
      visualProgress = Math.min(visualProgress + Math.random() * 25, 90)
      setFiles((prev) =>
        prev.map((f) => ({
          ...f,
          progress: visualProgress,
        })),
      )
    }, 200)

    try {
      // Real upload to FastAPI
      const resp = await uploadAudio(file)

      clearInterval(interval)
      setFiles((prev) => prev.map((f) => ({ ...f, progress: 100, status: "completed" })))
      setIsUploading(false)

      // Start generating report by polling status
      setReportId(resp.id)
      await generateReport(resp.id)
    } catch (error: any) {
      clearInterval(interval)
      setFiles((prev) => prev.map((f) => ({ ...f, status: "failed" })))
      setIsUploading(false)
      toast({
        title: "Upload failed",
        description: error?.message || "There was an error uploading your file. Please try again.",
        variant: "destructive",
      })
    }
  }

  const pollStatusUntilDone = async (jobId: string): Promise<"completed" | "failed"> => {
    // Poll every 2s until completed/failed
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const s = await getStatus(jobId)
      if (s.status === "completed") return "completed"
      if (s.status === "failed") return "failed"
      await new Promise((r) => setTimeout(r, 2000))
    }
  }

  const generateReport = async (jobId: string) => {
    setIsGenerating(true)
    setReportData(null)

    try {
      const state = await pollStatusUntilDone(jobId)
      if (state === "failed") {
        throw new Error("Analysis failed on server")
      }

      // Fetch the report with a short retry window to handle race after status=completed
      const deadline = Date.now() + 5000 // up to 5s
      let rep: Report | null = null

      while (Date.now() < deadline) {
        try {
          rep = await getReport(jobId)
          break
        } catch (err: any) {
          // If backend returns 202 (report not ready yet), retry briefly
          if (err?.status === 202) {
            await new Promise((r) => setTimeout(r, 400))
            continue
          }
          // Other errors should surface
          throw err
        }
      }

      if (!rep) {
        throw new Error("Report not ready yet. Please try again.")
      }

      setReportData(rep)
    } catch (error: any) {
      console.error("Report generation error:", error)
      toast({
        title: "Report generation failed",
        description: error?.message || "There was an error generating the report. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files) {
      void processFiles(e.dataTransfer.files)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      void processFiles(e.target.files)
    }
  }

  const handleNewUpload = () => {
    setFiles([])
    setReportData(null)
    setReportId(null)
    setIsGenerating(false)
    setIsUploading(false)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i]
  }

  const hasReport = !!reportData && !!reportId
  const showUploadSection = !hasReport && !isGenerating && !isUploading

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />

      <main className="px-6 md:px-8">
        {/* Page Header - Simplify header when report is shown */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`${hasReport ? "pt-8 pb-4" : "py-8"} flex items-center justify-between`}
        >
          <div>
            <h1
              className={`md:text-3xl font-bold font-poppins text-foreground mb-2 ${
                hasReport ? "text-2xl" : "text-3xl"
              }`}
            >
              {hasReport ? "Forensic Report" : "Forensic Report Generator"}
            </h1>
            <p className="text-muted-foreground">
              {hasReport
                ? "AI-powered forensic analysis results"
                : "Upload audio or video files for AI-powered forensic analysis"}
            </p>
          </div>
          {hasReport && (
            <Button
              variant="outline"
              className="border-border text-foreground hover:bg-accent/10 hover:text-accent"
              onClick={handleNewUpload}
            >
              <UploadIcon className="w-4 h-4 mr-2" />
              Upload New File
            </Button>
          )}
        </motion.div>

        {/* Upload Section - Only show when no report and not generating */}
        {showUploadSection && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="mb-8">
            <div className="max-w-2xl mx-auto">
              <Card
                className={`glass-card p-8 border-2 border-dashed transition-all duration-300 cursor-pointer ${
                  isDragging ? "border-accent bg-accent/5" : "border-border hover:border-accent/50"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="audio/*,video/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />

                <div className="text-center space-y-4">
                  <Upload className="w-16 h-16 text-accent mx-auto" />
                  <div>
                    <h3 className="text-xl font-semibold font-poppins text-foreground mb-2">
                      {isDragging ? "Drop file here" : "Drag and drop your file"}
                    </h3>
                    <p className="text-muted-foreground">or click to browse</p>
                    <p className="text-xs text-muted-foreground mt-2">Supported: MP3, WAV, MP4, MOV</p>
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>
        )}

        {/* File Progress Section - Only show during uploading */}
        {isUploading && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-3 mb-8 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold font-poppins text-foreground">Uploading File</h3>
            {files.map((file) => (
              <Card key={file.id} className="glass-card p-4">
                <div className="flex items-start gap-4">
                  <File className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                      {file.status === "completed" && <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />}
                      {file.status === "failed" && <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />}
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${file.progress}%` }}
                        transition={{ duration: 0.3 }}
                        className="h-full bg-gradient-to-r from-primary to-secondary"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {file.status === "uploading"
                        ? `${Math.round(file.progress)}% - Uploading...`
                        : file.status === "completed"
                        ? `Upload complete`
                        : `Upload failed`}
                    </p>
                  </div>
                  <div className="text-xs text-muted-foreground">{formatFileSize(file.size)}</div>
                </div>
              </Card>
            ))}
          </motion.div>
        )}

        {/* Loading State - Centered on page */}
        {isGenerating && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold font-poppins text-foreground mb-2">Generating Report</h2>
              <p className="text-muted-foreground">AI analysis in progress...</p>
            </div>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          </motion.div>
        )}

        {/* Report Section - Full width without constraints */}
        {hasReport && reportData && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <ReportViewer report={reportData} />
            <ChatPanel jobId={reportId!} />
          </motion.div>
        )}
      </main>
    </div>
  )
}
