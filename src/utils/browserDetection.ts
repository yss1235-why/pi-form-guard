export const isPiBrowser = (): boolean => {
  const userAgent = navigator.userAgent.toLowerCase();
  
  // Temporary debugging - remove after identifying correct user agent
  console.log("Current User Agent:", navigator.userAgent);
  console.log("Lowercase User Agent:", userAgent);
  
  // Check for Pi Browser identifier in user agent
  // Pi Browser typically contains "PiBrowser" or "Pi" in the user agent string
  return userAgent.includes("pibrowser") || userAgent.includes("pi browser");
};
