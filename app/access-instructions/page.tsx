export default function AccessInstructionsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative -mt-20 pt-32 pb-12 hero-gradient text-white">
        <div className="max-w-[1400px] mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Access Instructions</h1>
          <p className="text-lg text-white text-opacity-90">
            Information on how to access FDM reports and tools
          </p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 py-12">
        <div className="space-y-8">
          {/* How to Request Access */}
          <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-blue-500">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              How to Request Access
            </h2>
            <div className="space-y-4 text-gray-800">
              <p className="text-lg font-semibold">
                To access FDM Data Solution Portal reports teamsites, please follow these steps:
              </p>
              <ol className="list-decimal list-inside space-y-3 ml-4 text-gray-700">
                <li className="pl-2">
                  <span className="font-semibold">Navigate to the All Access platform</span>
                </li>
                <li className="pl-2">
                  <span className="font-semibold">Search for and apply for the following access:</span>
                  <div className="mt-2 ml-6">
                    <code className="bg-blue-50 px-4 py-2 rounded border border-blue-200 text-blue-700 font-mono text-base inline-block">
                      Teamsite-FDM-Visitors
                    </code>
                  </div>
                </li>
                <li className="pl-2">
                  <span className="font-semibold">Submit your request with business justification</span>
                </li>
              </ol>
              <div className="mt-6 bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-sm text-gray-600">
                  <strong>Note:</strong> If you need access to specific restricted reports, additional permissions may be required. 
                  Contact the report owner listed on the report detail page.
                </p>
              </div>
            </div>
          </div>

          {/* General Access Requirements */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              General Access Requirements
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                After receiving access approval, ensure you have the following:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Valid corporate network credentials (Active Directory account)</li>
                <li>VPN access if working remotely</li>
                <li>Two-factor authentication (2FA) enabled on your account</li>
                <li>Modern web browser (Chrome, Firefox, Edge, or Safari)</li>
              </ul>
            </div>
          </div>

          {/* Access Methods Section */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Access Methods
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Web Portal Access</h3>
                <p className="text-gray-700 mb-3">
                  Most reports are accessible through the FDM Data Solution Portal web interface:
                </p>
                <ol className="list-decimal list-inside space-y-2 ml-4 text-gray-700">
                  <li>Navigate to the portal URL: <code className="bg-gray-100 px-2 py-1 rounded">https://portal.fdm.company.com</code></li>
                  <li>Sign in with your corporate credentials</li>
                  <li>Browse available reports by domain or search by name</li>
                  <li>Click on any report card to view detailed information and access links</li>
                </ol>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Direct Database Access</h3>
                <p className="text-gray-700 mb-3">
                  For advanced users requiring direct database queries:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
                  <li>Request database access through the IT Service Desk</li>
                  <li>Provide business justification for direct access</li>
                  <li>Complete SQL Server security training module</li>
                  <li>Access granted via approved database connection tools (SSMS, Tableau, etc.)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">API Access</h3>
                <p className="text-gray-700 mb-3">
                  Programmatic access via REST API is available for automated reporting:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
                  <li>Contact FDM team to request API credentials</li>
                  <li>Review API documentation and rate limiting guidelines</li>
                  <li>API keys are provided after security review and approval</li>
                  <li>Base URL: <code className="bg-gray-100 px-2 py-1 rounded">https://api.fdm.company.com/v1</code></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Report-Specific Access Section */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Report-Specific Access
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Different reports may have specific access requirements based on data sensitivity and user roles:
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4">
                <p className="font-semibold text-blue-900 mb-2">Standard Reports</p>
                <p className="text-blue-800">
                  Most reports are available to all authenticated users. No additional permissions required beyond standard portal access.
                </p>
              </div>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-4">
                <p className="font-semibold text-yellow-900 mb-2">Restricted Reports</p>
                <p className="text-yellow-800">
                  Some reports contain sensitive financial data and require manager approval. Contact the report owner listed on the report detail page.
                </p>
              </div>
              <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4">
                <p className="font-semibold text-red-900 mb-2">Confidential Reports</p>
                <p className="text-red-800">
                  Highly confidential reports require VP-level approval and additional security clearances. Contact FDM team for access requests.
                </p>
              </div>
            </div>
          </div>

          {/* Troubleshooting Section */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Troubleshooting Common Issues
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Cannot Access Portal</h3>
                <ul className="list-disc list-inside space-y-1 ml-4 text-gray-700">
                  <li>Verify your network connection and VPN status (if remote)</li>
                  <li>Clear browser cache and cookies</li>
                  <li>Try accessing from an incognito/private browsing window</li>
                  <li>Contact IT Service Desk if issues persist</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Report Not Visible</h3>
                <ul className="list-disc list-inside space-y-1 ml-4 text-gray-700">
                  <li>Check if the report requires special permissions</li>
                  <li>Verify your user role and department assignments</li>
                  <li>Contact the report owner listed on the report detail page</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Data Appears Outdated</h3>
                <ul className="list-disc list-inside space-y-1 ml-4 text-gray-700">
                  <li>Check the "Last Updated" date on the report detail page</li>
                  <li>Refresh your browser or clear cache</li>
                  <li>Some reports update on a schedule (daily, weekly, monthly)</li>
                  <li>Contact the report owner if data seems incorrect</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Support Section */}
          <div className="bg-blue-50 rounded-lg shadow-lg p-8 border border-blue-200">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              Need Help?
            </h2>
            <p className="text-blue-800 mb-4">
              If you're experiencing access issues or have questions about report availability:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-blue-800">
              <li>Contact the FDM team via email (see Contacts page)</li>
              <li>Submit a ticket through the IT Service Desk portal</li>
              <li>Reach out to your department's data analyst</li>
              <li>Check the FAQ section in the company knowledge base</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

