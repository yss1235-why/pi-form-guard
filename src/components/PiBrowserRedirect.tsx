import React from "react";
import { Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

const PiBrowserRedirect: React.FC = () => {
  const [showModal, setShowModal] = React.useState(true);
  const [showInstructions, setShowInstructions] = React.useState(false);
  
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const isAndroid = /Android/i.test(navigator.userAgent);
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  const isInWebView = /wv/.test(navigator.userAgent);

  if (!isMobile || isInWebView || !showModal) {
    return null;
  }
const handleOpenPiBrowser = () => {
  // Create a temporary anchor element and trigger click
  // This is required because Chrome only opens apps from actual link clicks
  const currentURL = window.location.href;
  const urlWithoutProtocol = currentURL.replace(/^https?:\/\//, '');
  
  let intentURL = '';
  
  if (isAndroid) {
    // Correct Chrome Intent format for Android
    intentURL = `intent://${urlWithoutProtocol}#Intent;` +
      `scheme=https;` +
      `package=pi.browser;` +
      `S.browser_fallback_url=https://play.google.com/store/apps/details?id=pi.browser;` +
      `end`;
  } else if (isIOS) {
    // iOS custom URL scheme
    intentURL = `pi://${urlWithoutProtocol}`;
  }
  
  if (intentURL) {
    // Create and click a temporary link element
    // Chrome requires user-initiated click on <a> tag
    const tempLink = document.createElement('a');
    tempLink.href = intentURL;
    tempLink.style.display = 'none';
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
  }
};

  const handleCopyURL = () => {
    const currentURL = window.location.href;
    
    navigator.clipboard.writeText(currentURL).then(() => {
      alert('URL copied to clipboard!\n\nPlease:\n1. Open Pi Browser app\n2. Paste this URL in the address bar\n3. Tap Go to access the form');
    }).catch(() => {
      alert('Please manually copy this URL and open it in Pi Browser:\n\n' + currentURL);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Smartphone className="w-10 h-10 text-purple-600" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Open in Pi Browser
          </h2>

          <p className="text-gray-600 mb-4">
            This application requires Pi Browser for secure access.
          </p>
        </div>

        {!showInstructions ? (
          <>
            <a 
  href={isAndroid 
    ? `intent://${window.location.href.replace(/^https?:\/\//, '')}#Intent;scheme=https;package=pi.browser;S.browser_fallback_url=https://play.google.com/store/apps/details?id=pi.browser;end`
    : `pi://${window.location.href.replace(/^https?:\/\//, '')}`
  }
  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 text-lg mb-3 rounded-md flex items-center justify-center no-underline"
>
  Open in Pi Browser
</a>

            <Button
              onClick={handleCopyURL}
              variant="outline"
              className="w-full border-purple-600 text-purple-600 hover:bg-purple-50 font-semibold py-4 text-lg mb-4"
            >
              Copy URL Instead
            </Button>
          </>
        ) : (
          <>
            <div className="bg-yellow-50 rounded-lg p-4 mb-6 text-left">
              <h3 className="font-semibold text-gray-900 mb-3">Manual Access Instructions:</h3>
              <ol className="text-sm text-gray-700 space-y-2">
                <li className="flex gap-2">
                  <span className="font-semibold">1.</span>
                  <span>Open the Pi Browser app on your device</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold">2.</span>
                  <span>Copy this page's URL from your browser</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold">3.</span>
                  <span>Paste it into Pi Browser's address bar</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold">4.</span>
                  <span>Tap Go to access the application</span>
                </li>
              </ol>
            </div>

            <Button
              onClick={handleCopyURL}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 text-lg mb-4"
            >
              Copy URL to Clipboard
            </Button>
          </>
        )}

        <button
          onClick={() => setShowModal(false)}
          className="text-sm text-gray-500 hover:text-gray-700 underline w-full"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
};

export default PiBrowserRedirect;
