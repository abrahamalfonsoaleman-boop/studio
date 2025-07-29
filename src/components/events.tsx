
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, MapPin } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

export function Events() {
  const events = [
    {
      title: "Final del Campeonato",
      date: "2024-08-15",
      time: "19:00",
      location: "Gran Estadio",
    },
    {
      title: "Gala de Aniversario del Club",
      date: "2024-09-01",
      time: "20:00",
      location: "Salón de Banquetes Lakeside",
    },
    {
      title: "Pruebas para el Equipo Juvenil",
      date: "2024-09-10",
      time: "09:00",
      location: "Campos de Entrenamiento",
    },
    {
      title: "Partido Amistoso vs. Rivales",
      date: "2024-09-22",
      time: "15:00",
      location: "Estadio Local",
    },
  ]

  return (
    <section id="eventos" className="w-full">
      <div className="space-y-4 text-center">
        <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl font-headline">Próximos Eventos</h2>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
          No te pierdas la acción. ¡Acompáñanos en nuestro próximo gran evento!
        </p>
      </div>
      
      {/* Desktop Grid View */}
      <div className="mx-auto mt-12 hidden gap-6 md:grid md:grid-cols-2 lg:grid-cols-2">
        {events.map((event, index) => (
          <Card key={index} className="flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lg border-2 border-primary/50">
            <CardHeader>
              <CardTitle className="font-headline text-lg">{event.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow space-y-3">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Calendar className="h-5 w-5" />
                <span>{new Date(event.date).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Clock className="h-5 w-5" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-5 w-5" />
                <span>{event.location}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Mobile Carousel View */}
      <div className="md:hidden mt-8">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-xs mx-auto"
        >
          <CarouselContent>
            {events.map((event, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card className="flex flex-col h-full overflow-hidden border-2 border-primary/50">
                    <CardHeader>
                      <CardTitle className="font-headline text-lg">{event.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow space-y-3">
                       <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Calendar className="h-5 w-5" />
                        <span>{new Date(event.date).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Clock className="h-5 w-5" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <MapPin className="h-5 w-5" />
                        <span>{event.location}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2" />
          <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2" />
        </Carousel>
      </div>

    </section>
  )
}
