import { Report } from '@/types/report';

export const mockReport: Report = {
    id: 'test-report-1',
    name: 'Test Financial Report',
    reportingDomain: 'Finance',
    processOwner: 'John Doe',
    team: 'FDM Analytics',
    category: 'Financial Analysis',
    reportingFrequency: 'Daily',
    shortDescription: 'A test report for financial data analysis',
    detailedDescription: 'This is a detailed description of the test report with comprehensive information about data sources and methodology.',
    sourceTables: ['table1', 'table2', 'table3'],
    destinationLink: 'https://example.com/report',
    accessNeeded: 'Standard access required',
    lastUpdated: '2024-01-15',
    businessDays: [1, 2, 3, 4, 5],
    teamTags: ['Urgent', 'Review Required'],
};

export const mockReports: Report[] = [
    mockReport,
    {
        id: 'test-report-2',
        name: 'Weekly Operations Report',
        reportingDomain: 'Operations',
        processOwner: 'Jane Smith',
        team: 'Operations Team',
        category: 'Operational Metrics',
        reportingFrequency: 'Weekly',
        shortDescription: 'Weekly operational metrics and KPIs',
        detailedDescription: 'Comprehensive weekly report on operational performance.',
        sourceTables: ['ops_table1', 'ops_table2'],
        destinationLink: 'https://example.com/ops-report',
        accessNeeded: 'Manager access',
        lastUpdated: '2024-01-10',
        teamTags: ['Q1 Goal'],
    },
    {
        id: 'test-report-3',
        name: 'Monthly Revenue Analysis',
        reportingDomain: 'Finance',
        processOwner: 'Bob Johnson',
        team: 'Revenue Analytics',
        category: 'Revenue',
        reportingFrequency: 'Monthly',
        shortDescription: 'Monthly revenue breakdown and trends',
        detailedDescription: 'Detailed monthly analysis of revenue streams.',
        sourceTables: ['revenue_data'],
        destinationLink: 'https://example.com/revenue',
        accessNeeded: 'Executive access',
        lastUpdated: '2024-01-01',
        teamTags: ['Internal Only'],
    },
];

export const mockConfigData = {
    reportingDomains: ['Finance', 'Operations', 'Risk'],
    processOwners: ['John Doe', 'Jane Smith', 'Bob Johnson'],
    teams: ['FDM Analytics', 'Operations Team', 'Revenue Analytics'],
    teamTags: ['Urgent', 'Review Required', 'Q1 Goal', 'Internal Only'],
    reportCategories: ['Financial Analysis', 'Operational Metrics', 'Revenue'],
    reportingFrequencies: ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Annual'],
};
