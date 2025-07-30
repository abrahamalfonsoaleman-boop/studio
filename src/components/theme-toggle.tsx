
"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative overflow-hidden group"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] transform text-primary transition-all duration-500 ease-in-out group-hover:rotate-[15deg] dark:-translate-y-8 dark:scale-50 dark:opacity-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] transform text-primary transition-all duration-500 ease-in-out group-hover:-rotate-[15deg] translate-y-8 scale-50 opacity-0 dark:translate-y-0 dark:scale-100 dark:opacity-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
