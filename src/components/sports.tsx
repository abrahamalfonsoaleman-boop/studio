
"use client"

import Link from "next/link"
import React from 'react'
import { Button } from "@/components/ui/button"
import { ArrowRight, Dumbbell, PersonStanding, Waves, Medal, Bike, Footprints } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { cn } from "@/lib/utils"

const BoxingGloveIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M14.4 15.6c.4-.4.6-.9.6-1.4 0-1.1-.9-2-2-2s-2 .9-2 2c0 .5.2 1 .6 1.4"/>
        <path d="M16.2 13.2c.4.4.8.7 1.3.8 1.4.4 2.5 2 2.5 3.5a3 3 0 0 1-3 3c-1.2 0-2.2-.7-2.7-1.7"/>
        <path d="M12 18.2c-.5 1-1.5 1.7-2.7 1.7a3 3 0 0 1-3-3c0-1.5 1.1-3.1 2.5-3.5.5-.1.9-.4 1.3-.8"/>
        <path d="M12 5c-2 0-3.3 1.3-3.3 3S10 11 12 11s3.3-1.3 3.3-3S14 5 12 5Z"/>
        <path d="M12 5V2"/>
    </svg>
)

const disciplines = [
  { name: "Tenis", icon: <Medal className="h-10 w-10 text-primary" /> },
  { name: "Fútbol", icon: <Footprints className="h-10 w-10 text-primary" /> },
  { name: "Natación", icon: <Waves className="h-10 w-10 text-primary" /> },
  { name: "Gimnasio", icon: <Dumbbell className="h-10 w-10 text-primary" /> },
  { name: "Yoga", icon: <PersonStanding className="h-10 w-10 text-primary" /> },
  { name: "Boxeo", icon: <BoxingGloveIcon className="h-10 w-10 text-primary" /> },
];

export function Sports({className}: {className?: string}) {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

  return (
    <section id="deportes" className={cn("w-full py-8 md:py-12 lg:py-16", className)}>
      <div className="space-y-4 text-center px-4">
        <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl font-headline">Disciplinas Deportivas</h2>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg mt-4">
          Encuentra tu pasión y mantente activo con nuestras diversas opciones.
        </p>
      </div>

      {/* Desktop View */}
      <div className="hidden md:flex justify-center items-center gap-8 md:gap-12 flex-wrap mt-12">
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
      <div className="md:hidden mt-8">
        <Carousel
          plugins={[plugin.current]}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-xs mx-auto"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
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
          <CarouselPrevious className="absolute left-[-2.5rem] top-1/2 -translate-y-1/2 z-10 h-8 w-8 bg-background/50 hover:bg-background/75 text-foreground transition-all duration-300" />
          <CarouselNext className="absolute right-[-2.5rem] top-1/2 -translate-y-1/2 z-10 h-8 w-8 bg-background/50 hover:bg-background/75 text-foreground transition-all duration-300" />
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
