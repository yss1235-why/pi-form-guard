import React, { useState } from "react";
import { isPiBrowser } from "@/utils/browserDetection";
import { saveSubmission } from "@/utils/dataStorage";
import BrowserGate from "@/components/BrowserGate";
import RulesModal from "@/components/RulesModal";
import PiLogo from "@/components/PiLogo";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const Form = () => {
  const [hasAcceptedRules, setHasAcceptedRules] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // For development, you can temporarily set this to true to bypass browser check
  const isAuthorized = isPiBrowser() || true; // Remove "|| true" in production

  if (!isAuthorized) {
    return <BrowserGate />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please enter some content before submitting.",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API delay for better UX
    setTimeout(() => {
      saveSubmission(inputValue.trim());
      
      toast({
        title: "Success!",
        description: "Your submission has been recorded successfully.",
        className: "border-accent/50 bg-accent/10",
      });
      
      setInputValue("");
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-background">
      <RulesModal 
        isOpen={!hasAcceptedRules} 
        onAccept={() => setHasAcceptedRules(true)} 
      />
      
      {hasAcceptedRules && (
        <div className="container mx-auto px-6 py-12 max-w-2xl">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <PiLogo size="md" />
            </div>
            <h1 className="text-4xl font-bold mb-3 bg-gradient-primary bg-clip-text text-transparent">
              Submission Form
            </h1>
            <p className="text-muted-foreground">
              Share your information with the Pi Network community
            </p>
          </div>

          <div className="backdrop-blur-md bg-white/70 rounded-2xl shadow-glass border border-white/20 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="submission" className="block text-sm font-medium text-foreground mb-2">
                  Your Submission
                </label>
                <Input
                  id="submission"
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter your information here..."
                  className="w-full px-4 py-3 bg-white/50 border-2 border-border focus:border-accent transition-colors"
                  disabled={isSubmitting}
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Please ensure your submission follows community guidelines
                </p>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-accent hover:opacity-90 text-accent-foreground font-semibold py-6 text-lg transition-all hover:scale-[1.02] shadow-glow-accent disabled:opacity-50 disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-accent-foreground border-t-transparent mr-2" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 w-5 h-5" />
                    Submit Information
                  </>
                )}
              </Button>
            </form>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-lg">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-medium text-foreground">Instant Confirmation</p>
                  <p className="text-muted-foreground">You'll receive immediate feedback upon submission</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-accent/5 rounded-lg">
                <AlertCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-medium text-foreground">Data Security</p>
                  <p className="text-muted-foreground">Your information is stored securely within the Pi ecosystem</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <a 
              href="/" 
              className="text-sm text-muted-foreground hover:text-accent transition-colors"
            >
              ← Return to Home
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;