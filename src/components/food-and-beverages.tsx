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
    menu: [
      { item: "Sopa de Tortilla", price: "$120" },
      { item: "Arrachera Norteña", price: "$280" },
      { item: "Enchiladas Suizas", price: "$180" },
    ]
  },
  {
    name: "Snack Bar Hoyo 19",
    image: "https://placehold.co/800x600.png",
    hint: "bar snacks",
    menu: [
      { item: "Club Sándwich", price: "$150" },
      { item: "Alitas BBQ", price: "$170" },
      { item: "Hamburguesa Clásica", price: "$190" },
    ]
  },
  {
    name: "Cafetería El Mirador",
    image: "https://placehold.co/800x600.png",
    hint: "coffee shop",
    menu: [
      { item: "Pan dulce de la casa", price: "$40" },
      { item: "Capuccino", price: "$70" },
      { item: "Jugo de naranja fresco", price: "$60" },
    ]
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
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{restaurant.name}</DialogTitle>
                          <DialogDescription>
                            Disfruta de nuestros platillos estrella.
                          </DialogDescription>
                        </DialogHeader>
                        <ul className="space-y-2">
                          {restaurant.menu.map((item, i) => (
                            <li key={i} className="flex justify-between">
                              <span>{item.item}</span>
                              <span className="font-semibold">{item.price}</span>
                            </li>
                          ))}
                        </ul>
                      </DialogContent>
                    </Dialog>
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
        <Button size="lg">Ver Todas las Opciones</Button>
      </div>
    </section>
  )
}
