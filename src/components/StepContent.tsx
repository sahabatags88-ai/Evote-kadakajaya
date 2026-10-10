import React, { useState } from 'react';
import {
  Building2,
  UserCheck,
  ShieldCheck,
  QrCode,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  CheckCircle2,
  FileText,
  Inbox,
  AlertTriangle,
  Info,
  ScanLine,
  Lock,
  Printer,
  Sparkles,
  Award,
} from 'lucide-react';
import { CandidateCard } from './CandidateCard';
import { Candidate } from '../types';

interface StepContentProps {
  currentStep: number;
  candidates: Candidate[];
  customCandidatePhoto?: string | null;
  isVerified: boolean;
  onVerify: () => void;
  isScanned: boolean;
  onScan: () => void;
  selectedCandidateId: number | null;
  onSelectCandidate: (id: number) => void;
  onConfirmChoice: () => void;
  onNextStep: () => void;
  onPrevStep: () => void;
  onReset: () => void;
  textSize: 'normal' | 'large';
  onOpenCompletionModal: () => void;
}

export const StepContent: React.FC<StepContentProps> = ({
  currentStep,
  candidates,
  customCandidatePhoto,
  isVerified,
  onVerify,
  isScanned,
  onScan,
  selectedCandidateId,
  onSelectCandidate,
  onConfirmChoice,
  onNextStep,
  onPrevStep,
  onReset,
  textSize,
  onOpenCompletionModal,
}) => {
  const [isScanningActive, setIsScanningActive] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const selectedCandidate = candidates.find((c) => c.id === selectedCandidateId);

  // Trigger Scanner Animation
  const handleScanAction = () => {
    setIsScanningActive(true);
    setTimeout(() => {
      setIsScanningActive(false);
      onScan();
    }, 1500);
  };

  const textHeadingClass =
    textSize === 'large'
      ? 'text-2xl sm:text-3xl font-extrabold'
      : 'text-xl sm:text-2xl font-extrabold';

  const textBodyClass =
    textSize === 'large'
      ? 'text-base sm:text-lg text-slate-700'
      : 'text-sm sm:text-base text-slate-600';

  // Handler for Next from Step 5
  const handleProceedFromCandidates = () => {
    if (!selectedCandidateId) {
      setValidationError('Silakan pilih salah satu calon terlebih dahulu sebelum melanjutkan!');
      return;
    }
    setValidationError(null);
    onNextStep();
  };

  return (
    <div className="w-full bg-white rounded-3xl shadow-xl border border-slate-200/90 overflow-hidden transition-all duration-300">
      {/* ========================================================
          LANGKAH 1 — DATANG KE TPS
      ======================================================== */}
      {currentStep === 1 && (
        <div className="p-6 sm:p-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-800 border border-blue-200 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-4">
              <Building2 className="w-4 h-4 text-blue-600" />
              <span>TPS Desa Kadakajaya, Kec. Tanjungsari</span>
            </div>

            <h2 className={`${textHeadingClass} text-slate-900 mb-3`}>
              Langkah 1: Datang ke Tempat Pemungutan Suara (TPS)
            </h2>

            <p className={`${textBodyClass} mb-8 leading-relaxed max-w-2xl mx-auto`}>
              Warga pemilih hadir di lokasi TPS Desa Kadakajaya pada waktu yang telah ditetapkan.
              Pastikan Anda membawa <strong>Surat Pemberitahuan Memilih (Model C)</strong> serta{' '}
              <strong>KTP Elektronik (e-KTP)</strong> untuk mengantre secara tertib di hadapan petugas KPPS.
            </p>

            <div className="bg-gradient-to-b from-blue-50/80 to-slate-100/90 rounded-2xl p-6 border border-blue-100 mb-8 max-w-2xl mx-auto text-left">
              <div className="flex items-center gap-3 mb-4 border-b border-blue-200/60 pb-3">
                <div className="w-10 h-10 rounded-xl bg-[#092350] text-white flex items-center justify-center font-bold">
                  TPS
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    Simulasi Lokasi: TPS 01 Desa Kadakajaya, Kecamatan Tanjungsari
                  </h4>
                  <p className="text-xs text-slate-500">
                    Kabupaten Sumedang • Periode 2026–2034 • Tertib, LUBER JURDIL, & Ramah Warga
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="bg-white p-3 rounded-xl border border-slate-200 flex flex-col items-center text-center">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold mb-2">
                    1
                  </div>
                  <span className="font-bold text-slate-800">Meja Pendaftaran</span>
                  <span className="text-slate-500 text-[11px] mt-0.5">
                    Menyerahkan formulir C & cek e-KTP
                  </span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200 flex flex-col items-center text-center">
                  <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold mb-2">
                    2
                  </div>
                  <span className="font-bold text-slate-800">Ruang Tunggu</span>
                  <span className="text-slate-500 text-[11px] mt-0.5">
                    Menunggu giliran panggilan petugas
                  </span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200 flex flex-col items-center text-center">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-2">
                    3
                  </div>
                  <span className="font-bold text-slate-800">Bilik E-Vote</span>
                  <span className="text-slate-500 text-[11px] mt-0.5">
                    Melakukan pemilihan secara digital
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={onNextStep}
                className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-extrabold text-base rounded-2xl shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-3 transition-all cursor-pointer"
              >
                <span>Mulai Praktik</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          LANGKAH 2 — VERIFIKASI DATA
      ======================================================== */}
      {currentStep === 2 && (
        <div className="p-6 sm:p-10">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-800 border border-indigo-200 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-3">
                <UserCheck className="w-4 h-4 text-indigo-600" />
                <span>Pencocokan DPT Desa Kadakajaya</span>
              </div>
              <h2 className={`${textHeadingClass} text-slate-900 mb-2`}>
                Langkah 2: Verifikasi Data Pemilih
              </h2>
              <p className={textBodyClass}>
                Petugas memeriksa daftar pemilih tetap (DPT) Desa Kadakajaya secara cermat.
                Pada simulasi ini, Anda menggunakan identitas latihan contoh.
              </p>
            </div>

            <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-2xl p-6 shadow-xl border border-blue-800/80 mb-6 relative overflow-hidden">
              <div className="absolute top-3 right-3 bg-amber-400 text-slate-950 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full tracking-wider">
                CONTOH DATA SIMULASI
              </div>

              <div className="flex items-center gap-4 border-b border-slate-700/80 pb-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-600/30 border border-cyan-400/50 flex items-center justify-center text-cyan-300">
                  <UserCheck className="w-8 h-8" />
                </div>
                <div>
                  <div className="text-xs text-blue-300 font-semibold uppercase tracking-wider">
                    Identitas Pemilih Simulasi
                  </div>
                  <div className="text-xl font-extrabold text-white">
                    Warga Simulasi 001
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    Nomor Antrean Latihan: #KDK-018
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/50">
                  <span className="text-slate-400 block text-[11px]">Status DPT:</span>
                  <span className="font-bold text-emerald-400 flex items-center gap-1 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Terdaftar Aktif (Simulasi)
                  </span>
                </div>
                <div className="bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/50">
                  <span className="text-slate-400 block text-[11px]">Wilayah Desa:</span>
                  <span className="font-bold text-white mt-0.5 block">
                    Kadakajaya, Tanjungsari
                  </span>
                </div>
              </div>

              {isVerified ? (
                <div className="mt-4 p-3 bg-emerald-950/80 border border-emerald-500/60 rounded-xl flex items-center gap-3 text-emerald-200">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                  <div>
                    <div className="font-bold text-xs uppercase tracking-wider text-emerald-300">
                      Verifikasi Berhasil!
                    </div>
                    <div className="text-[11px] text-emerald-100">
                      Hak pilih latihan aktif. Silakan menuju bilik suara e-vote.
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-4 p-3 bg-amber-950/40 border border-amber-600/50 rounded-xl flex items-center gap-2 text-amber-200 text-xs">
                  <Info className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Tekan tombol di bawah untuk menyimulasikan verifikasi petugas.</span>
                </div>
              )}
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-600 mb-6 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Jaminan Privasi:</strong> Aplikasi ini tidak meminta atau menerima NIK, nomor KK, foto KTP, alamat, atau data pribadi nyata pemilih.
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={onPrevStep}
                className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-300 text-slate-700 font-bold text-sm hover:bg-slate-100 flex items-center justify-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Kembali</span>
              </button>

              {!isVerified ? (
                <button
                  type="button"
                  onClick={onVerify}
                  className="w-full sm:w-auto px-6 py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-extrabold text-sm rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Simulasikan Verifikasi</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onNextStep}
                  className="w-full sm:w-auto px-7 py-3.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-extrabold text-sm rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>Lanjut ke Bilik Suara</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          LANGKAH 3 — MENUJU BILIK SUARA
      ======================================================== */}
      {currentStep === 3 && (
        <div className="p-6 sm:p-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-800 border border-blue-200 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-3">
              <Lock className="w-4 h-4 text-blue-600" />
              <span>Bilik Suara Tertutup & Rahasia</span>
            </div>

            <h2 className={`${textHeadingClass} text-slate-900 mb-2`}>
              Langkah 3: Menuju Bilik Suara E-Vote
            </h2>

            <p className={`${textBodyClass} mb-6 leading-relaxed`}>
              Setelah diverifikasi oleh petugas, pemilih dipersilakan melangkah ke bilik suara.
              Di dalam bilik suara, perangkat E-Vote dengan layar sentuh siap digunakan secara mandiri dan rahasia.
            </p>

            <div className="bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-slate-800 mb-6 relative">
              <div className="border-b-2 border-dashed border-blue-400/40 pb-4 mb-6 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-widest">
                  BILIK E-VOTE DESA KADAKAJAYA
                </span>
                <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 px-2 py-0.5 rounded-full font-bold">
                  ASAS LUBER JURDIL
                </span>
              </div>

              <div className="bg-slate-950 border-2 border-blue-500/60 rounded-2xl p-6 max-w-md mx-auto shadow-inner text-center">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-600 text-white flex items-center justify-center mb-3 shadow-lg">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-extrabold text-white">
                  Perangkat Pemilihan E-Vote Siap
                </h4>
                <p className="text-xs text-blue-200 mt-1 max-w-xs mx-auto">
                  Siapkan token QR Code simulasi untuk dipindai di depan sensor.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 text-left text-xs">
                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Kerahasiaan Terjaga</span>
                    <span className="text-slate-300 text-[11px]">
                      Hanya Anda yang berhak berada di bilik suara.
                    </span>
                  </div>
                </div>
                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Tertib & Aman</span>
                    <span className="text-slate-300 text-[11px]">
                      Dilarang memotret atau merekam aktivitas di bilik suara.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={onPrevStep}
                className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-300 text-slate-700 font-bold text-sm hover:bg-slate-100 flex items-center justify-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Kembali</span>
              </button>

              <button
                type="button"
                onClick={onNextStep}
                className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-extrabold text-base rounded-2xl shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Saya Siap</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          LANGKAH 4 — PEMINDAIAN QR CODE
      ======================================================== */}
      {currentStep === 4 && (
        <div className="p-6 sm:p-10">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-800 border border-purple-200 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-3">
                <QrCode className="w-4 h-4 text-purple-600" />
                <span>Aktivasi Surat Suara Elektronik</span>
              </div>
              <h2 className={`${textHeadingClass} text-slate-900 mb-2`}>
                Langkah 4: Pemindaian QR Code Simulasi
              </h2>
              <p className={textBodyClass}>
                Arahkan kartu token QR Code simulasi ke sensor pemindai perangkat e-vote untuk mengaktifkan
                pilihan calon pada layar sentuh.
              </p>
            </div>

            <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white border-2 border-slate-800 shadow-xl mb-6 relative overflow-hidden">
              <div className="max-w-sm mx-auto bg-slate-950 p-6 rounded-2xl border border-slate-800 text-center relative">
                <div className="w-44 h-44 mx-auto rounded-2xl bg-slate-900 border-2 border-dashed border-cyan-500/50 relative flex items-center justify-center overflow-hidden shadow-inner">
                  {isScanningActive && (
                    <div className="absolute inset-x-0 h-1 bg-red-500 shadow-[0_0_12px_#ef4444] animate-laser z-20" />
                  )}

                  <div className="p-3 bg-white rounded-xl shadow-md">
                    <svg viewBox="0 0 100 100" className="w-28 h-28 text-slate-900" fill="currentColor">
                      <rect x="5" y="5" width="28" height="28" rx="4" />
                      <rect x="9" y="9" width="20" height="20" fill="white" />
                      <rect x="13" y="13" width="12" height="12" fill="currentColor" />
                      <rect x="67" y="5" width="28" height="28" rx="4" />
                      <rect x="71" y="9" width="20" height="20" fill="white" />
                      <rect x="75" y="13" width="12" height="12" fill="currentColor" />
                      <rect x="5" y="67" width="28" height="28" rx="4" />
                      <rect x="9" y="71" width="20" height="20" fill="white" />
                      <rect x="13" y="75" width="12" height="12" fill="currentColor" />
                      <rect x="40" y="8" width="8" height="8" />
                      <rect x="52" y="15" width="6" height="6" />
                      <rect x="40" y="24" width="8" height="8" />
                      <rect x="8" y="42" width="8" height="8" />
                      <rect x="22" y="45" width="10" height="6" />
                      <rect x="42" y="42" width="16" height="16" rx="2" />
                      <rect x="65" y="40" width="8" height="8" />
                      <rect x="80" y="48" width="12" height="6" />
                      <rect x="42" y="66" width="8" height="8" />
                      <rect x="55" y="75" width="10" height="6" />
                      <rect x="72" y="68" width="14" height="14" />
                      <rect x="75" y="86" width="18" height="6" />
                      <rect x="42" y="84" width="6" height="10" />
                    </svg>
                  </div>

                  <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
                  <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
                  <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />
                </div>

                <div className="mt-4">
                  <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-widest block">
                    TOKEN QR CONTOH SIMULASI
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Bukan QR identitas pemilih nyata • Ilustrasi lokal
                  </span>
                </div>
              </div>

              <div className="mt-6 text-center">
                {isScanningActive ? (
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-900/60 border border-cyan-400 text-cyan-200 rounded-full text-xs font-bold animate-pulse">
                    <ScanLine className="w-4 h-4 animate-spin text-cyan-300" />
                    <span>Sedang Memindai Kode QR Contoh...</span>
                  </div>
                ) : isScanned ? (
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-950 border border-emerald-500 text-emerald-300 rounded-full text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>QR Berhasil Dipindai • Akses Surat Suara Aktif</span>
                  </div>
                ) : (
                  <div className="text-xs text-slate-400">
                    Klik tombol "Pindai QR Contoh" untuk mengaktifkan surat suara.
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={onPrevStep}
                className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-300 text-slate-700 font-bold text-sm hover:bg-slate-100 flex items-center justify-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Kembali</span>
              </button>

              {!isScanned ? (
                <button
                  type="button"
                  disabled={isScanningActive}
                  onClick={handleScanAction}
                  className="w-full sm:w-auto px-7 py-3.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-extrabold text-sm rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <ScanLine className="w-4 h-4" />
                  <span>Pindai QR Contoh</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onNextStep}
                  className="w-full sm:w-auto px-7 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>Buka Surat Suara Digital</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          LANGKAH 5 — MEMILIH SATU DARI TIGA CALON
          (Mirroring exact layout from referensi-tampilan.png)
      ======================================================== */}
      {currentStep === 5 && (
        <div className="p-4 sm:p-8">
          {validationError && (
            <div className="mb-6 p-3 bg-rose-50 border border-rose-300 text-rose-800 rounded-xl text-xs font-bold flex items-center justify-center gap-2 animate-shake">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{validationError}</span>
            </div>
          )}

          {/* Three Candidate Cards Grid (Matching referensi-tampilan.png) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 mb-8 items-stretch">
            {candidates.map((cand) => (
              <CandidateCard
                key={cand.id}
                candidate={cand}
                isSelected={selectedCandidateId === cand.id}
                customCandidatePhoto={customCandidatePhoto}
                onSelect={(id) => {
                  onSelectCandidate(id);
                  setValidationError(null);
                }}
              />
            ))}
          </div>

          {/* Bottom Bar matching referensi-tampilan.png:
              [Kembali (ke tahap sebelumnya)]  --- [Info pill (Pilih satu calon...)] --- [Lanjutkan (Ke Tahap Konfirmasi)] */}
          <div className="bg-slate-50/90 border border-slate-200/80 rounded-2xl p-3 sm:p-4 flex flex-col md:flex-row items-center justify-between gap-3 shadow-sm">
            {/* Left Button: Kembali */}
            <button
              type="button"
              onClick={onPrevStep}
              className="w-full md:w-auto px-5 py-3 rounded-2xl bg-white border border-slate-300 text-slate-800 hover:bg-slate-100 flex items-center gap-3 shadow-xs cursor-pointer"
            >
              <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                <ArrowLeft className="w-4 h-4 text-slate-700" />
              </div>
              <div className="text-left">
                <div className="font-extrabold text-sm leading-tight text-slate-900">
                  Kembali
                </div>
                <div className="text-[10px] text-slate-500 font-medium leading-tight">
                  Ke Tahap Sebelumnya
                </div>
              </div>
            </button>

            {/* Center Info Pill */}
            <div className="flex-1 max-w-md bg-blue-50/90 border border-blue-200/80 rounded-2xl px-4 py-2.5 flex items-center gap-3 text-left">
              <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 font-bold text-xs">
                i
              </div>
              <div className="text-xs text-blue-950 font-medium leading-snug">
                <span className="font-bold text-blue-900 block">Pilih satu calon sesuai pilihan Anda.</span>
                <span className="text-[11px] text-blue-800">Setelah memilih calon, tekan tombol Lanjutkan.</span>
              </div>
            </div>

            {/* Right Button: Lanjutkan */}
            <button
              type="button"
              disabled={!selectedCandidateId}
              onClick={handleProceedFromCandidates}
              className={`w-full md:w-auto px-6 py-3 rounded-2xl flex items-center justify-between gap-3 shadow-md transition-all cursor-pointer ${
                selectedCandidateId
                  ? 'bg-[#15803d] hover:bg-[#166534] text-white shadow-emerald-700/20 active:scale-95'
                  : 'bg-slate-300 text-slate-500 cursor-not-allowed shadow-none'
              }`}
            >
              <div className="text-left">
                <div className="font-extrabold text-sm leading-tight text-white">
                  Lanjutkan
                </div>
                <div className="text-[10px] text-emerald-100 font-medium leading-tight">
                  Ke Tahap Konfirmasi
                </div>
              </div>
              <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                <ArrowRight className="w-4 h-4 text-white" />
              </div>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          LANGKAH 6 — KONFIRMASI PILIHAN
      ======================================================== */}
      {currentStep === 6 && selectedCandidate && (
        <div className="p-6 sm:p-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-900 border border-amber-200 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-3">
              <Info className="w-4 h-4 text-amber-600" />
              <span>Verifikasi Pilihan Sebelum Selesai</span>
            </div>

            <h2 className={`${textHeadingClass} text-slate-900 mb-2`}>
              Langkah 6: Konfirmasi Pilihan Anda
            </h2>

            <p className={`${textBodyClass} mb-6`}>
              Periksa kembali foto, nomor, dan nama calon yang telah Anda pilih.
              Jika sudah yakin, tekan tombol <strong>Konfirmasi Simulasi</strong>.
            </p>

            {/* Selected Candidate Summary Card */}
            <div className="mb-6 pt-6">
              <CandidateCard
                candidate={selectedCandidate}
                isSelected={true}
                customCandidatePhoto={customCandidatePhoto}
                onSelect={() => {}}
                isConfirmationView={true}
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-900 mb-8 text-left max-w-md mx-auto flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
              <span>
                <strong>Catatan Latihan:</strong> Pilihan Anda hanya diproses pada perangkat
                simulasi lokal ini. Tidak ada pengiriman data ke server mana pun.
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
              <button
                type="button"
                onClick={onPrevStep}
                className="w-full sm:w-1/2 px-5 py-3.5 rounded-2xl border-2 border-slate-300 text-slate-700 font-extrabold text-sm hover:bg-slate-100 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Ubah Pilihan</span>
              </button>

              <button
                type="button"
                onClick={onConfirmChoice}
                className="w-full sm:w-1/2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-extrabold text-sm rounded-2xl shadow-lg hover:shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                <span>Konfirmasi Simulasi</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          LANGKAH 7 — STATUS SIMULASI BERHASIL
      ======================================================== */}
      {currentStep === 7 && (
        <div className="p-8 sm:p-14">
          <div className="max-w-xl mx-auto text-center">
            <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6 shadow-xl ring-8 ring-emerald-50">
              <CheckCircle2 className="w-16 h-16 sm:w-20 sm:h-20 stroke-[2.5]" />
            </div>

            <div className="inline-block bg-emerald-600 text-white font-mono text-xs font-bold uppercase tracking-widest px-3.5 py-1 rounded-full mb-3">
              SUKSES SIMULASI
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3 tracking-tight">
              SIMULASI BERHASIL DISELESAIKAN
            </h2>

            <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 my-6 text-left">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-amber-950 text-sm">
                    Pemberitahuan Resmi Sosialisasi:
                  </h4>
                  <p className="text-xs sm:text-sm text-amber-900 mt-1 leading-relaxed">
                    Ini hanya latihan sosialisasi. Pilihan tidak dikirim ke server dan tidak
                    dihitung sebagai suara resmi pemilihan kepala desa.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-slate-600 text-sm mb-8 leading-relaxed">
              Pada tahapan e-vote sebenarnya di TPS Desa Kadakajaya, mesin pemilihan akan mencetak struk audit fisik
              sebagai bukti verifikasi. Mari pelajari langkah terakhir mengenai penanganan struk tersebut.
            </p>

            <button
              type="button"
              onClick={onNextStep}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-extrabold text-base rounded-2xl shadow-xl hover:shadow-blue-500/25 flex items-center justify-center gap-2 mx-auto transition-all cursor-pointer"
            >
              <span>Lanjut ke Panduan Struk</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          LANGKAH 8 — PANDUAN STRUK SIMULASI DAN KOTAK AUDIT
      ======================================================== */}
      {currentStep === 8 && (
        <div className="p-6 sm:p-10">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-3">
                <Printer className="w-4 h-4 text-emerald-600" />
                <span>Tahap Akhir SOP E-Vote</span>
              </div>
              <h2 className={`${textHeadingClass} text-slate-900 mb-2`}>
                Langkah 8: Panduan Struk Simulasi & Kotak Audit
              </h2>
              <p className={textBodyClass}>
                Penanganan struk pada pemilihan sebenarnya di Desa Kadakajaya harus mengikuti SOP resmi dan arahan petugas KPPS.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 items-center">
              {/* Thermal Paper Receipt Mockup */}
              <div className="bg-slate-100 p-5 rounded-2xl border-2 border-slate-300 relative shadow-md">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-600 mb-2">
                  <Printer className="w-4 h-4 text-blue-600" />
                  <span>Struk Audit Kertas (Thermal Slip)</span>
                </div>

                <div className="bg-white p-5 rounded-lg border border-slate-300 font-mono text-xs shadow-inner relative animate-receipt">
                  <div className="text-center border-b border-dashed border-slate-400 pb-3 mb-3">
                    <p className="font-bold text-slate-900 text-xs">
                      E-VOTE KABUPATEN SUMEDANG
                    </p>
                    <p className="text-[10px] text-slate-700 font-semibold">
                      PILKADES DESA KADAKAJAYA
                    </p>
                    <p className="text-[9px] text-slate-500">
                      TPS 01 • KECAMATAN TANJUNGSARI
                    </p>
                    <p className="text-[9px] text-slate-400">
                      PERIODE 2026 - 2034
                    </p>
                    <p className="text-[9px] text-amber-700 font-bold mt-1">
                      STRUK AUDIT SUARA (SIMULASI)
                    </p>
                  </div>

                  <div className="space-y-1 text-[11px] text-slate-700 border-b border-dashed border-slate-400 pb-3 mb-3">
                    <div className="flex justify-between">
                      <span>Waktu Latihan:</span>
                      <span className="font-bold">10:45:20 WIB</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ID Perangkat:</span>
                      <span className="font-bold">EVOTE-KDK-01</span>
                    </div>
                    <div className="flex justify-between">
                      <span>No. Antrean:</span>
                      <span className="font-bold">#KDK-018</span>
                    </div>
                    <div className="flex justify-between font-bold text-slate-900 pt-1">
                      <span>Pilihan Simulasi:</span>
                      <span className="text-blue-700 truncate max-w-[150px]">
                        {selectedCandidate ? `No. ${selectedCandidate.number} (${selectedCandidate.name})` : '-'}
                      </span>
                    </div>
                  </div>

                  <div className="text-center text-[9px] text-slate-400">
                    <p>VERIFIKASI AUDIT ELEKTRONIK TERVALIDASI</p>
                    <p className="font-mono text-[8px] text-slate-500 mt-0.5">
                      HASH: KDK-SUMEDANG-SIMULASI-EDUKASI
                    </p>
                    <div className="mt-2 text-rose-600 font-bold border border-rose-400/40 bg-rose-50 p-1 rounded text-[9px]">
                      BUKAN BUKTI RESMI PEMILIHAN
                    </div>
                  </div>
                </div>
              </div>

              {/* Physical Audit Box Explanation */}
              <div className="bg-gradient-to-br from-blue-900 to-slate-900 text-white p-6 rounded-2xl shadow-xl border border-blue-700/60 flex flex-col justify-between h-full">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-600/30 border border-cyan-400 flex items-center justify-center text-cyan-300 mb-4">
                    <Inbox className="w-6 h-6" />
                  </div>
                  <h4 className="font-extrabold text-lg text-white mb-2">
                    Kotak Audit Fisik Transparan
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-4">
                    Pada pemungutan suara resmi di TPS Desa Kadakajaya, struk ini <strong>tidak boleh dibawa pulang</strong>.
                    Pemilih harus memasukkannya ke dalam kotak audit tertutup di hadapan petugas KPPS.
                  </p>
                </div>

                <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/60 text-xs">
                  <div className="font-bold text-cyan-300 flex items-center gap-1.5 mb-1">
                    <FileText className="w-4 h-4 text-amber-400" />
                    <span>SOP Penanganan Struk E-Vote:</span>
                  </div>
                  <ul className="text-slate-300 space-y-1 list-disc list-inside text-[11px]">
                    <li>Periksa struk tanpa memperlihatkan kepada pemilih lain.</li>
                    <li>Lipat dan masukkan langsung ke kotak audit fisik.</li>
                    <li>Celupkan jari ke tinta pemilu sebelum meninggalkan TPS.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={onOpenCompletionModal}
                className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-extrabold text-base rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Award className="w-5 h-5 text-amber-300" />
                <span>Selesaikan Latihan</span>
              </button>

              <button
                type="button"
                onClick={onReset}
                className="w-full sm:w-auto px-7 py-4 bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 font-bold text-base rounded-2xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <RotateCcw className="w-5 h-5 text-cyan-400" />
                <span>Ulangi Simulasi</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
