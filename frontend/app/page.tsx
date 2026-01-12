import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import EducatorSection from "@/components/EducatorSection";
import StudentSection from "@/components/StudentSection";
import AITechSection from "@/components/AITechSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <HowItWorks />
      <EducatorSection />
      <StudentSection />
      <AITechSection />
      <Footer />
    </main>
  );
}
