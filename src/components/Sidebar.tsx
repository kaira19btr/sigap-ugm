import React from 'react';
import {
  AppModule,
  UserRole,
  UserProfile,
} from '../types';
import { Avatar } from './Avatar';
import { SigapLogo } from './SigapLogo';
import {
  Radio,
  Database,
  SlidersHorizontal,
  BarChart3,
  WifiOff,
  MessageSquareWarning,
  CheckSquare,
  Users,
  ShieldCheck,
  ChevronRight,
  Shield,
  Layers,
  LogOut,
  UserCheck,
} from 'lucide-react';

interface SidebarProps {
  currentModule: AppModule;
  onSelectModule: (module: AppModule) => void;
  currentRole: UserRole;
  onChangeRole: (role: UserRole) => void;
  userProfile: UserProfile;
  onLogout: () => void;
  onGoToLanding: () => void;
  pendingApprovalsCount: number;
  pendingSyncCount: number;
  newGrievancesCount: number;
}

interface NavItem {
  id: AppModule;
  label: string;
  moduleNumber: string;
  stageName?: string;
  icon: React.ElementType;
  badgeCount?: number;
  allowedRoles: UserRole[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentModule,
  onSelectModule,
  currentRole,
  onChangeRole,
  userProfile,
  onLogout,
  onGoToLanding,
  pendingApprovalsCount,
  pendingSyncCount,
  newGrievancesCount,
}) => {
  const navItems: NavItem[] = [
    {
      id: 'early_warning',
      moduleNumber: '01',
      label: 'Deteksi Dini & Peringatan',
      stageName: 'Sensing',
      icon: Radio,
      allowedRoles: ['admin_pusat', 'admin_daerah', 'petugas_lapangan'],
    },
    {
      id: 'satu_data',
      moduleNumber: '02',
      label: 'Satu Data Terpadu',
      stageName: 'Targeting',
      icon: Database,
      allowedRoles: ['admin_pusat', 'admin_daerah', 'petugas_lapangan'],
    },
    {
      id: 'risk_assessment',
      moduleNumber: '03',
      label: 'Penilaian Risiko & Aktivasi Kilat',
      stageName: 'Activation',
      icon: SlidersHorizontal,
      allowedRoles: ['admin_pusat', 'admin_daerah'],
    },
    {
      id: 'monev',
      moduleNumber: '04',
      label: 'Monitoring & Evaluasi',
      stageName: 'Feedback',
      icon: BarChart3,
      allowedRoles: ['admin_pusat', 'admin_daerah'],
    },
    {
      id: 'input_lapangan',
      moduleNumber: '05',
      label: 'Input Lapangan Offline',
      icon: WifiOff,
      badgeCount: pendingSyncCount > 0 ? pendingSyncCount : undefined,
      allowedRoles: ['admin_pusat', 'admin_daerah', 'petugas_lapangan'],
    },
    {
      id: 'pengaduan',
      moduleNumber: '06',
      label: 'Whistleblowing & Aspirasi',
      icon: MessageSquareWarning,
      badgeCount: newGrievancesCount > 0 ? newGrievancesCount : undefined,
      allowedRoles: ['admin_pusat', 'admin_daerah', 'petugas_lapangan'],
    },
    {
      id: 'persetujuan',
      moduleNumber: '07',
      label: 'Antrean Persetujuan',
      icon: CheckSquare,
      badgeCount: pendingApprovalsCount > 0 ? pendingApprovalsCount : undefined,
      allowedRoles: ['admin_pusat'],
    },
    {
      id: 'manajemen_pengguna',
      moduleNumber: '08',
      label: 'Manajemen Pengguna',
      icon: Users,
      allowedRoles: ['admin_pusat', 'admin_daerah'],
    },
    {
      id: 'privasi',
      moduleNumber: '09',
      label: 'Privasi & Tata Kelola Data',
      icon: ShieldCheck,
      allowedRoles: ['admin_pusat', 'admin_daerah'],
    },
  ];

  return (
    <aside
      id="sidebar-navigation"
      aria-label="Navigasi Utama"
      className="w-72 bg-gradient-to-b from-[#0B0F19] via-[#1A0B22] to-[#0A1325] text-slate-200 flex flex-col h-screen shrink-0 border-r border-rose-950/40 select-none relative overflow-hidden shadow-2xl"
    >
      {/* Ambient background glow accents matching SIGAP logo */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-rose-600/10 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-1/3 right-0 w-48 h-48 bg-amber-500/5 rounded-full blur-2xl pointer-events-none translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-56 h-56 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -translate-x-1/3 translate-y-1/3" />

      {/* Brand Header */}
      <div className="p-5 border-b border-rose-900/20 bg-black/20 backdrop-blur-xs flex items-center justify-between relative z-10">
        <button
          id="btn-brand-landing"
          onClick={onGoToLanding}
          className="flex items-center text-left group transition-all"
        >
          <SigapLogo size="md" variant="dark" showBadge={true} />
        </button>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1 relative z-10 custom-scrollbar">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-rose-300/70 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
          <span>Modul Operasional</span>
        </div>

        {navItems.map((item) => {
          const isActive = currentModule === item.id;
          const isAllowed = item.allowedRoles.includes(currentRole);
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              id={`nav-module-${item.id}`}
              disabled={!isAllowed}
              onClick={() => onSelectModule(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all text-left group relative ${
                isActive
                  ? 'bg-gradient-to-r from-rose-600 via-rose-500 to-blue-600 text-white shadow-lg shadow-rose-950/50 font-semibold border border-rose-400/30'
                  : isAllowed
                  ? 'text-slate-300 hover:bg-white/[0.07] hover:text-white'
                  : 'text-slate-600 cursor-not-allowed opacity-40'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                    isActive
                      ? 'bg-white/20 text-white shadow-xs'
                      : 'bg-slate-800/80 text-slate-400 group-hover:text-rose-300 group-hover:bg-rose-950/40 border border-slate-700/50 group-hover:border-rose-800/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <div className="flex items-center gap-1.5">
                    <span className={`text-[10px] font-mono font-semibold ${isActive ? 'text-rose-100' : 'opacity-60 text-slate-400'}`}>
                      {item.moduleNumber}
                    </span>
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.stageName && (
                    <div className={`text-[9px] font-mono font-medium tracking-wide ${isActive ? 'text-amber-200' : 'text-rose-300/60'}`}>
                      Tahap {item.moduleNumber} • {item.stageName}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0 ml-2">
                {item.badgeCount && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                      isActive
                        ? 'bg-white text-rose-700 shadow-xs'
                        : 'bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-xs animate-pulse'
                    }`}
                  >
                    {item.badgeCount}
                  </span>
                )}
                {!isAllowed && (
                  <span className="text-[9px] text-slate-400 bg-slate-900/90 px-1 py-0.5 rounded border border-slate-800">
                    Khusus Pusat
                  </span>
                )}
                {isActive && <ChevronRight className="w-3.5 h-3.5 text-white/90" />}
              </div>
            </button>
          );
        })}
      </div>

      {/* Role Switcher & User Profile Bar */}
      <div className="p-3 border-t border-rose-950/40 bg-black/30 backdrop-blur-xs space-y-3 relative z-10">
        {/* Role Selector */}
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase font-bold tracking-wider text-rose-300/80 flex items-center justify-between px-1">
            <span>Simulasi Peran Aktif</span>
            <UserCheck className="w-3 h-3 text-amber-400" />
          </label>
          <div className="grid grid-cols-3 gap-1 bg-slate-950/80 p-1 rounded-xl border border-rose-950/50 shadow-inner">
            <button
              id="btn-role-pusat"
              onClick={() => onChangeRole('admin_pusat')}
              className={`text-[10px] font-semibold py-1.5 rounded-lg transition-all text-center ${
                currentRole === 'admin_pusat'
                  ? 'bg-gradient-to-r from-rose-600 to-blue-600 text-white shadow-sm font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              Pusat
            </button>
            <button
              id="btn-role-daerah"
              onClick={() => onChangeRole('admin_daerah')}
              className={`text-[10px] font-semibold py-1.5 rounded-lg transition-all text-center ${
                currentRole === 'admin_daerah'
                  ? 'bg-gradient-to-r from-rose-600 to-blue-600 text-white shadow-sm font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              Daerah
            </button>
            <button
              id="btn-role-lapangan"
              onClick={() => onChangeRole('petugas_lapangan')}
              className={`text-[10px] font-semibold py-1.5 rounded-lg transition-all text-center ${
                currentRole === 'petugas_lapangan'
                  ? 'bg-gradient-to-r from-rose-600 to-blue-600 text-white shadow-sm font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              Lapangan
            </button>
          </div>
        </div>

        {/* User Card */}
        <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900/60 border border-rose-900/30">
          <div className="flex items-center gap-2.5 min-w-0">
            <Avatar
              name={userProfile.name}
              roleType={userProfile.roleType}
              size="md"
              className="ring-2 ring-rose-500/40"
            />
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white truncate">{userProfile.name}</p>
              <p className="text-[10px] text-rose-200/60 truncate">{userProfile.agency}</p>
            </div>
          </div>
          <button
            id="btn-logout-sidebar"
            onClick={onLogout}
            title="Keluar / Ganti Akun"
            className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 rounded-lg transition-colors shrink-0"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
