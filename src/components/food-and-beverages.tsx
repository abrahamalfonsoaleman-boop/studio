"use client"

import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


const restaurants = [
  {
    name: "Restaurante La Pérgola",
    image: "https://placehold.co/800x600.png",
    hint: "restaurant interior",
    menuImage: "https://placehold.co/600x800.png",
    menuHint: "restaurant menu"
  },
  {
    name: "Snack Bar Hoyo 19",
    image: "https://placehold.co/800x600.png",
    hint: "bar snacks",
    menuImage: "https://placehold.co/600x800.png",
    menuHint: "bar menu"
  },
  {
    name: "Cafetería El Mirador",
    image: "https://placehold.co/800x600.png",
    hint: "coffee shop",
    menuImage: "https://placehold.co/600x800.png",
    menuHint: "cafe menu"
  }
];

export function FoodAndBeverages() {
  return (
    <section id="alimentos" className="w-full">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">Alimentos y Bebidas</h2>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mt-4">
          Una experiencia culinaria para cada momento.
        </p>
      </div>

      <Carousel className="w-full max-w-4xl mx-auto" opts={{ loop: true }}>
        <CarouselContent>
          {restaurants.map((restaurant, index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent className="relative aspect-video p-0">
                  <Image
                    src={restaurant.image}
                    alt={restaurant.name}
                    data-ai-hint={restaurant.hint}
                    fill
                    className="object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center p-6 text-white text-center rounded-lg">
                    <h3 className="text-3xl font-bold mb-4">{restaurant.name}</h3>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>Ver Menú</Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl">
                        <DialogHeader>
                          <DialogTitle>Menú de {restaurant.name}</DialogTitle>
                          <DialogDescription>
                            Explora nuestra deliciosa selección de platillos.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="relative aspect-[3/4] mt-4">
                          <Image
                            src={restaurant.menuImage}
                            alt={`Menú de ${restaurant.name}`}
                            data-ai-hint={restaurant.menuHint}
                            fill
                            className="object-contain rounded-md"
                          />
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-[-2.5rem] top-1/2 -translate-y-1/2" />
        <CarouselNext className="absolute right-[-2.5rem] top-1/2 -translate-y-1/2" />
      </Carousel>
      
      <div className="text-center mt-8">
        <Button size="lg">Ver Todas las Opciones</Button>
      </div>
    </section>
  )
}
