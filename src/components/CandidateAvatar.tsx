import React from 'react';

interface CandidateAvatarProps {
  id: number;
  gender: 'male' | 'female';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const CandidateAvatar: React.FC<CandidateAvatarProps> = ({
  id,
  gender,
  className = '',
  size = 'lg',
}) => {
  const sizeMap = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-36 h-36 md:w-44 md:h-44',
    xl: 'w-48 h-48 md:w-56 md:h-56',
  };

  return (
    <div
      className={`relative rounded-2xl overflow-hidden flex items-center justify-center shadow-inner border border-slate-200 select-none ${sizeMap[size]} ${className}`}
    >
      {/* Background Studio Gradient */}
      <div
        className={`absolute inset-0 ${
          id === 1
            ? 'bg-gradient-to-b from-blue-900 via-slate-800 to-slate-900'
            : id === 2
            ? 'bg-gradient-to-b from-sky-800 via-indigo-900 to-slate-900'
            : 'bg-gradient-to-b from-emerald-900 via-teal-950 to-slate-900'
        }`}
      />

      {/* Backdrop Flag / Ribbon hint (Merah Putih subtle glow) */}
      <div className="absolute top-0 inset-x-0 h-4 bg-gradient-to-b from-red-600/40 to-transparent" />

      {/* SVG Stylized Civic Portrait */}
      <svg
        viewBox="0 0 160 180"
        className="w-full h-full relative z-10 drop-shadow-md"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`skinGrad-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fcd34d" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
          <linearGradient id={`suitGrad-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id={`tieGrad-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#dc2626" />
            <stop offset="100%" stopColor="#991b1b" />
          </linearGradient>
          <linearGradient id={`hijabGrad-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>
        </defs>

        {/* Male Candidates (Id 1 & 3): Formal Jas Hitam, Kemeja Putih, Dasi, & Peci Hitam */}
        {gender === 'male' && (
          <>
            {/* Body / Suit */}
            <path
              d="M20 180 C20 135 45 125 80 125 C115 125 140 135 140 180 Z"
              fill={`url(#suitGrad-${id})`}
            />
            {/* White Shirt V-Neck */}
            <path d="M65 125 L80 155 L95 125 Z" fill="#ffffff" />
            {/* Red Tie */}
            <path d="M77 135 L83 135 L85 165 L80 175 L75 165 Z" fill={`url(#tieGrad-${id})`} />
            {/* Suit Lapels */}
            <path d="M48 128 L72 170 L60 178 L38 140 Z" fill="#0f172a" opacity="0.8" />
            <path d="M112 128 L88 170 L100 178 L122 140 Z" fill="#0f172a" opacity="0.8" />

            {/* Neck */}
            <path d="M70 100 L90 100 L90 125 L70 125 Z" fill={`url(#skinGrad-${id})`} />

            {/* Head Face */}
            <ellipse cx="80" cy="85" rx="26" ry="32" fill={`url(#skinGrad-${id})`} />

            {/* Ears */}
            <ellipse cx="53" cy="88" rx="5" ry="8" fill={`url(#skinGrad-${id})`} />
            <ellipse cx="107" cy="88" rx="5" ry="8" fill={`url(#skinGrad-${id})`} />

            {/* Facial details */}
            {/* Eyebrows */}
            <path d="M63 75 Q70 72 75 75" stroke="#451a03" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M85 75 Q90 72 97 75" stroke="#451a03" strokeWidth="2.5" strokeLinecap="round" />
            {/* Eyes */}
            <circle cx="69" cy="81" r="3" fill="#1c1917" />
            <circle cx="91" cy="81" r="3" fill="#1c1917" />
            {/* Nose */}
            <path d="M80 81 L78 90 L83 90" stroke="#78350f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            {/* Smile */}
            <path d="M72 98 Q80 105 88 98" stroke="#78350f" strokeWidth="2.5" fill="none" strokeLinecap="round" />

            {/* Candidate 1 Mustache (Budi Santosa) vs Candidate 3 (Dedi Kurniawan Glasses) */}
            {id === 1 ? (
              <path d="M73 95 Q80 93 87 95" stroke="#1c1917" strokeWidth="3" strokeLinecap="round" />
            ) : (
              /* Glasses */
              <g stroke="#3b82f6" strokeWidth="1.8" fill="rgba(255,255,255,0.15)">
                <rect x="62" y="76" width="14" height="11" rx="2" />
                <rect x="84" y="76" width="14" height="11" rx="2" />
                <line x1="76" y1="81" x2="84" y2="81" />
              </g>
            )}

            {/* Peci Hitam Resmi (Khas Pemilu Nasional & Pilkades) */}
            <path
              d="M50 64 C50 48 55 42 80 40 C105 42 110 48 110 64 L110 68 C105 71 55 71 50 68 Z"
              fill="#09090b"
            />
            {/* Peci Velvet Texture stripe */}
            <path d="M52 64 C70 66 90 66 108 64" stroke="#27272a" strokeWidth="2" />
            {/* Golden Pin on Peci */}
            <circle cx="60" cy="56" r="2.5" fill="#eab308" />
          </>
        )}

        {/* Female Candidate (Id 2: Siti Rahmawati): Jilbab Elegan & Blazer */}
        {gender === 'female' && (
          <>
            {/* Blazer Body */}
            <path
              d="M20 180 C20 135 45 125 80 125 C115 125 140 135 140 180 Z"
              fill="#1e293b"
            />
            {/* Inner Blouse / Scarf */}
            <path d="M60 135 L80 165 L100 135 Z" fill="#f8fafc" />
            <circle cx="80" cy="148" r="3" fill="#0284c7" />

            {/* Hijab Back Drape */}
            <path
              d="M44 65 C44 40 60 30 80 30 C100 30 116 40 116 65 C116 105 120 145 110 160 C100 150 95 135 80 135 C65 135 60 150 50 160 C40 145 44 105 44 65 Z"
              fill={`url(#hijabGrad-${id})`}
            />

            {/* Face Oval Opening */}
            <ellipse cx="80" cy="85" rx="22" ry="27" fill={`url(#skinGrad-${id})`} />

            {/* Eyes & Makeup */}
            <path d="M66 76 Q72 73 76 76" stroke="#451a03" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M84 76 Q88 73 94 76" stroke="#451a03" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="71" cy="82" r="2.8" fill="#1c1917" />
            <circle cx="89" cy="82" r="2.8" fill="#1c1917" />
            {/* Eyelash hint */}
            <path d="M68 79 L66 77" stroke="#1c1917" strokeWidth="1.5" />
            <path d="M92 79 L94 77" stroke="#1c1917" strokeWidth="1.5" />

            {/* Nose */}
            <path d="M80 82 L78 90 L82 90" stroke="#78350f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />

            {/* Friendly Smile */}
            <path d="M73 98 Q80 106 87 98" stroke="#be123c" strokeWidth="2.8" fill="none" strokeLinecap="round" />

            {/* Hijab Under-chin Fold */}
            <path
              d="M65 106 Q80 116 95 106 Q80 110 65 106 Z"
              fill="#0369a1"
            />
            {/* Hijab Brooch */}
            <circle cx="80" cy="116" r="3" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
          </>
        )}
      </svg>

      {/* Watermark "CALON FIKTIF" Badge overlay */}
      <div className="absolute bottom-1 inset-x-1 z-20 flex justify-center">
        <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider bg-slate-900/80 backdrop-blur-xs text-amber-300 border border-amber-400/50 px-2 py-0.5 rounded-full shadow-sm">
          CALON FIKTIF
        </span>
      </div>
    </div>
  );
};
