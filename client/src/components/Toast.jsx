import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

export default function Toast({ message, isVisible }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.9 }} 
          animate={{ opacity: 1, y: 0, scale: 1 }} 
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="fixed bottom-10 right-10 z-50 flex items-center gap-3 bg-[#6366f1] text-white px-6 py-4 rounded-2xl shadow-[0_0_30px_rgba(99,102,241,0.5)] font-bold tracking-wide border border-white/20"
        >
          <Check size={20} /> {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}