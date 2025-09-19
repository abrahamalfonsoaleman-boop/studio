
import { Footer } from "@/components/footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MessageSquare } from "lucide-react";
import { ScrollAnimator } from "@/components/scroll-animator";

const staff = [
  {
    name: "Erika de la Fuente",
    title: "Gerente General",
    email: "gerenciagral@clubdelago.com.mx",
    extension: "Ext. 111",
    avatar: "https://placehold.co/100x100.png",
    hint: "female portrait",
    whatsapp: "",
  },
  {
    name: "Sandra Arévalo",
    title: "Atención a Asociados",
    email: "atencionaasociados@clubdelago.com.mx",
    extension: "Ext. 116",
    avatar: "https://placehold.co/100x100.png",
    hint: "female portrait",
    whatsapp: "",
  },
  {
    name: "Mayra Sánchez",
    title: "Gerente Administrativo",
    email: "msanchez@clubdelago.com.mx",
    extension: "Ext. 112",
    avatar: "https://placehold.co/100x100.png",
    hint: "female portrait",
    whatsapp: "",
  },
  {
    name: "Víctor Zurita",
    title: "Gerente de Operaciones",
    email: "gerenciaoperaciones@clubdelago.com.mx",
    extension: "",
    avatar: "https://placehold.co/100x100.png",
    hint: "male portrait",
    whatsapp: "",
  },
  {
    name: "Julián Obregón",
    title: "Gerente de Alimentos y Bebidas",
    email: "gerenciaayb@clubdelago.com.mx",
    extension: "",
    avatar: "https://placehold.co/100x100.png",
    hint: "male portrait",
    whatsapp: "",
  },
  {
    name: "Juan Andrade",
    title: "Jefe de Sistemas y Comunicación",
    email: "sistemas@clubdelago.com.mx",
    extension: "Ext. 109",
    avatar: "https://placehold.co/100x100.png",
    hint: "male portrait",
    whatsapp: "",
  },
  {
    name: "Carlos Merlín",
    title: "Gerente de Capital Humano",
    email: "recursoshumanos@clubdelago.com.mx",
    extension: "Ext. 113",
    avatar: "https://placehold.co/100x100.png",
    hint: "male portrait",
    whatsapp: "",
  },
  {
    name: "Ana Karen Rincón",
    title: "Coordinadora de Eventos",
    email: "eventos@clubdelago.com.mx",
    extension: "Ext. 120",
    avatar: "https://placehold.co/100x100.png",
    hint: "female portrait",
    whatsapp: "+528123870840",
  },
  {
    name: "Leidy Rodríguez",
    title: "Comunicación",
    email: "edicion@clubdelago.com.mx",
    extension: "Ext. 109",
    avatar: "https://placehold.co/100x100.png",
    hint: "female portrait",
    whatsapp: "",
  },
];

export default function DirectorioPage() {
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-4">
              {staff.map((person) => (
                <Card key={person.name} className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <CardHeader className="flex flex-row items-center space-x-4 p-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={person.avatar} alt={person.name} data-ai-hint={person.hint} />
                      <AvatarFallback>{person.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg font-headline">{person.name}</CardTitle>
                      <p className="text-sm text-primary">{person.title}</p>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 space-y-2 border-t">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Mail className="h-4 w-4 mr-2" />
                      <a href={`mailto:${person.email}`} className="hover:text-primary transition-colors duration-300">
                        {person.email}
                      </a>
                    </div>
                    {person.extension && (
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Phone className="h-4 w-4 mr-2" />
                        <span>{person.extension}</span>
                      </div>
                    )}
                     {person.whatsapp && (
                      <div className="flex items-center text-xs text-muted-foreground">
                        <MessageSquare className="h-4 w-4 mr-2" />
                         <a href={`https://wa.me/${person.whatsapp}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors duration-300">
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
