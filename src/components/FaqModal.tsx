import React from 'react';
import { X, HelpCircle, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import { FAQS } from '../data/mockData';

interface FaqModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FaqModal: React.FC<FaqModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 p-5 text-white flex items-center justify-between border-b border-blue-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/50 border border-cyan-400 flex items-center justify-center text-cyan-300">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-white">
                Panduan & SOP E-Vote Pilkades
              </h3>
              <p className="text-xs text-blue-200">
                Desa Kadakajaya, Kecamatan Tanjungsari, Kabupaten Sumedang
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

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 flex items-start gap-3 text-amber-900">
            <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="text-xs leading-relaxed">
              <strong>Prinsip LUBER JURDIL:</strong> Pemilihan secara elektronik tetap menjunjung tinggi prinsip Langsung, Umum, Bebas, Rahasia, Jujur, dan Adil. Pilihan warga tidak terikat identitas pada sistem elektronik demi menjaga kerahasiaan suara.
            </div>
          </div>

          {/* List FAQs */}
          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-4 hover:border-blue-300 transition-colors"
              >
                <div className="flex items-start gap-2.5 font-bold text-slate-900 text-sm mb-1.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>{faq.q}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-6.5">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>

          {/* SOP 8 Langkah Ringkas */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-xs">
            <div className="font-extrabold text-blue-900 mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-700" />
              <span>Ringkasan 8 Tahap Alur Pemilih di TPS:</span>
            </div>
            <ol className="list-decimal list-inside space-y-1 text-slate-700 font-medium text-[11px]">
              <li>Datang ke TPS Desa Kadakajaya membawa formulir C & e-KTP</li>
              <li>Verifikasi data diri di meja petugas KPPS</li>
              <li>Menuju bilik suara e-vote secara mandiri dan tertib</li>
              <li>Pindai QR Code token di sensor scanner mesin e-vote</li>
              <li>Sentuh kartu calon pilihan pada layar sentuh</li>
              <li>Konfirmasi pilihan atau perbaiki jika ada kekeliruan</li>
              <li>Status simulasi berhasil diproses oleh sistem</li>
              <li>Ambil struk kertas audit dan masukkan ke kotak audit fisik</li>
            </ol>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 text-right">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
          >
            Mengerti & Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
