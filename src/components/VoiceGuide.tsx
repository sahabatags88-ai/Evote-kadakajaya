import React, { useState, useEffect, useCallback } from 'react';
import { Volume2, VolumeX, Square, Sparkles } from 'lucide-react';
import { isSpeechSupported, speakIndonesian, stopSpeech } from '../utils/speech';

interface VoiceGuideProps {
  text: string;
  stepNumber: number;
  audioEnabled: boolean;
  onToggleAudio: () => void;
}

export const VoiceGuide: React.FC<VoiceGuideProps> = ({
  text,
  stepNumber,
  audioEnabled,
  onToggleAudio,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const supported = isSpeechSupported();

  // Stop previous speech whenever step changes
  useEffect(() => {
    stopSpeech();
    setIsPlaying(false);
  }, [stepNumber]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopSpeech();
    };
  }, []);

  const handlePlay = useCallback(() => {
    if (!supported) return;

    if (isPlaying) {
      stopSpeech();
      setIsPlaying(false);
      return;
    }

    if (!audioEnabled) {
      onToggleAudio();
    }

    speakIndonesian(
      text,
      () => setIsPlaying(true),
      () => setIsPlaying(false)
    );
  }, [supported, isPlaying, audioEnabled, onToggleAudio, text]);

  const handleStop = () => {
    stopSpeech();
    setIsPlaying(false);
  };

  return (
    <div className="bg-gradient-to-r from-blue-900/90 via-slate-900 to-indigo-950 border border-blue-500/40 rounded-2xl p-4 shadow-lg text-white mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Left Side: Voice Assistant Persona Info */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600/80 border border-blue-400 flex items-center justify-center shrink-0 shadow-md">
            {isPlaying ? (
              <div className="flex items-end gap-0.5 h-5">
                <span className="w-1 bg-cyan-300 rounded-full animate-bounce [animation-delay:-0.3s] h-5" />
                <span className="w-1 bg-white rounded-full animate-bounce [animation-delay:-0.15s] h-3.5" />
                <span className="w-1 bg-amber-300 rounded-full animate-bounce h-4.5" />
                <span className="w-1 bg-emerald-300 rounded-full animate-bounce [animation-delay:-0.4s] h-2.5" />
              </div>
            ) : (
              <Volume2 className="w-5 h-5 text-blue-200" />
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                Panduan Suara Bahasa Indonesia
              </span>
              {isPlaying && (
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.2 rounded-full font-semibold animate-pulse">
                  Sedang Berbicara...
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-200 mt-0.5 leading-relaxed font-normal">
              "{text}"
            </p>
          </div>
        </div>

        {/* Right Side: Interactive Audio Buttons */}
        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
          {isPlaying ? (
            <button
              onClick={handleStop}
              type="button"
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white flex items-center gap-1.5 shadow-md transition-all active:scale-95"
            >
              <Square className="w-3.5 h-3.5 fill-current" />
              <span>Hentikan Suara</span>
            </button>
          ) : (
            <button
              onClick={handlePlay}
              type="button"
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white flex items-center gap-2 shadow-md transition-all active:scale-95 border border-cyan-400/40"
            >
              <Volume2 className="w-4 h-4 text-cyan-200" />
              <span>Dengarkan Petunjuk</span>
            </button>
          )}

          {/* Quick Mute Toggle */}
          <button
            onClick={onToggleAudio}
            type="button"
            title={audioEnabled ? 'Matikan Suara' : 'Aktifkan Suara'}
            className="p-2 rounded-xl text-xs bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
          >
            {audioEnabled ? (
              <Volume2 className="w-4 h-4 text-cyan-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-500" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
