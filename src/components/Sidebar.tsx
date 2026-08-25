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
      icon: Radio,
      allowedRoles: ['admin_pusat', 'admin_daerah', 'petugas_lapangan'],
    },
    {
      id: 'satu_data',
      moduleNumber: '02',
      label: 'Satu Data Terpadu',
      icon: Database,
      allowedRoles: ['admin_pusat', 'admin_daerah', 'petugas_lapangan'],
    },
    {
      id: 'risk_assessment',
      moduleNumber: '03',
      label: 'Penilaian Risiko & Aktivasi',
      icon: SlidersHorizontal,
      allowedRoles: ['admin_pusat', 'admin_daerah'],
    },
    {
      id: 'monev',
      moduleNumber: '04',
      label: 'Monitoring & Evaluasi',
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
      label: 'Bot Pengaduan & Aspirasi',
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
      className="w-72 bg-[#0F172A] text-slate-200 flex flex-col h-screen shrink-0 border-r border-slate-800 select-none"
    >
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800 flex items-center justify-between">
        <button
          id="btn-brand-landing"
          onClick={onGoToLanding}
          className="flex items-center text-left group transition-all"
        >
          <SigapLogo size="md" variant="dark" showBadge={true} />
        </button>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Modul Operasional
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
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all text-left group relative ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20 font-semibold'
                  : isAllowed
                  ? 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  : 'text-slate-600 cursor-not-allowed opacity-40'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 transition-colors ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-800 text-slate-400 group-hover:text-slate-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono opacity-60 font-semibold">
                      {item.moduleNumber}
                    </span>
                    <span className="truncate">{item.label}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0 ml-2">
                {item.badgeCount && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                      isActive
                        ? 'bg-white text-blue-700'
                        : 'bg-rose-500/90 text-white animate-pulse'
                    }`}
                  >
                    {item.badgeCount}
                  </span>
                )}
                {!isAllowed && (
                  <span className="text-[9px] text-slate-400 bg-slate-800 px-1 py-0.5 rounded">
                    Khusus Pusat
                  </span>
                )}
                {isActive && <ChevronRight className="w-3.5 h-3.5 text-white/70" />}
              </div>
            </button>
          );
        })}
      </div>

      {/* Role Switcher & User Profile Bar */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-900/60 space-y-3">
        {/* Role Selector */}
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400 flex items-center justify-between px-1">
            <span>Simulasi Peran Aktif</span>
            <UserCheck className="w-3 h-3 text-blue-400" />
          </label>
          <div className="grid grid-cols-3 gap-1 bg-slate-950/80 p-1 rounded-lg border border-slate-800">
            <button
              id="btn-role-pusat"
              onClick={() => onChangeRole('admin_pusat')}
              className={`text-[10px] font-semibold py-1 rounded transition-all text-center ${
                currentRole === 'admin_pusat'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Pusat
            </button>
            <button
              id="btn-role-daerah"
              onClick={() => onChangeRole('admin_daerah')}
              className={`text-[10px] font-semibold py-1 rounded transition-all text-center ${
                currentRole === 'admin_daerah'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Daerah
            </button>
            <button
              id="btn-role-lapangan"
              onClick={() => onChangeRole('petugas_lapangan')}
              className={`text-[10px] font-semibold py-1 rounded transition-all text-center ${
                currentRole === 'petugas_lapangan'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Lapangan
            </button>
          </div>
        </div>

        {/* User Card */}
        <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800/60 border border-slate-700/50">
          <div className="flex items-center gap-2.5 min-w-0">
            <Avatar
              name={userProfile.name}
              roleType={userProfile.roleType}
              size="md"
              className="ring-2 ring-blue-500/30"
            />
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white truncate">{userProfile.name}</p>
              <p className="text-[10px] text-slate-400 truncate">{userProfile.agency}</p>
            </div>
          </div>
          <button
            id="btn-logout-sidebar"
            onClick={onLogout}
            title="Keluar / Ganti Akun"
            className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-700/50 rounded-md transition-colors shrink-0"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
