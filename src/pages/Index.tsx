import React from "react";
import { isPiBrowser } from "@/utils/browserDetection";
import BrowserGate from "@/components/BrowserGate";
import PiLogo from "@/components/PiLogo";
import { ArrowRight, Shield, Users, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  // For development, you can temporarily set this to true to bypass browser check
  const isAuthorized = isPiBrowser() || true; // Remove "|| true" in production

  if (!isAuthorized) {
    return <BrowserGate />;
  }

  return (
    <div className="min-h-screen bg-gradient-background">
      <div className="container mx-auto px-6 py-12">
        <header className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <PiLogo size="lg" />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Pi Network Form Portal
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Secure submission platform exclusively for Pi Network community members
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          <div className="backdrop-blur-md bg-white/70 rounded-2xl shadow-glass border border-white/20 p-6 hover:scale-105 transition-transform">
            <div className="w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-accent-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-foreground">Secure Access</h3>
            <p className="text-muted-foreground text-sm">
              Exclusive Pi Browser access ensures your data remains within the trusted ecosystem
            </p>
          </div>

          <div className="backdrop-blur-md bg-white/70 rounded-2xl shadow-glass border border-white/20 p-6 hover:scale-105 transition-transform">
            <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-foreground">Easy Submission</h3>
            <p className="text-muted-foreground text-sm">
              Simple form interface with clear guidelines and instant confirmation
            </p>
          </div>

          <div className="backdrop-blur-md bg-white/70 rounded-2xl shadow-glass border border-white/20 p-6 hover:scale-105 transition-transform">
            <div className="w-12 h-12 bg-gradient-secondary rounded-full flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-secondary-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-foreground">Community Driven</h3>
            <p className="text-muted-foreground text-sm">
              Built for Pi Network members to share and contribute to our growing ecosystem
            </p>
          </div>
        </div>

        <div className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              className="bg-gradient-primary hover:opacity-90 text-primary-foreground font-semibold px-8 py-6 text-lg transition-all hover:scale-[1.02] shadow-glow-primary"
            >
              <a href="/form">
                Access Submission Form
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
            
            <Button
              asChild
              variant="outline"
              className="border-accent/50 hover:bg-accent/10 text-accent-foreground font-semibold px-8 py-6 text-lg transition-all hover:scale-[1.02]"
            >
              <a href="/admin">
                Admin Dashboard
                <Shield className="ml-2 w-5 h-5" />
              </a>
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground mt-8">
            By using this platform, you agree to comply with all Pi Network community guidelines
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;