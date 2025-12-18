import { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MetricsBar from './components/MetricsBar';
import ExtractionConfig from './components/ExtractionConfig';
import ResultsTable from './components/ResultsTable';
import ExportModal from './components/ExportModal';

interface Email {
  id: string;
  email: string;
  domain: string;
  country: string;
  source: string;
  status: 'Valid' | 'Risky' | 'Unknown';
}

function App() {
  const [activeSection, setActiveSection] = useState('extractor');
  const [isExtracting, setIsExtracting] = useState(false);
  const [emails, setEmails] = useState<Email[]>([]);
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [extractionTime, setExtractionTime] = useState(0);
  const [showExportModal, setShowExportModal] = useState(false);

  const sampleEmails = [
    { email: 'john.smith@techcorp.com', domain: 'techcorp.com', country: 'United States', source: 'Google', status: 'Valid' as const },
    { email: 'sarah.wilson@fintech.io', domain: 'fintech.io', country: 'United Kingdom', source: 'Websites', status: 'Valid' as const },
    { email: 'mike.chen@startup.co', domain: 'startup.co', country: 'Singapore', source: 'Directories', status: 'Valid' as const },
    { email: 'emma.davis@marketing.agency', domain: 'marketing.agency', country: 'Canada', source: 'Google', status: 'Valid' as const },
    { email: 'alex.brown@crypto.exchange', domain: 'crypto.exchange', country: 'United States', source: 'Websites', status: 'Risky' as const },
    { email: 'lisa.martinez@saas.tech', domain: 'saas.tech', country: 'Germany', source: 'Google', status: 'Valid' as const },
    { email: 'james.taylor@ecommerce.shop', domain: 'ecommerce.shop', country: 'Australia', source: 'Directories', status: 'Valid' as const },
    { email: 'sophia.lee@healthcare.med', domain: 'healthcare.med', country: 'United States', source: 'Websites', status: 'Valid' as const },
    { email: 'david.kim@education.online', domain: 'education.online', country: 'South Korea', source: 'Google', status: 'Unknown' as const },
    { email: 'olivia.jones@realestate.pro', domain: 'realestate.pro', country: 'United Kingdom', source: 'Websites', status: 'Valid' as const },
    { email: 'robert.white@consulting.biz', domain: 'consulting.biz', country: 'France', source: 'Directories', status: 'Valid' as const },
    { email: 'emily.clark@analytics.data', domain: 'analytics.data', country: 'United States', source: 'Google', status: 'Valid' as const },
    { email: 'michael.green@venture.capital', domain: 'venture.capital', country: 'Singapore', source: 'Websites', status: 'Valid' as const },
    { email: 'jessica.adams@design.studio', domain: 'design.studio', country: 'Canada', source: 'Google', status: 'Valid' as const },
    { email: 'chris.murphy@blockchain.dev', domain: 'blockchain.dev', country: 'United States', source: 'Directories', status: 'Risky' as const },
  ];

  const handleStartExtraction = () => {
    setIsExtracting(true);
    setEmails([]);
    setSelectedEmails([]);
    setExtractionTime(0);

    let count = 0;
    const interval = setInterval(() => {
      if (count < sampleEmails.length) {
        const newEmail = {
          ...sampleEmails[count],
          id: `email-${Date.now()}-${count}`,
        };
        setEmails((prev) => [...prev, newEmail]);
        count++;
      } else {
        clearInterval(interval);
        setIsExtracting(false);
      }
    }, 800);
  };

  useEffect(() => {
    let timer: number;
    if (isExtracting) {
      timer = setInterval(() => {
        setExtractionTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isExtracting]);

  const handleToggleEmail = (id: string) => {
    setSelectedEmails((prev) =>
      prev.includes(id) ? prev.filter((emailId) => emailId !== id) : [...prev, id]
    );
  };

  const handleToggleAll = () => {
    if (selectedEmails.length === emails.length) {
      setSelectedEmails([]);
    } else {
      setSelectedEmails(emails.map((email) => email.id));
    }
  };

  const handleExport = (format: string, exportAll: boolean) => {
    const emailsToExport = exportAll ? emails : emails.filter((email) => selectedEmails.includes(email.id));
    console.log(`Exporting ${emailsToExport.length} emails as ${format}`);
  };

  const validEmails = emails.filter((email) => email.status === 'Valid').length;
  const duplicatesRemoved = Math.floor(emails.length * 0.15);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50/30 to-purple-50/30">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <Header />

      <main className="md:ml-20 mt-20 p-4 md:p-8 pb-24 md:pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Email Extractor
            </h1>
            <p className="text-gray-600">
              Extract verified email addresses from multiple sources with advanced filtering
            </p>
          </div>

          <MetricsBar
            totalEmails={emails.length}
            validEmails={validEmails}
            duplicatesRemoved={duplicatesRemoved}
            extractionTime={extractionTime}
            isExtracting={isExtracting}
          />

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
            <div className="xl:col-span-1">
              <ExtractionConfig
                onStartExtraction={handleStartExtraction}
                isExtracting={isExtracting}
              />
            </div>

            <div className="xl:col-span-2">
              <ResultsTable
                emails={emails}
                selectedEmails={selectedEmails}
                onToggleEmail={handleToggleEmail}
                onToggleAll={handleToggleAll}
              />

              {emails.length > 0 && (
                <div className="mt-6 flex items-center justify-between bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
                  <div className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-900">{selectedEmails.length}</span> emails selected
                  </div>
                  <button
                    onClick={() => setShowExportModal(true)}
                    disabled={selectedEmails.length === 0 && emails.length === 0}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-200 hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Download className="w-5 h-5" />
                    Export Emails
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        selectedCount={selectedEmails.length}
        totalCount={emails.length}
        onExport={handleExport}
      />
    </div>
  );
}

export default App;
