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
  Coins,
  HeartPulse,
  Building2,
  TrendingUp,
  Award,
  Sparkles,
  Lock,
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
  subLabel?: string;
  moduleNumber: string;
  journeyStageBadge: 'Shield' | 'Converge' | 'Rise' | 'Engine';
  stageColor: string;
  icon: React.ElementType;
  badgeCount?: number;
  allowedRoles: UserRole[];
}

interface NavGroup {
  groupTitle: string;
  groupSubtitle?: string;
  items: NavItem[];
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
  const navGroups: NavGroup[] = [
    {
      groupTitle: 'ALUR PERJALANAN KETAHANAN',
      groupSubtitle: 'Satu Rangkaian Pemulihan Terpadu',
      items: [
        {
          id: 'early_warning',
          moduleNumber: '01',
          label: 'Deteksi Dini & Peringatan',
          subLabel: 'Pilar Shield',
          journeyStageBadge: 'Shield',
          stageColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
          icon: Radio,
          allowedRoles: ['admin_pusat', 'admin_daerah', 'petugas_lapangan'],
        },
        {
          id: 'satu_data',
          moduleNumber: '02',
          label: 'Satu Data Terpadu (DTSEN)',
          subLabel: 'Pilar Shield',
          journeyStageBadge: 'Shield',
          stageColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
          icon: Database,
          allowedRoles: ['admin_pusat', 'admin_daerah', 'petugas_lapangan'],
        },
        {
          id: 'risk_assessment',
          moduleNumber: '03',
          label: 'Penilaian Risiko & Aktivasi',
          subLabel: 'Pilar Shield',
          journeyStageBadge: 'Shield',
          stageColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
          icon: SlidersHorizontal,
          allowedRoles: ['admin_pusat', 'admin_daerah'],
        },
        {
          id: 'contingency_financing',
          moduleNumber: '03b',
          label: 'Pembiayaan Kontinjensi (DRFI)',
          subLabel: 'Pilar Shield',
          journeyStageBadge: 'Shield',
          stageColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
          icon: Coins,
          allowedRoles: ['admin_pusat', 'admin_daerah'],
        },
        {
          id: 'converge_vulnerability_map',
          moduleNumber: 'CV-1',
          label: 'Peta Kerentanan Layanan',
          subLabel: 'Pilar Converge',
          journeyStageBadge: 'Converge',
          stageColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
          icon: HeartPulse,
          allowedRoles: ['admin_pusat', 'admin_daerah'],
        },
        {
          id: 'converge_supply_side',
          moduleNumber: 'CV-2',
          label: 'Pemerataan Intervensi Supply',
          subLabel: 'Pilar Converge',
          journeyStageBadge: 'Converge',
          stageColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
          icon: Building2,
          allowedRoles: ['admin_pusat', 'admin_daerah'],
        },
        {
          id: 'rise_inclusion_tracker',
          moduleNumber: 'RS-1',
          label: 'Jalur Pemberdayaan Ekonomi',
          subLabel: 'Pilar Rise',
          journeyStageBadge: 'Rise',
          stageColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
          icon: TrendingUp,
          allowedRoles: ['admin_pusat', 'admin_daerah'],
        },
        {
          id: 'rise_graduation_scorecard',
          moduleNumber: 'RS-2',
          label: 'Kalkulator Kelulusan Mandiri',
          subLabel: 'Pilar Rise',
          journeyStageBadge: 'Rise',
          stageColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
          icon: Award,
          allowedRoles: ['admin_pusat', 'admin_daerah'],
        },
        {
          id: 'input_lapangan',
          moduleNumber: '05',
          label: 'Input Lapangan Offline',
          subLabel: 'Pilar Shield',
          journeyStageBadge: 'Shield',
          stageColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
          icon: WifiOff,
          badgeCount: pendingSyncCount > 0 ? pendingSyncCount : undefined,
          allowedRoles: ['admin_pusat', 'admin_daerah', 'petugas_lapangan'],
        },
      ],
    },
    {
      groupTitle: 'GOVERNANCE & DATA ENGINE',
      groupSubtitle: 'Fondasi Lintas-Pilar',
      items: [
        {
          id: 'monev',
          moduleNumber: '04',
          label: 'Monitoring & Evaluasi',
          subLabel: 'Governance',
          journeyStageBadge: 'Engine',
          stageColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
          icon: BarChart3,
          allowedRoles: ['admin_pusat', 'admin_daerah'],
        },
        {
          id: 'pengaduan',
          moduleNumber: '06',
          label: 'Whistleblowing & Pengaduan',
          subLabel: 'Governance',
          journeyStageBadge: 'Engine',
          stageColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
          icon: MessageSquareWarning,
          badgeCount: newGrievancesCount > 0 ? newGrievancesCount : undefined,
          allowedRoles: ['admin_pusat', 'admin_daerah', 'petugas_lapangan'],
        },
        {
          id: 'persetujuan',
          moduleNumber: '07',
          label: 'Antrean Persetujuan (HITL)',
          subLabel: 'Governance',
          journeyStageBadge: 'Engine',
          stageColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
          icon: CheckSquare,
          badgeCount: pendingApprovalsCount > 0 ? pendingApprovalsCount : undefined,
          allowedRoles: ['admin_pusat'],
        },
        {
          id: 'manajemen_pengguna',
          moduleNumber: '08',
          label: 'Manajemen Pengguna',
          subLabel: 'Governance',
          journeyStageBadge: 'Engine',
          stageColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
          icon: Users,
          allowedRoles: ['admin_pusat', 'admin_daerah'],
        },
        {
          id: 'privasi',
          moduleNumber: '09',
          label: 'Privasi & Tata Kelola Data',
          subLabel: 'Governance',
          journeyStageBadge: 'Engine',
          stageColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
          icon: ShieldCheck,
          allowedRoles: ['admin_pusat', 'admin_daerah'],
        },
      ],
    },
  ];

  return (
    <aside
      id="sidebar-navigation"
      aria-label="Navigasi Utama"
      className="w-72 bg-gradient-to-b from-[#0B0F19] via-[#150D24] to-[#0A1325] text-slate-200 flex flex-col h-screen shrink-0 border-r border-slate-800 select-none relative overflow-hidden shadow-2xl"
    >
      {/* Ambient background glow accents matching SIGAP logo */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-rose-600/10 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-1/3 right-0 w-48 h-48 bg-amber-500/5 rounded-full blur-2xl pointer-events-none translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-56 h-56 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -translate-x-1/3 translate-y-1/3" />

      {/* Brand Header */}
      <div className="h-16 px-4 sm:px-5 border-b border-slate-800 bg-black/20 backdrop-blur-xs flex items-center justify-between relative z-10 shrink-0">
        <button
          id="btn-brand-landing"
          onClick={onGoToLanding}
          className="flex items-center text-left group transition-all"
        >
          <SigapLogo size="md" variant="dark" showBadge={true} />
        </button>
      </div>

      {/* Unified Navigation List */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4 relative z-10 custom-scrollbar">
        {navGroups.map((group, groupIdx) => (
          <div key={groupIdx} className="space-y-1">
            {/* Group Header */}
            <div className="px-2 pt-1 pb-1.5 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-300 block">
                  {group.groupTitle}
                </span>
                {group.groupSubtitle && (
                  <span className="text-[9px] text-slate-500 block">
                    {group.groupSubtitle}
                  </span>
                )}
              </div>
            </div>

            {/* Group Items */}
            {group.items.map((item) => {
              const isActive = currentModule === item.id;
              const isAllowed = item.allowedRoles.includes(currentRole);
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  id={`nav-module-${item.id}`}
                  disabled={!isAllowed}
                  onClick={() => onSelectModule(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all text-left group relative ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-rose-600 text-white shadow-md font-semibold border border-blue-400/40'
                      : isAllowed
                      ? 'text-slate-300 hover:bg-white/[0.07] hover:text-white'
                      : 'text-slate-600 cursor-not-allowed opacity-40'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                        isActive
                          ? 'bg-white/20 text-white shadow-xs'
                          : 'bg-slate-800/80 text-slate-400 group-hover:text-blue-300 group-hover:bg-slate-800 border border-slate-700/50'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="truncate min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[10px] font-mono font-bold ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>
                          {item.moduleNumber}
                        </span>
                        <span className="truncate font-medium">{item.label}</span>
                      </div>
                      {item.subLabel && (
                        <span className={`text-[9px] block truncate ${isActive ? 'text-blue-200/80' : 'text-slate-500'}`}>
                          {item.subLabel}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 ml-1.5">
                    {/* Stage Tag badge */}
                    <span
                      className={`text-[8px] font-mono font-bold px-1.5 py-0.2 rounded border ${
                        isActive
                          ? 'bg-white/20 text-white border-white/30'
                          : item.stageColor
                      }`}
                    >
                      {item.journeyStageBadge}
                    </span>

                    {item.badgeCount && (
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                          isActive
                            ? 'bg-white text-blue-700 shadow-xs'
                            : 'bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-xs animate-pulse'
                        }`}
                      >
                        {item.badgeCount}
                      </span>
                    )}
                    {!isAllowed && (
                      <span className="text-[8px] text-slate-400 bg-slate-900/90 px-1 py-0.5 rounded border border-slate-800">
                        Pusat
                      </span>
                    )}
                    {isActive && <ChevronRight className="w-3.5 h-3.5 text-white/90" />}
                  </div>
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Role Switcher & User Profile Bar */}
      <div className="p-3 border-t border-slate-800 bg-black/30 backdrop-blur-xs space-y-2.5 relative z-10 shrink-0">
        {/* Role Selector */}
        <div className="space-y-1">
          <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400 flex items-center justify-between px-1">
            <span>Simulasi Peran Aktif</span>
            <UserCheck className="w-3 h-3 text-blue-400" />
          </label>
          <div className="grid grid-cols-3 gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800 shadow-inner">
            <button
              id="btn-role-pusat"
              onClick={() => onChangeRole('admin_pusat')}
              className={`text-[10px] font-semibold py-1 rounded-lg transition-all text-center ${
                currentRole === 'admin_pusat'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              Pusat
            </button>
            <button
              id="btn-role-daerah"
              onClick={() => onChangeRole('admin_daerah')}
              className={`text-[10px] font-semibold py-1 rounded-lg transition-all text-center ${
                currentRole === 'admin_daerah'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              Daerah
            </button>
            <button
              id="btn-role-lapangan"
              onClick={() => onChangeRole('petugas_lapangan')}
              className={`text-[10px] font-semibold py-1 rounded-lg transition-all text-center ${
                currentRole === 'petugas_lapangan'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              Lapangan
            </button>
          </div>
        </div>

        {/* User Card */}
        <div className="flex items-center justify-between p-2 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <div className="flex items-center gap-2.5 min-w-0">
            <Avatar name={userProfile.name} size="sm" />
            <div className="truncate">
              <div className="text-xs font-bold text-slate-100 truncate">{userProfile.name}</div>
              <div className="text-[10px] text-slate-400 truncate font-mono">
                {userProfile.agency}
              </div>
            </div>
          </div>
          <button
            id="btn-sidebar-logout"
            onClick={onLogout}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 transition-colors"
            title="Keluar / Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
