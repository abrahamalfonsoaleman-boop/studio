"use client"
import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"
import { getSummary } from "@/app/actions"
import { Newspaper, Sparkles } from "lucide-react"

type Article = {
  title: string;
  image: string;
  image_hint: string;
  description: string;
  content: string;
};

const newsData: Article[] = [
  {
    title: "El club asegura la victoria en un derbi emocionante",
    image: "https://placehold.co/600x400.png",
    image_hint: "team celebration",
    description: "Un gol de último minuto selló la victoria contra nuestros rivales...",
    content: "En un encuentro de infarto que tuvo a los aficionados al borde de sus asientos, el Club Del Lago consiguió una dramática victoria por 2-1 sobre sus más feroces rivales, los City Rovers. El partido, disputado bajo los focos del Gran Estadio, fue un testimonio de la resistencia y la destreza táctica del equipo. La primera parte vio a ambos equipos enfrascados en una reñida batalla, con pocas ocasiones claras. El marcador se abrió en el minuto 55, cuando nuestro delantero estrella, Leo Martínez, aprovechó un error defensivo para ponernos por delante. Sin embargo, los Rovers respondieron rápidamente, empatando de falta directa solo diez minutos después. El partido parecía destinado al empate hasta el minuto 92, cuando la centrocampista suplente, Clara Jensen, desató un impresionante disparo desde lejos que se coló por la escuadra, haciendo estallar de júbilo al público local. El entrenador David Chen elogió el 'espíritu inquebrantable' del equipo y dedicó la victoria a los fieles seguidores que llenaron el estadio.",
  },
  {
    title: "Se inaugura una nueva instalación de entrenamiento",
    image: "https://placehold.co/600x400.png",
    image_hint: "training facility",
    description: "El club presenta su centro de entrenamiento de última generación...",
    content: "El Club Del Lago ha inaugurado oficialmente su nueva y multimillonaria instalación de entrenamiento, un proyecto que señala la ambición del club por el éxito futuro. El 'Lago Performance Center' cuenta con dos campos de tamaño completo, un gimnasio de primera clase, una piscina de hidroterapia y avanzados laboratorios de ciencias del deporte. A la ceremonia de inauguración asistieron directivos del club, jugadores y personalidades locales. La presidenta del club, María Sánchez, describió la instalación como 'un cambio de juego' que proporcionará a nuestros jugadores el mejor entorno posible para desarrollarse y destacar. El centro no solo servirá al primer equipo, sino también a la academia juvenil del club, formando a la próxima generación de talentos. Esta inversión subraya el compromiso del club con el crecimiento a largo plazo y su consolidación como una potencia en el deporte.",
  },
];

export function News() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSummarize = async () => {
    if (!selectedArticle) return;
    setIsLoading(true);
    setSummary(null);
    try {
      const result = await getSummary(selectedArticle.content);
      if(result.summary) {
        setSummary(result.summary);
      } else {
        throw new Error("No se pudo generar el resumen.");
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "No se pudo generar el resumen. Por favor, inténtelo de nuevo más tarde.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const openDialog = (article: Article) => {
    setSelectedArticle(article);
    setSummary(null);
    setIsLoading(false);
  }

  return (
    <section id="news" className="w-full">
      <div className="space-y-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">Últimas Noticias</h2>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
          Mantente al día con las últimas historias del Club Del Lago.
        </p>
      </div>
      <div className="mx-auto mt-12 grid gap-8 sm:grid-cols-1 md:grid-cols-2">
        {newsData.map((article, index) => (
          <Card key={index} className="flex flex-col">
            <CardHeader>
              <Image
                src={article.image}
                alt={article.title}
                data-ai-hint={article.image_hint}
                width={600}
                height={400}
                className="rounded-t-lg object-cover aspect-[3/2]"
              />
            </CardHeader>
            <CardContent className="flex-grow">
              <CardTitle className="font-headline text-xl mb-2">{article.title}</CardTitle>
              <CardDescription>{article.description}</CardDescription>
            </CardContent>
            <CardFooter>
              <Button onClick={() => openDialog(article)} className="w-full">
                <Newspaper className="mr-2 h-4 w-4" />
                Leer Más y Resumir
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Dialog open={!!selectedArticle} onOpenChange={(isOpen) => !isOpen && setSelectedArticle(null)}>
        <DialogContent className="sm:max-w-3xl">
          {selectedArticle && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-headline">{selectedArticle.title}</DialogTitle>
                <DialogDescription>Artículo completo a continuación. Utilice nuestra herramienta de IA para obtener un resumen rápido.</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold mb-2">Historia Completa</h3>
                  <ScrollArea className="h-72 pr-4">
                    <p className="text-sm text-muted-foreground">{selectedArticle.content}</p>
                  </ScrollArea>
                </div>
                <div className="flex flex-col">
                  <h3 className="font-bold mb-2">Resumen con IA</h3>
                  <div className="flex-grow rounded-md border border-dashed p-4 flex flex-col justify-center items-center bg-muted/50">
                    {isLoading ? (
                      <div className="space-y-2 w-full">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                      </div>
                    ) : summary ? (
                      <p className="text-sm">{summary}</p>
                    ) : (
                      <p className="text-sm text-muted-foreground text-center">Haz clic en el botón para generar un resumen.</p>
                    )}
                  </div>
                  <Button onClick={handleSummarize} disabled={isLoading} className="mt-4 w-full bg-accent text-accent-foreground hover:bg-accent/90">
                    <Sparkles className="mr-2 h-4 w-4" />
                    {isLoading ? "Generando..." : "Resumir con IA"}
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
