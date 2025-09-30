import React from "react";
import { AlertCircle } from "lucide-react";
import PiLogo from "./PiLogo";

const BrowserGate: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-background flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="backdrop-blur-md bg-white/70 rounded-2xl shadow-glass border border-white/20 p-8">
          <div className="flex justify-center mb-6">
            <PiLogo size="lg" />
          </div>
          
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="text-accent w-6 h-6" />
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Pi Browser Required
            </h1>
          </div>
          
          <p className="text-foreground mb-6 leading-relaxed">
            This application is exclusively available through Pi Browser to ensure secure access 
            within the Pi Network ecosystem.
          </p>
          
          <div className="space-y-4">
            <div className="bg-muted/50 rounded-lg p-4">
              <h2 className="font-semibold text-foreground mb-2">
                How to Access This Application:
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground text-sm">
                <li>Download Pi Browser from your device's app store</li>
                <li>Open Pi Browser and navigate to this URL</li>
                <li>Access the application features securely</li>
              </ol>
            </div>
            
            <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
              <p className="text-sm text-accent-foreground">
                <strong>Note:</strong> Pi Browser ensures enhanced security and integration 
                with Pi Network services.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowserGate;