import React from 'react';

interface BrandLogoProps {
  compact?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ compact = false, className = '' }) => (
  <div className={`flex items-center gap-2.5 ${className}`} aria-label="HRVISTA">
    <div className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#7C3AED] via-[#5B21B6] to-[#172554] text-white shadow-lg shadow-[#7C3AED]/25">
      <span className="text-[13px] font-black tracking-[-0.08em]">HR</span>
      <span className="absolute bottom-1 right-1 h-1.5 w-1.5 rounded-full bg-[#C4B5FD]" />
    </div>
    {!compact && (
      <div className="flex flex-col leading-none">
        <span className="text-[15px] font-black tracking-[0.16em] text-[#172554]">
          HR<span className="text-[#6D28D9]">VISTA</span>
        </span>
        <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#7B849D]">
          Smart HR platform
        </span>
      </div>
    )}
  </div>
);
