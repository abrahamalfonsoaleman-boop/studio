
"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
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
                "/images/MenuRestaurantePalmasDesayunos/LAS PALMAS DESAYUNOS (A4) (1)_page-0001.jpg",
                "/images/MenuRestaurantePalmasDesayunos/LAS PALMAS DESAYUNOS (A4) (1)_page-0002.jpg",
                "/images/MenuRestaurantePalmasDesayunos/LAS PALMAS DESAYUNOS (A4) (1)_page-0003.jpg",
                "/images/MenuRestaurantePalmasDesayunos/LAS PALMAS DESAYUNOS (A4) (1)_page-0004.jpg",
            ],
            hint: "breakfast menu"
        },
        {
            label: "Ver Menú Comidas",
            images: [
                "/images/MenuRestaurantePalmasComida/MENU COMIDA (1)_page-0001.jpg",
                "/images/MenuRestaurantePalmasComida/MENU COMIDA (1)_page-0002.jpg",
                "/images/MenuRestaurantePalmasComida/MENU COMIDA (1)_page-0003.jpg",
                "/images/MenuRestaurantePalmasComida/MENU COMIDA (1)_page-0004.jpg",
                "/images/MenuRestaurantePalmasComida/MENU COMIDA (1)_page-0005.jpg",
                "/images/MenuRestaurantePalmasComida/MENU COMIDA (1)_page-0006.jpg",
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
                "/images/MenuBarTerraza/MENÚ BAR_page-0001.jpg",
                "/images/MenuBarTerraza/MENÚ BAR_page-0002.jpg",
                "/images/MenuBarTerraza/MENÚ BAR_page-0003.jpg",
                "/images/MenuBarTerraza/MENÚ BAR_page-0004.jpg",
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
                "/images/MenuSnackBrasas/MENÚ SNACK_page-0001.jpg",
                "/images/MenuSnackBrasas/MENÚ SNACK_page-0002.jpg",
                "/images/MenuSnackBrasas/MENÚ SNACK_page-0003.jpg",
                "/images/MenuSnackBrasas/MENÚ SNACK_page-0004.jpg",
                "/images/MenuSnackBrasas/MENÚ SNACK_page-0005.jpg",
                "/images/MenuSnackBrasas/MENÚ SNACK_page-0006.jpg",
            ],
            hint: "cafe menu"
        }
    ]
  }
];

type MenuState = {
    menu: (typeof restaurants)[0]['menus'][0] | null;
    page: number;
    restaurantName: string;
};

export function FoodAndBeverages({className}: {className?: string}) {
  const [activeMenu, setActiveMenu] = useState<MenuState>({ menu: null, page: 0, restaurantName: "" });

  const handleOpenMenu = (menu: (typeof restaurants)[0]['menus'][0], restaurantName: string) => {
    setActiveMenu({ menu, page: 0, restaurantName });
  };

  const handleCloseMenu = () => {
    setActiveMenu({ menu: null, page: 0, restaurantName: "" });
  };

  const handleNextPage = () => {
    if (activeMenu.menu && activeMenu.page < activeMenu.menu.images.length - 1) {
      setActiveMenu(prev => ({ ...prev, page: prev.page + 1 }));
    }
  };

  const handlePrevPage = () => {
    if (activeMenu.menu && activeMenu.page > 0) {
      setActiveMenu(prev => ({ ...prev, page: prev.page - 1 }));
    }
  };


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
                             <Button key={menuIndex} variant="secondary" onClick={() => handleOpenMenu(menu, restaurant.name)}>
                                {menu.label}
                             </Button>
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

      <Dialog open={!!activeMenu.menu} onOpenChange={(isOpen) => !isOpen && handleCloseMenu()}>
        <DialogContent className="max-w-xl">
            {activeMenu.menu && (
                <>
                    <DialogHeader>
                        <DialogTitle>{activeMenu.menu.label} - {activeMenu.restaurantName}</DialogTitle>
                        <DialogDescription>
                            Página {activeMenu.page + 1} de {activeMenu.menu.images.length}
                        </DialogDescription>
                    </DialogHeader>
                    
                    <div className="relative w-full aspect-[3/4] mt-4">
                        <Image
                            src={activeMenu.menu.images[activeMenu.page]}
                            alt={`Menú página ${activeMenu.page + 1}`}
                            data-ai-hint={activeMenu.menu.hint}
                            fill
                            className="object-contain rounded-md"
                        />
                    </div>

                    <div className="flex justify-between items-center mt-4">
                        <Button onClick={handlePrevPage} disabled={activeMenu.page === 0} variant="outline">
                            <ChevronLeft className="mr-2 h-4 w-4" /> Anterior
                        </Button>
                        <Button onClick={handleNextPage} disabled={activeMenu.page === activeMenu.menu.images.length - 1} variant="outline">
                            Siguiente <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </>
            )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
