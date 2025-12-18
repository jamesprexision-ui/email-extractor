import { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, HelpCircle, Mail } from 'lucide-react';

interface Email {
  id: string;
  email: string;
  domain: string;
  country: string;
  source: string;
  status: 'Valid' | 'Risky' | 'Unknown';
}

interface ResultsTableProps {
  emails: Email[];
  selectedEmails: string[];
  onToggleEmail: (id: string) => void;
  onToggleAll: () => void;
}

export default function ResultsTable({ emails, selectedEmails, onToggleEmail, onToggleAll }: ResultsTableProps) {
  const [animatingIds, setAnimatingIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (emails.length > 0) {
      const latestEmail = emails[emails.length - 1];
      setAnimatingIds(prev => new Set(prev).add(latestEmail.id));
      setTimeout(() => {
        setAnimatingIds(prev => {
          const newSet = new Set(prev);
          newSet.delete(latestEmail.id);
          return newSet;
        });
      }, 500);
    }
  }, [emails]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Valid':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'Risky':
        return <AlertCircle className="w-4 h-4 text-orange-600" />;
      default:
        return <HelpCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Valid':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Risky':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  if (emails.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-12">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl flex items-center justify-center mb-6">
            <Mail className="w-12 h-12 text-indigo-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No emails extracted yet</h3>
          <p className="text-gray-500 max-w-md">
            Configure your extraction parameters and click "Start Extraction" to begin finding emails
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
            <tr>
              <th className="px-6 py-4 text-left">
                <input
                  type="checkbox"
                  checked={selectedEmails.length === emails.length && emails.length > 0}
                  onChange={onToggleAll}
                  className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                />
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Email Address
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Domain
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">
                Country
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden lg:table-cell">
                Source
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {emails.map((email) => (
              <tr
                key={email.id}
                className={`hover:bg-gray-50 transition-all duration-300 ${
                  animatingIds.has(email.id) ? 'animate-slideIn bg-indigo-50' : ''
                } ${
                  selectedEmails.includes(email.id) ? 'bg-indigo-50/50' : ''
                }`}
              >
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedEmails.includes(email.id)}
                    onChange={() => onToggleEmail(email.id)}
                    className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center">
                      <Mail className="w-4 h-4 text-indigo-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-900">{email.email}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-600">{email.domain}</span>
                </td>
                <td className="px-6 py-4 hidden md:table-cell">
                  <span className="text-sm text-gray-600">{email.country}</span>
                </td>
                <td className="px-6 py-4 hidden lg:table-cell">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-gray-100 text-gray-700">
                    {email.source}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium border ${getStatusBadge(email.status)}`}>
                    {getStatusIcon(email.status)}
                    {email.status}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>{selectedEmails.length} of {emails.length} selected</span>
          <span>{emails.length} total emails</span>
        </div>
      </div>
    </div>
  );
}
