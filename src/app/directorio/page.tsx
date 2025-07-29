
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone } from "lucide-react";

const staff = [
  {
    name: "Erika de la Fuente",
    title: "Gerente General",
    email: "gerenciagral@clubdelago.com.mx",
    extension: "Ext. 111",
    avatar: "https://placehold.co/100x100.png",
    hint: "female portrait",
  },
  {
    name: "Sandra Arévalo",
    title: "Atención a Asociados",
    email: "atencionaasociados@clubdelago.com.mx",
    extension: "Ext. 116",
    avatar: "https://placehold.co/100x100.png",
    hint: "female portrait",
  },
  {
    name: "Mayra Sánchez",
    title: "Gerente Administrativo",
    email: "msanchez@clubdelago.com.mx",
    extension: "Ext. 112",
    avatar: "https://placehold.co/100x100.png",
    hint: "female portrait",
  },
  {
    name: "Víctor Zurita",
    title: "Gerente de Operaciones",
    email: "gerenciaoperaciones@clubdelago.com.mx",
    extension: "",
    avatar: "https://placehold.co/100x100.png",
    hint: "male portrait",
  },
  {
    name: "Julián Obregón",
    title: "Gerente de Alimentos y Bebidas",
    email: "gerenciaayb@clubdelago.com.mx",
    extension: "",
    avatar: "https://placehold.co/100x100.png",
    hint: "male portrait",
  },
  {
    name: "Juan Andrade",
    title: "Jefe de Sistemas y Comunicación",
    email: "sistemas@clubdelago.com.mx",
    extension: "Ext. 109",
    avatar: "https://placehold.co/100x100.png",
    hint: "male portrait",
  },
  {
    name: "Carlos Merlín",
    title: "Recursos Humanos",
    email: "recursoshumanos@clubdelago.com.mx",
    extension: "Ext. 113",
    avatar: "https://placehold.co/100x100.png",
    hint: "male portrait",
  },
  {
    name: "Valeria Torres",
    title: "Coordinadora de Eventos",
    email: "eventos@clubdelago.com.mx",
    extension: "Ext. 120",
    avatar: "https://placehold.co/100x100.png",
    hint: "female portrait",
  },
  {
    name: "Pamela Reyes",
    title: "Nutrióloga",
    email: "nutricion@clubdelago.com.mx",
    extension: "81 1779 2275",
    avatar: "https://placehold.co/100x100.png",
    hint: "female portrait",
  },
  {
    name: "Leidy Rodríguez",
    title: "Comunicación",
    email: "edicion@clubdelago.com.mx",
    extension: "Ext. 109",
    avatar: "https://placehold.co/100x100.png",
    hint: "female portrait",
  },
];

export default function DirectorioPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1">
        <div className="py-8 md:py-12 lg:py-16">
          <div className="space-y-4 text-center mb-12 px-4">
            <h1 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl font-headline">
              Directorio Administrativo
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
              Nuestro equipo está para servirte.
            </p>
          </div>
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
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
