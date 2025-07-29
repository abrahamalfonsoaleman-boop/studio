
"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Dumbbell, PersonStanding, Waves, Medal, Bike, Footprints } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

const disciplines = [
  { name: "Tenis", icon: <Medal className="h-10 w-10 text-primary" /> },
  { name: "Fútbol", icon: <Footprints className="h-10 w-10 text-primary" /> },
  { name: "Natación", icon: <Waves className="h-10 w-10 text-primary" /> },
  { name: "Gimnasio", icon: <Dumbbell className="h-10 w-10 text-primary" /> },
  { name: "Yoga", icon: <PersonStanding className="h-10 w-10 text-primary" /> },
  { name: "Ciclismo", icon: <Bike className="h-10 w-10 text-primary" /> },
];

export function Sports() {
  return (
    <section id="deportes" className="w-full">
      <div className="text-center mb-12">
        <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl font-headline">Disciplinas Deportivas</h2>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg mt-4">
          Encuentra tu pasión y mantente activo con nuestras diversas opciones.
        </p>
      </div>

      {/* Desktop View */}
      <div className="hidden md:flex justify-center items-center gap-8 md:gap-12 flex-wrap">
        {disciplines.map((discipline, index) => (
          <div key={index} className="flex flex-col items-center justify-center gap-2 group">
            <div className="bg-card h-32 w-32 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out group-hover:shadow-lg group-hover:-translate-y-2 border-2 border-primary/50 group-hover:border-accent">
              {discipline.icon}
            </div>
            <h3 className="text-base font-semibold mt-2 font-headline transition-colors duration-300 group-hover:text-accent">{discipline.name}</h3>
          </div>
        ))}
      </div>
      
      {/* Mobile Carousel View */}
      <div className="md:hidden">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-xs mx-auto"
        >
          <CarouselContent>
            {disciplines.map((discipline, index) => (
              <CarouselItem key={index} className="basis-1/3">
                 <div className="flex flex-col items-center justify-center gap-2 group p-1">
                    <div className="bg-card h-24 w-24 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out group-hover:shadow-lg group-hover:-translate-y-1 border-2 border-primary/50 group-hover:border-accent">
                      {discipline.icon}
                    </div>
                    <h3 className="text-sm font-semibold text-center font-headline transition-colors duration-300 group-hover:text-accent">{discipline.name}</h3>
                  </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2" />
          <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2" />
        </Carousel>
      </div>


      <div className="text-center mt-12">
        <Button size="lg" asChild>
          <Link href="/deportes">
            Ver Todas las Actividades
            <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </section>
  )
}
