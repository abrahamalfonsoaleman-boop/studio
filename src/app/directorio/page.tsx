
import { Footer } from "@/components/footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MessageSquare } from "lucide-react";
import { ScrollAnimator } from "@/components/scroll-animator";
import { ClubData } from "@/lib/club-data";

export default function DirectorioPage() {
  const staff = ClubData.directorio;

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex-1">
        <div className="py-8 md:py-12 lg:py-16">
          <ScrollAnimator>
            <div className="space-y-4 text-center mb-12 px-4">
              <h1 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl font-headline">
                Directorio Administrativo
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
                Nuestro equipo está para servirte.
              </p>
            </div>
          </ScrollAnimator>
          <ScrollAnimator>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-4 max-w-7xl mx-auto">
              {staff.map((person) => (
                <Card key={person.nombre} className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <CardHeader className="flex flex-col items-center text-center p-4">
                    <Avatar className="h-24 w-24 mb-4">
                      {/* Placeholder generation based on name */}
                      <AvatarImage 
                        src={`https://picsum.photos/seed/${person.nombre.split(' ').join('')}/100/100`} 
                        alt={person.nombre}
                        data-ai-hint={person.nombre.includes("a") ? "female portrait" : "male portrait"} />
                      <AvatarFallback>{person.nombre.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                      <CardTitle className="text-lg font-headline">{person.nombre}</CardTitle>
                      <p className="text-sm text-primary">{person.puesto}</p>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 space-y-2 border-t">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Mail className="h-4 w-4 mr-2" />
                      <a href={`mailto:${person.email}`} className="hover:text-primary transition-colors duration-300 break-all">
                        {person.email}
                      </a>
                    </div>
                    {person.ext && (
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Phone className="h-4 w-4 mr-2" />
                        <span>81 8357 5500 Ext. {person.ext}</span>
                      </div>
                    )}
                     {person.whatsapp && (
                      <div className="flex items-center text-xs text-muted-foreground">
                        <MessageSquare className="h-4 w-4 mr-2" />
                         <a href={`https://wa.me/${person.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors duration-300">
                          WhatsApp
                        </a>
                      </div>
                    )}
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
