import React from "react";
import { Shield, CheckCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface RulesModalProps {
  isOpen: boolean;
  onAccept: () => void;
}

const RulesModal: React.FC<RulesModalProps> = ({ isOpen, onAccept }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-2xl bg-white/95 backdrop-blur-md rounded-2xl shadow-glass border border-white/20 animate-in zoom-in-95 duration-300">
        <div className="bg-gradient-primary p-6 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-primary-foreground" />
            <h2 className="text-2xl font-bold text-primary-foreground">
              Terms & Conditions
            </h2>
          </div>
        </div>
        
        <ScrollArea className="h-96 p-6">
          <div className="space-y-6">
            <section>
              <h3 className="font-semibold text-lg mb-3 text-foreground flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-accent" />
                Submission Guidelines
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span>All submissions must contain accurate and truthful information</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span>Content must be appropriate and respectful to all community members</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span>Personal information shared is at your own discretion and risk</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span>Submissions cannot be edited or deleted once submitted</span>
                </li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-3 text-foreground flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-accent" />
                Data Usage Policy
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span>Your data will be stored securely within the Pi Network ecosystem</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span>Information may be reviewed by authorized administrators</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span>We do not share your data with third parties without consent</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span>You retain ownership of your submitted content</span>
                </li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-3 text-foreground flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-accent" />
                Community Standards
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span>Maintain respectful communication at all times</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span>No spam, harassment, or inappropriate content</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span>Comply with all Pi Network community guidelines</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span>Report any violations or concerns to administrators</span>
                </li>
              </ul>
            </section>

            <section className="bg-accent/10 border border-accent/30 rounded-lg p-4">
              <p className="text-sm text-accent-foreground">
                <strong>Important:</strong> By accepting these terms, you acknowledge that you have 
                read, understood, and agree to comply with all guidelines and policies outlined above. 
                Violation of these terms may result in restricted access to the platform.
              </p>
            </section>
          </div>
        </ScrollArea>
        
        <div className="p-6 border-t border-border">
          <Button
            onClick={onAccept}
            className="w-full bg-gradient-accent hover:opacity-90 text-accent-foreground font-semibold py-6 text-lg transition-all hover:scale-[1.02] shadow-glow-accent"
          >
            I Accept the Terms & Conditions
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RulesModal;