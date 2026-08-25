import React, { useState } from 'react';
import {
  UserProfile,
  AppModule,
} from '../types';
import { Avatar } from './Avatar';
import {
  Search,
  Bell,
  Activity,
  Layers,
  HelpCircle,
  LogOut,
  ChevronDown,
  Globe,
  ShieldCheck,
  AlertTriangle,
  FileText,
  Clock,
  CheckCircle2,
} from 'lucide-react';

interface HeaderProps {
  userProfile: UserProfile;
  currentModule: AppModule;
  onSelectModule: (module: AppModule) => void;
  onGoToLanding: () => void;
  onLogout: () => void;
  onOpenAuditLog?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  userProfile,
  currentModule,
  onSelectModule,
  onGoToLanding,
  onLogout,
  onOpenAuditLog,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const notifications = [
    {
      id: 1,
      title: 'Peringatan Anomali Iklim',
      desc: 'Sumba Timur mendeteksi defisit curah hujan ekstrem 12mm berturut-turut.',
      time: '10 mnt lalu',
      type: 'danger',
    },
    {
      id: 2,
      title: 'Usulan Baru Butuh Persetujuan',
      desc: 'BPBD Kab. Cianjur mengajukan aktivasi bantuan gempa.',
      time: '32 mnt lalu',
      type: 'warning',
    },
    {
      id: 3,
      title: 'Sinkronisasi Lapangan Sukses',
      desc: '124 data KK terdampak dari Posko Cianjur berhasil diintegrasikan.',
      time: '1 jam lalu',
      type: 'info',
    },
  ];

  return (
    <header
      id="top-header"
      className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between z-20 shrink-0 sticky top-0"
    >
      {/* Left: Global Search & Breadcrumb */}
      <div className="flex items-center gap-6 flex-1 max-w-2xl">
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            id="global-search-input"
            type="text"
            placeholder="Cari wilayah, NIK, usulan bencana, atau laporan warga..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-800 placeholder:text-slate-400"
          />
        </div>

        {/* Live Pulse Indicator */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200/80 rounded-full">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[11px] font-medium text-emerald-800">
            Pusat Data Terhubung (Latensi 24ms)
          </span>
        </div>
      </div>

      {/* Right: Quick actions, notifications, user dropdown */}
      <div className="flex items-center gap-3">
        {/* Navigation shortcut to Landing */}
        <button
          id="btn-nav-landing-header"
          onClick={onGoToLanding}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors border border-slate-200"
        >
          <Globe className="w-3.5 h-3.5 text-blue-600" />
          <span>Beranda Publik</span>
        </button>

        {/* Audit Log Button */}
        {onOpenAuditLog && (
          <button
            id="btn-quick-audit-log"
            onClick={onOpenAuditLog}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
          >
            <FileText className="w-3.5 h-3.5 text-slate-500" />
            <span>Log Audit</span>
          </button>
        )}

        {/* Notification Bell with Dropdown */}
        <div className="relative">
          <button
            id="btn-header-notifications"
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowUserMenu(false);
            }}
            className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 relative transition-colors"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></span>
          </button>

          {showNotifications && (
            <div
              id="dropdown-notifications-panel"
              className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
            >
              <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">Notifikasi Sistem</span>
                <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-semibold">
                  3 Baru
                </span>
              </div>
              <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className="p-3 hover:bg-slate-50 transition-colors cursor-pointer text-left"
                    onClick={() => {
                      setShowNotifications(false);
                      if (notif.id === 1) onSelectModule('early_warning');
                      if (notif.id === 2) onSelectModule('persetujuan');
                      if (notif.id === 3) onSelectModule('input_lapangan');
                    }}
                  >
                    <div className="flex items-start gap-2.5">
                      <div className="mt-0.5 shrink-0">
                        {notif.type === 'danger' && (
                          <AlertTriangle className="w-4 h-4 text-rose-500" />
                        )}
                        {notif.type === 'warning' && (
                          <Clock className="w-4 h-4 text-amber-500" />
                        )}
                        {notif.type === 'info' && (
                          <CheckCircle2 className="w-4 h-4 text-blue-500" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-slate-800 leading-tight">
                          {notif.title}
                        </p>
                        <p className="text-[11px] text-slate-500 mt-0.5 leading-snug line-clamp-2">
                          {notif.desc}
                        </p>
                        <span className="text-[10px] text-slate-400 mt-1 block">
                          {notif.time}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 pt-2 border-t border-slate-100 text-center">
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-[11px] font-semibold text-blue-600 hover:text-blue-700"
                >
                  Tutup Notifikasi
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Quick Profile Dropdown */}
        <div className="relative">
          <button
            id="btn-header-profile"
            onClick={() => {
              setShowUserMenu(!showUserMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <Avatar
              name={userProfile.name}
              roleType={userProfile.roleType}
              size="sm"
              className="ring-1 ring-slate-300"
            />
            <div className="hidden xl:block text-left text-xs">
              <span className="font-semibold text-slate-800 block leading-none">
                {userProfile.name}
              </span>
              <span className="text-[10px] text-slate-400 leading-none">
                {userProfile.role}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showUserMenu && (
            <div
              id="dropdown-user-menu"
              className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
            >
              <div className="px-4 py-2 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-800">{userProfile.name}</p>
                <p className="text-[11px] text-slate-500">{userProfile.agency}</p>
                <span className="inline-block mt-1 text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold">
                  {userProfile.role} • {userProfile.region}
                </span>
              </div>
              <div className="py-1">
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    onSelectModule('privasi');
                  }}
                  className="w-full px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 text-left"
                >
                  <ShieldCheck className="w-4 h-4 text-slate-500" />
                  <span>Keamanan & Privasi Data</span>
                </button>
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    onSelectModule('manajemen_pengguna');
                  }}
                  className="w-full px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 text-left"
                >
                  <Layers className="w-4 h-4 text-slate-500" />
                  <span>Kelola Akun Dinas</span>
                </button>
              </div>
              <div className="border-t border-slate-100 pt-1">
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    onLogout();
                  }}
                  className="w-full px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 text-left font-medium"
                >
                  <LogOut className="w-4 h-4 text-rose-500" />
                  <span>Keluar dari Akun</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
