import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Loader2, Upload, FileText, LogOut, CheckCircle2, XCircle, ArrowLeft, ArrowRight } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import type { User } from "@supabase/supabase-js";

// Types for our quiz
type Question = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  languageTip: string;
  difficulty: string;
  difficultyStars: string;
  category: string;
};

type Quiz = {
  title: string;
  description: string;
  totalQuestions: number;
  questions: Question[];
  scoringSystem: {
    easy: number;
    medium: number;
    hard: number;
  };
  instructions: string;
};

type QuizState = {
  quiz: Quiz | null;
  currentQuestionIndex: number;
  userAnswers: (number | null)[];
  showResults: boolean;
  score: number;
  totalPossibleScore: number;
};

const UploadPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [contentType, setContentType] = useState("");
  const [result, setResult] = useState("");
  const [quizState, setQuizState] = useState<QuizState>({
    quiz: null,
    currentQuestionIndex: 0,
    userAnswers: [],
    showResults: false,
    score: 0,
    totalPossibleScore: 0,
  });
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

  const extractJsonFromContent = (content: string): any | null => {
    if (!content) return null;
    try {
      // Try direct JSON first
      return JSON.parse(content);
    } catch {}

    try {
      // Remove code fences like ```json ... ``` or ``` ... ```
      const unfenced = content
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/```\s*$/i, "")
        .trim();
      return JSON.parse(unfenced);
    } catch {}

    try {
      // Fallback: attempt to extract the first JSON object block
      const start = content.indexOf("{");
      const end = content.lastIndexOf("}");
      if (start !== -1 && end !== -1 && end > start) {
        const slice = content.slice(start, end + 1);
        return JSON.parse(slice);
      }
    } catch {}

    return null;
  };

  const validateQuizData = (data: any): Quiz | null => {
    try {
      // Check if the data matches our quiz schema
      if (!data.quiz) return null;
      
      const quiz = data.quiz;
      if (!quiz.questions || !Array.isArray(quiz.questions) || quiz.questions.length === 0) {
        return null;
      }

      // Simple validation for each question
      const validQuestions = quiz.questions.every((q: any) => {
        return (
          q.id !== undefined &&
          q.question &&
          Array.isArray(q.options) &&
          q.options.length === 4 &&
          q.correctAnswer !== undefined &&
          q.explanation &&
          q.difficulty &&
          q.category
        );
      });

      return validQuestions ? quiz : null;
    } catch (error) {
      console.error('Error validating quiz data:', error);
      return null;
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast({
        title: "Error",
        description: "Please select a file",
        variant: "destructive",
      });
      return;
    }

    // If it's a quiz file, handle it directly
    if (file.type === 'application/json' || file.name.endsWith('.json')) {
      try {
        const fileContent = await file.text();
        const quizData = JSON.parse(fileContent);
        const validQuiz = validateQuizData(quizData);
        
        if (validQuiz) {
          setQuizState({
            quiz: validQuiz,
            currentQuestionIndex: 0,
            userAnswers: Array(validQuiz.questions.length).fill(null),
            showResults: false,
            score: 0,
            totalPossibleScore: validQuiz.questions.reduce((acc, q) => {
              return acc + (validQuiz.scoringSystem[q.difficulty as keyof typeof validQuiz.scoringSystem] || 1);
            }, 0),
          });
          toast({
            title: "Success!",
            description: "Quiz loaded successfully!",
          });
        } else {
          throw new Error("Invalid quiz format");
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Could not load the quiz. Please check the file format.",
          variant: "destructive",
        });
      }
      return;
    }

    // Handle other file types with the existing logic
    if (!contentType) {
      toast({
        title: "Error",
        description: "Please select a content type",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("files", file);

      const expertMap: Record<string, { expert: string; prompt: string }> = {
        pariksha: { expert: "pariksha", prompt: "Create a concise MCQ quiz from this document with answers in Marathi. Return the response in the exact JSON format specified in the prompt." },
        saaransh: { expert: "saaransh", prompt: "Provide a clear, structured summary of this document in Marathi where appropriate." },
        anuvad: { expert: "anuvad", prompt: "Translate the document to English with context-aware explanations for key terms." },
      };

      const selected = expertMap[contentType];
      if (!selected) {
        throw new Error("Unsupported content type selected");
      }

      formData.append("prompt", selected.prompt);
      formData.append("options", JSON.stringify({ expert: selected.expert }));

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/gemini/generate`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || `Request failed with status ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('No response body reader available');
      }

      let result = '';
      const decoder = new TextDecoder();
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        result += decoder.decode(value, { stream: true });
      }
      
      const data = JSON.parse(result);
      const contentStr = data?.content || "";
      setResult(contentStr);
      
      // Auto-create quiz when Pariksha is selected
      if (contentType === 'pariksha') {
        const extracted = extractJsonFromContent(contentStr);
        const validQuiz = extracted ? validateQuizData(extracted) : null;
        if (validQuiz) {
          setQuizState({
            quiz: validQuiz,
            currentQuestionIndex: 0,
            userAnswers: Array(validQuiz.questions.length).fill(null),
            showResults: false,
            score: 0,
            totalPossibleScore: validQuiz.questions.reduce((acc, q) => {
              return acc + (validQuiz.scoringSystem[q.difficulty as keyof typeof validQuiz.scoringSystem] || 1);
            }, 0),
          });
        }
      }
      
      toast({
        title: "Success!",
        description: "Content processed successfully",
      });
    } catch (error: any) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: error.message || "An error occurred while processing the file",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (quizState.showResults || !quizState.quiz) return;

    const newAnswers = [...quizState.userAnswers];
    newAnswers[quizState.currentQuestionIndex] = answerIndex;
    
    setQuizState(prev => ({
      ...prev,
      userAnswers: newAnswers
    }));
  };

  const handleNextQuestion = () => {
    if (!quizState.quiz) return;
    
    setQuizState(prev => ({
      ...prev,
      currentQuestionIndex: Math.min(prev.currentQuestionIndex + 1, prev.userAnswers.length - 1)
    }));
  };

  const handlePreviousQuestion = () => {
    setQuizState(prev => ({
      ...prev,
      currentQuestionIndex: Math.max(prev.currentQuestionIndex - 1, 0)
    }));
  };

  const calculateScore = useCallback(() => {
    if (!quizState.quiz) return 0;
    
    return quizState.quiz.questions.reduce((score, question, index) => {
      if (quizState.userAnswers[index] === question.correctAnswer) {
        return score + (quizState.quiz?.scoringSystem[question.difficulty as keyof typeof quizState.quiz.scoringSystem] || 1);
      }
      return score;
    }, 0);
  }, [quizState.quiz, quizState.userAnswers]);

  const handleSubmitQuiz = () => {
    if (!quizState.quiz) return;
    
    const score = calculateScore();
    
    setQuizState(prev => ({
      ...prev,
      showResults: true,
      score
    }));
  };

  const handleCreateQuizFromResult = () => {
    if (!result) {
      toast({ title: "No content", description: "Please generate content first.", variant: "destructive" });
      return;
    }
    const extracted = extractJsonFromContent(result);
    const validQuiz = extracted ? validateQuizData(extracted) : null;
    if (!validQuiz) {
      toast({ title: "Invalid quiz format", description: "Could not detect a valid quiz JSON in the generated content.", variant: "destructive" });
      return;
    }
    setQuizState({
      quiz: validQuiz,
      currentQuestionIndex: 0,
      userAnswers: Array(validQuiz.questions.length).fill(null),
      showResults: false,
      score: 0,
      totalPossibleScore: validQuiz.questions.reduce((acc, q) => acc + (validQuiz.scoringSystem[q.difficulty as keyof typeof validQuiz.scoringSystem] || 1), 0),
    });
  };

  const renderQuiz = () => {
    if (!quizState.quiz) return null;
    
    const currentQuestion = quizState.quiz.questions[quizState.currentQuestionIndex];
    const isLastQuestion = quizState.currentQuestionIndex === quizState.quiz.questions.length - 1;
    const hasAnswered = quizState.userAnswers[quizState.currentQuestionIndex] !== null;
    
    if (quizState.showResults) {
      const percentage = (quizState.score / quizState.totalPossibleScore) * 100;
      
      return (
        <Card className="w-full max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Quiz Results</CardTitle>
            <CardDescription className="text-center">
              {quizState.quiz.title}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center justify-center py-8">
              <div className="text-5xl font-bold mb-2">{Math.round(percentage)}%</div>
              <div className="text-lg text-muted-foreground">
                {quizState.score} out of {quizState.totalPossibleScore} points
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 mt-4 max-w-md">
                <div 
                  className="bg-green-500 h-4 rounded-full transition-all duration-500" 
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Question Review</h3>
              {quizState.quiz.questions.map((question, index) => {
                const userAnswer = quizState.userAnswers[index];
                const isCorrect = userAnswer === question.correctAnswer;
                const points = quizState.quiz?.scoringSystem[question.difficulty as keyof typeof quizState.quiz.scoringSystem] || 1;
                
                return (
                  <div key={question.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium">Question {index + 1}: {question.question}</h4>
                      <span className={`px-2 py-1 rounded text-xs ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {isCorrect ? `+${points} points` : '0 points'}
                      </span>
                    </div>
                    <div className="mt-2 space-y-2">
                      {question.options.map((option, optIndex) => (
                        <div 
                          key={optIndex}
                          className={`p-2 rounded ${optIndex === question.correctAnswer 
                            ? 'bg-green-50 border border-green-200' 
                            : optIndex === userAnswer 
                              ? 'bg-red-50 border border-red-200' 
                              : 'bg-gray-50'}`}
                        >
                          <div className="flex items-center">
                            {optIndex === question.correctAnswer ? (
                              <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                            ) : optIndex === userAnswer ? (
                              <XCircle className="h-4 w-4 text-red-500 mr-2" />
                            ) : (
                              <div className="h-4 w-4 mr-2" />
                            )}
                            {option}
                          </div>
                        </div>
                      ))}
                    </div>
                    {!isCorrect && (
                      <div className="mt-3 p-3 bg-blue-50 rounded-md">
                        <p className="text-sm font-medium text-blue-800">Explanation:</p>
                        <p className="text-sm text-blue-700">{question.explanation}</p>
                        <p className="mt-2 text-sm text-blue-600">
                          <span className="font-medium">Language Tip:</span> {question.languageTip}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={() => {
              setQuizState({
                quiz: null,
                currentQuestionIndex: 0,
                userAnswers: [],
                showResults: false,
                score: 0,
                totalPossibleScore: 0,
              });
              setFile(null);
            }}>
              Start a New Quiz
            </Button>
          </CardFooter>
        </Card>
      );
    }
    
    return (
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-bold">{quizState.quiz.title}</CardTitle>
              <CardDescription>{quizState.quiz.description}</CardDescription>
            </div>
            <div className="text-sm text-muted-foreground">
              Question {quizState.currentQuestionIndex + 1} of {quizState.quiz.questions.length}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">
                {currentQuestion.category} • {currentQuestion.difficultyStars} {currentQuestion.difficulty}
              </span>
            </div>
            <h3 className="text-lg font-medium mb-4">{currentQuestion.question}</h3>
            
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                const isSelected = quizState.userAnswers[quizState.currentQuestionIndex] === index;
                const isCorrect = index === currentQuestion.correctAnswer;
                
                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={quizState.showResults}
                    className={`w-full text-left p-4 rounded-lg border transition-colors ${
                      isSelected 
                        ? 'bg-primary/10 border-primary' 
                        : 'hover:bg-accent hover:text-accent-foreground'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`flex items-center justify-center w-6 h-6 rounded-full border mr-3 flex-shrink-0 ${
                        isSelected ? 'bg-primary text-primary-foreground border-primary' : 'border-muted-foreground/30'
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span>{option}</span>
                    </div>
                  </button>
                );
              })}
            </div>
            
            {hasAnswered && (
              <div className="mt-6 p-4 bg-blue-50 rounded-md">
                <p className="font-medium text-blue-800">Explanation:</p>
                <p className="text-blue-700">{currentQuestion.explanation}</p>
                <p className="mt-2 text-sm text-blue-600">
                  <span className="font-medium">Language Tip:</span> {currentQuestion.languageTip}
                </p>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={handlePreviousQuestion}
            disabled={quizState.currentQuestionIndex === 0}
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Previous
          </Button>
          
          {isLastQuestion ? (
            <Button 
              onClick={handleSubmitQuiz}
              disabled={!hasAnswered}
            >
              Submit Quiz
            </Button>
          ) : (
            <Button 
              onClick={handleNextQuestion}
              disabled={!hasAnswered}
            >
              Next <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </CardFooter>
      </Card>
    );
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
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Upload form */}
          <div className="lg:max-w-[100%]">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Upload Document or Quiz</CardTitle>
                <CardDescription>
                  Upload a document to generate content or upload a quiz JSON file
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleFileUpload} className="space-y-6">
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="document">Document</Label>
                    <Input 
                      id="document" 
                      type="file" 
                      onChange={handleFileChange}
                      accept=".pdf,.txt,.doc,.docx,.json"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Supported formats: PDF, TXT, DOC, DOCX, JSON
                    </p>
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="content-type">Content Type</Label>
                    <Select onValueChange={setContentType} value={contentType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select content type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pariksha">Generate Quiz (परीक्षा)</SelectItem>
                        <SelectItem value="saaransh">Generate Summary (सारांश)</SelectItem>
                        <SelectItem value="anuvad">Translate (अनुवाद)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="pt-2">
                    <Button type="submit" disabled={loading}>
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Upload className="mr-2 h-4 w-4" />
                          Upload & Process
                        </>
                      )}
                    </Button>
                  </div>
                </form>
                
                {/* <div className="mt-8 border-t pt-6">
                  <h3 className="text-lg font-medium mb-3">Sample Quiz Format</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Upload a JSON file with the following format to load a quiz directly:
                  </p>
                  <pre className="bg-muted p-4 rounded-md text-xs overflow-x-auto">
{`{
  "quiz": {
    "title": "Quiz Title in Marathi",
    "description": "Quiz description",
    "totalQuestions": 5,
    "questions": [
      {
        "id": 1,
        "question": "Question in Marathi?",
        "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
        "correctAnswer": 0,
        "explanation": "Detailed explanation in Marathi",
        "languageTip": "Language learning tip",
        "difficulty": "easy",
        "difficultyStars": "★",
        "category": "vocabulary"
      }
    ],
    "scoringSystem": {
      "easy": 1,
      "medium": 2,
      "hard": 3
    },
    "instructions": "Quiz instructions in Marathi"
  }
}`}
                  </pre>
                </div> */}
              </CardContent>
            </Card>
          </div>

          {/* Right: Generated content or Quiz */}
          <div className="lg:max-w-[100%]">
            {quizState.quiz ? (
              renderQuiz()
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Generated Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-auto max-h-[70vh] p-2">
                    {contentType === 'pariksha' ? (
                      <pre className="text-sm bg-muted p-4 rounded-md overflow-x-auto">
                        {result || 'No content yet. Upload a document to generate content.'}
                      </pre>
                    ) : (
                      <div className="prose prose-sm max-w-none">
                        <ReactMarkdown
                          components={{
                            h1: ({node, ...props}) => <h1 className="text-2xl font-bold mt-6 mb-4" {...props} />,
                            h2: ({node, ...props}) => <h2 className="text-xl font-semibold mt-5 mb-3" {...props} />,
                            h3: ({node, ...props}) => <h3 className="text-lg font-medium mt-4 mb-2" {...props} />,
                            p: ({node, ...props}) => <p className="mb-4 leading-relaxed" {...props} />,
                            ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-4 space-y-1" {...props} />,
                            ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-4 space-y-1" {...props} />,
                            li: ({node, ...props}) => <li className="mb-1" {...props} />,
                            a: ({node, ...props}) => (
                              <a className="text-primary hover:underline underline-offset-4" target="_blank" rel="noopener noreferrer" {...props} />
                            ),
                            blockquote: ({node, ...props}) => (
                              <blockquote className="border-l-4 border-muted-foreground/20 pl-4 py-1 my-4 text-muted-foreground" {...props} />
                            ),
                            table: ({node, ...props}) => (
                              <div className="my-4 overflow-x-auto">
                                <table className="min-w-full border-collapse" {...props} />
                              </div>
                            ),
                            th: ({node, ...props}) => (
                              <th className="border px-4 py-2 text-left bg-muted/50" {...props} />
                            ),
                            td: ({node, ...props}) => (
                              <td className="border px-4 py-2" {...props} />
                            ),
                          }}
                        >
                          {result || 'No content yet. Upload a document to generate content.'}
                        </ReactMarkdown>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
  </div>
);
};

export default UploadPage;
