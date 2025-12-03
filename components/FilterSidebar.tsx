'use client';

import { useState, useRef, useEffect } from 'react';
import { FilterState } from '@/types/report';
import { getSortedFilters, isFilterDisabled, getEmptyFilterState } from '@/config/filterConfig';

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  availableOptions: Record<keyof FilterState, string[]>;
}

interface MultiSelectProps {
  label: string;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  disabled?: boolean;
}

function MultiSelect({ label, options, selected, onChange, disabled = false }: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter((item) => item !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  const displayText = selected.length === 0
    ? `All ${label}`
    : selected.length === 1
      ? selected[0]
      : `${selected.length} selected`;

  return (
    <div className={`mb-6 relative ${disabled ? 'opacity-50 pointer-events-none' : ''}`} ref={dropdownRef}>
      <label className="block font-semibold mb-2 text-gray-700">{label}</label>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg shadow-sm hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-left flex items-center justify-between ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
      >
        <span className={`text-sm ${selected.length === 0 ? 'text-gray-500' : 'text-gray-900'}`}>
          {displayText}
        </span>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && !disabled && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
          <div className="p-2">
            {options.map((option) => {
              const isSelected = selected.includes(option);
              return (
                <label
                  key={option}
                  className="flex items-center px-3 py-2 hover:bg-blue-50 rounded-md cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleOption(option)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="ml-3 text-sm text-gray-700">{option}</span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      {/* Selected badges */}
      {selected.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {selected.map((item) => (
            <span
              key={item}
              className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
            >
              {item}
              <button
                type="button"
                onClick={() => toggleOption(item)}
                className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-blue-200 focus:outline-none"
              >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function FilterSidebar({
  filters,
  onFilterChange,
  availableOptions,
}: FilterSidebarProps) {
  const sortedFilters = getSortedFilters();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-6 text-gray-900">Filters</h2>

      {sortedFilters.map((filterConfig) => {
        const isDisabled = isFilterDisabled(filterConfig.id, filters);
        const selected = filters[filterConfig.id] as string[];
        const options = availableOptions[filterConfig.id] || [];

        return (
          <div key={filterConfig.id}>
            <MultiSelect
              label={filterConfig.label}
              options={options}
              selected={selected}
              onChange={(newSelected) =>
                onFilterChange({ ...filters, [filterConfig.id]: newSelected })
              }
              disabled={isDisabled}
            />
            {isDisabled && filterConfig.dependsOn && (
              <p className="text-xs text-gray-500 -mt-4 mb-6 ml-1">
                {filterConfig.dependsOn.helperText}
              </p>
            )}
          </div>
        );
      })}

      {/* Reset Filters */}
      <button
        onClick={() => onFilterChange(getEmptyFilterState())}
        className="w-full mt-4 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium shadow-sm"
      >
        Reset Filters
      </button>
    </div>
  );
}

