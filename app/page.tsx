import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import HowItWorks from "@/components/HowItWorks";
import Services from "@/components/Services";
import LiveRates from "@/components/LiveRates";
import WhyChooseUs from "@/components/WhyChooseUs";
import CustomerReviews from "@/components/CustomerReviews";
import BookPickup from "@/components/BookPickup";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function HomePage() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <Stats />
        <HowItWorks />
        <Services />
        <LiveRates />
        <WhyChooseUs />
        <CustomerReviews />
        <BookPickup />
        <Contact />
      </main>

      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
