import Image from "next/image"

export function Gallery() {
  const images = [
    { src: "https://placehold.co/600x400.png", alt: "Jugadores celebrando un gol", hint: "team celebrating" },
    { src: "https://placehold.co/400x600.png", alt: "Un jugador disparando a puerta", hint: "player shooting" },
    { src: "https://placehold.co/600x400.png", alt: "Aficionados en el estadio", hint: "stadium crowd" },
    { src: "https://placehold.co/600x400.png", alt: "El equipo reunido", hint: "team huddle" },
    { src: "https://placehold.co/400x600.png", alt: "Portero haciendo una parada", hint: "goalkeeper save" },
    { src: "https://placehold.co/600x400.png", alt: "Exhibición de trofeos del club", hint: "trophy case" },
  ]

  return (
    <section id="gallery" className="w-full">
      <div className="space-y-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">Galería</h2>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
          Un vistazo a la vida y energía del Club Del Lago.
        </p>
      </div>
      <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className={`relative overflow-hidden rounded-lg group transform transition-transform duration-300 hover:scale-105 ${
              index === 1 || index === 4 ? "row-span-2" : ""
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              data-ai-hint={image.hint}
              width={index === 1 || index === 4 ? 400 : 600}
              height={index === 1 || index === 4 ? 600 : 400}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <p className="text-white text-center p-2 text-sm">{image.alt}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
