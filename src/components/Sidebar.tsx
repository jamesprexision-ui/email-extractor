import { Mail, Search, FileText, Download, Settings, LayoutDashboard } from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'extractor', icon: Mail, label: 'Email Extractor' },
    { id: 'saved', icon: Search, label: 'Saved Searches' },
    { id: 'exports', icon: Download, label: 'Exports' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <>
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-20 bg-gradient-to-b from-indigo-50 to-purple-50 border-r border-indigo-100 flex-col items-center py-8 z-30">
        <div className="mb-12">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200">
            <Mail className="w-6 h-6 text-white" />
          </div>
        </div>

        <nav className="flex-1 flex flex-col gap-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`group relative w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                  isActive
                    ? 'bg-white shadow-lg shadow-indigo-200 scale-105'
                    : 'hover:bg-white/60 hover:scale-105'
                }`}
                title={item.label}
              >
                <Icon
                  className={`w-6 h-6 transition-colors duration-300 ${
                    isActive ? 'text-indigo-600' : 'text-gray-600 group-hover:text-indigo-600'
                  }`}
                />
                {isActive && (
                  <div className="absolute left-0 w-1 h-8 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-r-full" />
                )}
              </button>
            );
          })}
        </nav>
      </aside>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-indigo-100 z-30">
        <nav className="flex justify-around py-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-300 ${
                  isActive ? 'text-indigo-600' : 'text-gray-600'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{item.label.split(' ')[0]}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
}
