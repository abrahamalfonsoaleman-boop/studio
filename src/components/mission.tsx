
"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, Flag, Gem } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

const missionData = [
  {
    icon: <Flag className="h-8 w-8 text-primary" />,
    title: "Misión",
    description: "Ser el mejor club deportivo social y familiar, fomentando la integración y el desarrollo de nuestros socios."
  },
  {
    icon: <Eye className="h-8 w-8 text-primary" />,
    title: "Visión",
    description: "Consolidarnos como un club de excelencia, reconocido por su calidad en servicios e instalaciones."
  },
  {
    icon: <Gem className="h-8 w-8 text-primary" />,
    title: "Valores",
    description: "Respeto, honestidad, compromiso, y trabajo en equipo son los pilares de nuestra comunidad."
  }
];

export function Mission() {
  return (
    <section id="mission" className="w-full">
      <div className="text-center mb-12">
        <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl font-headline">Nuestra Esencia</h2>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg mt-4 px-4">
          Comprometidos con el bienestar y la comunidad.
        </p>
      </div>

      {/* Desktop View */}
      <div className="hidden md:grid md:grid-cols-3 gap-8">
        {missionData.map((item, index) => (
          <Card key={index} className="text-center border-2 border-primary/50 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card">
            <CardHeader className="flex items-center justify-center">
              <div className="p-4 bg-accent/20 rounded-full">
                {item.icon}
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle className="text-xl font-bold mb-2 font-headline">{item.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Mobile Carousel View */}
      <div className="md:hidden">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-xs mx-auto"
        >
          <CarouselContent>
            {missionData.map((item, index) => (
              <CarouselItem key={index} className="basis-full">
                 <div className="p-1">
                  <Card className="text-center border-2 border-primary/50 shadow-lg h-full">
                      <CardHeader className="flex items-center justify-center mb-2">
                        <div className="p-4 bg-accent/20 rounded-full">
                          {item.icon}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <CardTitle className="text-xl font-bold font-headline">{item.title}</CardTitle>
                        <p className="text-sm text-muted-foreground px-4">{item.description}</p>
                      </CardContent>
                    </Card>
                 </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 bg-background/50 hover:bg-background/75 text-foreground transition-all duration-300" />
          <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 bg-background/50 hover:bg-background/75 text-foreground transition-all duration-300" />
        </Carousel>
      </div>
    </section>
  )
}
