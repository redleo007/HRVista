import React from 'react';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  actionText,
  onAction
}) => {
  return (
    <div className="py-16 px-6 text-center flex flex-col items-center justify-center bg-[#151B23] rounded-xl border border-[#212833] shadow-sm">
      <div className="w-12 h-12 rounded-lg bg-[#11161D] border border-[#212833] flex items-center justify-center text-[#98A2B3] mb-3.5 shadow-inner">
        <Icon className="w-5 h-5 text-[#D4AF37]" />
      </div>
      <h3 className="text-sm font-semibold text-[#F5F7FA] mb-1">{title}</h3>
      <p className="text-xs text-[#98A2B3] max-w-sm mb-5 leading-relaxed">{description}</p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="px-4 py-2 text-xs font-semibold text-[#0B0F14] bg-[#D4AF37] hover:bg-[#E8C96A] rounded-lg transition-all duration-150 cursor-pointer shadow-sm hover:shadow-[#D4AF37]/20"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};
