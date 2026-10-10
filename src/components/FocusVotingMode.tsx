import React, { useState, useEffect } from 'react';
import {
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  LogOut,
  ImageIcon,
} from 'lucide-react';
import { Candidate } from '../types';
import { CandidateCard } from './CandidateCard';
import { speakIndonesian, stopSpeech } from '../utils/speech';

interface FocusVotingModeProps {
  candidates: Candidate[];
  selectedCandidateId: number | null;
  onSelectCandidate: (id: number) => void;
  onNextStep: () => void;
  onPrevStep: () => void;
  customCandidatePhoto?: string | null;
  audioEnabled: boolean;
  onToggleAudio: () => void;
  voiceText: string;
  logoSumedangUrl?: string | null;
  onOpenAssetManager?: () => void;
}

export const FocusVotingMode: React.FC<FocusVotingModeProps> = ({
  candidates,
  selectedCandidateId,
  onSelectCandidate,
  onNextStep,
  onPrevStep,
  customCandidatePhoto,
  audioEnabled,
  onToggleAudio,
  voiceText,
  logoSumedangUrl,
  onOpenAssetManager,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const finalLogo = logoSumedangUrl || '/assets/logo-sumedang.png';

  useEffect(() => {
    // Scroll smoothly to top on entering focus mode
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      stopSpeech();
    };
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  };

  const handlePlayVoice = () => {
    if (isPlayingAudio) {
      stopSpeech();
      setIsPlayingAudio(false);
      return;
    }
    if (!audioEnabled) {
      onToggleAudio();
    }
    speakIndonesian(
      voiceText,
      () => setIsPlayingAudio(true),
      () => setIsPlayingAudio(false)
    );
  };

  const selectedCandidate = candidates.find((c) => c.id === selectedCandidateId);

  return (
    <div className="w-full min-h-screen bg-slate-100 flex flex-col justify-between animate-fade-in text-slate-800">
      {/* 1. TOP COMPACT FOCUS BAR */}
      <header className="sticky top-0 z-50 bg-[#091f48] text-white px-3 sm:px-6 py-2.5 shadow-lg border-b border-blue-900 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Step Indicator & Authentic Logo Sumedang with object-fit: contain */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 p-1 flex items-center justify-center shrink-0 overflow-hidden shadow-xs">
            {!logoError ? (
              <img
                src={finalLogo}
                alt="Logo Sumedang"
                onError={() => setLogoError(true)}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src="/assets/logo-sumedang.svg"
                alt="Logo Sumedang"
                className="w-full h-full object-contain"
              />
            )}
          </div>
          <div>
            <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-cyan-300 block">
              TAHAP 5 DARI 8 — PILIH CALON
            </span>
            <span className="text-[10px] text-blue-200 block font-medium">
              Layar Sentuh Pemilihan Kepala Desa Kadakajaya
            </span>
          </div>
        </div>

        {/* Center: Small Mandatory Simulation Badge */}
        <div className="order-3 sm:order-2 mx-auto sm:mx-0 bg-amber-400 text-slate-950 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-sm flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
          <span>SIMULASI — BUKAN PEMILIHAN RESMI</span>
        </div>

        {/* Right: Kiosk Tools (Voice, Fullscreen, Upload/Asset, Exit) */}
        <div className="order-2 sm:order-3 flex items-center gap-1.5 sm:gap-2">
          {/* Asset Upload Trigger Button */}
          {onOpenAssetManager && (
            <button
              onClick={onOpenAssetManager}
              type="button"
              className="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 flex items-center gap-1 transition-colors cursor-pointer"
              title="Kelola & Unggah Aset Gambar"
            >
              <ImageIcon className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden lg:inline">Aset</span>
            </button>
          )}

          {/* Voice Guide Button */}
          <button
            onClick={handlePlayVoice}
            type="button"
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all cursor-pointer ${
              isPlayingAudio
                ? 'bg-rose-600 border-rose-400 text-white animate-pulse'
                : 'bg-blue-900/60 hover:bg-blue-800 border-blue-600/60 text-cyan-200'
            }`}
          >
            {isPlayingAudio ? (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Hentikan Suara</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-cyan-300" />
                <span className="hidden md:inline">Dengarkan Petunjuk</span>
              </>
            )}
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            type="button"
            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
            title={isFullscreen ? 'Perkecil Tampilan' : 'Perbesar Tampilan (Layar Penuh)'}
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden md:inline">Layar Normal</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden md:inline">Perbesar Tampilan</span>
              </>
            )}
          </button>

          {/* Exit / Return Button */}
          <button
            onClick={onPrevStep}
            type="button"
            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-rose-950/70 hover:bg-rose-900 border border-rose-800 text-rose-200 flex items-center gap-1 transition-colors cursor-pointer"
            title="Keluar Mode Pemilihan (Kembali ke Tahap 4)"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Keluar Mode</span>
          </button>
        </div>
      </header>

      {/* 2. MAIN VOTING TOUCHSCREEN CANVAS */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col justify-center">
        {/* Selection Status Banner */}
        <div className="mb-6 max-w-3xl mx-auto w-full text-center">
          {selectedCandidate ? (
            <div className="p-3.5 bg-emerald-50 border-2 border-emerald-500 text-emerald-900 rounded-2xl shadow-md flex items-center justify-center gap-2.5 animate-fade-in">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
              <div className="text-sm sm:text-base font-black">
                Pilihan simulasi Anda:{' '}
                <span className="text-emerald-700 underline font-black">
                  Nomor {selectedCandidate.number} — {selectedCandidate.name}
                </span>
              </div>
            </div>
          ) : (
            <div className="p-3 bg-blue-50/80 border border-blue-200 text-blue-900 rounded-2xl flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold">
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
              <span>
                Sentuh salah satu kartu calon di bawah ini. Pilihan dapat diganti kapan saja sebelum konfirmasi.
              </span>
            </div>
          )}
        </div>

        {/* 3 Expanded Candidate Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch pt-2 mb-8">
          {candidates.map((cand) => (
            <CandidateCard
              key={cand.id}
              candidate={cand}
              isSelected={selectedCandidateId === cand.id}
              customCandidatePhoto={customCandidatePhoto}
              onSelect={onSelectCandidate}
              isFocusMode={true}
            />
          ))}
        </div>

        {/* 4. Bottom Action Bar */}
        <div className="bg-white border border-slate-300 rounded-3xl p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
          {/* Left: Button Kembali */}
          <button
            type="button"
            onClick={onPrevStep}
            className="w-full md:w-auto px-6 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 flex items-center justify-center gap-3 transition-colors cursor-pointer shadow-xs active:scale-95"
          >
            <div className="w-8 h-8 rounded-xl bg-white border border-slate-300 flex items-center justify-center shrink-0">
              <ArrowLeft className="w-4 h-4 text-slate-700" />
            </div>
            <div className="text-left">
              <div className="font-black text-sm text-slate-900 leading-tight">
                Kembali
              </div>
              <div className="text-[11px] text-slate-500 font-medium leading-tight">
                Ke Tahap Sebelumnya
              </div>
            </div>
          </button>

          {/* Middle: Info Prompt */}
          <div className="flex-1 max-w-md bg-blue-50/90 border border-blue-200/90 rounded-2xl px-4 py-3 flex items-center gap-3 text-left">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 font-bold text-sm">
              i
            </div>
            <div className="text-xs text-blue-950 leading-snug">
              <span className="font-extrabold text-blue-900 block">
                Pilih satu calon sesuai pilihan Anda.
              </span>
              <span className="text-[11px] text-blue-800">
                Setelah memilih calon, tekan tombol Lanjutkan ke Konfirmasi.
              </span>
            </div>
          </div>

          {/* Right: Button Lanjutkan ke Konfirmasi */}
          <button
            type="button"
            disabled={!selectedCandidateId}
            onClick={onNextStep}
            className={`w-full md:w-auto px-7 py-3.5 rounded-2xl flex items-center justify-between gap-4 transition-all shadow-lg cursor-pointer ${
              selectedCandidateId
                ? 'bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white ring-4 ring-emerald-400/30'
                : 'bg-slate-300 text-slate-500 cursor-not-allowed shadow-none'
            }`}
          >
            <div className="text-left">
              <div className="font-black text-sm text-white leading-tight">
                Lanjutkan
              </div>
              <div className="text-[11px] text-emerald-100 font-medium leading-tight">
                Ke Tahap Konfirmasi
              </div>
            </div>
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <ArrowRight className="w-4 h-4 text-white stroke-[2.5]" />
            </div>
          </button>
        </div>
      </main>

      {/* Subtle Bottom Watermark */}
      <footer className="py-2 text-center text-[11px] text-slate-500 font-medium">
        Perangkat Pemilihan E-Vote Pilkades Desa Kadakajaya • Asas LUBER JURDIL
      </footer>
    </div>
  );
};
