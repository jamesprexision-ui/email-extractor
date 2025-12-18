import { useState } from 'react';
import { X, ChevronDown, Plus, Play, Loader2 } from 'lucide-react';

interface ExtractionConfigProps {
  onStartExtraction: (config: any) => void;
  isExtracting: boolean;
}

export default function ExtractionConfig({ onStartExtraction, isExtracting }: ExtractionConfigProps) {
  const [keywords, setKeywords] = useState<string[]>(['marketing', 'crypto']);
  const [keywordInput, setKeywordInput] = useState('');
  const [selectedCountries, setSelectedCountries] = useState<string[]>(['United States', 'United Kingdom']);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>(['Fintech', 'SaaS']);
  const [emailTypes, setEmailTypes] = useState({ business: true, personal: false, generic: true, role: true });
  const [sources, setSources] = useState({ google: true, websites: true, social: false, directories: true });
  const [showAdvanced, setShowAdvanced] = useState(false);

  const countries = ['United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France', 'India', 'Singapore'];
  const industries = ['Fintech', 'SaaS', 'E-commerce', 'Healthcare', 'Education', 'Marketing', 'Real Estate', 'Crypto'];

  const addKeyword = () => {
    if (keywordInput.trim() && !keywords.includes(keywordInput.trim())) {
      setKeywords([...keywords, keywordInput.trim()]);
      setKeywordInput('');
    }
  };

  const removeKeyword = (keyword: string) => {
    setKeywords(keywords.filter(k => k !== keyword));
  };

  const toggleCountry = (country: string) => {
    setSelectedCountries(prev =>
      prev.includes(country) ? prev.filter(c => c !== country) : [...prev, country]
    );
  };

  const toggleIndustry = (industry: string) => {
    setSelectedIndustries(prev =>
      prev.includes(industry) ? prev.filter(i => i !== industry) : [...prev, industry]
    );
  };

  const handleStartExtraction = () => {
    onStartExtraction({
      keywords,
      countries: selectedCountries,
      industries: selectedIndustries,
      emailTypes,
      sources,
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Extraction Configuration</h2>
        <p className="text-sm text-gray-500">Configure your email extraction parameters</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Keywords</label>
          <div className="flex flex-wrap gap-2 mb-3">
            {keywords.map((keyword, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl text-sm font-medium text-indigo-700"
              >
                {keyword}
                <button onClick={() => removeKeyword(keyword)} className="hover:text-indigo-900">
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addKeyword()}
              placeholder="Add keywords (e.g., hr, sales, ceo)"
              className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <button
              onClick={addKeyword}
              className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors duration-200"
            >
              <Plus className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Countries</label>
            <div className="relative">
              <button className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-left flex items-center justify-between hover:bg-gray-100 transition-colors duration-200">
                <span className="text-gray-700">{selectedCountries.length} selected</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
              <div className="mt-2 max-h-40 overflow-y-auto bg-white border border-gray-200 rounded-xl p-2">
                {countries.map((country) => (
                  <label
                    key={country}
                    className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCountries.includes(country)}
                      onChange={() => toggleCountry(country)}
                      className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                    />
                    <span className="text-sm text-gray-700">{country}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Industries</label>
            <div className="flex flex-wrap gap-2">
              {industries.map((industry) => (
                <button
                  key={industry}
                  onClick={() => toggleIndustry(industry)}
                  className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    selectedIndustries.includes(industry)
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {industry}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Email Types</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.entries(emailTypes).map(([key, value]) => (
              <label
                key={key}
                className="flex items-center gap-2 px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl cursor-pointer transition-colors duration-200"
              >
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => setEmailTypes({ ...emailTypes, [key]: e.target.checked })}
                  className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                />
                <span className="text-sm font-medium text-gray-700 capitalize">{key}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Data Sources</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.entries(sources).map(([key, value]) => (
              <button
                key={key}
                onClick={() => setSources({ ...sources, [key]: !value })}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  value
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors duration-200"
          >
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showAdvanced ? 'rotate-180' : ''}`} />
            Advanced Filters
          </button>

          {showAdvanced && (
            <div className="mt-4 p-4 bg-gray-50 rounded-xl space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Validity Score</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  defaultValue="70"
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Any</span>
                  <span>70%</span>
                  <span>100%</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Domain Authority Range</label>
                <div className="flex gap-3">
                  <input
                    type="number"
                    placeholder="Min"
                    className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500" />
                <span className="text-sm text-gray-700">Exclude free email providers (Gmail, Yahoo, etc.)</span>
              </label>
            </div>
          )}
        </div>

        <button
          onClick={handleStartExtraction}
          disabled={isExtracting}
          className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-2xl shadow-lg shadow-indigo-200 hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        >
          {isExtracting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Extracting...
            </>
          ) : (
            <>
              <Play className="w-5 h-5" />
              Start Extraction
            </>
          )}
        </button>
      </div>
    </div>
  );
}
