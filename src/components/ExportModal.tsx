import { X, FileText, Table, Download, Copy, CheckCircle } from 'lucide-react';
import { useState } from 'react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCount: number;
  totalCount: number;
  onExport: (format: string, exportAll: boolean) => void;
}

export default function ExportModal({ isOpen, onClose, selectedCount, totalCount, onExport }: ExportModalProps) {
  const [exportAll, setExportAll] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  if (!isOpen) return null;

  const handleExport = (format: string) => {
    onExport(format, exportAll);
    setExportSuccess(true);
    setTimeout(() => {
      setExportSuccess(false);
      onClose();
    }, 1500);
  };

  const exportOptions = [
    { id: 'csv', label: 'CSV File', icon: FileText, description: 'Comma-separated values', color: 'from-green-500 to-emerald-500' },
    { id: 'excel', label: 'Excel File', icon: Table, description: 'Microsoft Excel format', color: 'from-blue-500 to-cyan-500' },
    { id: 'txt', label: 'Text File', icon: FileText, description: 'Plain text format', color: 'from-gray-500 to-slate-500' },
    { id: 'clipboard', label: 'Copy to Clipboard', icon: Copy, description: 'Copy emails to clipboard', color: 'from-purple-500 to-pink-500' },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scaleIn">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-3xl">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Export Emails</h2>
            <p className="text-sm text-gray-500 mt-1">Choose your preferred export format</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {exportSuccess ? (
          <div className="p-12 flex flex-col items-center justify-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4 animate-bounce">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Export Successful!</h3>
            <p className="text-gray-500">Your emails have been exported</p>
          </div>
        ) : (
          <>
            <div className="p-6">
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-2xl p-4 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-700">Export Selection</span>
                  <button
                    onClick={() => setExportAll(!exportAll)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                      exportAll ? 'bg-indigo-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                        exportAll ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className={`${exportAll ? 'text-gray-500' : 'text-indigo-700 font-semibold'}`}>
                    Selected only ({selectedCount})
                  </span>
                  <span className={`${exportAll ? 'text-indigo-700 font-semibold' : 'text-gray-500'}`}>
                    All emails ({totalCount})
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {exportOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.id}
                      onClick={() => handleExport(option.id)}
                      className="group relative overflow-hidden bg-white border-2 border-gray-200 hover:border-indigo-300 rounded-2xl p-6 text-left transition-all duration-300 hover:shadow-lg hover:scale-105"
                    >
                      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${option.color} opacity-0 group-hover:opacity-10 rounded-full blur-2xl transition-opacity duration-300`}></div>
                      <div className="relative">
                        <div className={`w-12 h-12 bg-gradient-to-br ${option.color} rounded-xl flex items-center justify-center mb-4`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-1">{option.label}</h3>
                        <p className="text-sm text-gray-500">{option.description}</p>
                        <div className="mt-3 flex items-center gap-2 text-indigo-600 font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Download className="w-4 h-4" />
                          Export now
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 rounded-b-3xl">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Exporting <span className="font-semibold">{exportAll ? totalCount : selectedCount}</span> emails
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 rounded-xl transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
