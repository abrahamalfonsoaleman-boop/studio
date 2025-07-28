
"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function Hero() {
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      className="relative h-[60vh] w-full overflow-hidden"
    >
      <div 
        className="absolute inset-0 bg-cover bg-fixed bg-center z-[-1]"
        style={{ 
          backgroundImage: "url('https://placehold.co/1920x1080.png')",
          transform: `translateY(${offsetY * 0.5}px)`
        }}
        data-ai-hint="tennis court"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white p-4">
        <h1 className="text-4xl font-extrabold tracking-tight font-headline sm:text-5xl md:text-6xl lg:text-7xl">
          CLUB DE LAGO
        </h1>
        <p className="mt-4 max-w-2xl text-base md:text-lg">
          Desde 1981 el Club Delago es una asociación civil dedicada a promover la sana convivencia familiar.
        </p>
        <Button asChild size="lg" className="mt-8">
          <Link href="#eventos">Próximos Eventos</Link>
        </Button>
      </div>
    </section>
  )
}
