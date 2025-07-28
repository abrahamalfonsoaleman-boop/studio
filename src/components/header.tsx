"use client"
import Link from "next/link"
import { Menu, Trophy } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Header() {
  const navLinks = [
    { href: "#about", label: "Nosotros" },
    { href: "#events", label: "Eventos" },
    { href: "#news", label: "Noticias" },
    { href: "#roster", label: "Equipos" },
    { href: "#gallery", label: "Galería" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="#" className="mr-6 flex items-center space-x-2">
          <Trophy className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline text-lg">Club Del Lago</span>
        </Link>
        <nav className="hidden md:flex md:items-center md:gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menú de navegación</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <Link href="#" className="mr-6 flex items-center space-x-2 mb-6">
                <Trophy className="h-6 w-6 text-primary" />
                <span className="font-bold font-headline">Club Del Lago</span>
              </Link>
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-lg font-medium text-foreground/80 hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
