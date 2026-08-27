import React from 'react';
import {
  X,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Building2,
  Users,
  Database,
  ArrowRight,
  AlertTriangle,
  FileCheck,
  Cpu,
  Layers,
  Sparkles,
  Search,
} from 'lucide-react';

export interface StageInfo {
  stepNumber: number;
  title: string;
  shortDesc: string;
  status: string;
  metricLabel: string;
  metricValue: string;
  metricSub: string;
  leadAgency: string;
  slaTime: string;
  regulationBasis: string;
  objective: string;
  validationChecklist: { title: string; desc: string; passed: boolean }[];
  processFlow: { step: string; actor: string; desc: string }[];
  liveStatistics: { label: string; value: string; color: string }[];
}

export const STAGES_DATA: Record<number, StageInfo> = {
  1: {
    stepNumber: 1,
    title: 'Registrasi Lapangan & Asesmen Cepat',
    shortDesc: 'Pengumpulan data primer korban dan keluarga rentan di titik kumpul/posko darurat melalui aplikasi mobile offline-first.',
    status: 'Aktif Berjalan',
    metricLabel: 'Total Data Masuk',
    metricValue: '15.755 KK',
    metricSub: 'Dari 18 posko terpadu bencana',
    leadAgency: 'Relawan Tagana Kemensos & BPBD Lapangan',
    slaTime: '< 6 Jam Pasca Kejadian Bencana',
    regulationBasis: 'Permensos No. 3/2021 & Juknis Asesmen Cepat Bencana',
    objective: 'Merekam profil kependudukan awal, kondisi fisik tempat tinggal, kebutuhan desakan logistik, dan data geospasial lokasi terdampak.',
    validationChecklist: [
      { title: 'Geotagging Presisi (< 10 meter)', desc: 'Validasi koordinat GPS lokasi riil tempat tinggal/pengungsian.', passed: true },
      { title: 'Foto Bukti Kerusakan Fisik Hunian', desc: 'Verifikasi visual kondisi rumah rusak berat, sedang, atau ringan.', passed: true },
      { title: 'Perekaman NIK & Nomor KK Awal', desc: 'Input identitas kependudukan manual atau OCR scan e-KTP.', passed: true },
      { title: 'Penandaan Anggota Keluarga Rentan', desc: 'Identifikasi lansia, balita, disabilitas, dan ibu hamil.', passed: true },
    ],
    processFlow: [
      { step: '01. Perekaman Mobile', actor: 'Petugas Tagana Lapangan', desc: 'Input formulir asesmen kaji cepat di zona bencana via aplikasi Android offline.' },
      { step: '02. Sinkronisasi Posko', actor: 'Operator Komando Darurat', desc: 'Unggah antrean data saat perangkat terhubung ke satelit/BTS darurat.' },
      { step: '03. Penerbitan ID Registrasi', actor: 'Engine SIGAP Pusat', desc: 'Pemberian token digital unik per keluarga untuk pelacakan bansos darurat.' },
    ],
    liveStatistics: [
      { label: 'Data Baru Hari Ini', value: '+428 KK', color: 'text-blue-600' },
      { label: 'Posko Aktif', value: '18 Titik', color: 'text-indigo-600' },
      { label: 'Akurasi Geotagging', value: '98.4%', color: 'text-emerald-600' },
      { label: 'Waktu Rata-rata Input', value: '2.8 Menit/KK', color: 'text-slate-800' },
    ],
  },
  2: {
    stepNumber: 2,
    title: 'Pencocokan & Deduplikasi Data (Cleansing)',
    shortDesc: 'Pembersihan data otomatis dan verifikasi padan NIK dengan Dukcapil Kemendagri, DTKS Kemensos, dan Registrasi Sosial Ekonomi (Regsosek).',
    status: 'Tingkat Keberhasilan Tinggi (89.2%)',
    metricLabel: 'Data Lolos Kliring NIK',
    metricValue: '14.053 KK (89.2%)',
    metricSub: '1.702 KK memerlukan verifikasi anomali',
    leadAgency: 'Pusdatin Kesos Kemensos & Ditjen Dukcapil',
    slaTime: '< 15 Menit (Automated Batch Matching)',
    regulationBasis: 'Perpres Satu Data Indonesia No. 39/2019 & UU PDP No. 27/2022',
    objective: 'Mencegah duplikasi data bantuan ganda, memvalidasi NIK aktif kependudukan, serta mencocokkan status desil kerentanan ekonomi historis.',
    validationChecklist: [
      { title: 'Validitas Algoritma Luhn NIK Dukcapil', desc: 'Pengecekan keabsahan format 16 digit NIK resmi nasional.', passed: true },
      { title: 'Pemeriksaan Bansos Ganda Aktif', desc: 'Mencegah overlap bantuan darurat dengan kuota reguler PKH/BPNT yang sedang berjalan.', passed: true },
      { title: 'Normalisasi Ejaan & Alamat Domisili', desc: 'Standardisasi data desa/kelurahan sesuai kode wilayah Kemendagri.', passed: true },
      { title: 'Resolusi Anomali Data Konflik', desc: 'Pemetaan data tidak padan ke meja kerja rekonsiliasi operator dinas sosial.', passed: false },
    ],
    processFlow: [
      { step: '01. Algoritma Fuzzy Matching', actor: 'Data Cleansing Worker', desc: 'Pencocokan nama, tanggal lahir, dan NIK dengan margin error toleransi rendah.' },
      { step: '02. API Lookup Dukcapil', actor: 'Secure Gateway Kemendagri', desc: 'Verifikasi status keaktifan warga dan keaslian nomor kartu keluarga.' },
      { step: '03. Cross-check DTKS & Regsosek', actor: 'Pusdatin Kesos', desc: 'Sinkronisasi tingkat desil 1-4 untuk penentuan paket bantuan adaptif.' },
    ],
    liveStatistics: [
      { label: 'Tingkat Klir NIK', value: '89.2%', color: 'text-indigo-600' },
      { label: 'Duplikasi Tercegah', value: '312 Kasus', color: 'text-amber-600' },
      { label: 'Konflik Membutuhkan Review', value: '1.702 KK', color: 'text-rose-600' },
      { label: 'Kecepatan Proses API', value: '1.200 Record/Detik', color: 'text-emerald-600' },
    ],
  },
  3: {
    stepNumber: 3,
    title: 'Integrasi Profil Terbuka & Penetapan Bantuan',
    shortDesc: 'Penyusunan profil komprehensif penerima manfaat yang siap dieksekusi untuk penyaluran bantuan tunai darurat (Cash Transfer) dan sembako.',
    status: 'Siap Penyaluran',
    metricLabel: 'Profil Siap Salur',
    metricValue: '13.210 KK',
    metricSub: 'Alokasi paket bantuan tervalidasi',
    leadAgency: 'Direktorat Jaminan Sosial Kemensos & Bank Himbara/Pos',
    slaTime: '< 24 Jam Penetapan SK Penerima',
    regulationBasis: 'Keputusan Bersama Mensos & Kepala BNPB tentang Perlindungan Sosial Adaptif',
    objective: 'Menggabungkan skor kerentanan guncangan bencana dengan profil ekonomi keluarga untuk menentukan besaran nominal dan kanal salur paling efisien.',
    validationChecklist: [
      { title: 'Penetapan Skor Prioritas Desil (1-4)', desc: 'Prioritas tertinggi diberikan kepada keluarga rentan miskin ekstrem dan terdampak berat.', passed: true },
      { title: 'Validasi Rekening Himbara / PT Pos', desc: 'Kesiapan nomor rekening kartu KKS aktif atau kode e-Voucher penarikan tunai.', passed: true },
      { title: 'Paket Tambahan Nutrisi Balita & Lansia', desc: 'Auto-bundling bantuan spesifik untuk pemenuhan gizi kelompok prioritas tinggi.', passed: true },
      { title: 'Digital Signature Pejabat Pembuat Komitmen', desc: 'Penerbitan daftar nominatif (BNBA) terenkripsi resmi kedinasan.', passed: true },
    ],
    processFlow: [
      { step: '01. Scoring Adaptif SIGAP', actor: 'Automated Scoring Engine', desc: 'Kalkulasi kebutuhan alokasi dana berdasarkan magnitudo bencana dan desil.' },
      { step: '02. Penerbitan BNBA', actor: 'Direktorat Perlindungan Sosial', desc: 'Pembuatan daftar By Name By Address resmi ber-SK.' },
      { step: '03. Transmisi ke Mitra Bayar', actor: 'Bank Himbara & PT Pos Indonesia', desc: 'Pengiriman batch disbursement file untuk top-up rekening / voucher tunai.' },
    ],
    liveStatistics: [
      { label: 'KK Siap Salur', value: '13.210 KK', color: 'text-slate-900' },
      { label: 'Total Estimasi Anggaran', value: 'Rp 39.63 Miliar', color: 'text-emerald-600' },
      { label: 'Kanal Salur KKS/Bank', value: '68.5%', color: 'text-blue-600' },
      { label: 'Kanal Salur PT Pos (Tunai)', value: '31.5%', color: 'text-amber-600' },
    ],
  },
  4: {
    stepNumber: 4,
    title: 'Audit, Rekonsiliasi & Pelaporan Terpadu',
    shortDesc: 'Pengawasan akuntabilitas keuangan negara, rekonsiliasi penyaluran real-time, dan audit kepatuhan ISO 27001 serta BPK/BPKP.',
    status: 'Akuntabilitas 100%',
    metricLabel: 'Kepatuhan Regulasi',
    metricValue: '100% Sesuai SOP',
    metricSub: 'Zero-tolerance penyimpangan anggaran',
    leadAgency: 'Inspektorat Jenderal Kemensos, BPK, & BPKP',
    slaTime: 'Real-time Continuous Auditing',
    regulationBasis: 'Standar Akuntansi Pemerintah & UU Keuangan Negara No. 17/2003',
    objective: 'Memastikan setiap rupiah bantuan sosial adaptif terdistribusi tepat sasaran, tepat jumlah, tepat waktu, dengan jejak digital tak terhapuskan.',
    validationChecklist: [
      { title: 'Log Audit Timestamp & Operator Hashing', desc: 'Setiap aksi verifikasi tercatat dengan hash kriptografi SHA-256.', passed: true },
      { title: 'Rekonsiliasi Sukses Transaksi Bank 100%', desc: 'Pencocokan laporan sukses debet bank penyalur dengan penerimaan di tangan warga.', passed: true },
      { title: 'Tindak Lanjut Saluran Whistleblowing', desc: 'Integrasi dengan modul WBS untuk koreksi data dan investigasi anomali.', passed: true },
      { title: 'Ekspor Dokumen Laporan Siap Audit BPK', desc: 'Format laporan terstandarisasi siap unduh dalam bentuk tabular dan analitik visual.', passed: true },
    ],
    processFlow: [
      { step: '01. Telemetri Transaksi', actor: 'Payment Gateway Sentinel', desc: 'Monitoring status penarikan dana di agen bank atau gerai pos terdekat.' },
      { step: '02. Rekonsiliasi Otomatis', actor: 'Sistem Akuntansi Terpadu', desc: 'Verifikasi saldo tersalurkan vs saldo sisa untuk pengembalian ke kas negara jika ada gagal salur.' },
      { step: '03. Penutupan Kasus & Arsip Negara', actor: 'Auditor Itjen Kemensos', desc: 'Pemberian cap digital Laporan Pertanggungjawaban (LPJ) terverifikasi.' },
    ],
    liveStatistics: [
      { label: 'Tingkat Realisasi', value: '98.7%', color: 'text-emerald-600' },
      { label: 'Jejak Log Audit Tercatat', value: '142.850 Event', color: 'text-indigo-600' },
      { label: 'Retur Gagal Salur', value: '0.4% (Terkendali)', color: 'text-slate-800' },
      { label: 'Status Kepatuhan BPK', value: 'WTP Terpenuhi', color: 'text-emerald-600' },
    ],
  },
};

interface StageDetailModalProps {
  stepNumber: number | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectStep: (stepNumber: number) => void;
}

export const StageDetailModal: React.FC<StageDetailModalProps> = ({
  stepNumber,
  isOpen,
  onClose,
  onSelectStep,
}) => {
  if (!isOpen || !stepNumber || !STAGES_DATA[stepNumber]) return null;

  const stage = STAGES_DATA[stepNumber];

  const getStepBadgeColor = (num: number) => {
    switch (num) {
      case 1:
        return 'from-blue-600 to-indigo-600 text-blue-100';
      case 2:
        return 'from-indigo-600 to-violet-600 text-indigo-100';
      case 3:
        return 'from-amber-500 to-rose-600 text-amber-100';
      case 4:
        return 'from-emerald-600 to-teal-600 text-emerald-100';
      default:
        return 'from-slate-700 to-slate-900 text-white';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-3xl w-full overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className={`p-5 bg-gradient-to-r ${getStepBadgeColor(stage.stepNumber)} text-white flex items-start justify-between relative`}>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center text-white font-mono text-xl font-extrabold shadow-inner shrink-0">
              0{stage.stepNumber}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-white/20 text-white border border-white/30">
                  Tahap 0{stage.stepNumber} dari 04
                </span>
                <span className="text-[11px] font-semibold text-white/90">
                  • {stage.status}
                </span>
              </div>
              <h3 className="text-xl font-extrabold tracking-tight mt-1 text-white">
                {stage.title}
              </h3>
              <p className="text-xs text-white/80 mt-1 max-w-xl leading-relaxed">
                {stage.shortDesc}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Navigation Tabs */}
        <div className="px-5 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-2 overflow-x-auto">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider shrink-0">
            Pindah Tahap:
          </span>
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4].map((num) => (
              <button
                key={num}
                onClick={() => onSelectStep(num)}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                  stage.stepNumber === num
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                <span>Tahap 0{num}</span>
                {stage.stepNumber === num && <Sparkles className="w-3 h-3 text-amber-300" />}
              </button>
            ))}
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Key Parameters Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-semibold">
                <Building2 className="w-3.5 h-3.5 text-indigo-600" />
                <span>Instansi Penanggung Jawab</span>
              </div>
              <p className="text-xs font-bold text-slate-900 mt-1">
                {stage.leadAgency}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-semibold">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                <span>Standar Waktu Proses (SLA)</span>
              </div>
              <p className="text-xs font-bold text-slate-900 mt-1">
                {stage.slaTime}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Landasan Regulasi</span>
              </div>
              <p className="text-xs font-bold text-slate-900 mt-1 truncate" title={stage.regulationBasis}>
                {stage.regulationBasis}
              </p>
            </div>
          </div>

          {/* Live Metrics Grid */}
          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-indigo-600" />
              <span>Metrik Kinerja & Volume Terkini</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {stage.liveStatistics.map((stat, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs">
                  <span className="text-[10px] text-slate-500 font-medium block">
                    {stat.label}
                  </span>
                  <span className={`text-base font-extrabold font-mono mt-0.5 block ${stat.color}`}>
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quality Gates / Validation Checklist */}
          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Kriteria Kualitas Data (Quality Gates)</span>
            </h4>
            <div className="space-y-2">
              {stage.validationChecklist.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3"
                >
                  <div className={`p-1 rounded-lg shrink-0 mt-0.5 ${item.passed ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">{item.title}</h5>
                    <p className="text-[11px] text-slate-600 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Process Workflow */}
          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-blue-600" />
              <span>Alur Pemrosesan Berjenjang</span>
            </h4>
            <div className="space-y-2.5">
              {stage.processFlow.map((flow, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <div>
                      <div className="text-xs font-bold text-slate-900">{flow.step}</div>
                      <div className="text-[11px] text-slate-500">{flow.desc}</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-md border border-indigo-100 self-start sm:self-auto shrink-0">
                    Aktor: {flow.actor}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            Sistem Satu Data Terpadu SIGAP v2.4 • Otomasi Perlindungan Sosial
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors shadow-xs"
          >
            Tutup Informasi
          </button>
        </div>
      </div>
    </div>
  );
};
