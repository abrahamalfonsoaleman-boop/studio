import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const HandshakeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 5H4.08a2 2 0 0 0-1.87 1.28L.28 12.35a1 1 0 0 0 .65 1.42l3.24.81A2 2 0 0 0 6 14.5V18a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2.5a2 2 0 0 0-2-2H8"/>
        <path d="M8 12h.01"/>
        <path d="M18 12h.01"/>
        <path d="M22 12h.01"/>
        <path d="M7 12h.01"/>
    </svg>
)

export function About() {
  return (
    <section id="about" className="w-full">
      <div className="space-y-4 text-center">
        <div className="inline-block rounded-lg bg-muted p-3">
            <HandshakeIcon className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">Valores</h2>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl lg:text-2xl">
          Fomentamos la práctica deportiva entre asociados y familias, creando hábitos saludables que mejoran la calidad de vida.
        </p>
      </div>
    </section>
  )
}
