
"use client"
import Link from "next/link"
import { Menu } from "lucide-react"
import Image from "next/image"

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
    { href: "/eventos", label: "Eventos" },
    { href: "/alimentos", label: "Alimentos y Bebidas" },
    { href: "/directorio", label: "Directorio" },
    { href: "/delagoapp", label: "DelagoApp" },
    { href: "/contacto", label: "Contacto" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4 md:px-6">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Image src="/images/Logo-vector.png" alt="Club de Lago Logo" width={40} height={40} className="transition-transform duration-300 group-hover:rotate-12" />
          <span className="font-bold font-headline text-base text-accent transition-colors duration-300 hover:text-primary">Club de Lago</span>
        </Link>
        <nav className="hidden md:flex md:items-center md:gap-6 text-xs font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors duration-300 hover:text-foreground/80 text-foreground/60"
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
              <Link href="/" className="mr-6 flex items-center space-x-2 mb-6 group">
                 <Image src="/images/Logo-vector.png" alt="Club de Lago Logo" width={40} height={40} className="transition-transform duration-300 group-hover:rotate-12" />
                <span className="font-bold font-headline text-base text-accent">Club de Lago</span>
              </Link>
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-base font-medium text-foreground/80 transition-colors duration-300 hover:text-foreground"
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
