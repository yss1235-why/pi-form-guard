export const isPiBrowserAvailable = (): boolean => {
  return typeof window !== 'undefined' && typeof window.Pi !== 'undefined';
};

export const authenticateWithPi = async (): Promise<AuthResult> => {
  if (!isPiBrowserAvailable()) {
    throw new Error('Pi SDK is not available. Please open this app in Pi Browser.');
  }

  try {
    const scopes = ['username'];
    
    const onIncompletePaymentFound = (payment: any) => {
      console.log('Incomplete payment found:', payment);
    };

    const auth = await window.Pi.authenticate(scopes, onIncompletePaymentFound);
    return auth;
  } catch (error) {
    console.error('Pi authentication failed:', error);
    throw error;
  }
};

export interface AuthResult {
  accessToken: string;
  user: {
    uid: string;
    username: string;
  };
}

declare global {
  interface Window {
    Pi: {
      init: (config: { version: string; sandbox?: boolean }) => void;
      authenticate: (
        scopes: string[],
        onIncompletePaymentFound: (payment: any) => void
      ) => Promise<AuthResult>;
    };
  }
}
