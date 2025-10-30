"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { BarChart3, TrendingUp, Zap, Target } from "lucide-react"

export default function OverviewCards() {
  const cards = [
    {
      title: "Total Cases",
      value: "1,247",
      icon: BarChart3,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      title: "Avg Accuracy",
      value: "94.2%",
      icon: TrendingUp,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "WER Score",
      value: "3.8%",
      icon: Target,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      title: "ROUGE Score",
      value: "0.87",
      icon: Zap,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
  ]

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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {cards.map((card, index) => {
        const Icon = card.icon
        return (
          <motion.div key={index} variants={itemVariants}>
            <Card className="glass-card card-hover p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-muted-foreground">{card.title}</h3>
                <div className={`${card.bgColor} p-2 rounded-lg`}>
                  <Icon className={`${card.color} w-5 h-5`} />
                </div>
              </div>
              <div>
                <p className="text-3xl font-bold font-poppins text-foreground">{card.value}</p>
              </div>
            </Card>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
