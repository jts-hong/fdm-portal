export default function ContactsPage() {
  const teamMembers = [
    {
      name: "Sarah Chen",
      role: "FDM Team Lead",
      email: "sarah.chen@company.com",
      phone: "+1 (555) 123-4567",
      department: "Financial Data Management",
      expertise: "Data Strategy, Analytics Architecture",
    },
    {
      name: "Michael Rodriguez",
      role: "Senior Data Analyst",
      email: "michael.rodriguez@company.com",
      phone: "+1 (555) 123-4568",
      department: "Financial Data Management",
      expertise: "Business Continuity Reports, BCM Analytics",
    },
    {
      name: "Emily Watson",
      role: "Data Engineer",
      email: "emily.watson@company.com",
      phone: "+1 (555) 123-4569",
      department: "Financial Data Management",
      expertise: "Data Pipeline, ETL Processes",
    },
    {
      name: "David Kim",
      role: "Business Intelligence Analyst",
      email: "david.kim@company.com",
      phone: "+1 (555) 123-4570",
      department: "Financial Data Management",
      expertise: "Dashboard Development, Reporting Tools",
    },
    {
      name: "Jennifer Martinez",
      role: "Data Quality Specialist",
      email: "jennifer.martinez@company.com",
      phone: "+1 (555) 123-4571",
      department: "Financial Data Management",
      expertise: "Data Governance, Quality Assurance",
    },
    {
      name: "Robert Thompson",
      role: "Support Analyst",
      email: "robert.thompson@company.com",
      phone: "+1 (555) 123-4572",
      department: "Financial Data Management",
      expertise: "User Support, Access Management",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="hero-gradient text-white py-12">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Contacts</h1>
          <p className="text-lg text-white text-opacity-90">
            Get in touch with FDM team members
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="space-y-8">
          {/* General Contact Section */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-3xl">📧</span>
              General Inquiries
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                For general questions about FDM reports, access requests, or portal functionality:
              </p>
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                <p className="font-semibold text-blue-900 mb-2">FDM Team Email</p>
                <a 
                  href="mailto:fdm-team@company.com" 
                  className="text-blue-600 hover:text-blue-800 underline text-lg"
                >
                  fdm-team@company.com
                </a>
                <p className="text-blue-800 mt-2 text-sm">
                  Response time: Within 24 business hours
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <p className="font-semibold text-gray-900 mb-2">IT Service Desk</p>
                <p className="text-gray-700 mb-2">For technical issues or access problems:</p>
                <p className="text-gray-600">Phone: <a href="tel:+15551234500" className="text-blue-600 hover:underline">+1 (555) 123-4500</a></p>
                <p className="text-gray-600">Portal: <a href="https://itservice.company.com" className="text-blue-600 hover:underline">itservice.company.com</a></p>
              </div>
            </div>
          </div>

          {/* Team Directory */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="text-3xl">👥</span>
              Team Directory
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {teamMembers.map((member, index) => (
                <div 
                  key={index}
                  className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-semibold mb-3">{member.role}</p>
                  
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex items-start gap-2">
                      <span className="text-gray-500">📧</span>
                      <a 
                        href={`mailto:${member.email}`}
                        className="text-blue-600 hover:text-blue-800 hover:underline break-all"
                      >
                        {member.email}
                      </a>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-gray-500">📞</span>
                      <a 
                        href={`tel:${member.phone.replace(/\s/g, '')}`}
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        {member.phone}
                      </a>
                    </div>
                    <div className="flex items-start gap-2 mt-3">
                      <span className="text-gray-500">💼</span>
                      <span className="text-gray-600">{member.expertise}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Department Contacts */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-3xl">🏢</span>
              Department Contacts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                <h3 className="font-bold text-green-900 mb-2">Business Continuity Management</h3>
                <p className="text-green-800 text-sm mb-2">Contact for BCM-related reports and dashboards</p>
                <p className="text-green-700">
                  Email: <a href="mailto:bcm-team@company.com" className="hover:underline">bcm-team@company.com</a>
                </p>
              </div>
              <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
                <h3 className="font-bold text-purple-900 mb-2">Risk Management</h3>
                <p className="text-purple-800 text-sm mb-2">Contact for risk analytics and reporting</p>
                <p className="text-purple-700">
                  Email: <a href="mailto:risk-team@company.com" className="hover:underline">risk-team@company.com</a>
                </p>
              </div>
              <div className="bg-orange-50 rounded-lg p-6 border border-orange-200">
                <h3 className="font-bold text-orange-900 mb-2">Compliance</h3>
                <p className="text-orange-800 text-sm mb-2">Contact for compliance reporting and metrics</p>
                <p className="text-orange-700">
                  Email: <a href="mailto:compliance@company.com" className="hover:underline">compliance@company.com</a>
                </p>
              </div>
              <div className="bg-teal-50 rounded-lg p-6 border border-teal-200">
                <h3 className="font-bold text-teal-900 mb-2">Finance Operations</h3>
                <p className="text-teal-800 text-sm mb-2">Contact for financial reporting and analytics</p>
                <p className="text-teal-700">
                  Email: <a href="mailto:finance-ops@company.com" className="hover:underline">finance-ops@company.com</a>
                </p>
              </div>
            </div>
          </div>

          {/* Support Hours */}
          <div className="bg-blue-50 rounded-lg shadow-lg p-8 border border-blue-200">
            <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <span className="text-3xl">🕐</span>
              Support Hours
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-blue-800">
              <div>
                <p className="font-semibold mb-2">Regular Support</p>
                <p className="text-sm">Monday - Friday: 8:00 AM - 6:00 PM EST</p>
                <p className="text-sm">Response time: Within 24 business hours</p>
              </div>
              <div>
                <p className="font-semibold mb-2">Urgent Issues</p>
                <p className="text-sm">Available 24/7 for critical system outages</p>
                <p className="text-sm">Contact: IT Service Desk Emergency Line</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

