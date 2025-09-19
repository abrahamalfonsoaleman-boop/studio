
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
import { cn } from "@/lib/utils";


const restaurants = [
  {
    name: "Restaurante Las Palmas",
    image: "/images/Palmas.jpg",
    hint: "restaurant interior",
    menus: [
        {
            label: "Ver Menú Desayunos",
            images: [
                "/images/MenuRestaurantePalmasDesayuno/MenuRestaurantePalmasDesayuno-1.jpg",
                "/images/MenuRestaurantePalmasDesayuno/MenuRestaurantePalmasDesayuno-2.jpg",
                "/images/MenuRestaurantePalmasDesayuno/MenuRestaurantePalmasDesayuno-3.jpg",
                "/images/MenuRestaurantePalmasDesayuno/MenuRestaurantePalmasDesayuno-4.jpg",
            ],
            hint: "breakfast menu"
        },
        {
            label: "Ver Menú Comidas",
            images: [
                "/images/MenuRestaurantePalmasComida/MenuRestaurantePalmasComida-1.jpg",
                "/images/MenuRestaurantePalmasComida/MenuRestaurantePalmasComida-2.jpg",
                "/images/MenuRestaurantePalmasComida/MenuRestaurantePalmasComida-3.jpg",
                "/images/MenuRestaurantePalmasComida/MenuRestaurantePalmasComida-4.jpg",
            ],
            hint: "lunch menu"
        }
    ]
  },
  {
    name: "Restaurante Terraza Bar",
    image: "/images/bar.jpg",
    hint: "terrace bar",
    menus: [
        {
            label: "Ver Menú",
            images: [
                "/images/MenuBarTerraza/MenuBarTerraza-1.jpg",
                "/images/MenuBarTerraza/MenuBarTerraza-2.jpg",
            ],
            hint: "bar menu"
        }
    ]
  },
  {
    name: "Snack Brasas",
    image: "/images/brasas.jpg",
    hint: "grill snack bar",
    menus: [
        {
            label: "Ver Menú",
            images: [
                "/images/MenuSnackBrasas/MenuSnackBrasas-1.jpg",
            ],
            hint: "cafe menu"
        }
    ]
  }
];

export function FoodAndBeverages({className}: {className?: string}) {
  return (
    <section id="alimentos" className={cn("w-full", className)}>
      <div className="text-center mb-12 px-4">
        <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl font-headline">Alimentos y Bebidas</h2>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg mt-4">
          Una experiencia culinaria para cada momento.
        </p>
      </div>

      <Carousel className="w-full max-w-4xl mx-auto" opts={{ loop: true }}>
        <CarouselContent>
          {restaurants.map((restaurant, index) => (
            <CarouselItem key={index}>
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="relative aspect-video p-0">
                  <Image
                    src={restaurant.image}
                    alt={restaurant.name}
                    data-ai-hint={restaurant.hint}
                    fill
                    className="object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-6 text-white text-center rounded-lg">
                    <h3 className="text-2xl font-bold mb-4 font-headline">{restaurant.name}</h3>
                    <div className="flex gap-4">
                        {restaurant.menus.map((menu, menuIndex) => (
                             <Dialog key={menuIndex}>
                                <DialogTrigger asChild>
                                    <Button variant="secondary">{menu.label}</Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-xl">
                                    <DialogHeader>
                                    <DialogTitle>{menu.label} - {restaurant.name}</DialogTitle>
                                    <DialogDescription>
                                        Explora nuestra deliciosa selección de platillos.
                                    </DialogDescription>
                                    </DialogHeader>
                                    <Carousel opts={{ loop: true }} className="w-full">
                                    <CarouselContent>
                                        {menu.images.map((image, imgIndex) => (
                                        <CarouselItem key={imgIndex}>
                                            <div className="relative w-full aspect-[3/4]">
                                            <Image
                                                src={image}
                                                alt={`Menú página ${imgIndex + 1}`}
                                                data-ai-hint={menu.hint}
                                                fill
                                                className="object-contain rounded-md"
                                            />
                                            </div>
                                        </CarouselItem>
                                        ))}
                                    </CarouselContent>
                                    <CarouselPrevious className="absolute left-[-2rem] top-1/2 -translate-y-1/2 z-10" />
                                    <CarouselNext className="absolute right-[-2rem] top-1/2 -translate-y-1/2 z-10" />
                                    </Carousel>
                                </DialogContent>
                            </Dialog>
                        ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-[-2.5rem] top-1/2 -translate-y-1/2" />
        <CarouselNext className="absolute right-[-2.5rem] top-1/2 -translate-y-1/2" />
      </Carousel>
    </section>
  )
}
