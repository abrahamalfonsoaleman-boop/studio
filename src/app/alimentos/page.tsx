
"use client"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Footer } from "@/components/footer";
import { ScrollAnimator } from "@/components/scroll-animator";
import { ClubData } from "@/lib/club-data";
import { UtensilsCrossed, Download } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export default function AlimentosPage() {
  const { menus } = ClubData.ayb;

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex-1">
        <div className="w-full max-w-6xl mx-auto py-12 md:py-20 px-4">
          <ScrollAnimator>
            <div className="text-center mb-12">
              <div className="flex justify-center items-center gap-4 mb-4">
                <UtensilsCrossed className="h-10 w-10 text-primary" />
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
                Alimentos y Bebidas
              </h1>
              <p className="mt-4 max-w-3xl mx-auto text-muted-foreground md:text-lg">
                Explora nuestra oferta culinaria. Desliza para ver nuestros menús y haz clic para ver los platillos.
              </p>
            </div>
          </ScrollAnimator>

          <ScrollAnimator>
             <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full max-w-4xl mx-auto"
            >
              <CarouselContent>
                {menus.map((menu) => (
                  <CarouselItem key={menu.name} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1 h-full">
                       <Card className="flex flex-col overflow-hidden h-full">
                        <div className="relative h-48 w-full">
                          <Image
                            src={menu.image}
                            alt={menu.name}
                            fill
                            className="object-cover"
                            data-ai-hint={menu.hint}
                          />
                        </div>
                        <CardHeader>
                          <CardTitle className="font-headline text-xl">{menu.name}</CardTitle>
                          <CardDescription>{menu.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow flex flex-col">
                          <Accordion type="single" collapsible className="w-full">
                            {menu.categories.map((category) => (
                              <AccordionItem value={category.title} key={category.title}>
                                <AccordionTrigger className="text-base font-semibold">
                                  {category.title}
                                </AccordionTrigger>
                                <AccordionContent>
                                  <ul className="space-y-3">
                                    {category.items.map((item) => (
                                      <li key={item.name} className="flex justify-between items-start gap-4">
                                        <div className="flex-1">
                                          <p className="font-semibold text-sm">{item.name}</p>
                                          {item.description && <p className="text-xs text-muted-foreground">{item.description}</p>}
                                        </div>
                                        <p className="font-bold text-sm text-primary">{item.price}</p>
                                      </li>
                                    ))}
                                  </ul>
                                </AccordionContent>
                              </AccordionItem>
                            ))}
                          </Accordion>
                          {menu.pdfUrl && (
                            <Button asChild className="w-full mt-auto pt-6">
                              <Link href={menu.pdfUrl} target="_blank" rel="noopener noreferrer">
                                <Download className="mr-2 h-4 w-4" />
                                Ver Menú Completo en PDF
                              </Link>
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-[-1rem] sm:left-[-3rem] top-1/2 -translate-y-1/2 z-10" />
              <CarouselNext className="absolute right-[-1rem] sm:right-[-3rem] top-1/2 -translate-y-1/2 z-10" />
            </Carousel>
          </ScrollAnimator>
        </div>
      </main>
      <Footer />
    </div>
  );
}
