import { render, screen, fireEvent } from '@testing-library/react';
import Home from '@/app/page';

// Mock the data
jest.mock('@/data/reports.json', () => [
    {
        id: 'report-1',
        name: 'Daily Financial Report',
        reportingDomain: 'Finance',
        processOwner: 'John Doe',
        team: 'FDM Analytics',
        category: 'Financial Analysis',
        reportingFrequency: 'Daily',
        shortDescription: 'Daily financial metrics and analysis',
        detailedDescription: 'Comprehensive daily financial report',
        sourceTables: ['fin_table1'],
        destinationLink: 'https://example.com/daily',
        accessNeeded: 'Standard',
        lastUpdated: '2024-01-15',
        teamTags: ['Urgent'],
    },
    {
        id: 'report-2',
        name: 'Weekly Operations Report',
        reportingDomain: 'Operations',
        processOwner: 'Jane Smith',
        team: 'Operations Team',
        category: 'Operational Metrics',
        reportingFrequency: 'Weekly',
        shortDescription: 'Weekly operational KPIs',
        detailedDescription: 'Weekly operations analysis',
        sourceTables: ['ops_table1'],
        destinationLink: 'https://example.com/weekly',
        accessNeeded: 'Manager',
        lastUpdated: '2024-01-10',
        teamTags: ['Q1 Goal'],
    },
]);

jest.mock('@/data/config.json', () => ({
    reportingDomains: ['Finance', 'Operations'],
    processOwners: ['John Doe', 'Jane Smith'],
    teams: ['FDM Analytics', 'Operations Team'],
    teamTags: ['Urgent', 'Q1 Goal'],
    reportCategories: ['Financial Analysis', 'Operational Metrics'],
    reportingFrequencies: ['Daily', 'Weekly', 'Monthly'],
}));

// Mock Next.js components
jest.mock('next/link', () => {
    return ({ children, href }: { children: React.ReactNode; href: string }) => {
        return <a href={href}>{children}</a>;
    };
});

describe('Home Page', () => {
    it('should render the page', () => {
        render(<Home />);
        expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    });

    it('should display all reports', () => {
        render(<Home />);

        expect(screen.getByText('Daily Financial Report')).toBeInTheDocument();
        expect(screen.getByText('Weekly Operations Report')).toBeInTheDocument();
    });

    it('should show correct report count', () => {
        render(<Home />);

        expect(screen.getByText(/Found/i)).toBeInTheDocument();
        expect(screen.getByText(/2.*reports/i)).toBeInTheDocument();
    });

    it('should filter reports by search query', () => {
        render(<Home />);

        const searchInput = screen.getByPlaceholderText(/search by report name/i);
        fireEvent.change(searchInput, { target: { value: 'Daily' } });

        expect(screen.getByText('Daily Financial Report')).toBeInTheDocument();
        expect(screen.queryByText('Weekly Operations Report')).not.toBeInTheDocument();
    });

    it('should filter reports by domain', () => {
        render(<Home />);

        // Open domain filter
        const domainButton = screen.getByRole('button', { name: /all reporting domain/i });
        fireEvent.click(domainButton);

        // Select Finance
        const financeCheckbox = screen.getByLabelText('Finance');
        fireEvent.click(financeCheckbox);

        expect(screen.getByText('Daily Financial Report')).toBeInTheDocument();
    });

    it('should filter reports by owner', () => {
        render(<Home />);

        // Open owner filter
        const ownerButton = screen.getByRole('button', { name: /all process owner/i });
        fireEvent.click(ownerButton);

        // Select Jane Smith
        const ownerCheckbox = screen.getByLabelText('Jane Smith');
        fireEvent.click(ownerCheckbox);

        expect(screen.getByText('Weekly Operations Report')).toBeInTheDocument();
    });

    it('should filter reports by team', () => {
        render(<Home />);

        // Open team filter
        const teamButton = screen.getByRole('button', { name: /^All Team$/i });
        fireEvent.click(teamButton);

        // Select FDM Analytics
        const teamCheckbox = screen.getByLabelText('FDM Analytics');
        fireEvent.click(teamCheckbox);

        expect(screen.getByText('Daily Financial Report')).toBeInTheDocument();
    });

    it('should filter reports by frequency', () => {
        render(<Home />);

        // Open frequency filter
        const frequencyButton = screen.getByRole('button', { name: /all reporting frequency/i });
        fireEvent.click(frequencyButton);

        // Select Daily
        const dailyCheckbox = screen.getByLabelText('Daily');
        fireEvent.click(dailyCheckbox);

        expect(screen.getByText('Daily Financial Report')).toBeInTheDocument();
    });

    it('should toggle between gallery and list view', () => {
        render(<Home />);

        const galleryButton = screen.getByTitle('Gallery View');
        const listButton = screen.getByTitle('List View');

        // Should start in gallery mode
        expect(galleryButton).toHaveClass('bg-[#4a90e2]');

        // Switch to list mode
        fireEvent.click(listButton);
        expect(listButton).toHaveClass('bg-[#4a90e2]');
    });

    it('should show no results message when filters return empty', () => {
        render(<Home />);

        const searchInput = screen.getByPlaceholderText(/search by report name/i);
        fireEvent.change(searchInput, { target: { value: 'NonExistentReport' } });

        expect(screen.getByText(/no reports found/i)).toBeInTheDocument();
    });

    it('should reset filters', () => {
        render(<Home />);

        // Open domain filter and select Finance
        const domainButton = screen.getByRole('button', { name: /all reporting domain/i });
        fireEvent.click(domainButton);
        const financeCheckbox = screen.getByLabelText('Finance');
        fireEvent.click(financeCheckbox);

        // Verify only Daily Financial Report is shown
        expect(screen.getByText('Daily Financial Report')).toBeInTheDocument();

        // Reset filters
        const resetButton = screen.getByRole('button', { name: /reset filters/i });
        fireEvent.click(resetButton);

        // Should show both reports again
        expect(screen.getByText('Daily Financial Report')).toBeInTheDocument();
        expect(screen.getByText('Weekly Operations Report')).toBeInTheDocument();
    });

    it('should combine multiple filters', () => {
        render(<Home />);

        // Apply domain filter
        const domainButton = screen.getByRole('button', { name: /all reporting domain/i });
        fireEvent.click(domainButton);
        const financeCheckbox = screen.getByLabelText('Finance');
        fireEvent.click(financeCheckbox);

        // Apply frequency filter
        const frequencyButton = screen.getByRole('button', { name: /all reporting frequency/i });
        fireEvent.click(frequencyButton);
        const dailyCheckbox = screen.getByLabelText('Daily');
        fireEvent.click(dailyCheckbox);

        // Should only show Daily Financial Report
        expect(screen.getByText('Daily Financial Report')).toBeInTheDocument();
        expect(screen.queryByText('Weekly Operations Report')).not.toBeInTheDocument();
    });
});
