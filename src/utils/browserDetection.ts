export const isPiBrowser = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const userAgent = navigator.userAgent.toLowerCase();
  return userAgent.includes('pi browser') || userAgent.includes('pibrowser');
};
