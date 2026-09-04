import React from 'react';
import { AppModule } from '../types';

interface ModuleNarrativeBannerProps {
  currentModule?: AppModule;
  narrativeText?: string;
  previousStepName?: string;
  nextStepName?: string;
  shockBadge?: 'kovariat' | 'idiosinkratik';
  shockCustomNote?: string;
}

export const ModuleNarrativeBanner: React.FC<ModuleNarrativeBannerProps> = () => {
  return null;
};

