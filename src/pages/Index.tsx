import Hero from "@/components/Hero";
import Header from "@/components/Header"; 
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import TargetAudience from "@/components/TargetAudience";
import CallToAction from "@/components/CallToAction";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <section id="features">
          <Features />
        </section>
        <section id="how-it-works">
          <HowItWorks />
        </section>
        <section id="audience">
          <TargetAudience />
        </section>
        <CallToAction />
      </main>
      
      <footer className="bg-foreground text-background py-12">
        <div className="container px-4 mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-primary">
                  <div className="h-6 w-6 text-primary-foreground font-bold flex items-center justify-center text-sm">
                    भा
                  </div>
                </div>
                <div>
                  <div className="font-bold text-lg">BhashaGuru AI</div>
                  <div className="text-xs text-background/70">Abhyas Studio</div>
                </div>
              </div>
              <p className="text-background/80 text-sm">
                Transforming language learning through AI-powered document processing for Indian languages.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-background/80">
                <li><a href="#" className="hover:text-background transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-background transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-background/80">
                <li><a href="#" className="hover:text-background transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Community</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-background/80">
                <li><a href="#" className="hover:text-background transition-colors">About</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Careers</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-background/20 text-center">
            <p className="text-background/60 text-sm">
              Made with love for my love
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
