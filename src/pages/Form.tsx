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
         
          <div className="backdrop-blur-md bg-white/70 rounded-2xl shadow-glass border border-white/20 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
               
               <Input
                  id="submission"
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter your information here..."
                  className="w-full px-4 py-8 bg-white/50 border-2 border-border focus:border-accent transition-colors text-lg"
                  disabled={isSubmitting}
                />
               
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
               className="w-full bg-[#703d92] hover:bg-[#692f8f] text-white font-semibold py-6 text-lg transition-all hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
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

           
          </div>

         
        </div>
      )}
    </div>
  );
};

export default Form;
