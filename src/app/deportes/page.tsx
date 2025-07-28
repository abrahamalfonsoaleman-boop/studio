
"use client"
import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Phone } from 'lucide-react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'

const flyers = [
  {
    src: 'https://placehold.co/600x800.png',
    alt: 'Flyer Torneo de Tenis',
    hint: 'tennis tournament flyer',
  },
  {
    src: 'https://placehold.co/600x800.png',
    alt: 'Flyer Clases de Natación',
    hint: 'swimming classes flyer',
  },
  {
    src: 'https://placehold.co/600x800.png',
    alt: 'Flyer Liga de Fútbol',
    hint: 'soccer league flyer',
  },
  {
    src: 'https://placehold.co/600x800.png',
    alt: 'Flyer Reto de Gimnasio',
    hint: 'gym challenge flyer',
  },
]

export default function DeportesPage() {
  const [selectedFlyer, setSelectedFlyer] = useState<{ src: string; alt: string; hint: string } | null>(null)

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 md:px-6 md:py-12 lg:py-16">
          <div className="space-y-4 text-center mb-12">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
              Actividades Deportivas
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Explora nuestros próximos eventos y clases. ¡Haz clic en un flyer para verlo en grande!
            </p>
          </div>

          <Dialog onOpenChange={(isOpen) => !isOpen && setSelectedFlyer(null)}>
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl mx-auto"
            >
              <CarouselContent>
                {flyers.map((flyer, index) => (
                  <CarouselItem key={index} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                    <DialogTrigger asChild>
                      <Card 
                        className="overflow-hidden cursor-pointer group transform transition-transform duration-300 hover:scale-105"
                        onClick={() => setSelectedFlyer(flyer)}
                      >
                        <CardContent className="p-0">
                           <Image
                            src={flyer.src}
                            alt={flyer.alt}
                            data-ai-hint={flyer.hint}
                            width={600}
                            height={800}
                            className="h-full w-full object-cover aspect-[3/4]"
                          />
                        </CardContent>
                      </Card>
                    </DialogTrigger>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-[-2rem] top-1/2 -translate-y-1/2" />
              <CarouselNext className="absolute right-[-2rem] top-1/2 -translate-y-1/2" />
            </Carousel>
             {selectedFlyer && (
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>{selectedFlyer.alt}</DialogTitle>
                </DialogHeader>
                <div className="relative aspect-[3/4] mt-4">
                  <Image
                    src={selectedFlyer.src}
                    alt={selectedFlyer.alt}
                    data-ai-hint={selectedFlyer.hint}
                    fill
                    className="object-contain rounded-md"
                  />
                </div>
              </DialogContent>
            )}
          </Dialog>

          <div className="text-center mt-16 p-8 border rounded-lg bg-card">
            <h2 className="text-2xl font-bold mb-4 font-headline">¿Listo para unirte?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Para inscripciones, reservaciones o más información sobre nuestras actividades deportivas, contacta a nuestro asistente deportivo.
            </p>
            <Button size="lg">
              <Phone className="mr-2 h-5 w-5" />
              Separar y Contactar
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Asistente Deportivo: (123) 456-7890 | deportes@clubdellago.com
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
