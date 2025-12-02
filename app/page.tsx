'use client';

import { useState, useMemo } from 'react';
import Hero from '@/components/Hero';
import FilterSidebar from '@/components/FilterSidebar';
import ReportCard from '@/components/ReportCard';
import { Report, ViewMode, FilterState } from '@/types/report';
import reportsData from '@/data/reports.json';
import configData from '@/data/config.json';

export default function Home() {
  const reports: Report[] = reportsData as Report[];

  const [viewMode, setViewMode] = useState<ViewMode>('gallery');
  const [filters, setFilters] = useState<FilterState>({
    reportingDomains: [],
    processOwners: [],
    teams: [],
    teamTags: [],
    reportCategories: [],
    reportingFrequencies: [],
    searchQuery: '',
  });

  // Use config file for available options, but also include any values found in reports
  const availableDomains = useMemo(() => {
    const reportDomains = new Set(reports.map((r) => r.reportingDomain));
    const configDomains = new Set(configData.reportingDomains);
    return Array.from(new Set([...configDomains, ...reportDomains])).sort();
  }, [reports]);

  const availableTeamTags = useMemo(() => {
    const reportTags = new Set(reports.flatMap((r) => r.teamTags || []));
    const configTags = new Set(configData.teamTags);
    return Array.from(new Set([...configTags, ...reportTags])).sort();
  }, [reports]);

  const availableOwners = useMemo(() => {
    const reportOwners = new Set(reports.map((r) => r.processOwner));
    const configOwners = new Set(
      Array.isArray(configData.processOwners) && configData.processOwners[0]?.name
        ? configData.processOwners.map((p: any) => p.name)
        : configData.processOwners
    );
    return Array.from(new Set([...configOwners, ...reportOwners])).sort();
  }, [reports]);

  const availableTeams = useMemo(() => {
    const reportTeams = new Set(reports.map((r) => r.team));
    const configTeams = new Set(configData.teams);
    return Array.from(new Set([...configTeams, ...reportTeams])).sort();
  }, [reports]);

  const availableFrequencies = useMemo(() => {
    const reportFrequencies = new Set(reports.map((r) => r.reportingFrequency));
    const configFrequencies = new Set(configData.reportingFrequencies);
    return Array.from(new Set([...configFrequencies, ...reportFrequencies])).sort();
  }, [reports]);

  const availableCategories = useMemo(() => {
    const reportCategories = new Set(reports.map((r) => r.category));
    const configCategories = new Set(configData.reportCategories);
    return Array.from(new Set([...configCategories, ...reportCategories])).sort();
  }, [reports]);

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

      // Team Tag filter
      if (
        filters.teamTags.length > 0 &&
        (!report.teamTags || !filters.teamTags.some((tag) => report.teamTags?.includes(tag)))
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

      // Team filter
      if (
        filters.teams.length > 0 &&
        !filters.teams.includes(report.team)
      ) {
        return false;
      }

      // Category filter
      if (
        filters.reportCategories.length > 0 &&
        !filters.reportCategories.includes(report.category)
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
              availableDomains={availableDomains}
              availableTeamTags={availableTeamTags}
              availableOwners={availableOwners}
              availableTeams={availableTeams}
              availableCategories={availableCategories}
              availableFrequencies={availableFrequencies}
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
                  onClick={() =>
                    setFilters({
                      reportingDomains: [],
                      processOwners: [],
                      teams: [],
                      teamTags: [],
                      reportCategories: [],
                      reportingFrequencies: [],
                      searchQuery: '',
                    })
                  }
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


