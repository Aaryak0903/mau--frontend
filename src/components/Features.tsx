import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Volume2, Languages, FileText, Brain } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Volume2,
      name: "Shravan",
      title: "Read-Along Audio",
      description: "Listen to perfect pronunciation with synchronized highlighting. Master the rhythm and flow of Indian languages with AI-generated audio narration.",
      badge: "Premium Audio",
      gradient: "bg-gradient-to-br from-primary/10 to-primary/5"
    },
    {
      icon: Languages,
      name: "Anuvad",
      title: "Meaningful Translation", 
      description: "Get contextual translations that preserve cultural nuances. Understand not just words, but the deeper meaning behind Indian language content.",
      badge: "Smart AI",
      gradient: "bg-gradient-to-br from-secondary/10 to-secondary/5"
    },
    {
      icon: FileText,
      name: "Saaransh",
      title: "AI Summarization",
      description: "Quickly grasp the essence of any document with intelligent summaries. Focus on what matters most in your learning journey.",
      badge: "Instant Insights",
      gradient: "bg-gradient-to-br from-accent/20 to-accent/10"
    },
    {
      icon: Brain,
      name: "Pariksha", 
      title: "Instant Quizzes",
      description: "Test your comprehension with auto-generated questions. Reinforce learning through interactive assessments tailored to your content.",
      badge: "Adaptive Learning",
      gradient: "bg-gradient-to-br from-primary/15 to-secondary/10"
    }
  ];

  return (
    <section className="py-24 bg-gradient-card">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
            Core Features
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Four Powerful Tools, One
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Learning Experience</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Each feature works in harmony to create a comprehensive language learning ecosystem 
            tailored to your uploaded content.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={feature.name} 
              className={`relative overflow-hidden border-0 shadow-card hover:shadow-feature transition-all duration-300 hover:-translate-y-2 ${feature.gradient}`}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-primary`}>
                    <feature.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-semibold text-foreground">
                  {feature.title}
                </CardTitle>
                <CardDescription className="text-primary font-medium text-sm tracking-wider">
                  {feature.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
              <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-primary rounded-full opacity-5" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;