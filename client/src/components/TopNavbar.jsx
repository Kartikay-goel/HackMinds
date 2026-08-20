import { Link, useLocation } from 'react-router-dom';
import { Code2, Home, LayoutDashboard, History, Sun, Moon, UserCircle } from 'lucide-react';

export default function TopNavbar({ isDarkMode, toggleTheme }) {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <header className={`sticky top-0 z-50 w-full backdrop-blur-xl border-b transition-colors ${isDarkMode ? 'bg-[#0f172a]/80 border-white/10' : 'bg-white/80 border-slate-200'}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        
        <Link to="/" className="flex items-center gap-3">
          <div className="bg-[#6366f1] p-2 rounded-lg shadow-lg shadow-indigo-500/30">
            <Code2 className="text-white" size={24} />
          </div>
          <span className="text-2xl font-black text-slate-900 dark:text-[#f8fafc] tracking-tighter hidden sm:block">HackMinds<span className="text-[#a855f7]">.</span></span>
        </Link>

        <nav className={`hidden md:flex items-center gap-2 p-1 rounded-2xl border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-slate-100 border-slate-200'}`}>
          {[ { path: '/', name: 'Dashboard', icon: Home }, { path: '/generate', name: 'Architect', icon: LayoutDashboard }, { path: '/history', name: 'History', icon: History } ].map((item) => (
            <Link key={item.path} to={item.path} 
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all ${isActive(item.path) ? 'bg-white dark:bg-[#0f172a] text-[#6366f1] dark:text-[#a855f7] shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white dark:hover:bg-white/5'}`}>
              <item.icon size={18} /> {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button onClick={toggleTheme} className={`p-2.5 rounded-xl transition-colors ${isDarkMode ? 'bg-white/10 text-slate-300 hover:bg-white/20' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <Link to="/profile" className="relative group">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] opacity-70 group-hover:opacity-100 animate-pulse blur-[4px] transition-opacity" />
            <div className={`relative p-2 rounded-full ${isDarkMode ? 'bg-[#0f172a]' : 'bg-white'}`}>
               <UserCircle size={24} className="text-[#6366f1]" />
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}