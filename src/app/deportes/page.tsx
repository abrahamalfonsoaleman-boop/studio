
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
  DialogDescription,
} from '@/components/ui/dialog'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Mail, Phone } from 'lucide-react'
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
          <div className="space-y-4 text-center mb-8">
            <h1 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl font-headline">
              Actividades Deportivas
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
              Explora nuestros próximos eventos y clases. ¡Haz clic en un flyer para verlo en grande!
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <Phone className="mr-2 h-5 w-5" />
                  Contacto Deportivo
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Contacto Deportivo</DialogTitle>
                  <DialogDescription>
                    Contacta a nuestra asistente para inscripciones y reservaciones.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                   <div className="flex items-center space-x-4 p-4 rounded-lg border bg-muted/50">
                     <div className="bg-accent text-accent-foreground p-3 rounded-full">
                       <Phone className="h-6 w-6" />
                     </div>
                    <div>
                      <p className="font-semibold text-sm">Cristina Manzanares - Asistente de Deportes</p>
                      <a href="mailto:cmanzanares@clubdelago.com.mx" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300">cmanzanares@clubdelago.com.mx</a>
                      <p className="text-sm text-muted-foreground">Ext. 140</p>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
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
                        className="overflow-hidden cursor-pointer group transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
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
              <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 bg-background/50 hover:bg-background/75 text-foreground transition-all duration-300" />
              <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 bg-background/50 hover:bg-background/75 text-foreground transition-all duration-300" />
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
        </div>
      </main>
      <Footer />
    </div>
  )
}
