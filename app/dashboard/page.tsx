"use client"

import { motion } from "framer-motion"
import DashboardNav from "@/components/dashboard/dashboard-nav"
import DashboardCharts from "@/components/dashboard/dashboard-charts"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />

      <main className="p-6 md:p-8 max-w-7xl mx-auto">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold font-poppins text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your forensic analysis</p>
        </motion.div>

        {/* Charts Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-8"
        >
          <h2 className="text-xl font-bold font-poppins text-foreground mb-6">Analytics</h2>
          <DashboardCharts />
        </motion.div>
      </main>
    </div>
  )
}
