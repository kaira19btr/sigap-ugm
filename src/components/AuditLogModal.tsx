import React from 'react';
import {
  X,
  FileText,
  ShieldCheck,
  Download,
  KeyRound,
  CheckCircle2,
  Lock,
} from 'lucide-react';

interface AuditLogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuditLogModal: React.FC<AuditLogModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const logs = [
    {
      id: 'LOG-88912',
      timestamp: '10 Nov 2023, 10:14:22 WIB',
      user: 'Dr. Budi Setiawan (Admin Pusat)',
      action: 'Otorisasi Aktivasi Bantuan',
      target: 'Kab. Cianjur (ACT-2023-11-001)',
      ip: '10.24.112.5 (VPN Kemensos)',
      hash: 'SHA256:8f4c2e...b910',
    },
    {
      id: 'LOG-88911',
      timestamp: '10 Nov 2023, 09:45:01 WIB',
      user: 'Sistem Sinkronisasi Tagana',
      action: 'Batch Ingestion Lapangan (Offline)',
      target: '124 KK Terdata Posko Cianjur',
      ip: '180.252.12.98 (Gateway)',
      hash: 'SHA256:3a1b9f...d402',
    },
    {
      id: 'LOG-88910',
      timestamp: '10 Nov 2023, 08:30:15 WIB',
      user: 'Budi Santoso (Admin Daerah)',
      action: 'Penyelesaian Konflik NIK',
      target: 'Garut Kota (Rekonsiliasi DTKS)',
      ip: '10.18.44.12 (Dinas Daerah)',
      hash: 'SHA256:77cd10...ee81',
    },
    {
      id: 'LOG-88909',
      timestamp: '10 Nov 2023, 07:12:00 WIB',
      user: 'API Connector BNPB InAWARE',
      action: 'Pengambilan Data Telemetri Bencana',
      target: 'Status Sumba Timur & Semarang',
      ip: '103.11.200.15 (BNPB Cloud)',
      hash: 'SHA256:55aa21...fa99',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-3xl w-full overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold">
                Log Audit & Jejak Kepatuhan UU PDP
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Immutable Ledger • Terenkripsi Kemenkominfo RI
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Rekam Jejak Aktivitas 24 Jam Terakhir
            </span>
            <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>Integritas Hash 100% Valid</span>
            </span>
          </div>

          <div className="space-y-2.5">
            {logs.map((log) => (
              <div
                key={log.id}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100/70 transition-colors"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      {log.id}
                    </span>
                    <span className="font-bold text-slate-900">{log.action}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">{log.timestamp}</span>
                </div>

                <div className="mt-2 text-xs text-slate-600 grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Pelaku Aktivitas:</span>
                    <span className="font-semibold text-slate-800">{log.user}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Sasaran Data:</span>
                    <span className="font-semibold text-slate-800">{log.target}</span>
                  </div>
                </div>

                <div className="mt-2 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>IP: {log.ip}</span>
                  <span className="truncate max-w-[200px]">{log.hash}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-slate-400" />
            <span>Kunci Publik: RSA-4096 Kemensos Gov CA</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl"
          >
            Tutup Log
          </button>
        </div>
      </div>
    </div>
  );
};
