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
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">Nuestra Esencia</h2>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mt-4">
          Comprometidos con el bienestar y la comunidad.
        </p>
      </div>

      {/* Desktop View */}
      <div className="hidden md:grid md:grid-cols-3 gap-8">
        {missionData.map((item, index) => (
          <Card key={index} className="text-center border-0 shadow-none bg-transparent">
            <CardHeader className="flex items-center justify-center">
              <div className="p-4 bg-primary/10 rounded-full">
                {item.icon}
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle className="text-2xl font-bold mb-2">{item.title}</CardTitle>
              <p className="text-muted-foreground">{item.description}</p>
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
                 <Card className="text-center border-0 shadow-none bg-transparent">
                    <CardHeader className="flex items-center justify-center">
                      <div className="p-4 bg-primary/10 rounded-full">
                        {item.icon}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardTitle className="text-2xl font-bold mb-2">{item.title}</CardTitle>
                      <p className="text-muted-foreground px-4">{item.description}</p>
                    </CardContent>
                  </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-[-20px] top-1/2 -translate-y-1/2" />
          <CarouselNext className="absolute right-[-20px] top-1/2 -translate-y-1/2" />
        </Carousel>
      </div>
    </section>
  )
}
