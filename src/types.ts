export type UserRole = 'admin_pusat' | 'admin_daerah' | 'petugas_lapangan';

export type AppModule = 
  | 'early_warning'
  | 'satu_data'
  | 'risk_assessment'
  | 'monev'
  | 'input_lapangan'
  | 'pengaduan'
  | 'persetujuan'
  | 'manajemen_pengguna'
  | 'privasi';

export type ViewMode = 'landing' | 'login' | 'app';

export interface UserProfile {
  name: string;
  role: string;
  roleType: UserRole;
  agency: string;
  region: string;
  avatarUrl?: string;
}

export interface RegionRiskData {
  id: string;
  name: string;
  regency: string;
  province: string;
  coordinates: { x: number; y: number }; // percentage on map canvas
  lat: number; // Real Latitude
  lng: number; // Real Longitude
  status: 'normal' | 'siaga' | 'darurat';
  vulnerabilityIndex: number; // 0 - 10
  rainfall: string; // e.g. "12 mm (Defisit)"
  ricePrice: string; // e.g. "Rp 15.500 (+15%)"
  crisisType: string;
  affectedPopulation: number;
  sensorData: { day: string; inflation: number; drought: number; alertLevel: number }[];
}

export interface SatuDataItem {
  id: string;
  village: string;
  regency: string;
  status: 'Selesai' | 'Diproses' | 'Konflik Data';
  sources: string[];
  completeness: number;
  vulnerableHouseholds: number;
}

export interface FieldQueueItem {
  id: string;
  name: string;
  nik: string;
  familyMembers: number;
  timestamp: string;
  status: 'Pending Sync' | 'Gagal Validasi' | 'Tersinkronisasi';
  villageCode: string;
  condition: string;
}

export interface GrievanceItem {
  id: string;
  timestamp: string;
  category: string;
  village: string;
  status: 'Baru' | 'Diproses' | 'Selesai';
  summary: string;
  senderPhone?: string;
}

export interface ActivationProposal {
  id: string;
  submittedAt: string;
  region: string;
  disasterType: string;
  riskScore: number;
  proposer: string;
  status: 'Menunggu' | 'Disetujui' | 'Ditolak';
}

export interface SystemUser {
  id: string;
  name: string;
  role: string;
  agency: string;
  region: string;
  isActive: boolean;
}

export interface ConsentSetting {
  id: string;
  agencyName: string;
  shortCode: string;
  description: string;
  permissions: ('Read' | 'Write' | 'Aggregate')[];
  enabled: boolean;
  colorBg: string;
}
