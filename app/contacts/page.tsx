'use client';

import { useState, useMemo } from 'react';
import configData from '@/data/config.json';
import { ProcessOwner } from '@/types/report';

function groupOwnersByTeam(owners: ProcessOwner[]) {
  return owners.reduce<Record<string, ProcessOwner[]>>((acc, owner) => {
    const team = owner.team || 'Other';
    if (!acc[team]) {
      acc[team] = [];
    }
    acc[team].push(owner);
    return acc;
  }, {});
}

export default function ContactsPage() {
  const processOwners = (configData.processOwners ?? []) as ProcessOwner[];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTeam, setSelectedTeam] = useState<string>('all');

  // Get unique teams
  const allTeams = useMemo(() => {
    const teams = new Set(processOwners.map(owner => owner.team));
    return Array.from(teams).sort();
  }, [processOwners]);

  // Filter owners based on search and team
  const filteredOwners = useMemo(() => {
    return processOwners.filter(owner => {
      const matchesSearch = searchQuery === '' || 
        owner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        owner.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        owner.email.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTeam = selectedTeam === 'all' || owner.team === selectedTeam;
      
      return matchesSearch && matchesTeam;
    });
  }, [processOwners, searchQuery, selectedTeam]);

  const ownersByTeam = groupOwnersByTeam(filteredOwners);
  const teamNames = Object.keys(ownersByTeam).sort();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative -mt-20 pt-32 pb-12 hero-gradient text-white">
        <div className="max-w-[1400px] mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Contacts</h1>
          <p className="text-lg text-white text-opacity-90">
            Get in touch with FDM process owners and support teams
          </p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 py-12">
        <div className="space-y-8">
          {/* General Contact Section */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
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

            </div>
          </div>

          {/* Process Owner Directory */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Process Owner Directory
            </h2>

            {/* Search and Filter Controls */}
            <div className="mb-6 flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search by name, title, or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="md:w-64">
                <select
                  value={selectedTeam}
                  onChange={(e) => setSelectedTeam(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Teams</option>
                  {allTeams.map((team) => (
                    <option key={team} value={team}>
                      {team}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results Count */}
            <p className="text-sm text-gray-600 mb-4">
              Showing {filteredOwners.length} of {processOwners.length} contacts
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredOwners.map((owner) => (
                <div
                  key={owner.eid}
                  className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{owner.name}</h3>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-semibold">
                      {owner.team}
                    </span>
                  </div>
                  <p className="text-blue-600 font-semibold mb-4">{owner.title}</p>

                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-gray-500 uppercase mb-1">EID</span>
                      <span className="text-gray-900">{owner.eid}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-gray-500 uppercase mb-1">Email</span>
                      <a
                        href={`mailto:${owner.email}`}
                        className="text-blue-600 hover:text-blue-800 hover:underline break-all"
                      >
                        {owner.email}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredOwners.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No contacts found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

