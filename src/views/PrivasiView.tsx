import React from 'react';
import { ConsentSetting } from '../types';
import {
  ShieldCheck,
  Lock,
  FileText,
  AlertTriangle,
  Eye,
  KeyRound,
  Shield,
  FileCheck,
  CheckCircle2,
  Server,
  Layers,
} from 'lucide-react';

interface PrivasiViewProps {
  consents: ConsentSetting[];
  onToggleConsent: (id: string) => void;
  onOpenAuditLog: () => void;
}

export const PrivasiView: React.FC<PrivasiViewProps> = ({
  consents,
  onToggleConsent,
  onOpenAuditLog,
}) => {
  return (
    <div id="privasi-module" className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            <span>Modul 09 • Kepatuhan Regulasi & UU PDP No. 27/2022</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            Privasi & Tata Kelola Data
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Pengaturan integrasi aman, kontrol izin kementerian/lembaga, dan perlindungan kerahasiaan data warga
          </p>
        </div>

        <button
          id="btn-open-audit-log-top"
          onClick={onOpenAuditLog}
          className="px-4 py-2.5 text-xs font-bold text-slate-800 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl shadow-xs flex items-center gap-2 transition-all self-start sm:self-auto"
        >
          <FileText className="w-4 h-4 text-blue-600" />
          <span>Buka Rekam Jejak (Log Audit)</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Inter-Agency Consent Toggles */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                Persetujuan & Berbagi Data Antar Lembaga
              </span>
              <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-mono font-bold">
                Multi-Agency API Gateway
              </span>
            </div>

            <div className="space-y-3">
              {consents.map((cs) => (
                <div
                  key={cs.id}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-4 transition-all"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-xl ${cs.colorBg} text-white font-mono font-bold text-xs flex items-center justify-center shrink-0 shadow-xs`}
                    >
                      {cs.shortCode}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-900">{cs.agencyName}</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                        {cs.description}
                      </p>
                      <div className="flex items-center gap-1.5 mt-2">
                        {cs.permissions.map((p) => (
                          <span
                            key={p}
                            className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded ${
                              p === 'Write'
                                ? 'bg-amber-100 text-amber-800'
                                : p === 'Read'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onToggleConsent(cs.id)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      cs.enabled ? 'bg-blue-600' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        cs.enabled ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Compliance Notice & 4 Privacy Pillars */}
        <div className="lg:col-span-5 space-y-4">
          {/* Compliance Warning Box */}
          <div className="p-5 rounded-xl bg-gradient-to-br from-blue-900 to-indigo-950 text-white shadow-md space-y-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-400" />
              <h3 className="text-sm font-bold tracking-tight">
                Peringatan Kepatuhan & Keamanan Data
              </h3>
            </div>
            <p className="text-xs text-blue-100 leading-relaxed">
              Setiap pertukaran data NIK dan data sosial wajib melalui proses enkripsi AES-256 dan pseudonymization. Semua aktivitas akses tercatat dalam Log Audit yang tidak dapat diubah (Immutable Log).
            </p>
            <button
              onClick={onOpenAuditLog}
              className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
            >
              <FileCheck className="w-4 h-4" />
              <span>Periksa Audit Trail Terkini</span>
            </button>
          </div>

          {/* 4 Privacy Principles Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-xs">
              <Lock className="w-4 h-4 text-blue-600 mb-1.5" />
              <h5 className="text-xs font-bold text-slate-800">Enkripsi AES-256 GCM (Standar Keamanan Data Tinggi)</h5>
              <p className="text-[10px] text-slate-500 mt-1 leading-snug">
                Data disimpan dan dikirim dengan TLS 1.3 dan enkripsi AES-256 GCM.
              </p>
            </div>

            <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-xs">
              <Eye className="w-4 h-4 text-emerald-600 mb-1.5" />
              <h5 className="text-xs font-bold text-slate-800">Anonimisasi Agregat</h5>
              <p className="text-[10px] text-slate-500 mt-1 leading-snug">
                Statistik publik ditampilkan tanpa NIK atau identitas personal warga.
              </p>
            </div>

            <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-xs">
              <FileText className="w-4 h-4 text-indigo-600 mb-1.5" />
              <h5 className="text-xs font-bold text-slate-800">Audit Trail Kemenkominfo</h5>
              <p className="text-[10px] text-slate-500 mt-1 leading-snug">
                Catatan mutasi data tersimpan permanen untuk transparansi BPKP.
              </p>
            </div>

            <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-xs">
              <Shield className="w-4 h-4 text-amber-600 mb-1.5" />
              <h5 className="text-xs font-bold text-slate-800">Kepatuhan UU PDP 27/2022</h5>
              <p className="text-[10px] text-slate-500 mt-1 leading-snug">
                Jaminan penuh hak privasi subjek data bantuan sosial adaptif.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
