import React from 'react';
import { Check } from 'lucide-react';
import { Candidate } from '../types';
import { CandidatePhoto } from './CandidatePhoto';

interface CandidateCardProps {
  candidate: Candidate;
  isSelected: boolean;
  onSelect: (candidateId: number) => void;
  isConfirmationView?: boolean;
  customCandidatePhoto?: string | null;
  isFocusMode?: boolean;
}

export const CandidateCard: React.FC<CandidateCardProps> = ({
  candidate,
  isSelected,
  onSelect,
  isConfirmationView = false,
  customCandidatePhoto,
  isFocusMode = false,
}) => {
  return (
    <div
      onClick={() => !isConfirmationView && onSelect(candidate.id)}
      role="button"
      tabIndex={isConfirmationView ? -1 : 0}
      onKeyDown={(e) => {
        if (!isConfirmationView && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onSelect(candidate.id);
        }
      }}
      className={`relative rounded-3xl flex flex-col items-center justify-between transition-all duration-200 select-none ${
        isFocusMode ? 'p-4 sm:p-6' : 'p-4 sm:p-5'
      } ${
        isConfirmationView
          ? 'bg-white border-4 border-emerald-500 shadow-2xl max-w-sm w-full mx-auto ring-4 ring-emerald-400/30'
          : `cursor-pointer ${
              isSelected
                ? 'bg-white border-4 border-emerald-500 shadow-2xl ring-4 ring-emerald-400/40 scale-[1.02]'
                : 'bg-white border-2 border-slate-200 shadow-md hover:border-blue-400 hover:shadow-xl hover:scale-[1.01]'
            }`
      }`}
    >
      {/* Top Floating Circular Number Badge with Checkmark if selected */}
      <div className="relative -mt-8 sm:-mt-9 mb-2 z-10 flex items-center justify-center">
        <div
          className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-white flex items-center justify-center font-black text-2xl sm:text-3xl shadow-lg transition-colors ${
            isSelected
              ? 'bg-emerald-600 text-white ring-4 ring-emerald-300'
              : 'bg-[#0a2558] text-white'
          }`}
        >
          {candidate.number}
        </div>

        {/* Selected Checkmark Badge floating at top right */}
        {isSelected && (
          <div className="absolute -top-1 -right-3 bg-emerald-600 text-white p-1 rounded-full border-2 border-white shadow-md animate-bounce">
            <Check className="w-4 h-4 sm:w-5 sm:h-5 stroke-[3]" />
          </div>
        )}
      </div>

      {/* Frame Foto Calon (Konsisten, Proporsional, Tanpa Distorsi) */}
      <div className="w-full mb-3 sm:mb-4 relative">
        <CandidatePhoto
          candidate={candidate}
          customPhotoUrl={candidate.id === 2 ? customCandidatePhoto : undefined}
          isConfirmationView={isConfirmationView}
        />

        {/* Selected Overlay Pill on Photo */}
        {isSelected && !isConfirmationView && (
          <div className="absolute top-2 right-2 bg-emerald-600/95 backdrop-blur-xs text-white text-[10px] sm:text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md flex items-center gap-1 border border-emerald-400">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
            <span>TERPILIH</span>
          </div>
        )}
      </div>

      {/* Tombol / Banner Nama Calon (Dark Navy Pill Button) */}
      <div className="w-full mb-2">
        <div
          className={`w-full py-2.5 sm:py-3 px-3 rounded-2xl text-center font-black text-sm sm:text-base md:text-lg tracking-wide shadow-md uppercase transition-colors ${
            isSelected
              ? 'bg-[#071d43] text-white ring-2 ring-emerald-400'
              : 'bg-[#092350] text-white'
          }`}
        >
          {candidate.name}
        </div>
      </div>

      {/* Sub-label Pill:
          - Calon 1: CALON FIKTIF
          - Calon 2: FOTO KANDIDAT REFERENSI
          - Calon 3: CALON FIKTIF
      */}
      <div className="w-full flex justify-center items-center min-h-[28px] gap-2">
        <span
          className={`text-[10px] sm:text-[11px] font-bold px-3.5 py-0.5 rounded-full uppercase tracking-wider border ${
            candidate.id === 2
              ? 'bg-blue-50 text-blue-800 border-blue-200'
              : 'bg-slate-100 text-slate-600 border-slate-200'
          }`}
        >
          {candidate.label}
        </span>
      </div>
    </div>
  );
};
