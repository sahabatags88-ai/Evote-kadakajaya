import React, { useRef, useState } from 'react';
import {
  X,
  Upload,
  RotateCcw,
  AlertTriangle,
  CheckCircle2,
  Image as ImageIcon,
  User,
  Shield,
  Info,
} from 'lucide-react';

interface AssetManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  // Logo Kabupaten
  logoSumedang: string | null;
  onUpdateLogoSumedang: (url: string | null) => void;
  // Calon 1
  candidate1Photo: string | null;
  onUpdateCandidate1Photo: (url: string | null) => void;
  // Calon 2 (Dedeng Efendi)
  candidate2Name: string;
  onUpdateCandidate2Name: (name: string) => void;
  candidate2Photo: string | null;
  onUpdateCandidate2Photo: (url: string | null) => void;
  // Calon 3
  candidate3Photo: string | null;
  onUpdateCandidate3Photo: (url: string | null) => void;
}

export const AssetManagerModal: React.FC<AssetManagerModalProps> = ({
  isOpen,
  onClose,
  logoSumedang,
  onUpdateLogoSumedang,
  candidate1Photo,
  onUpdateCandidate1Photo,
  candidate2Name,
  onUpdateCandidate2Name,
  candidate2Photo,
  onUpdateCandidate2Photo,
  candidate3Photo,
  onUpdateCandidate3Photo,
}) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const logoInputRef = useRef<HTMLInputElement>(null);
  const cand1InputRef = useRef<HTMLInputElement>(null);
  const cand2InputRef = useRef<HTMLInputElement>(null);
  const cand3InputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const validateAndReadFile = (
    file: File | undefined,
    onSuccess: (dataUrl: string) => void,
    slotName: string
  ) => {
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!file) return;

    // Allowed extensions and MIME types: PNG, JPG, JPEG, WEBP
    const allowedExtensions = ['png', 'jpg', 'jpeg', 'webp'];
    const extension = file.name.split('.').pop()?.toLowerCase() || '';
    const isMimeValid =
      file.type.startsWith('image/') &&
      ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'].includes(file.type);

    if (!allowedExtensions.includes(extension) && !isMimeValid) {
      setErrorMessage(
        `Format file "${file.name}" tidak didukung. Harap pilih gambar dengan format PNG, JPG, JPEG, atau WebP.`
      );
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        onSuccess(event.target.result as string);
        setSuccessMessage(`Berhasil memperbarui ${slotName}!`);
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        setErrorMessage(`Gagal membaca file gambar untuk ${slotName}. Silakan coba kembali.`);
      }
    };
    reader.onerror = () => {
      setErrorMessage(`Terjadi kesalahan saat memproses ${file.name}.`);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#091f48] via-[#0d2a5d] to-[#091f48] p-4 sm:p-5 text-white flex items-center justify-between border-b border-blue-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/40 border border-cyan-400 flex items-center justify-center text-cyan-300">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-white">
                Kelola Aset Foto & Logo
              </h3>
              <p className="text-xs text-blue-200">
                E-Vote Pilkades Desa Kadakajaya, Kec. Tanjungsari (2026–2034)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5">
          {/* Status feedback banners */}
          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-300 text-rose-800 rounded-xl text-xs font-bold flex items-start gap-2 animate-shake">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Info & Source Guidance Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3.5 text-xs text-blue-950 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong>Sumber Aset Asli:</strong> Logo resmi tersimpan dari Wikipedia Commons (Lambang Kabupaten Sumedang). Anda dapat mengunggah file foto atau logo alternatif (PNG, JPG, JPEG, WebP) yang langsung diperbarui di seluruh layar aplikasi.
            </div>
          </div>

          {/* ========================================================
              SLOT 1: LOGO KABUPATEN SUMEDANG
          ======================================================== */}
          <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-600" />
                <span className="font-black text-sm text-slate-900">
                  Logo Kabupaten Sumedang ("Insun Medal")
                </span>
              </div>
              <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full">
                Header & Kiosk
              </span>
            </div>

            <div className="flex items-center gap-4">
              {/* Pratinjau Logo dengan object-fit: contain */}
              <div className="w-20 h-20 rounded-xl overflow-hidden border border-slate-300 shrink-0 bg-white p-1.5 flex items-center justify-center shadow-xs">
                <img
                  src={logoSumedang || '/assets/logo-sumedang.png'}
                  alt="Logo Sumedang"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex-1 flex flex-col gap-2">
                <input
                  type="file"
                  ref={logoInputRef}
                  accept=".png,.jpg,.jpeg,.webp,image/png,image/jpeg,image/webp"
                  className="hidden"
                  onChange={(e) =>
                    validateAndReadFile(
                      e.target.files?.[0],
                      (url) => onUpdateLogoSumedang(url),
                      'Logo Kabupaten'
                    )
                  }
                />
                <button
                  type="button"
                  onClick={() => logoInputRef.current?.click()}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer w-fit"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Unggah Logo Kabupaten</span>
                </button>

                {logoSumedang && (
                  <button
                    type="button"
                    onClick={() => onUpdateLogoSumedang(null)}
                    className="text-xs text-slate-600 hover:text-rose-600 flex items-center gap-1 font-semibold cursor-pointer w-fit"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Kembalikan ke Logo Bawaan</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* ========================================================
              SLOT 2: CALON NOMOR 2 (DEDENG EFENDI)
          ======================================================== */}
          <div className="border-2 border-emerald-400/80 rounded-2xl p-4 bg-emerald-50/40">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-emerald-700" />
                <span className="font-black text-sm text-slate-900">
                  Calon Nomor Urut 2 — DEDENG EFENDI
                </span>
              </div>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                Kandidat Referensi
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nama Kandidat:
                </label>
                <input
                  type="text"
                  value={candidate2Name}
                  onChange={(e) => onUpdateCandidate2Name(e.target.value)}
                  placeholder="DEDENG EFENDI"
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-sm font-black text-slate-900 uppercase focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-4">
                {/* Pratinjau Foto Calon 2 */}
                <div className="w-20 h-24 rounded-xl overflow-hidden border border-slate-300 shrink-0 bg-red-600 shadow-xs">
                  <img
                    src={candidate2Photo || '/assets/dedeng-efendi.png'}
                    alt="Dedeng Efendi"
                    className="w-full h-full object-cover object-[center_15%]"
                  />
                </div>

                <div className="flex-1 flex flex-col gap-2">
                  <input
                    type="file"
                    ref={cand2InputRef}
                    accept=".png,.jpg,.jpeg,.webp,image/png,image/jpeg,image/webp"
                    className="hidden"
                    onChange={(e) =>
                      validateAndReadFile(
                        e.target.files?.[0],
                        (url) => onUpdateCandidate2Photo(url),
                        'Foto Calon 2 (Dedeng Efendi)'
                      )
                    }
                  />
                  <button
                    type="button"
                    onClick={() => cand2InputRef.current?.click()}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer w-fit"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Unggah Foto Dedeng Efendi</span>
                  </button>

                  {candidate2Photo && (
                    <button
                      type="button"
                      onClick={() => onUpdateCandidate2Photo(null)}
                      className="text-xs text-slate-600 hover:text-rose-600 flex items-center gap-1 font-semibold cursor-pointer w-fit"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Kembalikan ke Foto Bawaan</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================
              SLOT 3: CALON NOMOR 1 (CALON SIMULASI 01)
          ======================================================== */}
          <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-blue-600" />
                <span className="font-black text-sm text-slate-900">
                  Calon Nomor Urut 1 — CALON SIMULASI 01
                </span>
              </div>
              <span className="text-[10px] bg-slate-200 text-slate-700 font-bold px-2 py-0.5 rounded-full">
                Calon Fiktif
              </span>
            </div>

            <div className="flex items-center gap-4">
              {/* Pratinjau Foto Calon 1 */}
              <div className="w-20 h-24 rounded-xl overflow-hidden border border-slate-300 shrink-0 bg-[#dbeafe] flex items-center justify-center shadow-xs">
                {candidate1Photo ? (
                  <img
                    src={candidate1Photo}
                    alt="Calon 1"
                    className="w-full h-full object-cover object-[center_15%]"
                  />
                ) : (
                  <span className="text-[10px] font-bold text-slate-500 text-center p-1">
                    Ilustrasi Bawaan
                  </span>
                )}
              </div>

              <div className="flex-1 flex flex-col gap-2">
                <input
                  type="file"
                  ref={cand1InputRef}
                  accept=".png,.jpg,.jpeg,.webp,image/png,image/jpeg,image/webp"
                  className="hidden"
                  onChange={(e) =>
                    validateAndReadFile(
                      e.target.files?.[0],
                      (url) => onUpdateCandidate1Photo(url),
                      'Foto Calon 1'
                    )
                  }
                />
                <button
                  type="button"
                  onClick={() => cand1InputRef.current?.click()}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer w-fit"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Unggah Foto Calon 1</span>
                </button>

                {candidate1Photo && (
                  <button
                    type="button"
                    onClick={() => onUpdateCandidate1Photo(null)}
                    className="text-xs text-slate-600 hover:text-rose-600 flex items-center gap-1 font-semibold cursor-pointer w-fit"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Kembalikan ke Gambar Bawaan</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* ========================================================
              SLOT 4: CALON NOMOR 3 (CALON SIMULASI 03)
          ======================================================== */}
          <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-blue-600" />
                <span className="font-black text-sm text-slate-900">
                  Calon Nomor Urut 3 — CALON SIMULASI 03
                </span>
              </div>
              <span className="text-[10px] bg-slate-200 text-slate-700 font-bold px-2 py-0.5 rounded-full">
                Calon Fiktif
              </span>
            </div>

            <div className="flex items-center gap-4">
              {/* Pratinjau Foto Calon 3 */}
              <div className="w-20 h-24 rounded-xl overflow-hidden border border-slate-300 shrink-0 bg-[#dbeafe] flex items-center justify-center shadow-xs">
                {candidate3Photo ? (
                  <img
                    src={candidate3Photo}
                    alt="Calon 3"
                    className="w-full h-full object-cover object-[center_15%]"
                  />
                ) : (
                  <span className="text-[10px] font-bold text-slate-500 text-center p-1">
                    Ilustrasi Bawaan
                  </span>
                )}
              </div>

              <div className="flex-1 flex flex-col gap-2">
                <input
                  type="file"
                  ref={cand3InputRef}
                  accept=".png,.jpg,.jpeg,.webp,image/png,image/jpeg,image/webp"
                  className="hidden"
                  onChange={(e) =>
                    validateAndReadFile(
                      e.target.files?.[0],
                      (url) => onUpdateCandidate3Photo(url),
                      'Foto Calon 3'
                    )
                  }
                />
                <button
                  type="button"
                  onClick={() => cand3InputRef.current?.click()}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer w-fit"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Unggah Foto Calon 3</span>
                </button>

                {candidate3Photo && (
                  <button
                    type="button"
                    onClick={() => onUpdateCandidate3Photo(null)}
                    className="text-xs text-slate-600 hover:text-rose-600 flex items-center gap-1 font-semibold cursor-pointer w-fit"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Kembalikan ke Gambar Bawaan</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium">
            Format didukung: PNG, JPG, JPEG, WebP
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all cursor-pointer"
          >
            Selesai & Terapkan
          </button>
        </div>
      </div>
    </div>
  );
};
