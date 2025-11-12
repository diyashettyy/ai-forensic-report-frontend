"use client"

import { motion } from "framer-motion"
import DashboardNav from "@/components/dashboard/dashboard-nav"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Download, Mail } from "lucide-react"

export default function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />

      <main className="p-6 md:p-8 max-w-4xl mx-auto">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold font-poppins text-accent">Forensic Report Generator</h1>
            <p className="text-lg text-muted-foreground">Advanced forensic analysis and report generation platform</p>
          </motion.div>

          {/* Project Purpose */}
          <motion.div variants={itemVariants}>
            <Card className="glass-card p-8 space-y-4">
              <h2 className="text-2xl font-bold font-poppins text-foreground">Project Purpose</h2>
              <p className="text-foreground leading-relaxed">
                The Forensic Report Generator is an advanced platform designed to streamline forensic analysis
                workflows. It leverages cutting-edge AI and machine learning technologies to automatically transcribe,
                analyze, and summarize forensic evidence from audio and video recordings.
              </p>
              <p className="text-foreground leading-relaxed">
                Our mission is to enhance investigative efficiency, improve accuracy, and provide investigators with
                comprehensive, actionable insights from forensic data.
              </p>
            </Card>
          </motion.div>

          {/* Model Architecture */}
          <motion.div variants={itemVariants}>
            <Card className="glass-card p-8 space-y-4">
              <h2 className="text-2xl font-bold font-poppins text-foreground">Model Architecture</h2>
              <div className="space-y-3 text-foreground">
                <div>
                  <h3 className="font-semibold text-accent mb-2">Speech Recognition</h3>
                  <p className="text-muted-foreground">
                    Utilizes state-of-the-art automatic speech recognition (ASR) models trained on forensic audio data
                    to achieve high accuracy transcription.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-accent mb-2">Natural Language Processing</h3>
                  <p className="text-muted-foreground">
                    Advanced NLP algorithms extract entities, relationships, and key information from transcripts for
                    comprehensive analysis.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-accent mb-2">Summarization Engine</h3>
                  <p className="text-muted-foreground">
                    Generates concise, accurate summaries using abstractive summarization techniques optimized for
                    forensic content.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Team Credits */}
          <motion.div variants={itemVariants}>
            <Card className="glass-card p-8 space-y-4">
              <h2 className="text-2xl font-bold font-poppins text-foreground">Team Credits</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: "Deepthi", role: "CSE Final year" },
                  { name: "Diya D Shetty", role: "CSE Final year" },
                  { name: "Diya Shetty", role: "CSE Final year" },
                  { name: "Inchara Y N", role: "CSE Final year" },
                ].map((member, index) => (
                  <div key={index} className="p-4 bg-card/50 rounded-lg border border-border">
                    <p className="font-semibold text-foreground">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Project Guide */}
          <motion.div variants={itemVariants}>
            <Card className="glass-card p-8 space-y-4">
              <h2 className="text-2xl font-bold font-poppins text-foreground">Project Guide</h2>
              <div className="p-4 bg-card/50 rounded-lg border border-border">
                <p className="font-semibold text-foreground">Ms Amrutha</p>
                <p className="text-sm text-muted-foreground">Assistant Professor, CSE Department</p>
              </div>
            </Card>
          </motion.div>

          {/* Resources */}
          <motion.div variants={itemVariants}>
            <Card className="glass-card p-8 space-y-4">
              <h2 className="text-2xl font-bold font-poppins text-foreground">Resources & Documentation</h2>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  className="glow-button bg-gradient-to-r from-primary to-secondary flex-1"
                  onClick={() => {
                    const link = document.createElement('a')
                    link.href = 'https://drive.google.com/uc?export=download&id=1Ps-ZdV4Ok6FHaDaNpX0Z15mOd7OC_Ntd'
                    link.download = 'documentation.pdf'
                    document.body.appendChild(link)
                    link.click()
                    document.body.removeChild(link)
                  }}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Documentation
                </Button>
                <Button
                  variant="outline"
                  className="border-border text-foreground hover:bg-accent/10 hover:text-accent bg-transparent flex-1"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Support
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Contact Section */}
          <motion.div variants={itemVariants}>
            <Card className="glass-card p-8 space-y-4 text-center">
              <h2 className="text-2xl font-bold font-poppins text-foreground">Get in Touch</h2>
              <p className="text-muted-foreground">Have questions or feedback? We'd love to hear from you.</p>
              <div className="space-y-2">
                <p className="text-foreground">
                  Email: <span className="text-accent">support@forensicreport.com</span>
                </p>
                <p className="text-foreground">
                  Phone: <span className="text-accent">+1 (555) 123-4567</span>
                </p>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </main>
    </div>
  )
}
