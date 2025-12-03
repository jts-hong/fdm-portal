import { FilterState } from '@/types/report';
import configData from '@/data/config.json';

/**
 * Filter configuration interface
 */
export interface FilterConfig {
    /** Unique identifier for the filter */
    id: keyof FilterState;
    /** Display label for the filter */
    label: string;
    /** Field name in the config.json data source */
    configKey: keyof typeof configData;
    /** Field name in the Report interface */
    reportField: string;
    /** Order in which the filter appears (lower = earlier) */
    order: number;
    /** Whether this filter depends on another filter being selected */
    dependsOn?: {
        /** The filter ID this depends on */
        filterId: keyof FilterState;
        /** Helper text to show when dependency is not met */
        helperText: string;
    };
    /** Whether this filter uses array matching (for tags, etc.) */
    isArrayField?: boolean;
}

/**
 * Centralized filter configuration
 * 
 * To add a new filter:
 * 1. Add the filter field to FilterState in types/report.ts
 * 2. Add the data source to config.json
 * 3. Add a new entry here with appropriate configuration
 * 
 * To reorder filters:
 * - Simply change the 'order' property
 * 
 * To add dependencies:
 * - Add a 'dependsOn' property with the parent filter ID and helper text
 */
export const FILTER_CONFIGS: FilterConfig[] = [
    {
        id: 'reportingDomains',
        label: 'Reporting Domain',
        configKey: 'reportingDomains',
        reportField: 'reportingDomain',
        order: 1,
    },
    {
        id: 'teamTags',
        label: 'Team Tags',
        configKey: 'teamTags',
        reportField: 'teamTags',
        order: 2,
        isArrayField: true,
        dependsOn: {
            filterId: 'reportingDomains',
            helperText: '* Select a Reporting Domain to enable',
        },
    },
    {
        id: 'processOwners',
        label: 'Process Owner',
        configKey: 'processOwners',
        reportField: 'processOwner',
        order: 3,
    },
    {
        id: 'teams',
        label: 'Team',
        configKey: 'teams',
        reportField: 'team',
        order: 4,
    },
    {
        id: 'reportCategories',
        label: 'Report Category',
        configKey: 'reportCategories',
        reportField: 'category',
        order: 5,
    },
    {
        id: 'reportingFrequencies',
        label: 'Reporting Frequency',
        configKey: 'reportingFrequencies',
        reportField: 'reportingFrequency',
        order: 6,
    },
];

/**
 * Get filters sorted by order
 */
export function getSortedFilters(): FilterConfig[] {
    return [...FILTER_CONFIGS].sort((a, b) => a.order - b.order);
}

/**
 * Get filter configuration by ID
 */
export function getFilterConfig(id: keyof FilterState): FilterConfig | undefined {
    return FILTER_CONFIGS.find(config => config.id === id);
}

/**
 * Check if a filter should be disabled based on dependencies
 */
export function isFilterDisabled(
    filterId: keyof FilterState,
    currentFilters: FilterState
): boolean {
    const config = getFilterConfig(filterId);
    if (!config?.dependsOn) return false;

    const dependencyFilter = currentFilters[config.dependsOn.filterId];
    return Array.isArray(dependencyFilter) && dependencyFilter.length === 0;
}

/**
 * Get the initial/empty filter state
 */
export function getEmptyFilterState(): FilterState {
    const emptyState: any = {
        searchQuery: '',
    };

    FILTER_CONFIGS.forEach(config => {
        emptyState[config.id] = [];
    });

    return emptyState as FilterState;
}
