
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Footer } from "@/components/footer";
import { ScrollAnimator } from "@/components/scroll-animator";
import { CalendarClock, Vote, FileText, Youtube, Video } from "lucide-react";

export default function EleccionesPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex-1">
        <div className="w-full max-w-4xl mx-auto py-12 md:py-20 px-4">
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

          <ScrollAnimator>
            <Card className="w-full mb-12">
              <CardHeader>
                <CardTitle>Detalles del Proceso Electoral</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                  <FileText className="h-6 w-6 text-accent mt-1" />
                  <div>
                    <h3 className="font-semibold">Requisitos</h3>
                    <p className="text-muted-foreground">
                      Consulta los requisitos completos para registrar tu planilla en el <strong>art. 28.5 de los Estatutos</strong>.
                    </p>
                  </div>
                </div>
                 <div className="flex items-start gap-4">
                  <CalendarClock className="h-6 w-6 text-accent mt-1" />
                  <div>
                    <h3 className="font-semibold">Fechas Clave</h3>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1 mt-2">
                        <li><strong>Lunes 6 de octubre:</strong> Convocatoria e inicio de registro.</li>
                        <li><strong>Viernes 17 de octubre 6:00 p.m.:</strong> Cierre de registro.</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollAnimator>

          <ScrollAnimator>
            <Card>
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
                    <source src="/videos/elecciones.mp4" type="video/mp4" />
                    Tu navegador no soporta la reproducción de video.
                  </video>
                </div>
              </CardContent>
            </Card>
          </ScrollAnimator>
        </div>
      </main>
      <Footer />
    </div>
  );
}
