
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

const comunicados = [
  {
    src: "/images/Comunicados/InfoTorneo.jpeg",
    alt: "Comunicado Torneo de Golf",
    hint: "golf tournament",
  },
  {
    src: "/images/Comunicados/MaratonDelPavo.jpeg",
    alt: "Comunicado Maratón del Pavo",
    hint: "marathon announcement",
  },
  {
    src: "/images/Comunicados/TorneoCancer.jpeg",
    alt: "Comunicado Torneo con Causa",
    hint: "charity tournament",
  },
  {
    src: "/images/Comunicados/Zumba.jpeg",
    alt: "Comunicado Clase de Zumba",
    hint: "zumba class",
  },
]

export function Comunicados({className}: {className?: string}) {
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string; hint: string } | null>(null)

  return (
    <section id="comunicados" className={cn("w-full py-8 md:py-12 lg:py-16", className)}>
      <div className="space-y-4 text-center px-4">
        <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl font-headline">Comunicados</h2>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
          Mantente al día con los últimos avisos y comunicados del Club Del Lago.
        </p>
      </div>
      
      {/* Desktop Grid View */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 px-4">
        {comunicados.map((comunicado, index) => (
          <div
            key={index}
            className="cursor-pointer overflow-hidden rounded-lg group transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            onClick={() => setSelectedImage(comunicado)}
          >
            <Image
              src={comunicado.src}
              alt={comunicado.alt}
              data-ai-hint={comunicado.hint}
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
            {comunicados.map((comunicado, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card className="overflow-hidden" onClick={() => setSelectedImage(comunicado)}>
                    <CardContent className="p-0">
                       <Image
                        src={comunicado.src}
                        alt={comunicado.alt}
                        data-ai-hint={comunicado.hint}
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

      <Dialog open={!!selectedImage} onOpenChange={(isOpen) => !isOpen && setSelectedImage(null)}>
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
