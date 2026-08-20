import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import { Rocket, ChevronDown, Layers, Database, Presentation, Target, Brain } from 'lucide-react';

export default function HomePage({ isDarkMode }) {
  const subheadings = [
    "Stop brainstorming in the dark. Inject your tech stack and let our Gen-AI synthesize a production-ready, massive-scale software architecture in milliseconds.",
    "Transform raw tech stacks into massive, scalable software blueprints with neural precision.",
    "Synthesize production-ready architectures for your next big hackathon win in seconds.",
    "Bridge the gap between ideation and production with AI-driven, real-time architecture design."
  ];

  const [subIndex, setSubIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setSubIndex((prev) => (prev + 1) % subheadings.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const features = [
    { 
      icon: Layers, title: "System Architecture", desc: "Generates production-ready blueprints, gracefully handling everything from monolithic to complex microservices.",
      themeColor: "text-[#6366f1]", iconBg: "from-[#6366f1] to-purple-500", shadowHover: "group-hover:shadow-[0_0_40px_rgba(99,102,241,0.2)]", titleHover: "group-hover:text-[#6366f1]"
    },
    { 
      icon: Database, title: "Schema Design", desc: "Optimized, scalable data models tailored specifically for your chosen relational or NoSQL databases.",
      themeColor: "text-[#c026d3]", iconBg: "from-[#c026d3] to-pink-500", shadowHover: "group-hover:shadow-[0_0_40px_rgba(192,38,211,0.2)]", titleHover: "group-hover:text-[#c026d3]"
    },
    { 
      icon: Presentation, title: "Pitch Synthesis", desc: "Instantly create presentation outlines and elevator pitches tailored to impress hackathon judges and recruiters.",
      themeColor: "text-[#06b6d4]", iconBg: "from-[#06b6d4] to-blue-500", shadowHover: "group-hover:shadow-[0_0_40px_rgba(6,182,212,0.2)]", titleHover: "group-hover:text-[#06b6d4]"
    }
  ];

  const steps = [
    { step: "01", title: "Define Arsenal", desc: "Input your specific languages, hardware, and frameworks—whether it's React, C++, or Arduino." },
    { step: "02", title: "Set Scale", desc: "Choose the exact scope of your build, from a rapid weekend prototype to an enterprise-grade system." },
    { step: "03", title: "Ignite Engine", desc: "Our Gen-AI analyzes your stack and generates a comprehensive, battle-tested architectural markdown." }
  ];

  return (
    <div className="flex flex-col gap-24 pb-32">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center min-h-[85vh] text-center relative px-4">
        
        <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
          <div className={`relative p-6 rounded-full mb-8 border backdrop-blur-xl ${isDarkMode ? 'bg-[#0f172a]/90 border-[#a855f7]/30 shadow-[0_0_60px_rgba(168,85,247,0.4)]' : 'bg-white/80 border-indigo-200 shadow-2xl'}`}>
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#6366f1] to-[#a855f7] opacity-20 blur-md"></div>
            <Brain size={55} className={`relative z-10 ${isDarkMode ? "text-[#a855f7]" : "text-[#6366f1]"}`} strokeWidth={1.5} />
          </div>
        </motion.div>
        
        <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight text-slate-900 dark:text-[#f8fafc] min-h-[180px] md:min-h-0">
          <Typewriter options={{ strings: [`Architect the <span style="color: #6366f1; text-shadow: 0 0 30px rgba(99,102,241,0.6)">Future.</span>`, `Build the <span style="color: #a855f7; text-shadow: 0 0 30px rgba(168,85,247,0.6)">Unbuildable.</span>`], autoStart: true, loop: true, delay: 60, deleteSpeed: 30, cursorClassName: 'Typewriter__cursor text-[#6366f1] animate-pulse' }} />
        </h1>

        <div className="relative w-full max-w-3xl h-[100px] flex items-center justify-center mb-12 overflow-hidden px-4">
          <AnimatePresence>
            <motion.p 
              key={subIndex} initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -60 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute text-xl leading-relaxed font-light text-slate-600 dark:text-slate-400 w-full text-center"
            >
              {subheadings[subIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
        
        <Link to="/generate">
          <button className="group relative px-12 py-5 font-extrabold rounded-full text-lg transition-all overflow-hidden bg-[#6366f1] text-white shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_40px_rgba(99,102,241,0.7)] hover:-translate-y-1">
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <span className="flex items-center gap-3 relative z-10">
              Initialize Engine <Rocket size={22} className="transition-transform duration-300 group-hover:-translate-y-2 group-hover:translate-x-2" />
            </span>
          </button>
        </Link>

        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-10 text-slate-400">
          <ChevronDown size={32} opacity={0.5} />
        </motion.div>
      </motion.div>

      <section className="w-full max-w-6xl mx-auto px-4 z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-slate-900 dark:text-white">Engine Capabilities</h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">Everything you need to turn a fragmented idea into a structured engineering plan.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feat, idx) => (
            <motion.div key={idx} whileHover={{ y: -8 }} className={`group relative rounded-[2rem] overflow-hidden transition-all duration-500 ${feat.shadowHover} ${isDarkMode ? 'bg-white/5' : 'bg-slate-200'}`}>
              <div className={`absolute top-1/2 left-1/2 w-[250%] h-[250%] -translate-x-1/2 -translate-y-1/2 animate-[spin_2.5s_linear_infinite] bg-[conic-gradient(transparent_70%,currentColor_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 ${feat.themeColor}`} />
              <div className={`relative z-10 m-[1px] p-8 rounded-[calc(2rem-1px)] h-[calc(100%-2px)] ${isDarkMode ? 'bg-[#0f172a]' : 'bg-white'}`}>
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feat.iconBg} flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/20 transition-transform duration-500 group-hover:scale-110`}>
                  <feat.icon className="text-white" size={28} />
                </div>
                <h3 className={`text-2xl font-bold mb-3 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-slate-900'} ${feat.titleHover}`}>{feat.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed transition-colors duration-300">{feat.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="w-full max-w-6xl mx-auto px-4 z-10">
        <div className={`p-10 md:p-16 rounded-[3rem] border backdrop-blur-xl shadow-2xl relative overflow-hidden ${isDarkMode ? 'bg-[#0a0a0f]/80 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#ec4899]" />
          <div className="flex flex-col md:flex-row justify-between gap-12 relative z-10">
            <div className="md:w-1/3">
              <h2 className="text-4xl font-black mb-4 tracking-tight text-slate-900 dark:text-white flex items-center gap-3"><Target className="text-[#a855f7]" size={36}/> The Pipeline</h2>
              <p className="text-lg text-slate-500 dark:text-slate-400">A seamless three-step protocol designed for rapid development execution.</p>
            </div>
            <div className="md:w-2/3 flex flex-col gap-8">
              {steps.map((step, idx) => (
                <div key={idx} className="flex gap-6 items-start">
                  <div className="text-3xl font-black text-[#6366f1] opacity-50 font-mono mt-1">{step.step}</div>
                  <div>
                    <h4 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">{step.title}</h4>
                    <p className="text-slate-600 dark:text-slate-400">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="text-center px-4 z-10">
        <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-slate-900 dark:text-white">Ready to crush your next build?</h2>
        <p className="text-xl text-slate-500 dark:text-slate-400 mb-10 max-w-xl mx-auto">Generate a world-class system architecture and outpace the competition before writing a single line of code.</p>
        <Link to="/generate">
          <button className="px-10 py-4 font-bold rounded-2xl text-lg transition-all bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-slate-200 shadow-xl hover:scale-105">
            Launch System Architect &rarr;
          </button>
        </Link>
      </section>
    </div>
  );
}