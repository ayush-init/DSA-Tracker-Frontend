/**
 * Onboarding-related types for student
 */

export interface OnboardingData {
  username: string;
  leetcode_id: string;
  gfg_id: string;
  city_id: number;
  batch_id: number;
}

export interface OnboardingModalProps {
  isOpen: boolean;
  user: unknown;
  onClose: () => void;
}

export interface OnboardingStep1Props {
  data: OnboardingData;
  setData: (data: OnboardingData | ((prev: OnboardingData) => OnboardingData)) => void;
  setStep: (step: number) => void;
}

export interface OnboardingStep2Props {
  data: OnboardingData;
  setData: (data: OnboardingData | ((prev: OnboardingData) => OnboardingData)) => void;
  setStep: (step: number) => void;
}

export interface OnboardingStep3Props {
  data: OnboardingData;
  setStep: (step: number) => void;
  confirmChecked: boolean;
  setConfirmChecked: (checked: boolean) => void;
  submitOnboarding: () => Promise<void>;
  loading: boolean;
}

export interface OnboardingHookReturn {
  step: number;
  setStep: (step: number) => void;
  data: OnboardingData;
  setData: (data: OnboardingData | ((prev: OnboardingData) => OnboardingData)) => void;
  confirmChecked: boolean;
  setConfirmChecked: (checked: boolean) => void;
  loading: boolean;
  submitOnboarding: () => Promise<void>;
}

export interface ProgressBarProps {
  step: number;
}
