import React, { useState, useEffect } from 'react';
import {
  AppModule,
  UserRole,
  ViewMode,
  RegionRiskData,
  SatuDataItem,
  FieldQueueItem,
  GrievanceItem,
  ActivationProposal,
  SystemUser,
  ConsentSetting,
} from './types';
import {
  CURRENT_PROFILES,
  INITIAL_REGIONS,
  INITIAL_SATU_DATA,
  INITIAL_FIELD_QUEUE,
  INITIAL_GRIEVANCES,
  INITIAL_PROPOSALS,
  INITIAL_USERS,
  INITIAL_CONSENTS,
} from './data/mockData';
import { soundEffects } from './utils/soundEffects';

// Component imports
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { EmergencyModal } from './components/EmergencyModal';
import { DataConflictModal } from './components/DataConflictModal';
import { NewFieldEntryModal } from './components/NewFieldEntryModal';
import { AuditLogModal } from './components/AuditLogModal';
import { ResilienceJourneyTracker, JourneyStage } from './components/ResilienceJourneyTracker';

// View imports
import { LandingView } from './views/LandingView';
import { LoginView } from './views/LoginView';
import { EarlyWarningView } from './views/EarlyWarningView';
import { SatuDataView } from './views/SatuDataView';
import { RiskAssessmentView } from './views/RiskAssessmentView';
import { ContingencyFinancingView } from './views/ContingencyFinancingView';
import { ConvergeVulnerabilityMapView } from './views/ConvergeVulnerabilityMapView';
import { ConvergeSupplySideView } from './views/ConvergeSupplySideView';
import { RiseInclusionTrackerView } from './views/RiseInclusionTrackerView';
import { RiseGraduationScorecardView } from './views/RiseGraduationScorecardView';
import { MonevView } from './views/MonevView';
import { InputLapanganView } from './views/InputLapanganView';
import { PengaduanView } from './views/PengaduanView';
import { PersetujuanView } from './views/PersetujuanView';
import { ManajemenPenggunaView } from './views/ManajemenPenggunaView';
import { PrivasiView } from './views/PrivasiView';

export default function App() {
  // Navigation & Role State
  const [viewMode, setViewMode] = useState<ViewMode>('login');
  const [currentModule, setCurrentModule] = useState<AppModule>('early_warning');
  const [currentRole, setCurrentRole] = useState<UserRole>('admin_pusat');

  // Application Data States
  const [regions, setRegions] = useState<RegionRiskData[]>(INITIAL_REGIONS);
  const [selectedRegion, setSelectedRegion] = useState<RegionRiskData>(INITIAL_REGIONS[0]);
  const [satuData, setSatuData] = useState<SatuDataItem[]>(INITIAL_SATU_DATA);
  const [fieldQueue, setFieldQueue] = useState<FieldQueueItem[]>(INITIAL_FIELD_QUEUE);
  const [grievances, setGrievances] = useState<GrievanceItem[]>(INITIAL_GRIEVANCES);
  const [proposals, setProposals] = useState<ActivationProposal[]>(INITIAL_PROPOSALS);
  const [users, setUsers] = useState<SystemUser[]>(INITIAL_USERS);
  const [consents, setConsents] = useState<ConsentSetting[]>(INITIAL_CONSENTS);

  // Modal States
  const [emergencyModalOpen, setEmergencyModalOpen] = useState(false);
  const [conflictModalOpen, setConflictModalOpen] = useState(false);
  const [selectedConflictItem, setSelectedConflictItem] = useState<SatuDataItem | null>(null);
  const [newFieldModalOpen, setNewFieldModalOpen] = useState(false);
  const [auditLogModalOpen, setAuditLogModalOpen] = useState(false);

  // Profile data for active role
  const activeProfile = CURRENT_PROFILES[currentRole] || CURRENT_PROFILES.admin_pusat;

  // Initialize global click sound effect
  useEffect(() => {
    soundEffects.initGlobalClickListener();
  }, []);

  // Handlers for Early Warning & Emergency
  const handleOpenEmergencyAction = (region: RegionRiskData) => {
    setSelectedRegion(region);
    setEmergencyModalOpen(true);
  };

  const handleDispatchEmergencyAction = (details: {
    packageType: string;
    recipientQuota: number;
    notes: string;
    actionType: 'pusat_authorization' | 'daerah_activation';
    documentNumber: string;
    budgetEstimate: number;
    targetDesils: string;
    emergencyPersonnelCount?: number;
  }) => {
    // Automatically generate a new proposal in Persetujuan module
    const isPusat = details.actionType === 'pusat_authorization';
    const newProposal: ActivationProposal = {
      id: details.documentNumber || `ACT-2026-EMG-${Math.floor(100 + Math.random() * 900)}`,
      submittedAt: 'Hari ini, Baru saja',
      region: `${selectedRegion.name}, ${selectedRegion.regency}`,
      disasterType: `${selectedRegion.crisisType} (${details.packageType})`,
      riskScore: Math.min(120, Math.round(selectedRegion.vulnerabilityIndex * 12)),
      proposer: `${activeProfile.name} (${activeProfile.agency})`,
      status: isPusat ? 'Disetujui' : 'Menunggu',
      decisionType: isPusat ? 'Otorisasi DSP Nasional (Tingkat Pusat)' : 'Aktivasi Kedaruratan Wilayah (Tingkat Daerah)',
      approver: isPusat ? 'Menteri Sosial RI & BNPB' : 'Menunggu Verifikasi Kemensos RI',
      confidenceScore: '94%',
    };
    setProposals((prev) => [newProposal, ...prev]);
  };

  // Handlers for Satu Data
  const handleOpenConflictModal = (item: SatuDataItem) => {
    setSelectedConflictItem(item);
    setConflictModalOpen(true);
  };

  const handleResolveConflict = (resolvedItem: SatuDataItem) => {
    setSatuData((prev) =>
      prev.map((item) => (item.id === resolvedItem.id ? resolvedItem : item))
    );
  };

  const handleRefreshSatuData = () => {
    // Refresh simulation
    setSatuData((prev) =>
      prev.map((item) => ({
        ...item,
        completeness: Math.min(100, item.completeness + 1.2),
      }))
    );
  };

  // Handlers for Risk Assessment proposal forward
  const handleForwardProposal = (newProposal: ActivationProposal) => {
    setProposals((prev) => [newProposal, ...prev]);
  };

  // Handlers for Offline Field Input
  const handleAddNewFieldEntry = (entry: Omit<FieldQueueItem, 'id' | 'timestamp' | 'status'>) => {
    const newItem: FieldQueueItem = {
      ...entry,
      id: `fq-${Date.now().toString().slice(-4)}`,
      timestamp: 'Hari ini, Baru saja',
      status: 'Pending Sync',
    };
    setFieldQueue((prev) => [newItem, ...prev]);
  };

  const handleSyncAllFieldQueue = () => {
    setFieldQueue((prev) =>
      prev.map((item) => ({
        ...item,
        status: 'Tersinkronisasi',
      }))
    );
  };

  const handleDeleteFieldQueueItem = (id: string) => {
    setFieldQueue((prev) => prev.filter((item) => item.id !== id));
  };

  // Handlers for Grievances
  const handleAddGrievance = (g: Omit<GrievanceItem, 'id' | 'timestamp' | 'status'>) => {
    const newItem: GrievanceItem = {
      ...g,
      id: `#PGD-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: 'Hari ini, Baru saja',
      status: 'Baru',
    };
    setGrievances((prev) => [newItem, ...prev]);
  };

  const handleUpdateGrievanceStatus = (id: string, status: 'Baru' | 'Diproses' | 'Selesai') => {
    setGrievances((prev) =>
      prev.map((g) => (g.id === id ? { ...g, status } : g))
    );
  };

  // Handlers for Approvals
  const handleApproveProposal = (id: string) => {
    setProposals((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: 'Disetujui' } : p))
    );
  };

  const handleRejectProposal = (id: string) => {
    setProposals((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: 'Ditolak' } : p))
    );
  };

  // Handlers for User Management
  const handleAddUser = (userData: Omit<SystemUser, 'id'>) => {
    const newUser: SystemUser = {
      ...userData,
      id: `usr-${Date.now().toString().slice(-4)}`,
    };
    setUsers((prev) => [...prev, newUser]);
  };

  const handleToggleUserStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, isActive: !u.isActive } : u))
    );
  };

  // Handlers for Privacy & Consent
  const handleToggleConsent = (id: string) => {
    setConsents((prev) =>
      prev.map((c) => (c.id === id ? { ...c, enabled: !c.enabled } : c))
    );
  };

  // Switch role handler
  const handleRoleChange = (role: UserRole) => {
    setCurrentRole(role);
    // If switching to role with restricted modules, switch module gracefully
    if (role === 'petugas_lapangan' && ['risk_assessment', 'monev', 'persetujuan', 'manajemen_pengguna', 'privasi'].includes(currentModule)) {
      setCurrentModule('input_lapangan');
    }
  };

  // If in Landing Mode
  if (viewMode === 'landing') {
    return (
      <LandingView
        onLoginClick={() => setViewMode('login')}
        onEnterDashboard={() => setViewMode('app')}
      />
    );
  }

  // If in Login Mode
  if (viewMode === 'login') {
    return (
      <LoginView
        onLoginSuccess={(role) => {
          setCurrentRole(role);
          setViewMode('app');
        }}
        onBackToLanding={() => setViewMode('landing')}
      />
    );
  }

  // Render App Dashboard Layout
  return (
    <div id="sigap-app-root" className="flex h-screen w-screen overflow-hidden bg-[#F8FAFC]">
      {/* Sidebar Navigation */}
      <Sidebar
        currentModule={currentModule}
        onSelectModule={setCurrentModule}
        currentRole={currentRole}
        onChangeRole={handleRoleChange}
        userProfile={activeProfile}
        onLogout={() => setViewMode('login')}
        onGoToLanding={() => setViewMode('landing')}
        pendingApprovalsCount={proposals.filter((p) => p.status === 'Menunggu').length}
        pendingSyncCount={fieldQueue.filter((f) => f.status === 'Pending Sync').length}
        newGrievancesCount={grievances.filter((g) => g.status === 'Baru').length}
      />

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Header */}
        <Header
          userProfile={activeProfile}
          currentModule={currentModule}
          onSelectModule={setCurrentModule}
          onGoToLanding={() => setViewMode('landing')}
          onLogout={() => setViewMode('login')}
          onOpenAuditLog={() => setAuditLogModalOpen(true)}
          regions={regions}
          satuData={satuData}
          fieldQueue={fieldQueue}
          grievances={grievances}
          proposals={proposals}
          onSelectRegion={setSelectedRegion}
        />

        {/* Scrollable View Content */}
        <main className="flex-1 overflow-y-auto bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-6 pt-6">
            {/* Top Resilience Journey Tracker */}
            <ResilienceJourneyTracker
              currentModule={currentModule}
              onNavigateStage={(stage: JourneyStage) => {
                if (stage === 'shield') setCurrentModule('early_warning');
                else if (stage === 'converge') setCurrentModule('converge_vulnerability_map');
                else if (stage === 'rise') setCurrentModule('rise_inclusion_tracker');
                else if (stage === 'governance') setCurrentModule('monev');
              }}
            />
          </div>

          <div className="max-w-7xl mx-auto pb-12">
            {currentModule === 'early_warning' && (
              <EarlyWarningView
                regions={regions}
                selectedRegion={selectedRegion}
                onSelectRegion={setSelectedRegion}
                onOpenEmergencyAction={handleOpenEmergencyAction}
              />
            )}

            {currentModule === 'satu_data' && (
              <SatuDataView
                dataList={satuData}
                onOpenConflictModal={handleOpenConflictModal}
                onRefreshData={handleRefreshSatuData}
                currentRole={currentRole}
                activeProfile={activeProfile}
                onNavigate={(module) => setCurrentModule(module)}
              />
            )}

            {currentModule === 'risk_assessment' && (
              <RiskAssessmentView
                onForwardToApproval={handleForwardProposal}
                currentRole={currentRole}
                activeProfile={activeProfile}
                regions={regions}
              />
            )}

            {currentModule === 'contingency_financing' && (
              <ContingencyFinancingView
                currentRole={currentRole}
                activeProfile={activeProfile}
              />
            )}

            {currentModule === 'converge_vulnerability_map' && (
              <ConvergeVulnerabilityMapView
                currentRole={currentRole}
                activeProfile={activeProfile}
              />
            )}

            {currentModule === 'converge_supply_side' && (
              <ConvergeSupplySideView
                currentRole={currentRole}
                activeProfile={activeProfile}
              />
            )}

            {currentModule === 'rise_inclusion_tracker' && (
              <RiseInclusionTrackerView
                currentRole={currentRole}
                activeProfile={activeProfile}
              />
            )}

            {currentModule === 'rise_graduation_scorecard' && (
              <RiseGraduationScorecardView
                currentRole={currentRole}
                activeProfile={activeProfile}
              />
            )}

            {currentModule === 'monev' && (
              <MonevView
                proposals={proposals}
                currentRole={currentRole}
                activeProfile={activeProfile}
              />
            )}

            {currentModule === 'input_lapangan' && (
              <InputLapanganView
                queue={fieldQueue}
                onAddNewEntry={handleAddNewFieldEntry}
                onSyncAll={handleSyncAllFieldQueue}
                onDeleteEntry={handleDeleteFieldQueueItem}
                onOpenNewEntryModal={() => setNewFieldModalOpen(true)}
              />
            )}

            {currentModule === 'pengaduan' && (
              <PengaduanView
                grievances={grievances}
                onAddGrievance={handleAddGrievance}
                onUpdateStatus={handleUpdateGrievanceStatus}
              />
            )}

            {currentModule === 'persetujuan' && (
              <PersetujuanView
                proposals={proposals}
                onApprove={handleApproveProposal}
                onReject={handleRejectProposal}
              />
            )}

            {currentModule === 'manajemen_pengguna' && (
              <ManajemenPenggunaView
                users={users}
                onAddUser={handleAddUser}
                onToggleUserStatus={handleToggleUserStatus}
              />
            )}

            {currentModule === 'privasi' && (
              <PrivasiView
                consents={consents}
                onToggleConsent={handleToggleConsent}
                onOpenAuditLog={() => setAuditLogModalOpen(true)}
              />
            )}
          </div>
        </main>
      </div>

      {/* Global Interactive Modals */}
      <EmergencyModal
        region={selectedRegion}
        allRegions={regions}
        onSelectRegion={(reg) => setSelectedRegion(reg)}
        isOpen={emergencyModalOpen}
        onClose={() => setEmergencyModalOpen(false)}
        onDispatchAction={handleDispatchEmergencyAction}
        currentRole={currentRole}
        activeProfile={activeProfile}
      />

      <DataConflictModal
        item={selectedConflictItem}
        isOpen={conflictModalOpen}
        onClose={() => setConflictModalOpen(false)}
        onResolve={handleResolveConflict}
      />

      <NewFieldEntryModal
        isOpen={newFieldModalOpen}
        onClose={() => setNewFieldModalOpen(false)}
        onSubmit={handleAddNewFieldEntry}
      />

      <AuditLogModal
        isOpen={auditLogModalOpen}
        onClose={() => setAuditLogModalOpen(false)}
      />
    </div>
  );
}
