import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, GraduationCap, Heart, Users } from "lucide-react";

const TargetAudience = () => {
  const personas = [
    {
      icon: Building,
      title: "Urban Professionals",
      subtitle: "The Career Climber",
      persona: "Priya, 29, Mumbai",
      description: "Needs to learn Marathi quickly for work and local life. Wants to upload real-world PDFs like reports, news articles, and client documents to practice with relevant content.",
      needs: ["Work-relevant content", "Quick learning", "Professional documents"],
      badge: "Primary Target"
    },
    {
      icon: Heart,
      title: "Heritage Learners", 
      subtitle: "The Root Seeker",
      persona: "Arjun, 21, USA",
      description: "Wants to connect with cultural roots through traditional documents. Needs English translations and summaries to better understand stories, poems, and family letters.",
      needs: ["Cultural content", "Translation support", "Family connection"],
      badge: "Growing Segment"
    },
    {
      icon: GraduationCap,
      title: "Academic Researchers",
      subtitle: "The Scholar",
      persona: "Dr. Sarah, 35, University",
      description: "Studies Indian literature and needs tools to analyze historical texts, research papers, and literary works with proper context and linguistic understanding.",
      needs: ["Academic rigor", "Historical texts", "Research tools"],
      badge: "Niche Market"
    },
    {
      icon: Users,
      title: "Language Enthusiasts",
      subtitle: "The Explorer", 
      persona: "Michael, 42, Traveler",
      description: "Passionate about learning new languages and cultures. Uses diverse content from news articles to cultural magazines to immerse in authentic language experiences.",
      needs: ["Diverse content", "Cultural immersion", "Authentic materials"],
      badge: "Secondary Target"
    }
  ];

  return (
    <section className="py-24 bg-gradient-hero">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
            Our Community
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Built for Every
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Language Journey</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Whether you're advancing your career, connecting with heritage, or exploring new cultures, 
            BhashaGuru AI adapts to your unique learning needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {personas.map((persona, index) => (
            <Card key={persona.title} className="relative overflow-hidden bg-background/80 backdrop-blur-sm border-0 shadow-feature hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-gradient-primary">
                    <persona.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <Badge variant="outline" className="border-primary/30 text-primary">
                    {persona.badge}
                  </Badge>
                </div>
                
                <CardTitle className="text-2xl font-bold text-foreground">
                  {persona.title}
                </CardTitle>
                <CardDescription className="text-lg font-medium text-primary">
                  {persona.subtitle} • {persona.persona}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  {persona.description}
                </p>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground text-sm uppercase tracking-wide">
                    Key Needs:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {persona.needs.map((need) => (
                      <Badge 
                        key={need} 
                        variant="secondary" 
                        className="bg-secondary/10 text-secondary hover:bg-secondary/20"
                      >
                        {need}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
              
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-primary rounded-full opacity-5" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TargetAudience;