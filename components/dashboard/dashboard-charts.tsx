"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

export default function DashboardCharts() {
  const processingTimeData = [
    { name: "Mon", time: 2.4 },
    { name: "Tue", time: 1.3 },
    { name: "Wed", time: 2.0 },
    { name: "Thu", time: 2.78 },
    { name: "Fri", time: 1.9 },
    { name: "Sat", time: 2.39 },
    { name: "Sun", time: 2.48 },
  ]

  const accuracyData = [
    { name: "Model v1", accuracy: 89 },
    { name: "Model v2", accuracy: 91 },
    { name: "Model v3", accuracy: 94 },
    { name: "Model v4", accuracy: 96 },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
      className="grid grid-cols-1 lg:grid-cols-2 gap-6"
    >
      {/* Processing Time Chart */}
      <motion.div variants={itemVariants}>
        <Card className="glass-card card-hover p-6">
          <h3 className="text-lg font-semibold font-poppins text-foreground mb-4">Processing Time (hours)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={processingTimeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2d3e50" />
              <XAxis stroke="#8b8c8e" />
              <YAxis stroke="#8b8c8e" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2833",
                  border: "1px solid #2d3e50",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#c5c6c7" }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="time"
                stroke="#66fcf1"
                strokeWidth={2}
                dot={{ fill: "#45a29e", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </motion.div>

      {/* Accuracy Trends Chart */}
      <motion.div variants={itemVariants}>
        <Card className="glass-card card-hover p-6">
          <h3 className="text-lg font-semibold font-poppins text-foreground mb-4">Model Accuracy Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={accuracyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2d3e50" />
              <XAxis stroke="#8b8c8e" />
              <YAxis stroke="#8b8c8e" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2833",
                  border: "1px solid #2d3e50",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#c5c6c7" }}
              />
              <Legend />
              <Bar dataKey="accuracy" fill="#45a29e" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </motion.div>
    </motion.div>
  )
}
