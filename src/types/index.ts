export interface Candidate {
  id: number;
  number: string;
  name: string;
  label: string;
  isRealCandidate?: boolean;
  imageSrc?: string | null;
  gender?: 'male' | 'female';
}

export interface SimulationStep {
  step: number;
  title: string;
  shortTitle: string;
  subtitle: string;
  description: string;
  voiceGuide: string;
}

export interface SimulationState {
  currentStep: number;
  isVerified: boolean;
  isScanned: boolean;
  selectedCandidateId: number | null;
  isConfirmed: boolean;
  isFinished: boolean;
  audioEnabled: boolean;
  isSpeaking: boolean;
  textSize: 'normal' | 'large';
}
