import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Eye, Goal, Heart } from "lucide-react"

export function About() {
  const principles = [
    {
      icon: <Goal className="h-8 w-8 text-primary" />,
      title: "Our Mission",
      description: "To foster a community of sports enthusiasts dedicated to excellence, sportsmanship, and personal growth."
    },
    {
      icon: <Eye className="h-8 w-8 text-primary" />,
      title: "Our Vision",
      description: "To be the leading sports club in the region, recognized for our competitive success and positive impact on the community."
    },
    {
      icon: <Heart className="h-8 w-8 text-primary" />,
      title: "Our Values",
      description: "We believe in integrity, teamwork, respect, and a relentless pursuit of improvement both on and off the field."
    }
  ]

  return (
    <section id="about" className="w-full">
      <div className="space-y-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">The Heart of the Club</h2>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
          Discover the principles that drive us forward.
        </p>
      </div>
      <div className="mx-auto mt-12 grid gap-8 sm:grid-cols-1 md:grid-cols-3">
        {principles.map((principle, index) => (
          <Card key={index} className="transform transition-transform duration-300 hover:scale-105 hover:shadow-xl bg-card">
            <CardHeader className="items-center text-center p-6">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                {principle.icon}
              </div>
              <CardTitle className="font-headline text-2xl">{principle.title}</CardTitle>
              <CardDescription className="text-base">{principle.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  )
}
