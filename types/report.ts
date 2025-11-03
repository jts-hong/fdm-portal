export interface Report {
  id: string;
  name: string;
  reportingDomain: string;
  processOwner: string;
  reportingFrequency: 'Daily' | 'Weekly' | 'Monthly' | 'Quarterly' | 'Annual';
  shortDescription: string;
  detailedDescription: string;
  features: string[];
  accessInstructions: string;
  contactEmail: string;
  lastUpdated: string;
}

export type ViewMode = 'gallery' | 'list';

export interface FilterState {
  reportingDomains: string[];
  processOwners: string[];
  reportingFrequencies: string[];
  searchQuery: string;
}

