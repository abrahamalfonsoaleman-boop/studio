
"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const events = [
  {
    src: "https://placehold.co/600x800.png",
    alt: "Flyer Final del Campeonato",
    hint: "championship flyer",
  },
  {
    src: "https://placehold.co/600x800.png",
    alt: "Flyer Gala de Aniversario",
    hint: "anniversary gala flyer",
  },
  {
    src: "https://placehold.co/600x800.png",
    alt: "Flyer Pruebas Equipo Juvenil",
    hint: "youth tryouts flyer",
  },
  {
    src: "https://placehold.co/600x800.png",
    alt: "Flyer Partido Amistoso",
    hint: "friendly match flyer",
  },
]

export function Events({className}: {className?: string}) {
  const [selectedImage, setSelectedImage] = useState<(typeof events)[0] | null>(null)

  return (
    <section id="eventos" className={cn("w-full py-8 md:py-12 lg:py-16", className)}>
      <div className="space-y-4 text-center px-4">
        <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl font-headline">Próximos Eventos</h2>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
          No te pierdas la acción. ¡Acompáñanos en nuestro próximo gran evento!
        </p>
      </div>
      
      <Dialog open={!!selectedImage} onOpenChange={(isOpen) => !isOpen && setSelectedImage(null)}>
        {/* Desktop Grid View */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 px-4">
          {events.map((event, index) => (
            <div
              key={index}
              className="cursor-pointer overflow-hidden rounded-lg group transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              onClick={() => setSelectedImage(event)}
            >
              <Image
                src={event.src}
                alt={event.alt}
                data-ai-hint={event.hint}
                width={600}
                height={800}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Mobile Carousel View */}
        <div className="md:hidden mt-8">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-xs mx-auto"
          >
            <CarouselContent>
              {events.map((event, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card className="overflow-hidden" onClick={() => setSelectedImage(event)}>
                      <CardContent className="p-0">
                         <Image
                          src={event.src}
                          alt={event.alt}
                          data-ai-hint={event.hint}
                          width={600}
                          height={800}
                          className="h-full w-full object-cover aspect-[3/4]"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-[-1rem] top-1/2 -translate-y-1/2 z-10 h-8 w-8 bg-background/50 hover:bg-background/75 text-foreground transition-all duration-300" />
            <CarouselNext className="absolute right-[-1rem] top-1/2 -translate-y-1/2 z-10 h-8 w-8 bg-background/50 hover:bg-background/75 text-foreground transition-all duration-300" />
          </Carousel>
        </div>

        {selectedImage && (
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>{selectedImage.alt}</DialogTitle>
            </DialogHeader>
            <div className="relative aspect-[3/4] mt-4">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                data-ai-hint={selectedImage.hint}
                fill
                className="object-contain rounded-md"
              />
            </div>
          </DialogContent>
        )}
      </Dialog>
    </section>
  )
}
