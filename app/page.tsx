'use client';

import { useState, useMemo } from 'react';
import Hero from '@/components/Hero';
import FilterSidebar from '@/components/FilterSidebar';
import ReportCard from '@/components/ReportCard';
import { Report, ViewMode, FilterState } from '@/types/report';
import reportsData from '@/data/reports.json';

export default function Home() {
  const reports: Report[] = reportsData as Report[];

  const [viewMode, setViewMode] = useState<ViewMode>('gallery');
  const [filters, setFilters] = useState<FilterState>({
    reportingDomains: [],
    processOwners: [],
    reportingFrequencies: [],
    searchQuery: '',
  });

  // Extract unique values for filters
  const availableDomains = useMemo(
    () => [...new Set(reports.map((r) => r.reportingDomain))].sort(),
    [reports]
  );
  const availableOwners = useMemo(
    () => [...new Set(reports.map((r) => r.processOwner))].sort(),
    [reports]
  );
  const availableFrequencies = useMemo(
    () => [...new Set(reports.map((r) => r.reportingFrequency))].sort(),
    [reports]
  );

  // Filter reports
  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      // Search query filter
      if (
        filters.searchQuery &&
        !report.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
        !report.shortDescription.toLowerCase().includes(filters.searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Domain filter
      if (
        filters.reportingDomains.length > 0 &&
        !filters.reportingDomains.includes(report.reportingDomain)
      ) {
        return false;
      }

      // Owner filter
      if (
        filters.processOwners.length > 0 &&
        !filters.processOwners.includes(report.processOwner)
      ) {
        return false;
      }

      // Frequency filter
      if (
        filters.reportingFrequencies.length > 0 &&
        !filters.reportingFrequencies.includes(report.reportingFrequency)
      ) {
        return false;
      }

      return true;
    });
  }, [reports, filters]);

  return (
    <div>
      <Hero />

      <div className="max-w-7xl mx-auto px-4 py-8">
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
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'gallery'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
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
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'list'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
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
              availableDomains={availableDomains}
              availableOwners={availableOwners}
              availableFrequencies={availableFrequencies}
            />
          </div>

          {/* Reports Grid/List */}
          <div className="flex-1">
            <div className="mb-4">
              <p className="text-gray-600">
                Showing <span className="font-semibold">{filteredReports.length}</span> of{' '}
                <span className="font-semibold">{reports.length}</span> reports
              </p>
            </div>

            {filteredReports.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <p className="text-gray-500 text-lg">
                  No reports found matching your criteria.
                </p>
              </div>
            ) : (
              <div
                className={
                  viewMode === 'gallery'
                    ? 'grid grid-cols-1 md:grid-cols-2 gap-6'
                    : 'space-y-4'
                }
              >
                {filteredReports.map((report) => (
                  <ReportCard key={report.id} report={report} viewMode={viewMode} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
