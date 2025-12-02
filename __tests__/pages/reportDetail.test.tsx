import { render, screen, waitFor } from '@testing-library/react';
import ReportDetailPage from '@/app/reports/[id]/page';

// Mock the data - define inline to avoid hoisting issues
jest.mock('@/data/reports.json', () => [{
    id: 'test-report-1',
    name: 'Test Financial Report',
    reportingDomain: 'Finance',
    processOwner: 'John Doe',
    team: 'FDM Analytics',
    category: 'Financial Analysis',
    reportingFrequency: 'Daily',
    shortDescription: 'A test report for financial data analysis',
    detailedDescription: 'This is a detailed description of the test report with comprehensive information.',
    sourceTables: ['fin_table1', 'fin_table2', 'fin_table3'],
    destinationLink: 'https://example.com/report',
    accessNeeded: 'Standard access required',
    lastUpdated: '2024-01-15',
    businessDays: [1, 2, 3],
    teamTags: ['Urgent'],
}]);

jest.mock('@/data/config.json', () => ({
    processOwners: [
        {
            name: 'John Doe',
            email: 'john.doe@example.com',
            eid: 'JD123',
            team: 'FDM Analytics',
            title: 'Senior Analyst',
            phone: '123-456-7890',
            primaryFocus: 'Financial Analysis',
        },
    ],
}));

// Mock Next.js Link
jest.mock('next/link', () => {
    return ({ children, href }: { children: React.ReactNode; href: string }) => {
        return <a href={href}>{children}</a>;
    };
});

describe('Report Detail Page', () => {
    it('should render report details correctly', async () => {
        const params = Promise.resolve({ id: 'test-report-1' });
        const page = await ReportDetailPage({ params });
        const { container } = render(page);

        expect(screen.getByText('Test Financial Report')).toBeInTheDocument();
        expect(screen.getByText(/This is a detailed description/)).toBeInTheDocument();
    });

    it('should display report frequency badge', async () => {
        const params = Promise.resolve({ id: 'test-report-1' });
        const page = await ReportDetailPage({ params });
        render(page);

        expect(screen.getByText('Updated Daily')).toBeInTheDocument();
    });

    it('should display source tables', async () => {
        const params = Promise.resolve({ id: 'test-report-1' });
        const page = await ReportDetailPage({ params });
        render(page);

        expect(screen.getByText('Source Tables')).toBeInTheDocument();
        expect(screen.getByText('fin_table1')).toBeInTheDocument();
        expect(screen.getByText('fin_table2')).toBeInTheDocument();
        expect(screen.getByText('fin_table3')).toBeInTheDocument();
    });

    it('should display report details section', async () => {
        const params = Promise.resolve({ id: 'test-report-1' });
        const page = await ReportDetailPage({ params });
        render(page);

        expect(screen.getByText('Report Details')).toBeInTheDocument();
        expect(screen.getAllByText('Finance').length).toBeGreaterThan(0);
        expect(screen.getAllByText('John Doe').length).toBeGreaterThan(0);
        expect(screen.getAllByText('FDM Analytics').length).toBeGreaterThan(0);
    });

    it('should display process owner details', async () => {
        const params = Promise.resolve({ id: 'test-report-1' });
        const page = await ReportDetailPage({ params });
        render(page);

        expect(screen.getByText('JD123')).toBeInTheDocument();
        expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    });

    it('should display destination link', async () => {
        const params = Promise.resolve({ id: 'test-report-1' });
        const page = await ReportDetailPage({ params });
        render(page);

        expect(screen.getByText('Report Link')).toBeInTheDocument();
        const link = screen.getByRole('link', { name: /https:\/\/example\.com\/report/i });
        expect(link).toHaveAttribute('href', 'https://example.com/report');
        expect(link).toHaveAttribute('target', '_blank');
    });

    it('should display access information', async () => {
        const params = Promise.resolve({ id: 'test-report-1' });
        const page = await ReportDetailPage({ params });
        render(page);

        expect(screen.getByText('Access Needed')).toBeInTheDocument();
        expect(screen.getByText('Standard access required')).toBeInTheDocument();
    });

    it('should have back to all reports link', async () => {
        const params = Promise.resolve({ id: 'test-report-1' });
        const page = await ReportDetailPage({ params });
        render(page);

        const backLinks = screen.getAllByText('Back to All Reports');
        expect(backLinks.length).toBeGreaterThan(0);
        expect(backLinks[0].closest('a')).toHaveAttribute('href', '/');
    });

    it('should display formatted last updated date', async () => {
        const params = Promise.resolve({ id: 'test-report-1' });
        const page = await ReportDetailPage({ params });
        render(page);

        expect(screen.getByText('Last Updated')).toBeInTheDocument();
        // Date formatting may vary, so just check it exists
        expect(screen.getByText(/2024/)).toBeInTheDocument();
    });

    it('should show not found message for invalid report id', async () => {
        const params = Promise.resolve({ id: 'non-existent-report' });
        const page = await ReportDetailPage({ params });
        render(page);

        expect(screen.getByText('Report Not Found')).toBeInTheDocument();
        expect(screen.getByText(/doesn't exist/)).toBeInTheDocument();
    });
});
