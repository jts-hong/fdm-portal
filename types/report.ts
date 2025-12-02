export interface Report {
  id: string;
  name: string;
  reportingDomain: string;
  processOwner: string;
  team: string;
  category: string;
  reportingFrequency: 'Daily' | 'Weekly' | 'Monthly' | 'Quarterly' | 'Annual';
  shortDescription: string;
  detailedDescription: string;
  sourceTables: string[];
  destinationLink: string;
  accessNeeded: string;
  lastUpdated: string;
  businessDays?: number[];
  teamTags?: string[];
}

export interface ProcessOwner {
  name: string;
  email: string;
  eid: string;
  team: string;
  title: string;
  phone: string;
  primaryFocus: string;
}

export type ViewMode = 'gallery' | 'list';

export interface FilterState {
  reportingDomains: string[];
  processOwners: string[];
  teams: string[];
  teamTags: string[];
  reportCategories: string[];
  reportingFrequencies: string[];
  searchQuery: string;
}

