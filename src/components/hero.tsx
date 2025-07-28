import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative h-[60vh] w-full">
      <Image
        src="https://placehold.co/1920x1080.png"
        alt="Club de Lago stadium"
        data-ai-hint="stadium lights"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white p-4">
        <h1 className="text-4xl font-extrabold tracking-tight font-headline sm:text-5xl md:text-6xl lg:text-7xl">
          Welcome to Club de Lago
        </h1>
        <p className="mt-4 max-w-2xl text-lg md:text-xl">
          Your home for passion, teamwork, and victory.
        </p>
        <Button asChild size="lg" className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href="#events">Upcoming Events</Link>
        </Button>
      </div>
    </section>
  )
}
