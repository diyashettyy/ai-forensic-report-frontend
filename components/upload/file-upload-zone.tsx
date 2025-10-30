"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Upload, File, X, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  progress: number
  status: "uploading" | "completed" | "failed"
}

interface FileUploadZoneProps {
  onGenerateReport?: () => void
  isGenerating?: boolean
}

export default function FileUploadZone({ onGenerateReport, isGenerating = false }: FileUploadZoneProps) {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [isDragging, setIsDragging] = useState(false)
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

  const processFiles = (fileList: FileList) => {
    const newFiles: UploadedFile[] = []

    Array.from(fileList).forEach((file) => {
      if (!acceptedFormats.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not a supported format. Please upload audio or video files.`,
          variant: "destructive",
        })
        return
      }

      const id = Math.random().toString(36).substr(2, 9)
      newFiles.push({
        id,
        name: file.name,
        size: file.size,
        type: file.type,
        progress: 0,
        status: "uploading",
      })
    })

    setFiles((prev) => [...prev, ...newFiles])

    // Simulate upload progress
    newFiles.forEach((file) => {
      simulateUpload(file.id)
    })
  }

  const simulateUpload = (fileId: string) => {
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 30
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)
        setFiles((prev) => prev.map((f) => (f.id === fileId ? { ...f, progress: 100, status: "completed" } : f)))
        toast({
          title: "Upload complete",
          description: "File uploaded successfully. Starting analysis...",
        })
      } else {
        setFiles((prev) => prev.map((f) => (f.id === fileId ? { ...f, progress: Math.min(progress, 99) } : f)))
      }
    }, 500)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    processFiles(e.dataTransfer.files)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(e.target.files)
    }
  }

  const removeFile = (fileId: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== fileId))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i]
  }

  const hasCompletedFiles = files.some((f) => f.status === "completed")

  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
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
            multiple
            accept="audio/*,video/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          <motion.div
            animate={isDragging ? { scale: 1.05 } : { scale: 1 }}
            className="flex flex-col items-center justify-center py-12 space-y-4"
          >
            <motion.div animate={isDragging ? { y: -10 } : { y: 0 }} transition={{ type: "spring", stiffness: 300 }}>
              <Upload className="w-16 h-16 text-accent" />
            </motion.div>
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold font-poppins text-foreground">
                {isDragging ? "Drop files here" : "Drag and drop your files"}
              </h3>
              <p className="text-muted-foreground">or click to browse</p>
              <p className="text-xs text-muted-foreground mt-2">Supported: MP3, WAV, MP4, MOV</p>
            </div>
          </motion.div>
        </Card>
      </motion.div>

      {/* Uploaded Files List */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-3"
          >
            <h3 className="text-lg font-semibold font-poppins text-foreground">Uploaded Files</h3>
            {files.map((file) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="glass-card p-4"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <File className="w-5 h-5 text-accent" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                        <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                      </div>
                      {file.status === "completed" && (
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 ml-2" />
                      )}
                      {file.status === "failed" && (
                        <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 ml-2" />
                      )}
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${file.progress}%` }}
                        transition={{ duration: 0.3 }}
                        className="h-full bg-gradient-to-r from-primary to-secondary"
                      ></motion.div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{file.progress}%</p>
                  </div>

                  <button
                    onClick={() => removeFile(file.id)}
                    className="flex-shrink-0 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Generate Report Button */}
      {hasCompletedFiles && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Button
            className="glow-button w-full bg-gradient-to-r from-primary to-secondary"
            onClick={onGenerateReport}
            disabled={isGenerating}
          >
            {isGenerating ? "Generating Report..." : "Generate Report"}
          </Button>
        </motion.div>
      )}
    </div>
  )
}
