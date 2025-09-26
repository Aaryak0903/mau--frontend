import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Loader2, Upload, FileText, LogOut } from "lucide-react";
import type { User } from "@supabase/supabase-js";

const UploadPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [contentType, setContentType] = useState("");
  const [result, setResult] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
        return;
      }
      setUser(user);
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !contentType) {
      toast({
        title: "Error",
        description: "Please select a file and content type",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Upload file to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${user?.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('user-files')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Simulate AI processing based on content type
      await new Promise(resolve => setTimeout(resolve, 2000));

      let generatedResult = "";
      
      switch (contentType) {
        case "quiz":
          generatedResult = `Quiz Generated from "${file.name}":

1. What is the main topic discussed in the document?
   a) Technology trends
   b) Business strategies  
   c) Educational content
   d) Scientific research

2. According to the document, what is the key benefit mentioned?
   a) Cost reduction
   b) Improved efficiency
   c) Better user experience
   d) All of the above

3. What recommendation does the document suggest?
   a) Implementing new processes
   b) Training staff members
   c) Upgrading systems
   d) Conducting research

Answer Key: 1-c, 2-d, 3-a`;
          break;
          
        case "summary":
          generatedResult = `Summary of "${file.name}":

📄 Document Overview:
The uploaded document contains detailed information about modern educational approaches and digital learning methodologies.

🔑 Key Points:
• Focus on personalized learning experiences
• Integration of AI and machine learning technologies
• Emphasis on multilingual content support
• Interactive learning modules and assessments

💡 Main Insights:
The document highlights the importance of adaptive learning systems that can cater to diverse linguistic backgrounds, particularly for Indian languages.

🎯 Recommendations:
1. Implement AI-powered content generation
2. Develop multilingual support systems
3. Create interactive assessment tools
4. Foster collaborative learning environments`;
          break;
          
        case "flashcards":
          generatedResult = `Flashcards from "${file.name}":

Card 1:
Front: What is AI-powered learning?
Back: A technology that uses artificial intelligence to personalize educational content and adapt to individual learning styles.

Card 2:
Front: Define multilingual support
Back: The ability to provide educational content in multiple languages to serve diverse linguistic communities.

Card 3:
Front: What are adaptive assessments?
Back: Evaluation tools that adjust difficulty and content based on learner performance and progress.

Card 4:
Front: Key benefit of personalized learning
Back: Improved engagement and better learning outcomes through customized educational experiences.`;
          break;
          
        case "notes":
          generatedResult = `Study Notes from "${file.name}":

📚 Chapter 1: Introduction to Modern Learning
- Digital transformation in education
- Role of AI in personalized learning
- Benefits of multilingual content delivery

📚 Chapter 2: Technical Implementation  
- Machine learning algorithms for content adaptation
- Natural language processing for Indian languages
- User interface design principles

📚 Chapter 3: Assessment Strategies
- Interactive quiz generation
- Real-time feedback mechanisms
- Progress tracking and analytics

📚 Chapter 4: Future Scope
- Integration with emerging technologies
- Scalability considerations
- Community-driven learning platforms`;
          break;
          
        default:
          generatedResult = `Content Analysis of "${file.name}":

The document has been processed and analyzed. Based on the content, here are the key insights and generated materials for enhanced learning experience.`;
      }

      setResult(generatedResult);
      
      toast({
        title: "Success!",
        description: `${contentType.charAt(0).toUpperCase() + contentType.slice(1)} generated successfully`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <header className="bg-background/95 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-primary">
              <div className="h-6 w-6 text-primary-foreground font-bold flex items-center justify-center text-sm">
                भा
              </div>
            </div>
            <div>
              <div className="font-bold text-lg">BhashaGuru AI</div>
              <div className="text-xs text-muted-foreground">AI Document Processor</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Welcome, {user.user_metadata?.firstName || user.email}
            </span>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Upload Section */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload Document
              </CardTitle>
              <CardDescription>
                Upload your document and choose what type of content you want to generate
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleFileUpload} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="file">Select File</Label>
                  <Input
                    id="file"
                    type="file"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    accept=".pdf,.doc,.docx,.txt"
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    Supported formats: PDF, DOC, DOCX, TXT
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content-type">What do you want to generate?</Label>
                  <Select value={contentType} onValueChange={setContentType} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose content type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="quiz">📝 Quiz</SelectItem>
                      <SelectItem value="summary">📄 Summary</SelectItem>
                      <SelectItem value="flashcards">🗂️ Flashcards</SelectItem>
                      <SelectItem value="notes">📚 Study Notes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing Document...
                    </>
                  ) : (
                    <>
                      <FileText className="mr-2 h-4 w-4" />
                      Generate Content
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Generated Content</CardTitle>
              <CardDescription>
                {result ? "Your AI-generated content is ready!" : "Upload a document to see generated content here"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {result ? (
                <div className="space-y-4">
                  <div className="bg-muted/30 rounded-lg p-4">
                    <pre className="whitespace-pre-wrap text-sm font-mono">
                      {result}
                    </pre>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      navigator.clipboard.writeText(result);
                      toast({
                        title: "Copied!",
                        description: "Content copied to clipboard",
                      });
                    }}
                  >
                    Copy to Clipboard
                  </Button>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No content generated yet</p>
                  <p className="text-sm">Upload a document and select a content type to get started</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default UploadPage;