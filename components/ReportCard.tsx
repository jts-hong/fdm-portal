'use client';

import Link from 'next/link';
import { Report, ViewMode } from '@/types/report';

interface ReportCardProps {
  report: Report;
  viewMode: ViewMode;
}

export default function ReportCard({ report, viewMode }: ReportCardProps) {
  const getFrequencyBadgeClass = (frequency: string) => {
    switch (frequency.toLowerCase()) {
      case 'daily':
        return 'badge-daily';
      case 'weekly':
        return 'badge-weekly';
      case 'monthly':
        return 'badge-monthly';
      case 'quarterly':
        return 'badge-quarterly';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (viewMode === 'list') {
    return (
      <Link href={`/reports/${report.id}`}>
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 mb-4 border-t-4 border-blue-600">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{report.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{report.shortDescription}</p>
              <div className="flex flex-wrap gap-3 text-sm">
                <div>
                  <span className="font-semibold text-gray-700">Owner:</span>{' '}
                  <span className="text-gray-600">{report.processOwner}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Domain:</span>{' '}
                  <span className="text-gray-600">{report.reportingDomain}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Team:</span>{' '}
                  <span className="text-gray-600">{report.team}</span>
                </div>
              </div>
            </div>
            <div>
              <span className={`badge ${getFrequencyBadgeClass(report.reportingFrequency)}`}>
                Updated {report.reportingFrequency}
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/reports/${report.id}`}>
      <div className="bg-white rounded-lg card-shadow p-6 h-full border-t-4 border-blue-600">
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {report.reportingDomain}
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {report.reportingFrequency}
          </span>
          {report.teamTags?.map((tag) => (
            <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-3">{report.name}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">{report.shortDescription}</p>
        <div className="space-y-2 text-sm">
          <div>
            <span className="font-semibold text-gray-700">Owner:</span>{' '}
            <span className="text-gray-600">{report.processOwner}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Domain:</span>{' '}
            <span className="text-gray-600">{report.reportingDomain}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Team:</span>{' '}
            <span className="text-gray-600">{report.team}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

