'use client';

import { useState, useMemo } from 'react';
import Hero from '@/components/Hero';
import FilterSidebar from '@/components/FilterSidebar';
import ReportCard from '@/components/ReportCard';
import { Report, ViewMode, FilterState } from '@/types/report';
import reportsData from '@/data/reports.json';
import configData from '@/data/config.json';
import { FILTER_CONFIGS, getEmptyFilterState, getFilterConfig } from '@/config/filterConfig';

export default function Home() {
  const reports: Report[] = reportsData as Report[];

  const [viewMode, setViewMode] = useState<ViewMode>('gallery');
  const [filters, setFilters] = useState<FilterState>(getEmptyFilterState());

  // Dynamically generate available options for all filters based on configuration
  const availableOptions = useMemo(() => {
    const options: Record<keyof FilterState, string[]> = {} as any;

    // First, determine which reports to consider based on current filters
    const getFilteredReportsForOptions = (filterId: keyof FilterState) => {
      // For dependent filters, only consider reports that match the parent filter
      const filterConfig = getFilterConfig(filterId);
      if (filterConfig?.dependsOn) {
        const parentFilterId = filterConfig.dependsOn.filterId;
        const parentSelectedValues = filters[parentFilterId] as string[];

        if (parentSelectedValues.length > 0) {
          // Filter reports based on parent filter selection
          const parentConfig = getFilterConfig(parentFilterId);
          if (parentConfig) {
            return reports.filter((r: any) => {
              const reportValue = r[parentConfig.reportField];
              return parentSelectedValues.includes(reportValue);
            });
          }
        }
      }
      // If no dependency or parent not selected, use all reports
      return reports;
    };

    FILTER_CONFIGS.forEach((filterConfig) => {
      // Get values from config file
      const configValues = configData[filterConfig.configKey];
      let configSet: Set<string>;

      // Handle different config data formats (array of objects vs array of strings)
      if (Array.isArray(configValues) && configValues.length > 0 && typeof configValues[0] === 'object' && configValues[0] !== null && 'name' in configValues[0]) {
        configSet = new Set(configValues.map((item: any) => item.name));
      } else {
        configSet = new Set(configValues as string[]);
      }

      // Get values from reports (filtered if this filter has dependencies)
      const relevantReports = getFilteredReportsForOptions(filterConfig.id);
      let reportSet: Set<string>;
      if (filterConfig.isArrayField) {
        // For array fields like teamTags
        reportSet = new Set(relevantReports.flatMap((r: any) => r[filterConfig.reportField] || []));
      } else {
        // For single value fields
        reportSet = new Set(relevantReports.map((r: any) => r[filterConfig.reportField]));
      }

      // Combine and sort
      options[filterConfig.id] = Array.from(new Set([...configSet, ...reportSet])).sort();
    });

    // searchQuery is not a filter with options
    options.searchQuery = [];

    return options;
  }, [reports, filters]);

  // Filter reports dynamically based on configuration
  const filteredReports = useMemo(() => {
    return reports.filter((report: any) => {
      // Search query filter (special case, not in FILTER_CONFIGS)
      if (
        filters.searchQuery &&
        !report.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
        !report.shortDescription.toLowerCase().includes(filters.searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Apply all configured filters
      for (const filterConfig of FILTER_CONFIGS) {
        const selectedValues = filters[filterConfig.id] as string[];

        if (selectedValues.length > 0) {
          const reportValue = report[filterConfig.reportField];

          if (filterConfig.isArrayField) {
            // For array fields (like teamTags), check if any selected value is in the report's array
            if (!reportValue || !selectedValues.some((val) => reportValue.includes(val))) {
              return false;
            }
          } else {
            // For single value fields, check if the report's value is in the selected values
            if (!selectedValues.includes(reportValue)) {
              return false;
            }
          }
        }
      }

      return true;
    });
  }, [reports, filters]);

  return (
    <main className="min-h-screen bg-gray-50">
      <Hero />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and View Toggle */}
        <div className="mb-6 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex-1 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search by report name or description..."
              value={filters.searchQuery}
              onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('gallery')}
              className={`p-2 rounded-md transition-colors ${viewMode === 'gallery'
                ? 'bg-[#4a90e2] text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              title="Gallery View"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${viewMode === 'list'
                ? 'bg-[#4a90e2] text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              title="List View"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <FilterSidebar
              filters={filters}
              onFilterChange={setFilters}
              availableOptions={availableOptions}
            />
          </div>

          {/* Results Area */}
          <div className="flex-1">
            <div className="mb-4 text-gray-600">
              Found {filteredReports.length} report{filteredReports.length !== 1 ? 's' : ''}
            </div>

            {viewMode === 'gallery' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredReports.map((report) => (
                  <ReportCard key={report.id} report={report} viewMode="gallery" />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredReports.map((report) => (
                  <ReportCard key={report.id} report={report} viewMode="list" />
                ))}
              </div>
            )}

            {filteredReports.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <p className="text-gray-500 text-lg">No reports found matching your criteria.</p>
                <button
                  onClick={() => setFilters(getEmptyFilterState())}
                  className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}


