/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { ProgressSteps } from './components/ProgressSteps';
import { VoiceGuide } from './components/VoiceGuide';
import { StepContent } from './components/StepContent';
import { FocusVotingMode } from './components/FocusVotingMode';
import { FaqModal } from './components/FaqModal';
import { CompletionModal } from './components/CompletionModal';
import { AssetManagerModal } from './components/AssetManagerModal';
import { SIMULATION_STEPS, INITIAL_CANDIDATES } from './data/mockData';
import { Candidate } from './types';
import { stopSpeech } from './utils/speech';
import { ShieldCheck, Users, Laptop, Vote } from 'lucide-react';

export default function App() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [isScanned, setIsScanned] = useState<boolean>(false);
  const [selectedCandidateId, setSelectedCandidateId] = useState<number | null>(null);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);
  const [textSize, setTextSize] = useState<'normal' | 'large'>('normal');
  const [isFaqOpen, setIsFaqOpen] = useState<boolean>(false);
  const [isCompletionOpen, setIsCompletionOpen] = useState<boolean>(false);
  const [isAssetManagerOpen, setIsAssetManagerOpen] = useState<boolean>(false);

  // Asset Customization State
  const [candidate2Name, setCandidate2Name] = useState<string>('DEDENG EFENDI');
  const [candidate1Photo, setCandidate1Photo] = useState<string | null>(null);
  const [candidate2Photo, setCandidate2Photo] = useState<string | null>(null);
  const [candidate3Photo, setCandidate3Photo] = useState<string | null>(null);
  const [logoSumedang, setLogoSumedang] = useState<string | null>(null);

  // Stop speech and scroll on step changes
  useEffect(() => {
    stopSpeech();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  // Combined candidates list with dynamic photos and Dedeng Efendi
  const candidates: Candidate[] = useMemo(() => {
    return INITIAL_CANDIDATES.map((cand) => {
      if (cand.id === 1) {
        return {
          ...cand,
          imageSrc: candidate1Photo || cand.imageSrc,
        };
      }
      if (cand.id === 2) {
        return {
          ...cand,
          name: candidate2Name || 'DEDENG EFENDI',
          imageSrc: candidate2Photo || cand.imageSrc,
        };
      }
      if (cand.id === 3) {
        return {
          ...cand,
          imageSrc: candidate3Photo || cand.imageSrc,
        };
      }
      return cand;
    });
  }, [candidate1Photo, candidate2Name, candidate2Photo, candidate3Photo]);

  // Reset all simulation state to step 1
  const handleReset = () => {
    stopSpeech();
    setCurrentStep(1);
    setIsVerified(false);
    setIsScanned(false);
    setSelectedCandidateId(null);
    setIsConfirmed(false);
    setIsCompletionOpen(false);
  };

  // Next Step with validation check
  const handleNextStep = () => {
    if (currentStep === 2 && !isVerified) return;
    if (currentStep === 4 && !isScanned) return;
    if (currentStep === 5 && !selectedCandidateId) return;

    if (currentStep < 8) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  // Prev Step
  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleVerify = () => {
    setIsVerified(true);
  };

  const handleScan = () => {
    setIsScanned(true);
  };

  const handleSelectCandidate = (id: number) => {
    setSelectedCandidateId(id);
  };

  const handleConfirmChoice = () => {
    setIsConfirmed(true);
    setCurrentStep(7);
  };

  const handleStepJump = (targetStep: number) => {
    if (targetStep < currentStep) {
      setCurrentStep(targetStep);
    }
  };

  const currentStepData = SIMULATION_STEPS[currentStep - 1] || SIMULATION_STEPS[0];
  const selectedCandidate = candidates.find((c) => c.id === selectedCandidateId);

  // Is Focus Voting Mode Active? (Automatically activated on Step 5)
  const isFocusMode = currentStep === 5;

  return (
    <div
      className={`min-h-screen flex flex-col transition-all duration-300 ${
        isFocusMode
          ? 'bg-slate-100 text-slate-800'
          : 'bg-gradient-to-b from-sky-100 via-slate-100 to-sky-200 text-slate-800'
      } ${textSize === 'large' ? 'text-lg' : 'text-base'}`}
    >
      {/* ========================================================
          MODE 1: FOCUS VOTING MODE (STEP 5)
          Automatically triggered on Step 5, hiding big header/footer/sidebar
      ======================================================== */}
      {isFocusMode ? (
        <FocusVotingMode
          candidates={candidates}
          selectedCandidateId={selectedCandidateId}
          onSelectCandidate={handleSelectCandidate}
          onNextStep={handleNextStep}
          onPrevStep={handlePrevStep}
          customCandidatePhoto={candidate2Photo}
          audioEnabled={audioEnabled}
          onToggleAudio={() => setAudioEnabled(!audioEnabled)}
          voiceText={currentStepData.voiceGuide}
          logoSumedangUrl={logoSumedang}
          onOpenAssetManager={() => setIsAssetManagerOpen(true)}
        />
      ) : (
        /* ========================================================
            MODE 2: STANDARD CIVIC WALKTHROUGH MODE (STEPS 1-4, 6-8)
        ======================================================== */
        <>
          {/* Header with App Identity, Official Logo Sumedang, and Permanent Label */}
          <Header
            audioEnabled={audioEnabled}
            onToggleAudio={() => setAudioEnabled(!audioEnabled)}
            onReset={handleReset}
            onOpenFaq={() => setIsFaqOpen(true)}
            onOpenAssetManager={() => setIsAssetManagerOpen(true)}
            textSize={textSize}
            onToggleTextSize={() =>
              setTextSize((prev) => (prev === 'normal' ? 'large' : 'normal'))
            }
            currentStep={currentStep}
            logoSumedangUrl={logoSumedang}
          />

          {/* Main Container */}
          <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-6 flex flex-col justify-between">
            <div className="w-full">
              {/* Progress Timeline 1–8 matching referensi-tampilan.png */}
              <ProgressSteps
                currentStep={currentStep}
                onStepClick={handleStepJump}
              />

              {/* Voice Guidance Assistant Widget */}
              <VoiceGuide
                text={currentStepData.voiceGuide}
                stepNumber={currentStep}
                audioEnabled={audioEnabled}
                onToggleAudio={() => setAudioEnabled(!audioEnabled)}
              />

              {/* Active Step Content */}
              <StepContent
                currentStep={currentStep}
                candidates={candidates}
                customCandidatePhoto={candidate2Photo}
                isVerified={isVerified}
                onVerify={handleVerify}
                isScanned={isScanned}
                onScan={handleScan}
                selectedCandidateId={selectedCandidateId}
                onSelectCandidate={handleSelectCandidate}
                onConfirmChoice={handleConfirmChoice}
                onNextStep={handleNextStep}
                onPrevStep={handlePrevStep}
                onReset={handleReset}
                textSize={textSize}
                onOpenCompletionModal={() => setIsCompletionOpen(true)}
              />
            </div>

            {/* Bottom Civic 4-Pillar Footer (Matching referensi-tampilan.png) */}
            <footer className="mt-8 rounded-2xl bg-[#0b2149] text-white p-4 sm:p-5 shadow-xl border border-blue-900">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
                {/* Pillar 1 */}
                <div className="flex items-center gap-3 border-b sm:border-b-0 sm:border-r border-blue-800/80 pb-3 sm:pb-0 sm:pr-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center shrink-0 text-amber-300">
                    <Vote className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-black uppercase tracking-wider text-amber-300">
                      SIMULASI SOSIALISASI
                    </div>
                    <div className="text-[11px] text-blue-200 font-semibold leading-tight mt-0.5">
                      BUKAN SISTEM PEMILIHAN RESMI
                    </div>
                  </div>
                </div>

                {/* Pillar 2 */}
                <div className="flex items-center gap-3 border-b sm:border-b-0 sm:border-r border-blue-800/80 pb-3 sm:pb-0 sm:pr-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center shrink-0 text-emerald-400">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-black uppercase tracking-wider text-white">
                      AMAN
                    </div>
                    <div className="text-[11px] text-blue-200 font-medium leading-tight mt-0.5">
                      Tanpa Penyimpanan Data
                    </div>
                  </div>
                </div>

                {/* Pillar 3 */}
                <div className="flex items-center gap-3 border-b sm:border-b-0 sm:border-r border-blue-800/80 pb-3 sm:pb-0 sm:pr-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center shrink-0 text-cyan-300">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-black uppercase tracking-wider text-white">
                      TRANSPARAN
                    </div>
                    <div className="text-[11px] text-blue-200 font-medium leading-tight mt-0.5">
                      Untuk Edukasi Masyarakat
                    </div>
                  </div>
                </div>

                {/* Pillar 4 */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center shrink-0 text-yellow-300">
                    <Laptop className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-black uppercase tracking-wider text-white">
                      MUDAH DIGUNAKAN
                    </div>
                    <div className="text-[11px] text-blue-200 font-medium leading-tight mt-0.5">
                      Di TPS dan Perangkat Lainnya
                    </div>
                  </div>
                </div>
              </div>
            </footer>
          </main>
        </>
      )}

      {/* FAQ SOP Modal */}
      <FaqModal
        isOpen={isFaqOpen}
        onClose={() => setIsFaqOpen(false)}
      />

      {/* Completion Appreciation Modal */}
      <CompletionModal
        isOpen={isCompletionOpen}
        onClose={() => setIsCompletionOpen(false)}
        selectedCandidate={selectedCandidate}
        onReset={handleReset}
      />

      {/* Asset Manager Modal (Upload/Attach Candidate Photo 1, 2, 3 & Logo Sumedang) */}
      <AssetManagerModal
        isOpen={isAssetManagerOpen}
        onClose={() => setIsAssetManagerOpen(false)}
        logoSumedang={logoSumedang}
        onUpdateLogoSumedang={setLogoSumedang}
        candidate1Photo={candidate1Photo}
        onUpdateCandidate1Photo={setCandidate1Photo}
        candidate2Name={candidate2Name}
        onUpdateCandidate2Name={setCandidate2Name}
        candidate2Photo={candidate2Photo}
        onUpdateCandidate2Photo={setCandidate2Photo}
        candidate3Photo={candidate3Photo}
        onUpdateCandidate3Photo={setCandidate3Photo}
      />
    </div>
  );
}
