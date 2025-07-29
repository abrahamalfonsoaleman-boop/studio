
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Mission } from "@/components/mission";
import { Sports } from "@/components/sports";
import { Events } from "@/components/events";
import { Comunicados } from "@/components/comunicados";
import { Gallery } from "@/components/gallery";
import { Footer } from "@/components/footer";
import { FoodAndBeverages } from "@/components/food-and-beverages";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <div className="grid gap-12 md:gap-16 lg:gap-24 py-8 md:py-12 lg:py-16">
          <div className="px-4 md:px-6">
            <Mission />
          </div>
          <div className="px-4 md:px-6">
            <Sports />
          </div>
          <div className="px-4 md:px-6">
            <FoodAndBeverages />
          </div>
           <div className="px-4 md:px-6">
            <Events />
          </div>
          <div className="px-4 md:px-6">
            <Comunicados />
          </div>
          <div className="px-4 md:px-6">
            <Gallery />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
