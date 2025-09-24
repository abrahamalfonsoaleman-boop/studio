
import { Hero } from "@/components/hero";
import { Mission } from "@/components/mission";
import { Sports } from "@/components/sports";
import { Events } from "@/components/events";
import { Comunicados } from "@/components/comunicados";
import { Gallery } from "@/components/gallery";
import { Footer } from "@/components/footer";
import { ScrollAnimator } from "@/components/scroll-animator";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col overflow-hidden">
      <main className="flex-1">
        <Hero />
        <div className="container grid gap-12 md:gap-16 lg:gap-24 py-8 md:py-12 lg:py-16">
          <ScrollAnimator>
            <Mission />
          </ScrollAnimator>
          <ScrollAnimator>
            <Sports />
          </ScrollAnimator>
          <ScrollAnimator>
            <Events />
          </ScrollAnimator>
          <ScrollAnimator>
            <Comunicados />
          </ScrollAnimator>
          <ScrollAnimator>
            <Gallery />
          </ScrollAnimator>
        </div>
      </main>
      <Footer />
    </div>
  );
}
