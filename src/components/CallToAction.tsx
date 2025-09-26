import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Upload, Sparkles, Target } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="py-24 bg-gradient-primary relative overflow-hidden">
      <div className="container px-4 mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20">
            <Sparkles className="w-3 h-3 mr-1" />
            Ready to Transform Your Learning?
          </Badge>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
            Join 10,000+ Learners
            <br />
            <span className="text-primary-foreground/80">Mastering Indian Languages</span>
          </h2>
          
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Upload your first PDF today and experience the future of language learning. 
            No credit card required. Start your journey in minutes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-lg group"
            >
              <Upload className="mr-2 h-5 w-5" />
              Start Learning Now
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:border-primary-foreground/50"
            >
              <Target className="mr-2 h-5 w-5" />
              Book a Demo
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary-foreground">Free</div>
              <div className="text-primary-foreground/80">First 5 Documents</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary-foreground">24/7</div>
              <div className="text-primary-foreground/80">AI-Powered Learning</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary-foreground">99%</div>
              <div className="text-primary-foreground/80">Accuracy Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-primary-foreground/10 rounded-full animate-pulse" />
        <div className="absolute top-20 -right-20 w-60 h-60 bg-primary-foreground/5 rounded-full animate-pulse" />
        <div className="absolute -bottom-20 left-1/2 w-80 h-80 bg-primary-foreground/5 rounded-full animate-pulse" />
      </div>
    </section>
  );
};

export default CallToAction;