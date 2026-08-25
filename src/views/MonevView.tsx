import React, { useState } from 'react';
import {
  BarChart3,
  Clock,
  Coins,
  Target,
  Smile,
  Send,
  CheckCheck,
  Smartphone,
  TrendingDown,
  TrendingUp,
  Sparkles,
  MessageSquare,
  Star,
  Users,
  MousePointerClick,
  ShieldCheck,
} from 'lucide-react';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { MonevMetricModal, MonevMetricType } from '../components/MonevMetricModal';

interface MonevViewProps {}

export const MonevView: React.FC<MonevViewProps> = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Halo Bapak/Ibu Ahmad. Kami dari SIGAP Kemensos RI. Apakah bantuan BLT Adaptif sebesar Rp 600.000 telah Anda terima secara utuh di kantor Pos Cianjur?',
      time: '09:00',
    },
    {
      id: 2,
      sender: 'user',
      text: 'Alhamdulillah sudah saya terima kemarin siang tanpa potongan, terima kasih banyak pak.',
      time: '09:02',
    },
    {
      id: 3,
      sender: 'bot',
      text: 'Bagus sekali. Berikan penilaian bintang 1 - 5 untuk kecepatan dan kemudahan proses pengambilan bantuan:',
      time: '09:02',
    },
  ]);

  const [inputFeedback, setInputFeedback] = useState('5');
  const [ratingScore, setRatingScore] = useState(4.6);
  const [totalSurveys, setTotalSurveys] = useState(8940);
  const [activeMetricModal, setActiveMetricModal] = useState<MonevMetricType | null>(null);

  const handleSendResponse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputFeedback.trim()) return;

    const newMsg = {
      id: messages.length + 1,
      sender: 'user',
      text: inputFeedback.trim(),
      time: 'Baru saja',
    };

    setMessages((prev) => [
      ...prev,
      newMsg,
      {
        id: prev.length + 2,
        sender: 'bot',
        text: 'Terima kasih atas penilaian Anda! Umpan balik Anda langsung terdaftar pada sistem Monev Kemensos untuk perbaikan layanan.',
        time: 'Baru saja',
      },
    ]);

    // increment survey count
    setTotalSurveys((c) => c + 1);
    setInputFeedback('');
  };

  return (
    <div id="monev-module" className="p-6 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600">
          <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
          <span>Modul 04 • Evaluasi Dampak & Kepuasan</span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
          Monitoring & Evaluasi Penyaluran
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Pelacakan efektivitas penyaluran bantuan sosial adaptif dan umpan balik kepuasan penerima manfaat (Klik kartu metrik untuk melihat laporan & audit mendalam)
        </p>
      </div>

      {/* 4 Interactive Metric Cards with Counter Animation & Hover Expand */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Rata-rata Waktu Penyaluran */}
        <div
          id="card-kpi-waktu-penyaluran"
          onClick={() => setActiveMetricModal('waktu_penyaluran')}
          className="bg-white p-4 rounded-xl border border-emerald-200 shadow-xs hover:shadow-xl hover:border-emerald-400 hover:ring-2 hover:ring-emerald-400/30 transform hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer flex items-start justify-between group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-emerald-500/10 to-transparent rounded-bl-full pointer-events-none"></div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-slate-600 group-hover:text-emerald-700 transition-colors">
                Rata-rata Waktu Penyaluran
              </span>
            </div>
            <div className="text-3xl font-extrabold font-mono text-emerald-600 mt-1 flex items-baseline gap-1">
              <AnimatedCounter value={4.2} duration={1200} decimalPlaces={1} />
              <span className="text-xs font-sans font-bold text-slate-500">Hari</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold mt-1">
              <TrendingDown className="w-3 h-3" />
              <span>Turun dari 21 hari (Manual)</span>
            </div>
            <div className="text-[10px] text-slate-400 group-hover:text-emerald-600 font-medium flex items-center gap-1 mt-2 transition-colors">
              <MousePointerClick className="w-3 h-3" />
              <span>Klik timeline T+0 s.d T+4</span>
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-emerald-50 group-hover:bg-emerald-600 group-hover:text-white text-emerald-600 flex items-center justify-center transition-all duration-300 shadow-xs">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        {/* Metric 2: Total Dana Tersalurkan */}
        <div
          id="card-kpi-total-dana"
          onClick={() => setActiveMetricModal('total_dana')}
          className="bg-white p-4 rounded-xl border border-blue-200 shadow-xs hover:shadow-xl hover:border-blue-400 hover:ring-2 hover:ring-blue-400/30 transform hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer flex items-start justify-between group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-bl-full pointer-events-none"></div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-slate-600 group-hover:text-blue-700 transition-colors">
                Total Dana Tersalurkan
              </span>
            </div>
            <div className="text-3xl font-extrabold font-mono text-slate-900 group-hover:text-blue-600 transition-colors mt-1 flex items-baseline gap-1">
              <span className="text-lg font-sans font-bold text-slate-500">Rp</span>
              <AnimatedCounter value={12.4} duration={1200} decimalPlaces={1} />
              <span className="text-xs font-sans font-bold text-slate-500">Triliun</span>
            </div>
            <div className="text-[11px] text-blue-600 font-semibold mt-1">
              Realisasi 92.4% Alokasi Darurat
            </div>
            <div className="text-[10px] text-slate-400 group-hover:text-blue-600 font-medium flex items-center gap-1 mt-2 transition-colors">
              <MousePointerClick className="w-3 h-3" />
              <span>Klik rincian pos bencana</span>
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-blue-50 group-hover:bg-blue-600 group-hover:text-white text-blue-600 flex items-center justify-center transition-all duration-300 shadow-xs">
            <Coins className="w-5 h-5" />
          </div>
        </div>

        {/* Metric 3: Akurasi Sasaran Penerima */}
        <div
          id="card-kpi-akurasi-sasaran"
          onClick={() => setActiveMetricModal('akurasi_sasaran')}
          className="bg-white p-4 rounded-xl border border-indigo-200 shadow-xs hover:shadow-xl hover:border-indigo-400 hover:ring-2 hover:ring-indigo-400/30 transform hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer flex items-start justify-between group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-indigo-500/10 to-transparent rounded-bl-full pointer-events-none"></div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-slate-600 group-hover:text-indigo-700 transition-colors">
                Akurasi Sasaran Penerima
              </span>
            </div>
            <div className="text-3xl font-extrabold font-mono text-indigo-600 mt-1 flex items-baseline gap-1">
              <AnimatedCounter value={94.8} duration={1200} decimalPlaces={1} />
              <span className="text-xs font-sans font-bold text-slate-500">%</span>
            </div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-1">
              Diverifikasi BPKP & NIK Klir
            </div>
            <div className="text-[10px] text-slate-400 group-hover:text-indigo-600 font-medium flex items-center gap-1 mt-2 transition-colors">
              <MousePointerClick className="w-3 h-3" />
              <span>Klik 4 pilar akurasi data</span>
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-indigo-50 group-hover:bg-indigo-600 group-hover:text-white text-indigo-600 flex items-center justify-center transition-all duration-300 shadow-xs">
            <Target className="w-5 h-5" />
          </div>
        </div>

        {/* Metric 4: Skor Kepuasan Warga */}
        <div
          id="card-kpi-skor-kepuasan"
          onClick={() => setActiveMetricModal('kepuasan_warga')}
          className="bg-white p-4 rounded-xl border border-amber-200 shadow-xs hover:shadow-xl hover:border-amber-400 hover:ring-2 hover:ring-amber-400/30 transform hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer flex items-start justify-between group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-amber-500/10 to-transparent rounded-bl-full pointer-events-none"></div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-slate-600 group-hover:text-amber-700 transition-colors">
                Skor Kepuasan Warga
              </span>
            </div>
            <div className="text-3xl font-extrabold font-mono text-amber-500 mt-1 flex items-baseline gap-1">
              <AnimatedCounter value={ratingScore} duration={1200} decimalPlaces={1} />
              <span className="text-xs font-sans font-bold text-slate-500">/ 5.0</span>
              <Star className="w-4 h-4 fill-amber-400 text-amber-400 self-center ml-1" />
            </div>
            <div className="text-[11px] text-slate-500 font-medium mt-1">
              {totalSurveys.toLocaleString('id-ID')} Responden WA/SMS
            </div>
            <div className="text-[10px] text-slate-400 group-hover:text-amber-600 font-medium flex items-center gap-1 mt-2 transition-colors">
              <MousePointerClick className="w-3 h-3" />
              <span>Klik rincian hasil survei</span>
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-amber-50 group-hover:bg-amber-500 group-hover:text-white text-amber-500 flex items-center justify-center transition-all duration-300 shadow-xs">
            <Smile className="w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Comparison & Efficiency Analytics */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Komparasi Efisiensi: Sebelum vs Sesudah SIGAP
            </span>
            <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-bold">
              Efisiensi +78%
            </span>
          </div>

          <div className="space-y-4">
            {/* Process 1 */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800">1. Waktu Identifikasi & Otorisasi Bencana</span>
                <span className="font-mono text-xs font-bold text-emerald-600">4 Jam (vs 7 Hari)</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 flex overflow-hidden">
                <div className="bg-emerald-500 h-2 w-[15%]"></div>
                <div className="bg-rose-300 h-2 w-[85%]"></div>
              </div>
              <div className="flex justify-between text-[10px] text-slate-500 font-medium">
                <span className="text-emerald-700 font-bold">● SIGAP (4 Jam)</span>
                <span className="text-rose-600">● Cara Konvensional (7 Hari)</span>
              </div>
            </div>

            {/* Process 2 */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800">2. Validasi & Rekonsiliasi NIK Penerima</span>
                <span className="font-mono text-xs font-bold text-emerald-600">Real-time (vs 10 Hari)</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 flex overflow-hidden">
                <div className="bg-emerald-500 h-2 w-[10%]"></div>
                <div className="bg-rose-300 h-2 w-[90%]"></div>
              </div>
              <div className="flex justify-between text-[10px] text-slate-500 font-medium">
                <span className="text-emerald-700 font-bold">● SIGAP (Instan Otomatis)</span>
                <span className="text-rose-600">● Manual Berjenjang (10 Hari)</span>
              </div>
            </div>

            {/* Process 3 */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800">3. Pencairan Dana Bantuan ke Pos/Bank</span>
                <span className="font-mono text-xs font-bold text-emerald-600">3 Hari (vs 14 Hari)</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 flex overflow-hidden">
                <div className="bg-emerald-500 h-2 w-[22%]"></div>
                <div className="bg-rose-300 h-2 w-[78%]"></div>
              </div>
              <div className="flex justify-between text-[10px] text-slate-500 font-medium">
                <span className="text-emerald-700 font-bold">● SIGAP (3 Hari)</span>
                <span className="text-rose-600">● SP2D Manual (14 Hari)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Live WhatsApp Survey Simulator */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
          {/* Chat Header */}
          <div className="p-3.5 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white">
                <Smartphone className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold leading-none">SIGAP WhatsApp Bot Survei</p>
                <p className="text-[10px] text-emerald-400 font-mono mt-0.5">Layanan Terverifikasi Kemensos</p>
              </div>
            </div>
            <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
              Live
            </span>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 bg-slate-50 overflow-y-auto space-y-3 min-h-[260px] max-h-[320px]">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${
                  m.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`p-3 rounded-2xl max-w-[85%] text-xs shadow-xs ${
                    m.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
                  }`}
                >
                  <p className="leading-relaxed">{m.text}</p>
                  <div
                    className={`text-[9px] mt-1 text-right flex items-center justify-end gap-1 ${
                      m.sender === 'user' ? 'text-blue-200' : 'text-slate-400'
                    }`}
                  >
                    <span>{m.time}</span>
                    {m.sender === 'user' && <CheckCheck className="w-3 h-3 text-blue-200" />}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <form
            onSubmit={handleSendResponse}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputFeedback}
              onChange={(e) => setInputFeedback(e.target.value)}
              placeholder="Ketik balasan survei / skor 1-5..."
              className="flex-1 p-2 text-xs bg-slate-100 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
            />
            <button
              type="submit"
              className="p-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Monev Metric Modal */}
      <MonevMetricModal
        metricType={activeMetricModal}
        isOpen={!!activeMetricModal}
        onClose={() => setActiveMetricModal(null)}
        ratingScore={ratingScore}
        totalSurveys={totalSurveys}
      />
    </div>
  );
};

