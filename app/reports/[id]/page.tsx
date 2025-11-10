import Link from 'next/link';
import { Report, ProcessOwner } from '@/types/report';
import reportsData from '@/data/reports.json';
import configData from '@/data/config.json';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ReportDetailPage({ params }: PageProps) {
  const { id } = await params;
  const reports: Report[] = reportsData as Report[];
  const report = reports.find((r) => r.id === id);

  if (!report) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Report Not Found</h1>
        <p className="text-gray-600 mb-8">The report you're looking for doesn't exist.</p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Back to All Reports
        </Link>
      </div>
    );
  }

  // Get process owner details from config
  const processOwners: ProcessOwner[] = Array.isArray(configData.processOwners) && configData.processOwners[0]?.name
    ? configData.processOwners as ProcessOwner[]
    : [];
  const ownerDetails = processOwners.find((p) => p.name === report.processOwner);
  const showBusinessDays =
    ['Monthly', 'Quarterly', 'Annual'].includes(report.reportingFrequency) &&
    Array.isArray(report.businessDays) &&
    report.businessDays.length > 0;

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="relative -mt-20 pt-32 pb-12 hero-gradient text-white">
        <div className="max-w-[1400px] mx-auto px-4">
          <Link
            href="/"
            className="inline-flex items-center text-white hover:text-gray-200 mb-6 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to All Reports
          </Link>
          <h1 className="text-4xl font-bold mb-4">{report.name}</h1>
          <div className="flex flex-wrap gap-3">
            <span className={`badge ${getFrequencyBadgeClass(report.reportingFrequency)}`}>
              Updated {report.reportingFrequency}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1400px] mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          {/* Description Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
            <p className="text-gray-700 leading-relaxed">{report.detailedDescription}</p>
          </section>

          {/* Source Tables */}
          {report.sourceTables && report.sourceTables.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Source Tables</h2>
              <div className="flex flex-wrap gap-2">
                {report.sourceTables.map((table, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-md text-sm font-mono"
                  >
                    {table}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Report Details */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Report Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  Reporting Domain
                </h3>
                <p className="text-lg font-medium text-gray-900">{report.reportingDomain}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  Process Owner
                </h3>
                <p className="text-lg font-medium text-gray-900">{report.processOwner}</p>
                {ownerDetails && (
                  <div className="mt-3 space-y-1 text-sm text-gray-600">
                    <p>
                      <span className="font-semibold">EID:</span> {ownerDetails.eid}
                    </p>
                    <p>
                      <span className="font-semibold">Email:</span>{' '}
                      <a
                        href={`mailto:${ownerDetails.email}`}
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        {ownerDetails.email}
                      </a>
                    </p>
                    <p>
                      <span className="font-semibold">Team:</span> {ownerDetails.team}
                    </p>
                  </div>
                )}
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  Team
                </h3>
                <p className="text-lg font-medium text-gray-900">{report.team}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  Reporting Frequency
                </h3>
                <p className="text-lg font-medium text-gray-900">{report.reportingFrequency}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  Last Updated
                </h3>
                <p className="text-lg font-medium text-gray-900">
                  {new Date(report.lastUpdated).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </section>

          {/* Business Days */}
          {showBusinessDays && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Business Day Offsets</h2>
              <p className="text-sm text-gray-600 mb-3">
                Execution schedule relative to the primary business day (negative values run before, positive values after).
              </p>
              <div className="flex flex-wrap gap-2">
                {report.businessDays!.map((offset, index) => (
                  <span
                    key={`${offset}-${index}`}
                    className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-md text-sm font-medium"
                  >
                    {offset}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Destination Link */}
          {report.destinationLink && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Report Link</h2>
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                <a
                  href={report.destinationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 hover:underline font-medium flex items-center"
                >
                  <svg
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  {report.destinationLink}
                </a>
              </div>
            </section>
          )}

          {/* Access Needed */}
          {report.accessNeeded && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Needed</h2>
              <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
                <p className="text-gray-700">{report.accessNeeded}</p>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const reports: Report[] = reportsData as Report[];
  return reports.map((report) => ({
    id: report.id,
  }));
}

