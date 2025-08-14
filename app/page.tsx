import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { MiniAboutSection } from "@/components/MiniAboutSection";
import { PropertyListings } from "@/components/PropertyListings";
import { WhyHousaSection } from "@/components/WhyHousaSection";
import { RelatedProperties } from "@/components/RelatedProperties";
import { CtaBand } from "@/components/CtaBand";
import { ServicesSection } from "@/components/ServicesSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <MiniAboutSection />
      <PropertyListings />
      <WhyHousaSection />
      <CtaBand />
      <ServicesSection />
      <TestimonialsSection />
      <RelatedProperties />
      <FinalCta />
      <Footer />
    </main>
  );
}
