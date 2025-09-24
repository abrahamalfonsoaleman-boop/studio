
"use client"
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Footer } from "@/components/footer";
import { ScrollAnimator } from "@/components/scroll-animator";
import { ClubData } from "@/lib/club-data";
import { UtensilsCrossed, Eye } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function AlimentosPage() {
  const { menus } = ClubData.ayb;
  const [selectedMenu, setSelectedMenu] = useState<(typeof menus)[0] | null>(null);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex-1">
        <Dialog open={!!selectedMenu} onOpenChange={(isOpen) => !isOpen && setSelectedMenu(null)}>
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
                  Explora nuestra oferta culinaria. Haz clic en cualquier opción para ver el menú completo.
                </p>
              </div>
            </ScrollAnimator>

            <ScrollAnimator>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                      <CardDescription>{menu.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow flex flex-col justify-end">
                      {menu.pdfUrl && (
                        <DialogTrigger asChild>
                          <Button className="w-full mt-auto" onClick={() => setSelectedMenu(menu)}>
                            <Eye className="mr-2 h-4 w-4" />
                            Ver Menú
                          </Button>
                        </DialogTrigger>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollAnimator>
          </div>
          {selectedMenu && (
            <DialogContent className="w-full max-w-3xl h-[90vh] flex flex-col p-4">
              <DialogHeader>
                <DialogTitle>{selectedMenu.name}</DialogTitle>
              </DialogHeader>
              <div className="flex-1 mt-4">
                <iframe
                  src={selectedMenu.pdfUrl}
                  className="w-full h-full"
                  title={`Menú de ${selectedMenu.name}`}
                />
              </div>
            </DialogContent>
          )}
        </Dialog>
      </main>
      <Footer />
    </div>
  );
}
