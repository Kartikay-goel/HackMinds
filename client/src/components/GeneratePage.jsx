import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Terminal, Cpu, Database, Zap, Rocket, Presentation, Copy, Server, Smartphone, Microchip } from 'lucide-react';

export default function GeneratePage({ isDarkMode, showToast }) {
  const [techStack, setTechStack] = useState('');
  const [scale, setScale] = useState('Hackathon MVP');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingPhase, setLoadingPhase] = useState(0);

  const categories = [
    { name: 'Web', icon: Server, tech: ['React', 'Next.js', 'Node.js', 'MongoDB'] },
    { name: 'Mobile', icon: Smartphone, tech: ['Android Studio', 'Kotlin', 'React Native'] },
    { name: 'Hardware', icon: Microchip, tech: ['Arduino', 'ESP32', 'Raspberry Pi'] }
  ];

  const loadingMessages = [ "Establishing Neural Link...", "Analyzing Tech Stack Limitations...", "Designing Database Schema...", "Compiling Architecture Blueprint..." ];

  useEffect(() => {
    let interval;
    if (loading) interval = setInterval(() => setLoadingPhase((prev) => (prev < loadingMessages.length - 1 ? prev + 1 : prev)), 1500);
    else setLoadingPhase(0);
    return () => clearInterval(interval);
  }, [loading]);

  const handleQuickAdd = (tech) => {
    if (!techStack.includes(tech)) setTechStack(prev => prev ? `${prev}, ${tech}` : tech);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    showToast("Source Code Copied!");
  };

  const generateArchitecture = async (e) => {
    if (e) e.preventDefault();
    if (!techStack) return;
    setLoading(true); setResult('');
    try {
      const response = await axios.post('http://localhost:5000/api/generate-project', { techStack: `Scale: ${scale}. Tech Stack: ${techStack}.` });
      setResult(response.data.data);
    } catch (error) {
      if (error.response?.status === 429) {
        showToast("Rate limit hit! Wait a moment.");
        setResult("### System Error\nRate limit exceeded. Please wait 60 seconds and try again.");
      } else {
        setResult("### Critical System Failure\nCheck your local server uplink.");
      }
    } finally {
      setLoading(false);
    }
  };

  const generatePitchDeck = async () => {
    if (!result) return;
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/generate-project', { 
        techStack: `Create a 5-slide hackathon pitch deck outline based on this exact architecture: ${result.substring(0, 500)}...` 
      });
      setResult(prev => prev + "\n\n---\n\n" + response.data.data);
      showToast("Pitch Deck Appended!");
    } catch (error) {
      showToast("Failed to generate pitch deck.");
    } finally {
      setLoading(false);
    }
  };

  const glowIntensity = Math.min(techStack.length * 2, 40); 
  const buttonGlowStyle = isDarkMode && techStack.length > 0 ? { boxShadow: `0 0 ${10 + glowIntensity}px rgba(168,85,247,${0.3 + glowIntensity/100})` } : {};

  return (
    <div className="max-w-5xl mx-auto relative z-10 pb-20">
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-4xl font-black flex items-center justify-center md:justify-start gap-3 tracking-tight text-slate-900 dark:text-[#f8fafc]">
          <Cpu className="text-[#6366f1]" size={36} /> System Architect
        </h2>
        <p className="mt-2 text-slate-500 dark:text-slate-400">Configure parameters and ignite the neural engine.</p>
      </div>
      
      <motion.form onSubmit={generateArchitecture} className={`backdrop-blur-xl border p-8 rounded-[2rem] shadow-2xl mb-12 relative overflow-hidden ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/70 border-slate-200'}`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          <div className="md:col-span-2 space-y-6">
            <div>
              <label className="flex items-center gap-2 text-xs font-bold mb-3 uppercase tracking-widest text-[#6366f1]"><Terminal size={14}/> Define Your Arsenal</label>
              <input type="text" value={techStack} onChange={(e) => setTechStack(e.target.value)} placeholder="e.g., Next.js, Android Studio, Arduino..." className={`w-full p-5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#6366f1] transition-all text-lg shadow-inner placeholder:text-slate-500 ${isDarkMode ? 'bg-[#0f172a]/80 border border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`} />
            </div>
            
            <div className="space-y-4">
              <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">Quick Inject Categories:</p>
              <div className="flex flex-col gap-3">
                {categories.map((cat) => (
                  <div key={cat.name} className="flex items-center gap-3">
                    <cat.icon size={16} className="text-slate-400" />
                    <div className="flex flex-wrap gap-2">
                      {cat.tech.map(t => (
                        <motion.button whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.9 }} type="button" key={t} onClick={() => handleQuickAdd(t)} className={`px-3 py-1 border rounded-lg text-xs font-semibold transition-all hover:shadow-[0_0_15px_rgba(99,102,241,0.5)] hover:border-[#6366f1] ${isDarkMode ? 'bg-white/5 border-white/10 text-slate-300' : 'bg-white border-slate-200 text-slate-600'}`}>+ {t}</motion.button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <label className="flex items-center gap-2 text-xs font-bold mb-3 uppercase tracking-widest text-[#a855f7]"><Database size={14}/> Project Scale</label>
            <div className="flex flex-col gap-3">
              {['Hackathon MVP', 'Startup Beta', 'Enterprise Grade'].map((s) => (
                <button type="button" key={s} onClick={() => setScale(s)} className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${scale === s ? 'bg-[#a855f7]/20 border-[#a855f7] text-[#a855f7]' : isDarkMode ? 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
                  <span className="font-semibold">{s}</span>
                  {scale === s && <Zap size={16} className="text-[#a855f7]" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t flex flex-col md:flex-row gap-4 justify-between items-center border-slate-200 dark:border-white/5">
          <div className="text-sm font-mono text-[#6366f1] h-6">
            <AnimatePresence mode="wait">
              {loading && <motion.span key={loadingPhase} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>{`> ${loadingMessages[loadingPhase]}`}</motion.span>}
            </AnimatePresence>
          </div>
          <button type="submit" disabled={loading} style={buttonGlowStyle} className="group relative flex items-center w-full md:w-auto justify-center gap-3 bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white px-10 py-4 rounded-2xl font-black text-lg transition-all hover:scale-105 disabled:opacity-50 overflow-hidden">
            <span className="relative z-10">{loading ? "Processing..." : "Ignite Architecture"}</span>
            {!loading && <Rocket size={20} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
          </button>
        </div>
      </motion.form>

      <AnimatePresence>
        {result && !loading && (
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className={`border rounded-[2rem] shadow-2xl overflow-hidden backdrop-blur-xl ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}>
            <div className={`px-6 md:px-8 py-4 border-b flex flex-wrap gap-4 justify-between items-center ${isDarkMode ? 'bg-[#0f172a]/50 border-white/5' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-rose-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
              </div>
              <div className="flex gap-3">
                <button onClick={generatePitchDeck} className={`flex items-center gap-2 text-sm font-semibold transition-colors px-4 py-2 rounded-lg text-[#a855f7] ${isDarkMode ? 'hover:text-white bg-[#a855f7]/10 hover:bg-[#a855f7]/20' : 'hover:bg-purple-100'}`}><Presentation size={16}/> <span className="hidden sm:inline">Build Pitch Deck</span></button>
                <button onClick={copyToClipboard} className={`flex items-center gap-2 text-sm font-semibold transition-colors px-4 py-2 rounded-lg ${isDarkMode ? 'text-slate-400 hover:text-white bg-white/5 hover:bg-white/10' : 'text-slate-600 hover:bg-slate-200'}`}><Copy size={16}/> <span className="hidden sm:inline">Copy Source</span></button>
              </div>
            </div>
            <div className={`p-6 md:p-10 prose max-w-none prose-headings:font-bold prose-a:text-[#6366f1] ${isDarkMode ? 'prose-invert prose-h1:text-white prose-strong:text-[#a855f7] prose-li:text-slate-300' : 'prose-slate prose-h1:text-slate-900 prose-h2:text-[#6366f1] prose-strong:text-[#6366f1]'}`}>
              <ReactMarkdown>{result}</ReactMarkdown>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}