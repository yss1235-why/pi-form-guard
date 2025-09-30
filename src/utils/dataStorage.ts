export interface Submission {
  id: string;
  content: string;
  timestamp: string;
}

const STORAGE_KEY = "pi_form_submissions";

export const saveSubmission = (content: string): void => {
  const submission: Submission = {
    id: Date.now().toString(),
    content,
    timestamp: new Date().toISOString(),
  };

  const existingSubmissions = getSubmissions();
  existingSubmissions.push(submission);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existingSubmissions));
};

export const getSubmissions = (): Submission[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const clearSubmissions = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};