import { Button } from "@/components/ui/button";
import { ArrowRight, Upload, Zap } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
      <div className="container px-4 py-20 mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Transform Any PDF Into
                <span className="bg-gradient-primary bg-clip-text text-transparent"> AI-Powered</span>
                <br />Language Lessons
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Upload documents in Indian languages and get instant read-along audio, 
                translations, summaries, and personalized quizzes. Make real-world content 
                your learning playground.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90 shadow-elegant group">
                <Upload className="mr-2 h-5 w-5" />
                Upload Your First PDF
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/5">
                <Zap className="mr-2 h-5 w-5" />
                See How It Works
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">10K+</div>
                <div className="text-sm text-muted-foreground">Learners</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Languages</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">1M+</div>
                <div className="text-sm text-muted-foreground">Documents</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-feature">
              <img 
                src={heroImage} 
                alt="Vernac transforming documents into interactive lessons" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-primary rounded-full animate-pulse opacity-20" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-secondary rounded-full animate-pulse opacity-30" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;