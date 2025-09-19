
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Users, Clock, CalendarDays, Hourglass, PlusCircle, Star, Phone, Mail, MessageSquare } from "lucide-react";
import { Footer } from "@/components/footer";
import { ScrollAnimator } from "@/components/scroll-animator";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const areas = [
  {
    name: "Laguito 1",
    price: "$4,200.00",
    capacity: "20 a 100 personas",
    duration: "5 horas",
    schedule: "Matutino, Vespertino y Nocturno hasta 1:00 am",
    extraHour: "$450.00 c/u (hasta 2 horas)",
    setupCost: "$520.00",
    days: "Lunes a Domingo",
  },
  {
    name: "Laguito 2",
    price: "$4,200.00",
    capacity: "50 personas",
    duration: "5 horas",
    schedule: "Matutino, Vespertino y Nocturno hasta 1:00 am",
    extraHour: "$450.00 c/u (hasta 2 horas)",
    setupCost: "$520.00",
    days: "Lunes a Domingo",
  },
  {
    name: "Restaurante",
    price: "$4,200.00",
    capacity: "90 personas",
    duration: "5 horas",
    schedule: "Nocturno 8:30 pm a 1:30 am",
    extraHour: "Sin opción a hora extra",
    setupCost: "$520.00",
    days: "Lunes a Domingo (Enero a Diciembre)",
  },
  {
    name: "Bar",
    price: "$5,900.00",
    capacity: "90 personas",
    duration: "N/A",
    schedule: "Disponible para renta de 10:00 am a 3:00 pm",
    extraHour: "Sin opción a hora extra",
    setupCost: "$520.00",
    days: "Lunes a Domingo",
  },
  {
    name: "Evento solo socios",
    price: "Sin Costo",
    capacity: "Sin invitados",
    duration: "5 horas",
    schedule: "Nocturno hasta 1:00 am",
    extraHour: "$450.00 c/u (hasta 2 horas)",
    setupCost: "No incluye montaje ni servicios",
    days: "Lunes a Domingo (Sujeto a disponibilidad, reservar con 24 hrs de antelación)",
    highlight: true,
  },
  {
    name: "Palapa de Juegos",
    price: "$2,700.00",
    capacity: "50 personas",
    duration: "5 horas",
    schedule: "Matutino, Vespertino y Nocturno hasta 1:00 am",
    extraHour: "$450.00 c/u (hasta 2 horas)",
    setupCost: "$520.00",
    days: "Lunes a Domingo",
  },
  {
    name: "Asadores",
    price: "$2,500.00",
    capacity: "20 personas",
    duration: "5 horas",
    schedule: "Matutino, Vespertino y Nocturno hasta 1:00 am",
    extraHour: "$450.00 c/u (hasta 2 horas)",
    setupCost: "$520.00",
    days: "Lunes a Miércoles",
  },
  {
    name: "Palapa 4",
    price: "$3,200.00",
    capacity: "60 personas",
    duration: "5 horas",
    schedule: "Matutino, Vespertino y Nocturno hasta 1:00 am",
    extraHour: "$450.00 c/u (hasta 2 horas)",
    setupCost: "$520.00",
    days: "Lunes a Domingo",
  },
];

const InfoCard = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="flex items-start text-sm text-muted-foreground">
    <div className="mr-3 shrink-0">{icon}</div>
    <div>
      <span className="font-semibold">{label}:</span> {value}
    </div>
  </div>
);

export default function EventosPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex-1">
        <div className="w-full max-w-7xl mx-auto py-12 md:py-20 px-4">
          <ScrollAnimator>
            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
                El Escenario Perfecto Para Tu Celebración
              </h1>
              <p className="mt-4 max-w-3xl mx-auto text-muted-foreground md:text-lg">
                Costos y detalles para el uso de áreas para eventos con más de 4 invitados. Para eventos que incluyen montaje y servicios, el costo es de $520.00.
              </p>
            </div>
          </ScrollAnimator>

          <ScrollAnimator>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {areas.map((area) => (
                <Card key={area.name} className={`flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${area.highlight ? 'border-primary border-2 shadow-primary/20' : ''}`}>
                  <CardHeader>
                    <CardTitle className="font-headline text-xl">{area.name}</CardTitle>
                    <CardDescription className="text-3xl font-bold text-primary">{area.price}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow space-y-4">
                    <InfoCard icon={<Users className="h-5 w-5 text-accent" />} label="Capacidad" value={area.capacity} />
                    <InfoCard icon={<Clock className="h-5 w-5 text-accent" />} label="Duración" value={area.duration} />
                    <InfoCard icon={<CalendarDays className="h-5 w-5 text-accent" />} label="Días" value={area.days} />
                    <InfoCard icon={<Hourglass className="h-5 w-5 text-accent" />} label="Horario" value={area.schedule} />
                    <InfoCard icon={<PlusCircle className="h-5 w-5 text-accent" />} label="Hora Extra" value={area.extraHour} />
                    <InfoCard icon={<Star className="h-5 w-5 text-accent" />} label="Montaje" value={area.setupCost} />
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollAnimator>
          
          <ScrollAnimator>
            <Card className="mt-16 bg-muted border-accent/50">
              <CardHeader>
                <CardTitle className="font-headline text-2xl text-center">Informes y Reservaciones</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="font-semibold text-lg">Ana Karen Rincón</p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-8">
                    <div className="flex items-center gap-2">
                        <Phone className="h-5 w-5 text-primary"/>
                        <span>81 8357 5500 Ext. 120</span>
                    </div>
                     <div className="flex items-center gap-2">
                        <Mail className="h-5 w-5 text-primary"/>
                        <a href="mailto:eventos@clubdelago.com.mx" className="hover:underline">eventos@clubdelago.com.mx</a>
                    </div>
                     <div className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 text-primary"/>
                        <a href="https://wa.me/528123870840" target="_blank" rel="noopener noreferrer" className="hover:underline">WhatsApp: +52 81-23-87-08-40</a>
                    </div>
                </div>
                <p className="text-sm text-muted-foreground pt-4">
                    Revisa los términos y condiciones para la contratación. <br/>
                    Este 2025 estamos trabajando para y por el orden y la seguridad de todos.
                </p>
              </CardContent>
            </Card>
          </ScrollAnimator>
        </div>
      </main>
      <Footer />
    </div>
  );
}
