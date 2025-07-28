"use client"

import Link from "next/link"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Dumbbell, PersonStanding, Waves, Medal } from "lucide-react"

const disciplines = [
  { name: "Tenis", icon: <Medal className="h-12 w-12 text-primary" /> },
  { name: "Fútbol", icon: <Medal className="h-12 w-12 text-primary" /> },
  { name: "Natación", icon: <Waves className="h-12 w-12 text-primary" /> },
  { name: "Gimnasio", icon: <Dumbbell className="h-12 w-12 text-primary" /> },
  { name: "Yoga", icon: <PersonStanding className="h-12 w-12 text-primary" /> },
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

      <Carousel className="w-full max-w-4xl mx-auto" opts={{ align: "start", loop: true }}>
        <CarouselContent className="-ml-4">
          {disciplines.map((discipline, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4 pl-4">
              <Card className="overflow-hidden group transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <CardContent className="flex flex-col items-center justify-center p-8 aspect-square">
                  {discipline.icon}
                  <h3 className="mt-4 text-xl font-semibold text-center">{discipline.name}</h3>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-[-50px] top-1/2 -translate-y-1/2" />
        <CarouselNext className="absolute right-[-50px] top-1/2 -translate-y-1/2" />
      </Carousel>

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
