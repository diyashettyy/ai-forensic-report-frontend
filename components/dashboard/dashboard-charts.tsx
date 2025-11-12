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
  LabelList,
  Label,
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
    { name: "ROUGE-1", accuracy: 49.3 },
    { name: "ROUGE-2", accuracy: 33.8 },
    { name: "ROUGE-L", accuracy: 46.6 },
    { name: "BERTScore", accuracy: 90.2 },
  ]

  const evaluationData = [
    { name: "ROUGE-1", score: 49.3 },
    { name: "ROUGE-2", score: 33.8 },
    { name: "ROUGE-L", score: 46.6 },
    { name: "BERTScore", score: 90.2 },
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
            <LineChart data={[
              { time: 0, value: 47.3396 / 3600 },
              { time: 1, value: 53.5869 / 3600 },
              { time: 2, value: 54.1531 / 3600 },
              { time: 3, value: 65.3968 / 3600 },
              { time: 4, value: 93.3866 / 3600 },
              { time: 5, value: 71.9450 / 3600 },
              { time: 6, value: 58.0315 / 3600 },
              { time: 7, value: 123.4622 / 3600 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2d3e50" />
              <XAxis dataKey="time" stroke="#8b8c8e" />
              <YAxis stroke="#8b8c8e" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2833",
                  border: "1px solid #2d3e50",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#c5c6c7" }}
              />
              <Legend
                wrapperStyle={{ paddingTop: '20px' }}
                iconType="circle"
                formatter={() => <span style={{ color: '#45a29e' }}>time</span>}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#45a29e"
                strokeWidth={2}
                dot={{ fill: "#45a29e", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
                name="time"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </motion.div>

      {/* Model Accuracy Trends Chart */}
      <motion.div variants={itemVariants}>
        <Card className="glass-card card-hover p-6">
          <h3 className="text-lg font-semibold font-poppins text-foreground mb-4">Model Evaluation (ROUGE & BERTScore)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={accuracyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2d3e50" />
              <XAxis dataKey="name" stroke="#8b8c8e" />
              <YAxis stroke="#8b8c8e" domain={[0, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2833",
                  border: "1px solid #2d3e50",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#c5c6c7" }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Bar dataKey="accuracy" name="Score %" fill="#45a29e" radius={[8, 8, 0, 0]}>
                <LabelList dataKey="accuracy" position="top" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </motion.div>
    </motion.div>
  )
}
