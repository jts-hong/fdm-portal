'use client';

import { FilterState } from '@/types/report';

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  availableDomains: string[];
  availableOwners: string[];
  availableFrequencies: string[];
}

export default function FilterSidebar({
  filters,
  onFilterChange,
  availableDomains,
  availableOwners,
  availableFrequencies,
}: FilterSidebarProps) {
  const handleDomainToggle = (domain: string) => {
    const newDomains = filters.reportingDomains.includes(domain)
      ? filters.reportingDomains.filter((d) => d !== domain)
      : [...filters.reportingDomains, domain];
    onFilterChange({ ...filters, reportingDomains: newDomains });
  };

  const handleOwnerToggle = (owner: string) => {
    const newOwners = filters.processOwners.includes(owner)
      ? filters.processOwners.filter((o) => o !== owner)
      : [...filters.processOwners, owner];
    onFilterChange({ ...filters, processOwners: newOwners });
  };

  const handleFrequencyToggle = (frequency: string) => {
    const newFrequencies = filters.reportingFrequencies.includes(frequency)
      ? filters.reportingFrequencies.filter((f) => f !== frequency)
      : [...filters.reportingFrequencies, frequency];
    onFilterChange({ ...filters, reportingFrequencies: newFrequencies });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-6">Filters</h2>

      {/* Reporting Domain */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3 text-gray-700">Reporting Domain</h3>
        <div className="space-y-2">
          {availableDomains.map((domain) => (
            <label key={domain} className="flex items-center cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.reportingDomains.includes(domain)}
                onChange={() => handleDomainToggle(domain)}
                className="w-4 h-4 filter-checkbox rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700 group-hover:text-gray-900">
                {domain}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Process Owner */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3 text-gray-700">Process Owner</h3>
        <div className="space-y-2">
          {availableOwners.map((owner) => (
            <label key={owner} className="flex items-center cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.processOwners.includes(owner)}
                onChange={() => handleOwnerToggle(owner)}
                className="w-4 h-4 filter-checkbox rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700 group-hover:text-gray-900">
                {owner}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Reporting Frequency */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3 text-gray-700">Reporting Frequency</h3>
        <div className="space-y-2">
          {availableFrequencies.map((frequency) => (
            <label key={frequency} className="flex items-center cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.reportingFrequencies.includes(frequency)}
                onChange={() => handleFrequencyToggle(frequency)}
                className="w-4 h-4 filter-checkbox rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700 group-hover:text-gray-900">
                {frequency}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Reset Filters */}
      <button
        onClick={() =>
          onFilterChange({
            reportingDomains: [],
            processOwners: [],
            reportingFrequencies: [],
            searchQuery: filters.searchQuery,
          })
        }
        className="w-full mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors text-sm font-medium"
      >
        Reset Filters
      </button>
    </div>
  );
}

