import React from 'react';

type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'gold';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
  dot?: boolean;
}

const variantStyles: Record<BadgeVariant, { container: string; dot: string }> = {
  success: {
    container: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    dot: 'bg-emerald-400'
  },
  warning: {
    container: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    dot: 'bg-amber-400'
  },
  danger: {
    container: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    dot: 'bg-rose-400'
  },
  info: {
    container: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
    dot: 'bg-sky-400'
  },
  gold: {
    container: 'bg-[#D4AF37]/10 text-[#E8C96A] border-[#D4AF37]/30',
    dot: 'bg-[#D4AF37]'
  },
  neutral: {
    container: 'bg-[#151B23] text-[#98A2B3] border-[#212833]',
    dot: 'bg-[#98A2B3]'
  },
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  className = '',
  dot = false
}) => {
  const styles = variantStyles[variant] || variantStyles.neutral;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium rounded-md border tracking-tight ${styles.container} ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${styles.dot}`} />}
      {children}
    </span>
  );
};
