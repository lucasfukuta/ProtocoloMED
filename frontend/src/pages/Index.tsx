import { Header } from "@/components/Header";
import { HeroSection } from "@/components/home/HeroSection";
import { BenefitsSection } from "@/components/home/BenefitsSection";
import { ResultsSection } from "@/components/home/ResultsSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <BenefitsSection />
        <ResultsSection />
        <HowItWorksSection />
        <CTASection />
      </main>
      <footer className="bg-muted py-8 text-center">
        <div className="container mx-auto px-4">
          <p className="text-muted-foreground">
            © 2024 PROTOCOLOMED. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
