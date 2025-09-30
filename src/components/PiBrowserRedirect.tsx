import React from "react";
import { Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

const PiBrowserRedirect: React.FC = () => {
  const [showModal, setShowModal] = React.useState(true);
  
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const isInWebView = /wv/.test(navigator.userAgent);

  // Don't show modal if already in Pi Browser (WebView) or not on mobile
  if (!isMobile || isInWebView || !showModal) {
    return null;
  }

  const handleOpenPiBrowser = () => {
    const currentURL = window.location.href;
    const piBrowserURL = `pibrowser://open?url=${encodeURIComponent(currentURL)}`;
    
    window.location.href = piBrowserURL;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Smartphone className="w-10 h-10 text-purple-600" />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Pi Browser Required
        </h2>

        <p className="text-gray-600 mb-8">
          This application must be accessed through Pi Browser for security and proper functionality.
        </p>

        <Button
          onClick={handleOpenPiBrowser}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 text-lg mb-4"
        >
          Open in Pi Browser
        </Button>

        <button
          onClick={() => setShowModal(false)}
          className="text-sm text-gray-500 hover:text-gray-700 underline"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
};

export default PiBrowserRedirect;
