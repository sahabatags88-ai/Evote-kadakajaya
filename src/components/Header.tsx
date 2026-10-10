import React, { useState, useEffect } from 'react';
import {
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  HelpCircle,
  RotateCcw,
  Type,
  ImageIcon,
} from 'lucide-react';

interface HeaderProps {
  audioEnabled: boolean;
  onToggleAudio: () => void;
  onReset: () => void;
  onOpenFaq: () => void;
  onOpenAssetManager: () => void;
  textSize: 'normal' | 'large';
  onToggleTextSize: () => void;
  currentStep: number;
  logoSumedangUrl?: string | null;
}

export const Header: React.FC<HeaderProps> = ({
  audioEnabled,
  onToggleAudio,
  onReset,
  onOpenFaq,
  onOpenAssetManager,
  textSize,
  onToggleTextSize,
  currentStep,
  logoSumedangUrl,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
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

  const finalLogo = logoSumedangUrl || '/assets/logo-sumedang.png';

  return (
    <header className="sticky top-0 z-40 shadow-xl text-white">
      {/* Permanent Warning Banner: SIMULASI SOSIALISASI — BUKAN SISTEM PEMILIHAN RESMI */}
      <div className="bg-amber-400 text-slate-950 px-3 py-1.5 text-center font-black text-xs sm:text-sm tracking-wider flex items-center justify-center gap-2 shadow-inner uppercase">
        <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
        <span>SIMULASI SOSIALISASI — BUKAN SISTEM PEMILIHAN RESMI</span>
      </div>

      {/* Main Header Banner (Styled faithfully after referensi-tampilan.png) */}
      <div className="bg-gradient-to-r from-[#091b3a] via-[#0d2a5d] to-[#0a1e42] border-b border-blue-800/80 px-4 sm:px-8 py-3 sm:py-4 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
          {/* Left: Official Logo Kabupaten Sumedang */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="w-16 h-16 sm:w-20 sm:h-20 drop-shadow-lg flex items-center justify-center">
              {!logoError ? (
                <img
                  src={finalLogo}
                  alt="Logo Kabupaten Sumedang"
                  onError={() => setLogoError(true)}
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <img
                  src="/assets/logo-sumedang.svg"
                  alt="Logo Kabupaten Sumedang"
                  className="max-w-full max-h-full object-contain"
                />
              )}
            </div>
          </div>

          {/* Center: Title & Identity as in reference */}
          <div className="text-center flex-1">
            {/* Big 3D E-VOTE KABUPATEN SUMEDANG */}
            <div className="leading-tight">
              <span className="text-2xl sm:text-3xl md:text-4xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-sky-200 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                E-VOTE{' '}
              </span>
              <span className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                KABUPATEN SUMEDANG
              </span>
            </div>

            {/* Blue Ribbon Pill */}
            <div className="mt-1.5 inline-block bg-[#081e48] border border-blue-400/40 px-4 py-1 rounded-full shadow-inner">
              <span className="text-xs sm:text-sm font-black uppercase text-white tracking-wide">
                PEMILIHAN KEPALA{' '}
                <span className="text-yellow-400 font-extrabold">
                  DESA KADAKAJAYA
                </span>
              </span>
            </div>

            {/* Subtitle location & period */}
            <div className="text-[11px] sm:text-xs font-bold text-blue-200 mt-1 uppercase tracking-wider">
              KECAMATAN TANJUNGSARI KABUPATEN SUMEDANG
            </div>
            <div className="text-[10px] sm:text-[11px] font-extrabold text-amber-300 uppercase tracking-widest mt-0.5">
              PERIODE 2026 – 2034
            </div>
          </div>

          {/* Right: Village Script & Tagline + Silhouette as in reference */}
          <div className="hidden lg:flex flex-col items-end shrink-0 pl-4 border-l border-blue-700/40">
            <div className="relative">
              <span className="font-serif italic text-2xl font-bold text-sky-200 tracking-wide">
                Desa Kadakajaya
              </span>
              {/* Red Swoosh curve */}
              <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-transparent rounded-full mt-0.5" />
            </div>
            <div className="text-[10px] font-extrabold uppercase tracking-widest text-white mt-1 text-right">
              <span className="text-slate-300">BERSATU • </span>
              <span className="text-amber-300">MAJU • </span>
              <span className="text-emerald-300">SEJAHTERA</span>
            </div>
          </div>
        </div>

        {/* Small Utility Bar at Top Right */}
        <div className="absolute top-2 right-2 flex items-center gap-1.5 z-20">
          <button
            onClick={onOpenAssetManager}
            type="button"
            title="Kelola Aset Foto & Logo"
            className="p-1.5 rounded-lg text-xs bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-700 cursor-pointer"
          >
            <ImageIcon className="w-3.5 h-3.5 text-emerald-400" />
          </button>
          <button
            onClick={onToggleAudio}
            type="button"
            title={audioEnabled ? 'Matikan Suara' : 'Aktifkan Suara'}
            className="p-1.5 rounded-lg text-xs bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-700 cursor-pointer"
          >
            {audioEnabled ? (
              <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-slate-400" />
            )}
          </button>
          <button
            onClick={onToggleTextSize}
            type="button"
            title="Ukuran Tulisan"
            className="p-1.5 rounded-lg text-xs bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-700 cursor-pointer"
          >
            <Type className="w-3.5 h-3.5 text-cyan-300" />
          </button>
          <button
            onClick={onOpenFaq}
            type="button"
            title="SOP E-Vote"
            className="p-1.5 rounded-lg text-xs bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-700 cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
          </button>
          <button
            onClick={toggleFullscreen}
            type="button"
            title={isFullscreen ? 'Keluar Layar Penuh' : 'Layar Penuh (Kiosk)'}
            className="p-1.5 rounded-lg text-xs bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-700 cursor-pointer"
          >
            {isFullscreen ? (
              <Minimize2 className="w-3.5 h-3.5 text-cyan-400" />
            ) : (
              <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
            )}
          </button>
          {currentStep > 1 && (
            <button
              onClick={onReset}
              type="button"
              title="Ulangi Simulasi"
              className="p-1.5 rounded-lg text-xs bg-rose-900/60 hover:bg-rose-800 text-rose-200 border border-rose-700 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
