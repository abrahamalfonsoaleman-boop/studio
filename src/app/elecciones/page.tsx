
"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Footer } from "@/components/footer";
import { ScrollAnimator } from "@/components/scroll-animator";
import { CalendarClock, Vote, FileText, Video, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function EleccionesPage() {
  const [isPdfOpen, setIsPdfOpen] = useState(false);
  const pdfUrl = "/images/Elecciones2025/EstatutosClub.pdf";

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex-1">
        <Dialog open={isPdfOpen} onOpenChange={setIsPdfOpen}>
          <div className="w-full max-w-6xl mx-auto py-12 md:py-20 px-4">
            <ScrollAnimator>
              <div className="text-center mb-12">
                <div className="flex justify-center items-center gap-4 mb-4">
                  <Vote className="h-12 w-12 text-primary" />
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
                  ¡Se acercan las elecciones de Consejos!
                </h1>
                <p className="mt-4 max-w-3xl mx-auto text-muted-foreground md:text-lg">
                  Prepara tu planilla y participa en este proceso democrático. ¡Tu participación es importante para el futuro de nuestra Asociación!
                </p>
              </div>
            </ScrollAnimator>

            <div className="grid md:grid-cols-2 gap-8 items-start">
              <ScrollAnimator>
                <Card className="w-full">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <Video className="h-8 w-8 text-primary" />
                      <CardTitle>Mensaje del Comité Electoral</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video overflow-hidden rounded-lg bg-black">
                      <video
                        className="w-full h-full"
                        controls
                        preload="metadata"
                      >
                        <source src="/images/Elecciones2025/Convocatoria.mp4" type="video/mp4" />
                        Tu navegador no soporta la reproducción de video.
                      </video>
                    </div>
                  </CardContent>
                </Card>
              </ScrollAnimator>

              <ScrollAnimator>
                <Card className="w-full">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <FileText className="h-8 w-8 text-primary" />
                      <CardTitle>Estatutos y Fechas Clave</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-semibold flex items-center gap-2"><CalendarClock className="h-5 w-5 text-accent" />Fechas Importantes</h3>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1 mt-2 pl-4">
                        <li><strong>Lunes 6 de octubre:</strong> Convocatoria e inicio de registro.</li>
                        <li><strong>Viernes 17 de octubre 6:00 p.m.:</strong> Cierre de registro.</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold">Requisitos y Estatutos</h3>
                      <p className="text-muted-foreground mt-2">
                        Consulta los requisitos completos para registrar tu planilla en el <strong>art. 28.5 de los Estatutos</strong>.
                      </p>
                      <DialogTrigger asChild>
                        <Button className="w-full mt-4" onClick={() => setIsPdfOpen(true)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Ver Estatutos del Club
                        </Button>
                      </DialogTrigger>
                    </div>
                  </CardContent>
                </Card>
              </ScrollAnimator>
            </div>
          </div>

          <DialogContent className="w-full max-w-4xl h-[90vh] flex flex-col p-4">
            <DialogHeader>
              <DialogTitle>Estatutos del Club</DialogTitle>
            </DialogHeader>
            <div className="flex-1 mt-4">
              <iframe
                src={pdfUrl}
                className="w-full h-full rounded-md"
                title="Estatutos del Club"
              />
            </div>
          </DialogContent>
        </Dialog>
      </main>
      <Footer />
    </div>
  );
}
