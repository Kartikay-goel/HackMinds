import { useState } from 'react';
import { motion } from 'framer-motion';
import { UserCircle, Save } from 'lucide-react';

export default function ProfilePage({ isDarkMode, showToast }) {
  const [name, setName] = useState('Kartikay Goel');
  const [role, setRole] = useState('Student at VIT Bhopal University');
  const [github, setGithub] = useState('Kartikay-goel');

  const handleSaveProfile = (e) => {
    e.preventDefault();
    showToast("Profile Successfully Updated!");
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-4xl font-black flex items-center justify-center md:justify-start gap-3 tracking-tight text-slate-900 dark:text-white">
          <UserCircle className="text-[#6366f1]" size={36} /> Developer Profile
        </h2>
        <p className="mt-2 text-slate-500 dark:text-slate-400">Manage your identity and system preferences.</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`backdrop-blur-2xl border p-6 md:p-10 rounded-[2rem] shadow-2xl ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/70 border-slate-200'}`}>
        <div className="flex flex-col md:flex-row items-center gap-8 mb-10 pb-10 border-b border-slate-200 dark:border-white/10 text-center md:text-left">
          <div className="w-32 h-32 shrink-0 rounded-full bg-gradient-to-br from-[#6366f1] to-[#a855f7] p-1 shadow-[0_0_30px_rgba(99,102,241,0.3)]">
            <div className={`w-full h-full rounded-full flex items-center justify-center ${isDarkMode ? 'bg-[#0f172a]' : 'bg-white'}`}>
              <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#6366f1] to-[#a855f7]">{name ? name.charAt(0) : 'D'}</span>
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{name || 'Developer Name'}</h3>
            <p className="text-lg text-slate-500 dark:text-slate-400 mt-1">{role || 'Add a role...'}</p>
          </div>
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">Display Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={`w-full p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6366f1] transition-all ${isDarkMode ? 'bg-[#0f172a]/80 border border-white/10 text-white' : 'bg-slate-50 border border-slate-200 text-slate-900'}`} />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">Current Role / Education</label>
              <input type="text" value={role} onChange={(e) => setRole(e.target.value)} className={`w-full p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6366f1] transition-all ${isDarkMode ? 'bg-[#0f172a]/80 border border-white/10 text-white' : 'bg-slate-50 border border-slate-200 text-slate-900'}`} />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">GitHub Username</label>
              <div className="relative">
                <span className="absolute left-4 top-4 text-slate-400">@</span>
                <input type="text" value={github} onChange={(e) => setGithub(e.target.value)} className={`w-full pl-10 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6366f1] transition-all ${isDarkMode ? 'bg-[#0f172a]/80 border border-white/10 text-white' : 'bg-slate-50 border border-slate-200 text-slate-900'}`} />
              </div>
            </div>
          </div>
          <div className="pt-8 mt-8 border-t border-slate-200 dark:border-white/10 flex justify-end">
            <button type="submit" className="flex w-full md:w-auto justify-center items-center gap-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] hover:-translate-y-1">
              <Save size={20} /> Save Changes
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}