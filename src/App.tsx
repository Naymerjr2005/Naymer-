/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Menu, X, Zap, Coins, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [points, setPoints] = useState(823);
  const [energy, setEnergy] = useState(100);
  const [maxEnergy] = useState(100);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [tapAnimations, setTapAnimations] = useState<{ id: number; x: number; y: number }[]>([]);

  // Energy Regeneration: +1 every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setEnergy((prev) => Math.min(prev + 1, maxEnergy));
    }, 3000);
    return () => clearInterval(timer);
  }, [maxEnergy]);

  const handleTap = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (energy > 0) {
      setPoints((prev) => prev + 1);
      setEnergy((prev) => prev - 1);

      // Animation logic
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      
      const newTap = { id: Date.now(), x: clientX, y: clientY };
      setTapAnimations((prev) => [...prev, newTap]);
      
      setTimeout(() => {
        setTapAnimations((prev) => prev.filter((tap) => tap.id !== newTap.id));
      }, 1000);
    }
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-purple-500/30">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-black/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-fuchsia-500 to-purple-800 flex items-center justify-center border border-white/10 shadow-[0_0_15px_rgba(217,70,239,0.4)]">
            <span className="text-cyan-400 font-black text-xl italic">V</span>
          </div>
          <span className="text-purple-500 font-extrabold text-2xl tracking-wider">VERSE</span>
        </div>
        <button 
          onClick={toggleMenu}
          className="p-2 hover:bg-white/5 rounded-lg transition-colors"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </header>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-4 top-16 w-48 bg-[#111] border border-purple-500/50 rounded-xl overflow-hidden z-40 shadow-2xl shadow-purple-500/20"
          >
            <a href="http://hub.vgdh.io" target="_blank" rel="noreferrer" className="block p-3 hover:bg-purple-500/10 border-b border-white/5 transition-colors">Hub</a>
            <a href="https://t.me/GetVerse/486213" target="_blank" rel="noreferrer" className="block p-3 hover:bg-purple-500/10 border-b border-white/5 transition-colors">Vibe Coding</a>
            <a href="https://x.com/VerseEcosystem" target="_blank" rel="noreferrer" className="block p-3 hover:bg-purple-500/10 transition-colors">Follow Twitter</a>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-md mx-auto p-4">
        {/* Main Card */}
        <div className="bg-[#050505] border border-purple-900/30 rounded-[40px] p-8 text-center shadow-inner">
          <h1 className="text-3xl font-bold mb-1">Verse Empire</h1>
          <p className="text-purple-500 text-sm mb-8">Mentor: JT @stone_brb</p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-10">
            <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center">
              <div className="flex items-center gap-2 text-2xl font-bold">
                <Coins className="text-orange-500" size={20} />
                <span>{points.toLocaleString()}</span>
              </div>
              <span className="text-[10px] text-gray-500 mt-1 tracking-widest uppercase">Verse Pts</span>
            </div>

            <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center">
              <div className="flex items-center gap-2 text-2xl font-bold">
                <Zap className="text-yellow-400 fill-yellow-400" size={20} />
                <span>{energy}</span>
              </div>
              <span className="text-[10px] text-gray-500 mt-1 tracking-widest uppercase">Energy</span>
            </div>
          </div>

          {/* Coin Tapper */}
          <div className="relative flex justify-center mb-12">
            <motion.div
              whileTap={{ scale: 0.92 }}
              onClick={handleTap}
              className="w-48 h-48 rounded-full bg-gradient-to-br from-orange-400 to-orange-700 flex items-center justify-center cursor-pointer select-none shadow-[0_0_50px_rgba(247,147,26,0.3)] border-4 border-orange-500/20"
            >
              <span className="text-8xl font-bold text-white drop-shadow-lg">₿</span>
            </motion.div>

            {/* Tap Animations */}
            {tapAnimations.map((tap) => (
              <motion.span
                key={tap.id}
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 0, y: -100 }}
                className="absolute text-2xl font-bold text-white pointer-events-none z-50"
                style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
              >
                +1
              </motion.span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <a 
              href="https://t.me/GetVerse/177601" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center justify-center gap-3 bg-[#111] border border-white/5 p-4 rounded-2xl font-semibold hover:bg-white/5 transition-all active:scale-[0.98]"
            >
              <Send size={18} className="text-sky-500" />
              Verse Main Group
            </a>
            <a 
              href="https://t.me/GetVerse/476423" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center justify-center gap-3 bg-[#111] border border-white/5 p-4 rounded-2xl font-semibold hover:bg-white/5 transition-all active:scale-[0.98]"
            >
              <Send size={18} className="text-sky-500" />
              Verse Research Group
            </a>
          </div>
        </div>
      </main>

      {/* Energy Warning */}
      {energy === 0 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-red-500/90 text-white px-6 py-2 rounded-full text-sm font-bold animate-bounce">
          Energy empty! Wait for recharge.
        </div>
      )}
    </div>
  );
}
