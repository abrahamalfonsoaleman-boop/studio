import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, MapPin } from "lucide-react"

export function Events() {
  const events = [
    {
      title: "Championship Final",
      date: "2024-08-15",
      time: "19:00",
      location: "Grand Stadium",
    },
    {
      title: "Club Anniversary Gala",
      date: "2024-09-01",
      time: "20:00",
      location: "Lakeside Banquet Hall",
    },
    {
      title: "Youth Team Tryouts",
      date: "2024-09-10",
      time: "09:00",
      location: "Training Grounds",
    },
    {
      title: "Friendly Match vs. Rivals",
      date: "2024-09-22",
      time: "15:00",
      location: "Home Arena",
    },
  ]

  return (
    <section id="events" className="w-full">
      <div className="space-y-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">Upcoming Events</h2>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
          Don't miss out on the action. Join us for our next big event!
        </p>
      </div>
      <div className="mx-auto mt-12 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        {events.map((event, index) => (
          <Card key={index} className="flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-xl">{event.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow space-y-3">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Calendar className="h-5 w-5" />
                <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Clock className="h-5 w-5" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <MapPin className="h-5 w-5" />
                <span>{event.location}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
