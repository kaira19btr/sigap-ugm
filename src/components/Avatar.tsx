import React from 'react';
import { UserRole } from '../types';

interface AvatarProps {
  name: string;
  roleType?: UserRole;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  name,
  roleType,
  size = 'md',
  className = '',
}) => {
  // Extract initials (up to 2 characters)
  const cleanName = name.replace(/^(Dr\.|Drs\.|Ir\.|H\.|Hj\.)\s+/i, '').trim();
  const parts = cleanName.split(/\s+/).filter(Boolean);
  let initials = '';
  if (parts.length >= 2) {
    initials = `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  } else if (parts.length === 1) {
    initials = parts[0].slice(0, 2).toUpperCase();
  } else {
    initials = 'US';
  }

  // Determine color scheme based on roleType or hash of name
  const getGradient = () => {
    if (roleType === 'admin_pusat') {
      return 'bg-gradient-to-tr from-blue-700 to-indigo-500 text-white';
    }
    if (roleType === 'admin_daerah') {
      return 'bg-gradient-to-tr from-indigo-700 to-cyan-600 text-white';
    }
    if (roleType === 'petugas_lapangan') {
      return 'bg-gradient-to-tr from-emerald-600 to-teal-500 text-white';
    }

    // Default hash based colors
    const colors = [
      'bg-gradient-to-tr from-blue-600 to-blue-400 text-white',
      'bg-gradient-to-tr from-indigo-600 to-indigo-400 text-white',
      'bg-gradient-to-tr from-emerald-600 to-emerald-400 text-white',
      'bg-gradient-to-tr from-amber-600 to-amber-400 text-white',
      'bg-gradient-to-tr from-rose-600 to-rose-400 text-white',
      'bg-gradient-to-tr from-purple-600 to-purple-400 text-white',
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const sizeClasses = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-7 h-7 text-xs',
    md: 'w-8 h-8 text-xs',
    lg: 'w-10 h-10 text-sm',
  };

  return (
    <div
      aria-label={`Avatar untuk ${name}`}
      className={`inline-flex items-center justify-center rounded-full font-bold tracking-tight select-none shadow-xs shrink-0 ${sizeClasses[size]} ${getGradient()} ${className}`}
    >
      <span>{initials}</span>
    </div>
  );
};
