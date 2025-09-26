import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, ScanLine, Headphones, Languages, FileText, Brain } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      step: "01",
      icon: Upload,
      title: "Upload Your PDF",
      description: "Simply drag and drop any PDF document in Indian languages. Our system accepts various formats and file sizes.",
      color: "text-primary"
    },
    {
      step: "02", 
      icon: ScanLine,
      title: "AI Processing",
      description: "Advanced OCR extracts Devanagari text with 99% accuracy. Our AI understands context and cultural nuances.",
      color: "text-secondary"
    },
    {
      step: "03",
      icon: Headphones,
      title: "Listen & Learn",
      description: "Follow along with synchronized audio highlighting. Perfect pronunciation and natural rhythm included.",
      color: "text-primary"
    },
    {
      step: "04",
      icon: Languages,
      title: "Understand Context",
      description: "Get meaningful translations that preserve cultural meaning. No more word-for-word confusion.",
      color: "text-secondary"
    },
    {
      step: "05",
      icon: FileText,
      title: "Quick Summaries",
      description: "Grasp key concepts instantly with AI-generated summaries. Focus on what matters most.",
      color: "text-primary"
    },
    {
      step: "06",
      icon: Brain,
      title: "Test Knowledge",
      description: "Challenge yourself with personalized quizzes. Reinforce learning through interactive questions.",
      color: "text-secondary"
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-secondary/10 text-secondary hover:bg-secondary/20">
            Simple Process
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            From PDF to Personalized
            <span className="bg-gradient-secondary bg-clip-text text-transparent"> Learning</span>
            <br />In Just Minutes
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our streamlined process transforms any document into an interactive learning experience. 
            No technical knowledge required.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card key={step.step} className="relative overflow-hidden border border-border/50 hover:border-primary/30 transition-colors duration-300 bg-gradient-card shadow-card">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className={`p-4 rounded-2xl bg-gradient-primary`}>
                        <step.icon className={`h-6 w-6 text-primary-foreground`} />
                      </div>
                      <Badge 
                        variant="secondary" 
                        className="absolute -top-2 -right-2 w-8 h-8 rounded-full p-0 flex items-center justify-center text-xs font-bold"
                      >
                        {step.step}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-foreground">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
                
                {/* Connecting line for larger screens */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 -right-4 w-8 h-px bg-gradient-to-r from-primary/30 to-transparent" />
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;