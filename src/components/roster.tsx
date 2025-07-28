import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Roster() {
  const teams = [
    {
      name: "Primer Equipo",
      players: [
        { name: "Leo Martinez", position: "Delantero", avatar: "https://placehold.co/100x100.png", hint: "male portrait" },
        { name: "Clara Jensen", position: "Centrocampista", avatar: "https://placehold.co/100x100.png", hint: "female portrait" },
        { name: "Sam Jones", position: "Defensor", avatar: "https://placehold.co/100x100.png", hint: "male portrait" },
        { name: "Aisha Khan", position: "Portera", avatar: "https://placehold.co/100x100.png", hint: "female portrait" },
      ],
    },
    {
      name: "Academia Juvenil",
      players: [
        { name: "Tom Riley", position: "Delantero", avatar: "https://placehold.co/100x100.png", hint: "young male" },
        { name: "Maria Garcia", position: "Centrocampista", avatar: "https://placehold.co/100x100.png", hint: "young female" },
        { name: "Ben Carter", position: "Defensor", avatar: "https://placehold.co/100x100.png", hint: "young male" },
        { name: "Sofia Chen", position: "Portera", avatar: "https://placehold.co/100x100.png", hint: "young female" },
      ],
    },
  ]

  return (
    <section id="roster" className="w-full">
      <div className="space-y-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">Conoce a Nuestros Equipos</h2>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
          Los jugadores que visten nuestros colores con orgullo.
        </p>
      </div>
      <div className="mx-auto mt-12 grid gap-12 sm:grid-cols-1 lg:grid-cols-2">
        {teams.map((team) => (
          <Card key={team.name} className="overflow-hidden">
            <CardHeader className="bg-primary/10">
              <CardTitle className="text-center font-headline text-2xl text-primary">{team.name}</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {team.players.map((player) => (
                  <div key={player.name} className="flex items-center space-x-4 rounded-md border p-3 transition-colors hover:bg-muted/50">
                    <Avatar>
                      <AvatarImage src={player.avatar} alt={player.name} data-ai-hint={player.hint} />
                      <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{player.name}</p>
                      <p className="text-sm text-muted-foreground">{player.position}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
