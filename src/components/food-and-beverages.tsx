
"use client"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { UtensilsCrossed, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

const restaurants = [
  {
    name: "Restaurante Las Palmas",
    description: "Desayunos y comidas con un toque casero.",
    image: "/images/Palmas.jpg",
    hint: "restaurant interior",
  },
  {
    name: "Terraza Bar",
    description: "Disfruta de tus bebidas favoritas al aire libre.",
    image: "/images/bar.jpg",
    hint: "terrace bar",
  },
  {
    name: "Snack Brasas",
    description: "Bocadillos y platillos a la parrilla junto a la alberca.",
    image: "/images/brasas.jpg",
    hint: "grill snack bar",
  },
]

export function FoodAndBeverages({className}: {className?: string}) {
  return (
    <section id="alimentos" className={cn("w-full py-8 md:py-12 lg:py-16", className)}>
      <div className="space-y-4 text-center px-4">
        <div className="flex justify-center items-center gap-4 mb-4">
            <UtensilsCrossed className="h-10 w-10 text-primary" />
        </div>
        <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl font-headline">Nuestra Oferta Culinaria</h2>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
          Desde desayunos completos hasta snacks junto a la alberca, tenemos algo para todos los gustos.
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8 mt-12 px-4">
        {restaurants.map((resto) => (
          <Card key={resto.name} className="overflow-hidden group transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
             <div className="relative h-48 w-full">
                <Image
                    src={resto.image}
                    alt={resto.name}
                    data-ai-hint={resto.hint}
                    fill
                    className="object-cover"
                />
            </div>
            <CardHeader>
              <CardTitle className="font-headline text-lg">{resto.name}</CardTitle>
            </CardHeader>
             <CardContent>
                <CardDescription>{resto.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-12">
        <Button size="lg" asChild>
          <Link href="/alimentos">
            Ver Menús Completos
            <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </section>
  )
}
