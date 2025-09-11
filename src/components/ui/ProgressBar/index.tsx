import type React from 'react';

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export type Variant = 'danger' | 'idle' | 'info' | 'success' | 'warning';

const colorByVariant: Record<Variant, string> = {
  danger: 'bg-linear-to-r from-rose-500 to-rose-500',
  idle: 'bg-linear-to-r from-indigo-400 via-blue-400 to-teal-400',
  info: 'bg-linear-to-r from-blue-500 to-indigo-500',
  success: 'bg-linear-to-r from-teal-500 to-emerald-500',
  warning: 'bg-linear-to-r from-amber-500 to-orange-500',
};

interface Props {
  progress: number;
  variant?: Variant;
  className?: string;
}

export default function ProgressBar({ progress, variant = 'info', className = '' }: Props) {
  const safeProgress = clamp(progress, 0, 100);
  const fillerStyles: React.CSSProperties = {
    width: `${safeProgress}%`,
    transition: 'width 0.3s ease-in-out',
  };

  return (
    <div
      className={`flex h-2 overflow-hidden rounded bg-gray-200 text-xs dark:bg-zinc-700 ${className}`}
      aria-valuenow={safeProgress}
      aria-valuemin={0}
      aria-valuemax={100}
      role="progressbar"
    >
      <div
        style={fillerStyles}
        className={`flex flex-col justify-center rounded text-center whitespace-nowrap text-white shadow-none ${colorByVariant[variant]}`}
      />
    </div>
  );
}
