import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, Flag, Gem } from "lucide-react"

export function Mission() {
  return (
    <section id="mission" className="w-full">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">Nuestra Esencia</h2>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mt-4">
          Comprometidos con el bienestar y la comunidad.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        <Card className="text-center border-0 shadow-none bg-transparent">
          <CardHeader className="flex items-center justify-center">
            <div className="p-4 bg-primary/10 rounded-full">
              <Flag className="h-8 w-8 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <CardTitle className="text-2xl font-bold mb-2">Misión</CardTitle>
            <p className="text-muted-foreground">Ser el mejor club deportivo social y familiar, fomentando la integración y el desarrollo de nuestros socios.</p>
          </CardContent>
        </Card>
        <Card className="text-center border-0 shadow-none bg-transparent">
          <CardHeader className="flex items-center justify-center">
            <div className="p-4 bg-primary/10 rounded-full">
              <Eye className="h-8 w-8 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <CardTitle className="text-2xl font-bold mb-2">Visión</CardTitle>
            <p className="text-muted-foreground">Consolidarnos como un club de excelencia, reconocido por su calidad en servicios e instalaciones.</p>
          </CardContent>
        </Card>
        <Card className="text-center border-0 shadow-none bg-transparent">
          <CardHeader className="flex items-center justify-center">
            <div className="p-4 bg-primary/10 rounded-full">
              <Gem className="h-8 w-8 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <CardTitle className="text-2xl font-bold mb-2">Valores</CardTitle>
            <p className="text-muted-foreground">Respeto, honestidad, compromiso, y trabajo en equipo son los pilares de nuestra comunidad.</p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
