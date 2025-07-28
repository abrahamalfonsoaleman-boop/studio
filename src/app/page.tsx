import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Mission } from "@/components/mission";
import { Events } from "@/components/events";
import { News } from "@/components/news";
import { Roster } from "@/components/roster";
import { Gallery } from "@/components/gallery";
import { Footer } from "@/components/footer";
import { FoodAndBeverages } from "@/components/food-and-beverages";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <div className="container mx-auto px-4 py-8 md:px-6 md:py-12 lg:py-16">
          <div className="grid gap-12 md:gap-16 lg:gap-24">
            <Mission />
            <FoodAndBeverages />
            <Events />
            <News />
            <Roster />
            <Gallery />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
