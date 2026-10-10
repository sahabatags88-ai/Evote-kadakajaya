import React from 'react';
import {
  Award,
  CheckCircle2,
  RotateCcw,
  Printer,
  X,
  ShieldCheck,
} from 'lucide-react';
import { Candidate } from '../types';

interface CompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCandidate: Candidate | undefined;
  onReset: () => void;
}

export const CompletionModal: React.FC<CompletionModalProps> = ({
  isOpen,
  onClose,
  selectedCandidate,
  onReset,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Certificate Card Header */}
        <div className="bg-gradient-to-r from-emerald-700 via-teal-800 to-blue-900 p-6 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="w-16 h-16 mx-auto rounded-2xl bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center mb-3 text-amber-300 shadow-inner">
            <Award className="w-9 h-9 stroke-[2.2]" />
          </div>

          <div className="inline-block bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-widest px-3 py-0.5 rounded-full mb-2">
            SURAT APRESIASI LITERASI DIGITAL
          </div>

          <h3 className="text-xl font-black text-white">
            Selamat! Anda Siap E-Vote
          </h3>
          <p className="text-xs text-emerald-100 mt-1">
            Telah menyelesaikan seluruh 8 tahapan Simulasi E-Vote Pilkades Desa Kadakajaya, Kec. Tanjungsari, Kab. Sumedang
          </p>
        </div>

        {/* Certificate Body */}
        <div className="p-6 space-y-4">
          <div className="border-2 border-dashed border-slate-200 rounded-2xl p-4 bg-slate-50 text-center">
            <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
              Diberikan Kepada Peserta Latihan:
            </p>
            <h4 className="text-lg font-extrabold text-slate-900 mt-1">
              Warga Simulasi 001
            </h4>
            <p className="text-xs text-blue-700 font-bold mt-0.5">
              Telah Memahami Prosedur E-Voting LUBER JURDIL
            </p>

            <div className="mt-4 pt-4 border-t border-slate-200/80 grid grid-cols-2 gap-2 text-left text-xs">
              <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                <span className="text-slate-400 block text-[10px]">Pilihan Latihan:</span>
                <span className="font-bold text-slate-800 text-[11px] truncate block">
                  {selectedCandidate
                    ? `No. ${selectedCandidate.number} — ${selectedCandidate.name}`
                    : '-'}
                </span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                <span className="text-slate-400 block text-[10px]">Status Latihan:</span>
                <span className="font-bold text-emerald-600 text-[11px] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  8 Tahap Tuntas
                </span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-900 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
            <span>
              Ingat untuk hadir tepat waktu pada hari pemilihan di TPS Desa Kadakajaya dan gunakan hak pilih secara langsung, umum, bebas, dan rahasia!
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-2">
            <button
              onClick={handlePrint}
              type="button"
              className="w-full sm:w-1/2 py-3 px-4 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span>Cetak Bukti Latihan</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onReset();
              }}
              type="button"
              className="w-full sm:w-1/2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Ulangi Simulasi</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
