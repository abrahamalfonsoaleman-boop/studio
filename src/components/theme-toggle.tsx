
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
      className="relative h-9 w-9 overflow-hidden"
    >
      <span className="sr-only">Toggle theme</span>
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
          theme === 'dark'
            ? '-translate-y-full opacity-0'
            : 'translate-y-0 opacity-100'
        }`}
      >
        <Sun className="h-[1.2rem] w-[1.2rem] text-primary" />
      </div>
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
          theme === 'dark'
            ? 'translate-y-0 opacity-100'
            : 'translate-y-full opacity-0'
        }`}
      >
        <Moon className="h-[1.2rem] w-[1.2rem] text-primary" />
      </div>
    </Button>
  )
}
