import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your newly created modular components
import TopNavbar from './components/TopNavbar';
import Toast from './components/Toast';
import HomePage from './components/HomePage';
import GeneratePage from './components/GeneratePage';
import ProfilePage from './components/ProfilePage';
import HistoryPage from './components/HistoryPage';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);

  const showToast = (message) => {
    setToastMessage(message); 
    setIsToastVisible(true);
    setTimeout(() => setIsToastVisible(false), 3000);
  };

  return (
    <Router>
      <div className={`${isDarkMode ? 'dark' : ''}`}>
        <div className={`flex flex-col min-h-screen font-sans overflow-x-hidden transition-colors duration-500 ${isDarkMode ? 'bg-[#0f172a] text-[#f8fafc]' : 'bg-slate-50 text-slate-900'}`}>
          
          {/* Animated Grid Overlay Background */}
          <div className={`fixed inset-0 z-0 pointer-events-none transition-opacity duration-1000 ${isDarkMode ? 'opacity-20' : 'opacity-5'}`} 
               style={{ backgroundImage: `linear-gradient(to right, ${isDarkMode ? '#ffffff' : '#000000'} 1px, transparent 1px), linear-gradient(to bottom, ${isDarkMode ? '#ffffff' : '#000000'} 1px, transparent 1px)`, backgroundSize: '40px 40px', maskImage: 'radial-gradient(ellipse 60% 60% at 50% 0%, black 10%, transparent 100%)' }} />
          
          <Toast message={toastMessage} isVisible={isToastVisible} />
          
          {/* Top Navigation */}
          <TopNavbar isDarkMode={isDarkMode} toggleTheme={() => setIsDarkMode(!isDarkMode)} />
          
          {/* Main Routing Content Container */}
          <main className="flex-1 w-full max-w-7xl mx-auto p-6 md:p-12 relative z-10">
            <Routes>
              <Route path="/" element={<HomePage isDarkMode={isDarkMode} />} />
              <Route path="/generate" element={<GeneratePage isDarkMode={isDarkMode} showToast={showToast} />} />
              <Route path="/profile" element={<ProfilePage isDarkMode={isDarkMode} showToast={showToast} />} />
              <Route path="/history" element={<HistoryPage isDarkMode={isDarkMode} />} />
            </Routes>
          </main>
          
        </div>
      </div>
    </Router>
  );
}