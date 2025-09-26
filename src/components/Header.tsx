import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Upload } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-primary">
              <BookOpen className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <div className="font-bold text-xl text-foreground">BhashaGuru AI</div>
              <div className="text-xs text-muted-foreground font-medium">Abhyas Studio</div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-foreground hover:text-primary transition-colors font-medium">
              Features
            </a>
            <a href="#how-it-works" className="text-foreground hover:text-primary transition-colors font-medium">
              How It Works
            </a>
            <a href="#audience" className="text-foreground hover:text-primary transition-colors font-medium">
              For You
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <Badge className="hidden sm:flex bg-primary/10 text-primary">
              Beta Access
            </Badge>
            <Link to="/auth">
              <Button variant="outline" size="sm">
                Login
              </Button>
            </Link>
            <Link to="/upload">
              <Button size="sm" className="bg-gradient-primary hover:opacity-90">
                <Upload className="mr-2 h-4 w-4" />
                Try Free
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;