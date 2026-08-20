import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { History, Trash2 } from 'lucide-react';

export default function HistoryPage({ isDarkMode }) {
  const [history, setHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true);

  const fetchHistory = () => {
    axios.get('http://localhost:5000/api/projects')
      .then(res => setHistory(res.data))
      .catch(() => console.error("Failed to fetch history"))
      .finally(() => setLoadingHistory(false));
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleDelete = async (id) => {
    setHistory(history.filter(project => project._id !== id));
    try {
      await axios.delete(`http://localhost:5000/api/projects/${id}`);
    } catch (error) {
      console.error("Delete failed", error);
      fetchHistory(); 
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-20">
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-4xl font-black flex items-center justify-center md:justify-start gap-3 tracking-tight text-slate-900 dark:text-[#f8fafc]">
          <History className="text-[#6366f1]" size={36} /> Project History
        </h2>
      </div>

      {loadingHistory ? (
        <div className="text-center py-20 text-[#6366f1] animate-pulse font-bold tracking-widest">ACCESSING DATABASE...</div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {history.length > 0 ? history.map((proj) => (
            <motion.div key={proj._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.9 }} className={`group relative p-6 md:p-8 rounded-3xl border backdrop-blur-xl shadow-lg ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}>
              <button onClick={() => handleDelete(proj._id)} className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100">
                <Trash2 size={20} />
              </button>
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-bold text-[#6366f1] uppercase tracking-widest">{new Date(proj.createdAt).toLocaleDateString()}</span>
              </div>
              <h3 className="text-xl font-bold mb-4 dark:text-white pr-10">Arsenal: {proj.techStack}</h3>
              <div className={`prose prose-sm max-w-none ${isDarkMode ? 'prose-invert' : 'prose-slate'}`}>
                <ReactMarkdown>{proj.aiResponse.substring(0, 300) + "..."}</ReactMarkdown>
              </div>
            </motion.div>
          )) : (
            <div className="text-center py-20 text-slate-500 font-medium">No project logs found in memory.</div>
          )}
        </div>
      )}
    </div>
  );
}