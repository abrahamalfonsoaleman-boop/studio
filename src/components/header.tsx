
"use client"
import Link from "next/link"
import { Menu, Trophy } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ThemeToggle } from "./theme-toggle"

export function Header() {
  const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/deportes", label: "Deportes" },
    { href: "#eventos", label: "Eventos" },
    { href: "#alimentos", label: "Alimentos y Bebidas" },
    { href: "/directorio", label: "Directorio" },
    { href: "#contacto", label: "Contacto" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Trophy className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline text-base text-accent">Club de Lago</span>
        </Link>
        <nav className="hidden md:flex md:items-center md:gap-6 text-xs font-medium">
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
        <div className="flex flex-1 items-center justify-end gap-2">
           <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menú de navegación</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
               <SheetHeader>
                <SheetTitle className="sr-only">Menú de Navegación</SheetTitle>
                <SheetDescription className="sr-only">
                  Una lista de enlaces para navegar por el sitio web.
                </SheetDescription>
              </SheetHeader>
              <Link href="/" className="mr-6 flex items-center space-x-2 mb-6">
                <Trophy className="h-6 w-6 text-primary" />
                <span className="font-bold font-headline text-base text-accent">Club de Lago</span>
              </Link>
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-base font-medium text-foreground/80 hover:text-foreground"
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
