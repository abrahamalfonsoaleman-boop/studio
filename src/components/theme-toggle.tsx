
"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  if (!mounted) {
    // Render a placeholder on the server and during initial client render
    return <Button variant="ghost" size="icon" className="h-9 w-9" disabled />
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative overflow-hidden"
    >
      <div
        className="absolute transition-all duration-500 transform-gpu"
        style={{
          transform:
            theme === "dark"
              ? "translateY(-150%) rotate(-90deg)"
              : "translateY(0) rotate(0deg)",
        }}
      >
        <Sun className="h-[1.2rem] w-[1.2rem] text-primary" />
      </div>
      <div
        className="absolute transition-all duration-500 transform-gpu"
        style={{
          transform:
            theme === "dark"
              ? "translateY(0) rotate(0deg)"
              : "translateY(150%) rotate(90deg)",
        }}
      >
        <Moon className="h-[1.2rem] w-[1.2rem] text-primary" />
      </div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
