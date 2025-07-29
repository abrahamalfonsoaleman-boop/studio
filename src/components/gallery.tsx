
import Image from "next/image"
import { cn } from "@/lib/utils"

export function Gallery({className}: {className?: string}) {
  const images = [
    { src: "/images/club1.jpg", alt: "Jugadores celebrando un gol", hint: "team celebrating" },
    { src: "/images/club2.jpg", alt: "Un jugador disparando a puerta", hint: "player shooting" },
    { src: "/images/club3.jpg", alt: "Aficionados en el estadio", hint: "stadium crowd" },
    { src: "/images/club4.jpg", alt: "El equipo reunido", hint: "team huddle" },
    { src: "/images/club5.jpg", alt: "Portero haciendo una parada", hint: "goalkeeper save" },
    { src: "/images/club6.jpg", alt: "Exhibición de trofeos del club", hint: "trophy case" },
  ]

  return (
    <section id="gallery" className={cn("w-full", className)}>
      <div className="space-y-4 text-center px-4">
        <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl font-headline">Galería</h2>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
          Un vistazo a la vida y energía del Club Del Lago.
        </p>
      </div>
      <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
        {images.map((image, index) => (
          <div
            key={index}
            className={`relative overflow-hidden rounded-lg group transition-all duration-300 ease-in-out hover:shadow-2xl ${
              index === 1 || index === 4 ? "row-span-2" : ""
            }`}
          >
             <Image
              src={image.src}
              alt={image.alt}
              data-ai-hint={image.hint}
              width={index === 1 || index === 4 ? 400 : 600}
              height={index === 1 || index === 4 ? 600 : 400}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <p className="text-white text-center p-2 text-xs">{image.alt}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
