import React from "react";

interface PiLogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const PiLogo: React.FC<PiLogoProps> = ({ size = "md", className = "" }) => {
  const sizeClasses = {
    sm: "w-12 h-12 text-2xl",
    md: "w-16 h-16 text-3xl",
    lg: "w-24 h-24 text-5xl",
  };

  return (
    <div
      className={`relative flex items-center justify-center rounded-full bg-gradient-primary shadow-glow-primary ${sizeClasses[size]} ${className}`}
    >
      <div className="absolute inset-0 rounded-full border-2 border-accent/50 animate-pulse" />
      <span className="font-bold text-primary-foreground">π</span>
    </div>
  );
};

export default PiLogo;