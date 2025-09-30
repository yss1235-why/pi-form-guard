export const isPiBrowser = (): boolean => {
  const userAgent = navigator.userAgent.toLowerCase();
  // Check for Pi Browser identifier in user agent
  // Pi Browser typically contains "PiBrowser" or "Pi" in the user agent string
  return userAgent.includes("pibrowser") || userAgent.includes("pi browser");
};