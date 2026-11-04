import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import UpcomingPreview from "@/components/home/UpcomingPreview";
import Gallery from "@/components/home/Gallery";
import Newsletter from "@/components/home/Newsletter";

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <UpcomingPreview />
      <Gallery />
      <Newsletter />
    </main>
  );
}