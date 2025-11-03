import Link from 'next/link';
import { Report } from '@/types/report';
import reportsData from '@/data/reports.json';

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
      <div className="hero-gradient text-white py-12">
        <div className="max-w-5xl mx-auto px-4">
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
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          {/* Overview Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
            <p className="text-gray-700 leading-relaxed">{report.detailedDescription}</p>
          </section>

          {/* Key Details */}
          <section className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
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
          </section>

          {/* Features */}
          {report.features && report.features.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h2>
              <ul className="space-y-3">
                {report.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Access Information */}
          <section className="border-t pt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Access & Contact</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <svg
                    className="h-5 w-5 text-blue-600 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  Access Instructions
                </h3>
                <p className="text-gray-700">{report.accessInstructions}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <svg
                    className="h-5 w-5 text-green-600 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Contact
                </h3>
                <a
                  href={`mailto:${report.contactEmail}`}
                  className="text-blue-600 hover:text-blue-800 hover:underline"
                >
                  {report.contactEmail}
                </a>
              </div>
            </div>
          </section>
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

