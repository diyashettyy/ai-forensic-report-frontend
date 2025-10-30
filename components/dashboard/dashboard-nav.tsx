"use client"

import { useState } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { Menu, X, LogOut, Settings, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DashboardNav() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  const navItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Report Generator", href: "/upload" },
    { label: "About", href: "/about" },
  ]

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2">
          <motion.div whileHover={{ scale: 1.05 }} className="text-2xl font-bold font-poppins text-accent">
            FR
          </motion.div>
          <span className="hidden sm:inline text-foreground font-poppins font-semibold">Forensic Report</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                className="text-foreground hover:text-accent hover:bg-accent/10 transition-colors"
              >
                {item.label}
              </Button>
            </Link>
          ))}
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-foreground hover:text-accent hover:bg-accent/10"
            onClick={toggleTheme}
            suppressHydrationWarning
          >
            {theme === 'light' ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
          <Button variant="ghost" size="icon" className="text-foreground hover:text-accent hover:bg-accent/10">
            <Settings size={20} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-foreground hover:text-accent hover:bg-accent/10"
            onClick={() => (window.location.href = "/login")}
          >
            <LogOut size={20} />
          </Button>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground hover:text-accent transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-border bg-background"
        >
          <div className="px-6 py-4 space-y-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-foreground hover:text-accent hover:bg-accent/10"
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  )
}
