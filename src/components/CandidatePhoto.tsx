import React, { useState, useEffect } from 'react';
import { Candidate } from '../types';

interface CandidatePhotoProps {
  candidate: Candidate;
  customPhotoUrl?: string | null;
  className?: string;
  isConfirmationView?: boolean;
}

export const CandidatePhoto: React.FC<CandidatePhotoProps> = ({
  candidate,
  customPhotoUrl,
  className = '',
  isConfirmationView = false,
}) => {
  const [imgError, setImgError] = useState(false);
  const photoSrc = customPhotoUrl !== undefined ? customPhotoUrl : candidate.imageSrc;

  // Reset imgError whenever photoSrc changes (e.g. after uploading a new image)
  useEffect(() => {
    setImgError(false);
  }, [photoSrc]);

  // Aspect ratio and container size: completely identical for all 3 candidates
  const containerHeightClass = isConfirmationView
    ? 'w-48 h-64 md:w-56 md:h-72'
    : 'w-full aspect-[4/5]';

  // Has a valid custom image or asset image that hasn't failed to load
  const hasValidImage = !!photoSrc && !imgError;

  return (
    <div
      className={`relative rounded-2xl overflow-hidden shadow-inner flex items-center justify-center select-none ${containerHeightClass} ${className}`}
    >
      {/* If a valid photo source is provided (either uploaded or local file) */}
      {hasValidImage ? (
        <div
          className={`w-full h-full relative flex items-center justify-center overflow-hidden ${
            candidate.id === 2 ? 'bg-[#dc2626]' : 'bg-[#dbeafe]'
          }`}
        >
          <img
            src={photoSrc}
            alt={candidate.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-[center_15%] transition-transform duration-300"
            style={{ imageRendering: 'auto' }}
          />
        </div>
      ) : candidate.id === 2 ? (
        /* Candidate 2 Fallback: Dedicated Dedeng Efendi Portrait */
        <div className="w-full h-full relative bg-red-600 flex items-center justify-center overflow-hidden">
          <svg
            viewBox="0 0 320 400"
            className="w-full h-full object-cover object-top"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="redBack2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#dc2626" />
                <stop offset="100%" stopColor="#b91c1c" />
              </linearGradient>
              <linearGradient id="skinDedeng2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f3be8c" />
                <stop offset="50%" stopColor="#e4aa73" />
                <stop offset="100%" stopColor="#c78e58" />
              </linearGradient>
              <linearGradient id="suitBlack2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#090d16" />
              </linearGradient>
            </defs>

            <rect width="320" height="400" fill="url(#redBack2)" />
            <path d="M 30 400 C 30 310 80 290 160 290 C 240 290 290 310 290 400 Z" fill="url(#suitBlack2)" />
            <polygon points="120,290 160,375 200,290" fill="#f8fafc" />
            <polygon points="152,310 168,310 165,325 155,325" fill="#090d16" />
            <polygon points="155,325 165,325 170,400 150,400" fill="#0f172a" />
            <path d="M 85 295 L 140 375 L 120 395 L 70 320 Z" fill="#090d16" />
            <path d="M 235 295 L 180 375 L 200 395 L 250 320 Z" fill="#090d16" />
            <polygon points="120,290 148,318 135,322" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
            <polygon points="200,290 172,318 185,322" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
            <path d="M 140 235 L 180 235 L 180 295 L 140 295 Z" fill="url(#skinDedeng2)" />
            <path d="M 140 235 Q 160 260 180 235 L 180 250 Q 160 270 140 250 Z" fill="#b47844" opacity="0.6" />
            <path d="M 108 170 C 108 100 212 100 212 170 C 212 235 185 258 160 258 C 135 258 108 235 108 170 Z" fill="url(#skinDedeng2)" />
            <ellipse cx="106" cy="180" rx="9" ry="16" fill="url(#skinDedeng2)" />
            <ellipse cx="214" cy="180" rx="9" ry="16" fill="url(#skinDedeng2)" />
            <path d="M 124 152 Q 138 147 148 153" stroke="#1c1917" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M 172 153 Q 182 147 196 152" stroke="#1c1917" strokeWidth="3.5" strokeLinecap="round" />
            <ellipse cx="137" cy="165" rx="7.5" ry="5" fill="#ffffff" />
            <circle cx="137" cy="165" r="4.2" fill="#292524" />
            <circle cx="135.5" cy="163.5" r="1.5" fill="#ffffff" />
            <path d="M 128 164 Q 137 159 146 164" stroke="#1c1917" strokeWidth="2" strokeLinecap="round" />
            <ellipse cx="183" cy="165" rx="7.5" ry="5" fill="#ffffff" />
            <circle cx="183" cy="165" r="4.2" fill="#292524" />
            <circle cx="181.5" cy="163.5" r="1.5" fill="#ffffff" />
            <path d="M 174 164 Q 183 159 192 164" stroke="#1c1917" strokeWidth="2" strokeLinecap="round" />
            <path d="M 160 156 L 156 188 L 164 188" stroke="#9a3412" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 148 198 Q 160 196 172 198" stroke="#292524" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
            <path d="M 148 206 Q 160 214 172 206" stroke="#9f1239" strokeWidth="3" strokeLinecap="round" />
            <ellipse cx="160" cy="216" rx="3.5" ry="4" fill="#1c1917" opacity="0.9" />
            <path d="M 152 232 C 152 248 160 254 160 254 C 160 254 168 248 168 232 Z" fill="#1c1917" />
            <path d="M 100 128 C 100 70 115 50 160 48 C 205 50 220 70 220 128 L 220 134 C 205 140 115 140 100 134 Z" fill="#09090b" />
          </svg>
        </div>
      ) : (
        /* Candidates 1 & 3 Fallback: Placeholder Vector Avatar */
        <div className="w-full h-full bg-[#dbeafe] flex items-center justify-center relative overflow-hidden">
          <svg
            viewBox="0 0 320 400"
            className="w-full h-full object-cover object-top"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id={`suitSim-${candidate.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
              <linearGradient id={`skinSim-${candidate.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fed7aa" />
                <stop offset="100%" stopColor="#fba362" />
              </linearGradient>
            </defs>

            <path
              d="M 30 400 C 30 305 75 285 160 285 C 245 285 290 305 290 400 Z"
              fill={`url(#suitSim-${candidate.id})`}
            />

            <polygon points="120,285 160,370 200,285" fill="#ffffff" />

            <polygon
              points="152,305 168,305 165,322 155,322"
              fill={candidate.id === 1 ? '#2563eb' : '#dc2626'}
            />
            <polygon
              points="155,322 165,322 172,400 148,400"
              fill={candidate.id === 1 ? '#1d4ed8' : '#b91c1c'}
            />

            <path d="M 85 290 L 140 370 L 120 390 L 70 315 Z" fill="#090d16" />
            <path d="M 235 290 L 180 370 L 200 390 L 250 315 Z" fill="#090d16" />

            <polygon points="120,285 148,312 135,316" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
            <polygon points="200,285 172,312 185,316" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />

            <path d="M 140 230 L 180 230 L 180 290 L 140 290 Z" fill={`url(#skinSim-${candidate.id})`} />

            <path
              d="M 110 165 C 110 100 210 100 210 165 C 210 235 185 258 160 258 C 135 258 110 235 110 165 Z"
              fill={`url(#skinSim-${candidate.id})`}
            />

            <ellipse cx="107" cy="175" rx="8" ry="14" fill={`url(#skinSim-${candidate.id})`} />
            <ellipse cx="213" cy="175" rx="8" ry="14" fill={`url(#skinSim-${candidate.id})`} />

            <path
              d="M 100 130 C 100 70 115 50 160 48 C 205 50 220 70 220 130 L 220 135 C 205 142 115 142 100 135 Z"
              fill="#09090b"
            />
          </svg>
        </div>
      )}
    </div>
  );
};
