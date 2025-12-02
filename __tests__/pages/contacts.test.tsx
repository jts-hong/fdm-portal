import { render, screen, fireEvent } from '@testing-library/react';
import ContactsPage from '@/app/contacts/page';

// Mock config data
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
        {
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            eid: 'JS456',
            team: 'Operations Team',
            title: 'Operations Manager',
            phone: '123-456-7891',
            primaryFocus: 'Operations',
        },
        {
            name: 'Bob Johnson',
            email: 'bob.johnson@example.com',
            eid: 'BJ789',
            team: 'FDM Analytics',
            title: 'Data Analyst',
            phone: '123-456-7892',
            primaryFocus: 'Data Analysis',
        },
    ],
}));

describe('Contacts Page', () => {
    it('should render the page title', () => {
        render(<ContactsPage />);

        expect(screen.getByRole('heading', { name: /contacts/i, level: 1 })).toBeInTheDocument();
    });

    it('should render general inquiries section', () => {
        render(<ContactsPage />);

        expect(screen.getByText('General Inquiries')).toBeInTheDocument();
        expect(screen.getByText('fdm-team@company.com')).toBeInTheDocument();
    });

    it('should display all process owners', () => {
        render(<ContactsPage />);

        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('Jane Smith')).toBeInTheDocument();
        expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
    });

    it('should display owner details', () => {
        render(<ContactsPage />);

        expect(screen.getByText('JD123')).toBeInTheDocument();
        expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
        expect(screen.getByText('Senior Analyst')).toBeInTheDocument();
    });

    it('should filter contacts by search query', () => {
        render(<ContactsPage />);

        const searchInput = screen.getByPlaceholderText(/search by name, title, or email/i);
        fireEvent.change(searchInput, { target: { value: 'John' } });

        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
    });

    it('should filter contacts by team', () => {
        render(<ContactsPage />);

        const teamSelect = screen.getByRole('combobox');
        fireEvent.change(teamSelect, { target: { value: 'Operations Team' } });

        expect(screen.getByText('Jane Smith')).toBeInTheDocument();
        expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    });

    it('should show all teams in team filter', () => {
        render(<ContactsPage />);

        const teamSelect = screen.getByRole('combobox');

        expect(screen.getByRole('option', { name: 'All Teams' })).toBeInTheDocument();
        expect(screen.getByRole('option', { name: 'FDM Analytics' })).toBeInTheDocument();
        expect(screen.getByRole('option', { name: 'Operations Team' })).toBeInTheDocument();
    });

    it('should display correct count of filtered contacts', () => {
        render(<ContactsPage />);

        expect(screen.getByText(/showing 3 of 3 contacts/i)).toBeInTheDocument();

        const searchInput = screen.getByPlaceholderText(/search by name, title, or email/i);
        fireEvent.change(searchInput, { target: { value: 'Doe' } });

        expect(screen.getByText(/showing 1 of 3 contacts/i)).toBeInTheDocument();
    });

    it('should show no results message when search has no matches', () => {
        render(<ContactsPage />);

        const searchInput = screen.getByPlaceholderText(/search by name, title, or email/i);
        fireEvent.change(searchInput, { target: { value: 'NonExistentPerson' } });

        expect(screen.getByText(/no contacts found matching your criteria/i)).toBeInTheDocument();
    });

    it('should have clickable email links', () => {
        render(<ContactsPage />);

        const emailLinks = screen.getAllByRole('link', { name: /john.doe@example.com/i });
        expect(emailLinks[0]).toHaveAttribute('href', 'mailto:john.doe@example.com');
    });

    it('should display team badges for each contact', () => {
        render(<ContactsPage />);

        const fdmBadges = screen.getAllByText('FDM Analytics');
        expect(fdmBadges.length).toBeGreaterThan(0);
    });

    it('should search by email', () => {
        render(<ContactsPage />);

        const searchInput = screen.getByPlaceholderText(/search by name, title, or email/i);
        fireEvent.change(searchInput, { target: { value: 'jane.smith' } });

        expect(screen.getByText('Jane Smith')).toBeInTheDocument();
        expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    });

    it('should search by title', () => {
        render(<ContactsPage />);

        const searchInput = screen.getByPlaceholderText(/search by name, title, or email/i);
        fireEvent.change(searchInput, { target: { value: 'Manager' } });

        expect(screen.getByText('Jane Smith')).toBeInTheDocument();
        expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    });
});
