"use client"

import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const disciplines = [
  {
    name: "Tenis",
    image: "https://placehold.co/600x400.png",
    hint: "tennis court"
  },
  {
    name: "Fútbol",
    image: "https://placehold.co/600x400.png",
    hint: "soccer field"
  },
  {
    name: "Natación",
    image: "https://placehold.co/600x400.png",
    hint: "swimming pool"
  },
  {
    name: "Gimnasio",
    image: "https://placehold.co/600x400.png",
    hint: "gym equipment"
  },
  {
    name: "Yoga",
    image: "https://placehold.co/600x400.png",
    hint: "yoga class"
  }
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

      <Carousel className="w-full max-w-6xl mx-auto" opts={{ align: "start", loop: true }}>
        <CarouselContent className="-ml-4">
          {disciplines.map((discipline, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
              <Card className="overflow-hidden group">
                <CardContent className="p-0 relative">
                  <Image
                    src={discipline.image}
                    alt={discipline.name}
                    data-ai-hint={discipline.hint}
                    width={600}
                    height={400}
                    className="object-cover aspect-[3/2] transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-end p-4">
                    <h3 className="text-2xl font-bold text-white">{discipline.name}</h3>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-[-50px] top-1/2 -translate-y-1/2" />
        <CarouselNext className="absolute right-[-50px] top-1/2 -translate-y-1/2" />
      </Carousel>

      <div className="text-center mt-8">
        <Button size="lg">
          Ver Todas las Disciplinas
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </section>
  )
}
