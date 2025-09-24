
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Download, UtensilsCrossed } from "lucide-react";
import { Footer } from "@/components/footer";
import { ScrollAnimator } from "@/components/scroll-animator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const menus = [
  {
    name: "Restaurante Las Palmas - Desayunos",
    image: "/images/Palmas.jpg",
    hint: "restaurant interior",
    pdfUrl: "/menus/LAS PALMAS DESAYUNOS.pdf",
  },
  {
    name: "Restaurante Las Palmas - Comidas",
    image: "/images/Palmas.jpg",
    hint: "restaurant interior",
    pdfUrl: "/menus/LAS PALMAS COMIDAS.pdf",
  },
  {
    name: "Restaurante Terraza Bar",
    image: "/images/bar.jpg",
    hint: "terrace bar",
    pdfUrl: "/menus/MENU BAR TERRAZA.pdf",
  },
  {
    name: "Snack Brasas",
    image: "/images/brasas.jpg",
    hint: "grill snack bar",
    pdfUrl: "/menus/MENU SNACK BRASAS.pdf",
  },
];

export default function AlimentosPage() {
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
                Explora nuestra oferta culinaria. Haz clic en cualquier menú para verlo en detalle o descargarlo.
              </p>
            </div>
          </ScrollAnimator>

          <ScrollAnimator>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {menus.map((menu) => (
                <Card key={menu.name} className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
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
                  </CardHeader>
                  <CardContent className="flex-grow flex items-end">
                    <Button asChild className="w-full">
                      <Link href={menu.pdfUrl} target="_blank" rel="noopener noreferrer">
                        <Download className="mr-2 h-4 w-4" />
                        Ver / Descargar Menú
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollAnimator>
        </div>
      </main>
      <Footer />
    </div>
  );
}
