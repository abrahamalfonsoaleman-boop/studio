
"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Dumbbell, PersonStanding, Waves, Medal } from "lucide-react"

const disciplines = [
  { name: "Tenis", icon: <Medal className="h-10 w-10 text-primary" /> },
  { name: "Fútbol", icon: <Medal className="h-10 w-10 text-primary" /> },
  { name: "Natación", icon: <Waves className="h-10 w-10 text-primary" /> },
  { name: "Gimnasio", icon: <Dumbbell className="h-10 w-10 text-primary" /> },
  { name: "Yoga", icon: <PersonStanding className="h-10 w-10 text-primary" /> },
];

export function Sports() {
  return (
    <section id="deportes" className="w-full">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">Disciplinas Deportivas</h2>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mt-4">
          Encuentra tu pasión y mantente activo con nuestras diversas opciones.
        </p>
      </div>

      <div className="flex justify-center items-center gap-8 md:gap-12 flex-wrap">
        {disciplines.map((discipline, index) => (
          <div key={index} className="flex flex-col items-center justify-center gap-2 group">
            <div className="bg-card h-28 w-28 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out group-hover:shadow-lg group-hover:-translate-y-1 border">
              {discipline.icon}
            </div>
            <h3 className="text-lg font-semibold">{discipline.name}</h3>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Button size="lg" asChild>
          <Link href="/deportes">
            Ver Todas las Actividades
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </section>
  )
}
