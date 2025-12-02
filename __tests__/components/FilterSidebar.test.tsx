import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FilterSidebar from '@/components/FilterSidebar';
import { FilterState } from '@/types/report';

describe('FilterSidebar Component', () => {
    const mockFilters: FilterState = {
        reportingDomains: [],
        processOwners: [],
        teams: [],
        teamTags: [],
        reportCategories: [],
        reportingFrequencies: [],
        searchQuery: '',
    };

    const mockAvailableDomains = ['Finance', 'Operations', 'Risk'];
    const mockAvailableOwners = ['John Doe', 'Jane Smith', 'Bob Johnson'];
    const mockAvailableTeams = ['FDM Analytics', 'Operations Team', 'Revenue Analytics'];
    const mockAvailableTeamTags = ['Urgent', 'Review Required'];
    const mockAvailableCategories = ['Financial Analysis', 'Operational Metrics', 'Revenue'];
    const mockAvailableFrequencies = ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Annual'];

    const mockOnFilterChange = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render all filter sections', () => {
        render(
            <FilterSidebar
                filters={mockFilters}
                onFilterChange={mockOnFilterChange}
                availableDomains={mockAvailableDomains}
                availableOwners={mockAvailableOwners}
                availableTeams={mockAvailableTeams}
                availableTeamTags={mockAvailableTeamTags}
                availableCategories={mockAvailableCategories}
                availableFrequencies={mockAvailableFrequencies}
            />
        );

        expect(screen.getByText('Filters')).toBeInTheDocument();
        expect(screen.getByText('Team Tags')).toBeInTheDocument();
    });

    it('should render all domain options', () => {
        render(
            <FilterSidebar
                filters={mockFilters}
                onFilterChange={mockOnFilterChange}
                availableDomains={mockAvailableDomains}
                availableOwners={mockAvailableOwners}
                availableTeams={mockAvailableTeams}
                availableTeamTags={mockAvailableTeamTags}
                availableCategories={mockAvailableCategories}
                availableFrequencies={mockAvailableFrequencies}
            />
        );

        const domainButton = screen.getByRole('button', { name: /All Reporting Domain/i });
        fireEvent.click(domainButton);

        mockAvailableDomains.forEach(domain => {
            expect(screen.getByText(domain)).toBeInTheDocument();
        });
    });

    it('should handle domain filter selection', () => {
        render(
            <FilterSidebar
                filters={mockFilters}
                onFilterChange={mockOnFilterChange}
                availableDomains={mockAvailableDomains}
                availableOwners={mockAvailableOwners}
                availableTeams={mockAvailableTeams}
                availableTeamTags={mockAvailableTeamTags}
                availableCategories={mockAvailableCategories}
                availableFrequencies={mockAvailableFrequencies}
            />
        );

        const domainButton = screen.getByRole('button', { name: /All Reporting Domain/i });
        fireEvent.click(domainButton);

        const financeCheckbox = screen.getByLabelText('Finance');
        fireEvent.click(financeCheckbox);

        expect(mockOnFilterChange).toHaveBeenCalledWith(
            expect.objectContaining({
                reportingDomains: ['Finance'],
            })
        );
    });

    it('should handle owner filter selection', () => {
        render(
            <FilterSidebar
                filters={mockFilters}
                onFilterChange={mockOnFilterChange}
                availableDomains={mockAvailableDomains}
                availableOwners={mockAvailableOwners}
                availableTeams={mockAvailableTeams}
                availableTeamTags={mockAvailableTeamTags}
                availableCategories={mockAvailableCategories}
                availableFrequencies={mockAvailableFrequencies}
            />
        );

        const ownerButton = screen.getByRole('button', { name: /All Process Owner/i });
        fireEvent.click(ownerButton);

        const ownerCheckbox = screen.getByLabelText('John Doe');
        fireEvent.click(ownerCheckbox);

        expect(mockOnFilterChange).toHaveBeenCalledWith(
            expect.objectContaining({
                processOwners: ['John Doe'],
            })
        );
    });

    it('should handle team filter selection', () => {
        render(
            <FilterSidebar
                filters={mockFilters}
                onFilterChange={mockOnFilterChange}
                availableDomains={mockAvailableDomains}
                availableOwners={mockAvailableOwners}
                availableTeams={mockAvailableTeams}
                availableTeamTags={mockAvailableTeamTags}
                availableCategories={mockAvailableCategories}
                availableFrequencies={mockAvailableFrequencies}
            />
        );

        const teamButton = screen.getByRole('button', { name: /^All Team$/i });
        fireEvent.click(teamButton);

        const teamCheckbox = screen.getByLabelText('FDM Analytics');
        fireEvent.click(teamCheckbox);

        expect(mockOnFilterChange).toHaveBeenCalledWith(
            expect.objectContaining({
                teams: ['FDM Analytics'],
            })
        );
    });

    it('should handle frequency filter selection', () => {
        render(
            <FilterSidebar
                filters={mockFilters}
                onFilterChange={mockOnFilterChange}
                availableDomains={mockAvailableDomains}
                availableOwners={mockAvailableOwners}
                availableTeams={mockAvailableTeams}
                availableTeamTags={mockAvailableTeamTags}
                availableCategories={mockAvailableCategories}
                availableFrequencies={mockAvailableFrequencies}
            />
        );

        const frequencyButton = screen.getByRole('button', { name: /All Reporting Frequency/i });
        fireEvent.click(frequencyButton);

        const frequencyCheckbox = screen.getByLabelText('Daily');
        fireEvent.click(frequencyCheckbox);

        expect(mockOnFilterChange).toHaveBeenCalledWith(
            expect.objectContaining({
                reportingFrequencies: ['Daily'],
            })
        );
    });

    it('should handle filter deselection', () => {
        const filtersWithSelection: FilterState = {
            ...mockFilters,
            reportingDomains: ['Finance'],
        };

        render(
            <FilterSidebar
                filters={filtersWithSelection}
                onFilterChange={mockOnFilterChange}
                availableDomains={mockAvailableDomains}
                availableOwners={mockAvailableOwners}
                availableTeams={mockAvailableTeams}
                availableTeamTags={mockAvailableTeamTags}
                availableCategories={mockAvailableCategories}
                availableFrequencies={mockAvailableFrequencies}
            />
        );

        // Open the dropdown first
        const domainButton = screen.getByRole('button', { name: /Finance/i });
        fireEvent.click(domainButton);

        // Now find and click the checkbox
        const financeCheckbox = screen.getByLabelText('Finance') as HTMLInputElement;
        expect(financeCheckbox.checked).toBe(true);

        fireEvent.click(financeCheckbox);

        expect(mockOnFilterChange).toHaveBeenCalledWith(
            expect.objectContaining({
                reportingDomains: [],
            })
        );
    });

    it('should have clear filters button', () => {
        render(
            <FilterSidebar
                filters={mockFilters}
                onFilterChange={mockOnFilterChange}
                availableDomains={mockAvailableDomains}
                availableOwners={mockAvailableOwners}
                availableTeams={mockAvailableTeams}
                availableTeamTags={mockAvailableTeamTags}
                availableCategories={mockAvailableCategories}
                availableFrequencies={mockAvailableFrequencies}
            />
        );

        const clearButton = screen.getByRole('button', { name: /reset filters/i });
        expect(clearButton).toBeInTheDocument();
    });

    it('should clear all filters when clear button is clicked', () => {
        const filtersWithSelections: FilterState = {
            reportingDomains: ['Finance'],
            processOwners: ['John Doe'],
            teams: ['FDM Analytics'],
            teamTags: ['Urgent'],
            reportCategories: ['Financial Analysis'],
            reportingFrequencies: ['Daily'],
            searchQuery: '',
        };

        render(
            <FilterSidebar
                filters={filtersWithSelections}
                onFilterChange={mockOnFilterChange}
                availableDomains={mockAvailableDomains}
                availableOwners={mockAvailableOwners}
                availableTeams={mockAvailableTeams}
                availableTeamTags={mockAvailableTeamTags}
                availableCategories={mockAvailableCategories}
                availableFrequencies={mockAvailableFrequencies}
            />
        );

        const clearButton = screen.getByRole('button', { name: /reset filters/i });
        fireEvent.click(clearButton);

        expect(mockOnFilterChange).toHaveBeenCalledWith({
            reportingDomains: [],
            processOwners: [],
            teams: [],
            teamTags: [],
            reportCategories: [],
            reportingFrequencies: [],
            searchQuery: '',
        });
    });

    it('should disable team tags filter when no domain is selected', () => {
        render(
            <FilterSidebar
                filters={mockFilters}
                onFilterChange={mockOnFilterChange}
                availableDomains={mockAvailableDomains}
                availableOwners={mockAvailableOwners}
                availableTeams={mockAvailableTeams}
                availableTeamTags={mockAvailableTeamTags}
                availableCategories={mockAvailableCategories}
                availableFrequencies={mockAvailableFrequencies}
            />
        );

        const teamTagsButton = screen.getByRole('button', { name: /All Team Tags/i });
        expect(teamTagsButton).toBeDisabled();
        expect(screen.getByText('* Select a Reporting Domain to enable')).toBeInTheDocument();
    });

    it('should enable team tags filter when domain is selected', () => {
        const filtersWithDomain: FilterState = {
            ...mockFilters,
            reportingDomains: ['Finance'],
        };

        render(
            <FilterSidebar
                filters={filtersWithDomain}
                onFilterChange={mockOnFilterChange}
                availableDomains={mockAvailableDomains}
                availableOwners={mockAvailableOwners}
                availableTeams={mockAvailableTeams}
                availableTeamTags={mockAvailableTeamTags}
                availableCategories={mockAvailableCategories}
                availableFrequencies={mockAvailableFrequencies}
            />
        );

        const teamTagsButton = screen.getByRole('button', { name: /All Team Tags/i });
        expect(teamTagsButton).not.toBeDisabled();
        expect(screen.queryByText('* Select a Reporting Domain to enable')).not.toBeInTheDocument();
    });
});
