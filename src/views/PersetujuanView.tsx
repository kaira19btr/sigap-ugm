import React, { useState } from 'react';
import { ActivationProposal } from '../types';
import {
  CheckSquare,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  FileCheck,
  ShieldAlert,
  Send,
  Building,
} from 'lucide-react';

interface PersetujuanViewProps {
  proposals: ActivationProposal[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export const PersetujuanView: React.FC<PersetujuanViewProps> = ({
  proposals,
  onApprove,
  onReject,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'menunggu' | 'selesai'>('all');

  const pendingList = proposals.filter((p) => p.status === 'Menunggu');
  const highRiskCount = proposals.filter((p) => p.riskScore >= 80 && p.status === 'Menunggu').length;
  const approvedCount = proposals.filter((p) => p.status === 'Disetujui').length + 12;

  const filteredProposals = proposals.filter((p) => {
    if (activeTab === 'menunggu') return p.status === 'Menunggu';
    if (activeTab === 'selesai') return p.status !== 'Menunggu';
    return true;
  });

  return (
    <div id="persetujuan-module" className="p-6 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
          <span className="w-2 h-2 rounded-full bg-blue-600"></span>
          <span>Modul 07 • Otorisasi Eksekutif & Penandatanganan Digital</span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
          Antrean Persetujuan Aktivasi Bantuan
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Verifikasi berjenjang dan otorisasi tanggap darurat oleh pimpinan kementerian/lembaga
        </p>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-white via-blue-50/50 to-rose-50/20 p-4 rounded-xl border border-blue-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-600">Menunggu Otorisasi</span>
            <div className="text-2xl font-bold font-mono text-blue-600 mt-1">
              {pendingList.length} Usulan
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-blue-100/70 text-blue-700 flex items-center justify-center shadow-xs">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-white via-rose-50/50 to-amber-50/20 p-4 rounded-xl border border-rose-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-600">Usulan Risiko Tinggi</span>
            <div className="text-2xl font-bold font-mono text-rose-600 mt-1">
              {highRiskCount} Usulan
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-rose-100/70 text-rose-700 flex items-center justify-center shadow-xs">
            <ShieldAlert className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-white via-emerald-50/50 to-blue-50/20 p-4 rounded-xl border border-emerald-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-600">Disetujui Hari Ini</span>
            <div className="text-2xl font-bold font-mono text-emerald-600 mt-1">
              {approvedCount} Protokol
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-emerald-100/70 text-emerald-700 flex items-center justify-center shadow-xs">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Proposals Table */}
      <div className="bg-gradient-to-br from-white via-slate-50/70 to-rose-50/20 rounded-xl border border-rose-200/60 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-rose-100/80 flex flex-wrap items-center justify-between gap-3 bg-gradient-to-r from-white via-rose-50/20 to-amber-50/10">
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
            Daftar Berkas Usulan Darurat Masuk
          </span>

          <div className="flex items-center gap-1 bg-slate-100/90 p-1 rounded-lg border border-slate-200">
            <button
              onClick={() => setActiveTab('all')}
              className={`text-[11px] font-semibold px-2.5 py-1 rounded transition-all cursor-pointer ${
                activeTab === 'all' ? 'bg-gradient-to-r from-rose-600 to-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => setActiveTab('menunggu')}
              className={`text-[11px] font-semibold px-2.5 py-1 rounded transition-all cursor-pointer ${
                activeTab === 'menunggu' ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Menunggu ({pendingList.length})
            </button>
            <button
              onClick={() => setActiveTab('selesai')}
              className={`text-[11px] font-semibold px-2.5 py-1 rounded transition-all cursor-pointer ${
                activeTab === 'selesai' ? 'bg-slate-800 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Riwayat Selesai
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">ID Berkas & Pengajuan</th>
                <th className="py-3 px-4">Wilayah Sasaran</th>
                <th className="py-3 px-4">Jenis Bencana</th>
                <th className="py-3 px-4">Skor Risiko</th>
                <th className="py-3 px-4">Instansi Pengusul</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Otorisasi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProposals.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4">
                    <span className="font-mono font-bold text-slate-900 block">{p.id}</span>
                    <span className="text-[10px] text-slate-400">{p.submittedAt}</span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-800">{p.region}</td>
                  <td className="py-3.5 px-4 text-slate-700">{p.disasterType}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block font-mono font-bold px-2 py-0.5 rounded text-xs ${
                        p.riskScore >= 80
                          ? 'bg-rose-100 text-rose-700'
                          : p.riskScore >= 60
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {p.riskScore} / 105
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">{p.proposer}</td>
                  <td className="py-3.5 px-4">
                    {p.status === 'Menunggu' && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                        <Clock className="w-3 h-3" />
                        <span>Menunggu</span>
                      </span>
                    )}
                    {p.status === 'Disetujui' && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Disetujui</span>
                      </span>
                    )}
                    {p.status === 'Ditolak' && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                        <XCircle className="w-3 h-3" />
                        <span>Ditolak</span>
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    {p.status === 'Menunggu' ? (
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onReject(p.id)}
                          className="px-2.5 py-1 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg border border-rose-200 transition-colors"
                        >
                          Tolak
                        </button>
                        <button
                          onClick={() => onApprove(p.id)}
                          className="px-3 py-1 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs transition-colors flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Setujui</span>
                        </button>
                      </div>
                    ) : (
                      <span className="text-[11px] text-slate-400 font-semibold font-mono">
                        TERPROSES
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
