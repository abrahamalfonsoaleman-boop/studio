
"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

export function Gallery({className}: {className?: string}) {
  const images = [
    { src: "/images/club1.jpg", alt: "Impresionante vista del campo de golf", hint: "golf course" },
    { src: "/images/club2.jpg", alt: "Cancha de tenis lista para un partido", hint: "tennis court" },
    { src: "/images/club3.jpg", alt: "Ambiente familiar en el restaurante", hint: "family dining" },
    { src: "/images/club4.jpg", alt: "Refrescante alberca para un día soleado", hint: "swimming pool" },
    { src: "/images/club5.jpg", alt: "Socios disfrutando de una tarde en el club", hint: "club members" },
    { src: "/images/club6.jpg", alt: "Rincón acogedor de nuestras instalaciones", hint: "cozy corner" },
  ]
  
  const [selectedImage, setSelectedImage] = useState<(typeof images)[0] | null>(null);


  return (
    <section id="gallery" className={cn("w-full", className)}>
      <div className="space-y-4 text-center px-4">
        <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl font-headline">Galería</h2>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
          Un vistazo a la vida y energía del Club Del Lago.
        </p>
      </div>
      <Dialog open={!!selectedImage} onOpenChange={(isOpen) => !isOpen && setSelectedImage(null)}>
        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
          {images.map((image, index) => (
            <div
              key={index}
              onClick={() => setSelectedImage(image)}
              className={`relative overflow-hidden rounded-lg group transition-all duration-300 ease-in-out hover:shadow-2xl cursor-pointer ${
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
            </div>
          ))}
        </div>
        {selectedImage && (
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle>{selectedImage.alt}</DialogTitle>
                </DialogHeader>
                <div className="relative aspect-video mt-4">
                    <Image
                        src={selectedImage.src}
                        alt={selectedImage.alt}
                        data-ai-hint={selectedImage.hint}
                        fill
                        className="object-contain rounded-md"
                    />
                </div>
            </DialogContent>
        )}
      </Dialog>
    </section>
  )
}
