import React, { useState, useEffect } from 'react';

interface CinematicLaunchPortalProps {
  onLaunchComplete?: () => void;
  onComplete?: () => void;
}

export const CinematicLaunchPortal: React.FC<CinematicLaunchPortalProps> = ({ onLaunchComplete, onComplete }) => {
  const [phase, setPhase] = useState<'dot' | 'glide' | 'flame'>('dot');

  const handleFinish = () => {
    if (onLaunchComplete) onLaunchComplete();
    if (onComplete) onComplete();
  };

  useEffect(() => {
    // Phase 1: Pure black with pulsing blue dot beacon (0ms - 1000ms)
    const t1 = setTimeout(() => {
      setPhase('glide'); // Phase 2: Map glide and zoom (1000ms - 2200ms)
    }, 1000);

    const t2 = setTimeout(() => {
      setPhase('flame'); // Phase 3: Morph directly into the unified Holy Flame (2200ms - 3200ms)
    }, 2200);

    const t3 = setTimeout(() => {
      handleFinish(); // Complete handoff to WelcomeSanctuary
    }, 3200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onLaunchComplete, onComplete]);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black select-none pointer-events-auto flex items-center justify-center">
      <style>{`
        @keyframes beaconPulse {
          0% {
            transform: scale(0.9);
            opacity: 0.9;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            transform: scale(3.8);
            opacity: 0;
          }
        }
        .animate-beacon-pulse {
          animation: beaconPulse 2s cubic-bezier(0, 0.2, 0.8, 1) infinite;
        }
      `}</style>

      {/* Background: Dark High-Contrast San Antonio Map */}
      <div 
        className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-out ${
          phase === 'dot' ? 'opacity-0 scale-90' : 'opacity-40 scale-100'
        }`}
        style={{
          backgroundImage: `radial-gradient(circle at center, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.95) 100%), url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1920&q=80')`,
          filter: 'grayscale(100%) contrast(140%) brightness(55%)'
        }}
      />

      {/* Centerpiece Container */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Living Water / Blue Dot Pulse (Phases: dot & glide) */}
        {phase !== 'flame' && (
          <div className="relative flex items-center justify-center w-24 h-24">
            {/* Outward Concentric Pulse Wave 1 */}
            <div className="absolute w-12 h-12 rounded-full border border-cyan-400 animate-beacon-pulse" />
            {/* Outward Concentric Pulse Wave 2 */}
            <div 
              className="absolute w-12 h-12 rounded-full border border-cyan-300 animate-beacon-pulse" 
              style={{ animationDelay: '0.75s' }} 
            />
            
            {/* Solid Radiant Blue Beacon Core */}
            <div 
              className="w-5 h-5 rounded-full bg-cyan-400 shadow-[0_0_35px_12px_rgba(6,182,212,0.75)] transition-transform duration-700 ease-out"
              style={{
                transform: phase === 'glide' ? 'scale(1.25)' : 'scale(1.0)'
              }}
            />
          </div>
        )}

        {/* Single Unified YoungFire Holy Flame & JHOW Insignia (Phase: flame) */}
        {phase === 'flame' && (
          <div className="flex flex-col items-center animate-fade-in transition-all duration-700">
            <div className="relative w-24 h-24 flex items-center justify-center">
              {/* Outer Golden/Amber Aura Glow */}
              <div className="absolute inset-0 rounded-full bg-amber-500/20 blur-xl scale-125" />
              
              {/* Holy Flame SVG */}
              <svg 
                viewBox="0 0 100 120" 
                className="w-20 h-20 drop-shadow-[0_0_25px_rgba(245,158,11,0.65)]"
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M50 10 C62 35 85 55 85 78 C85 98 69 110 50 110 C31 110 15 98 15 78 C15 55 38 35 50 10 Z" 
                  fill="url(#holyFlameGrad)"
                />
                <path 
                  d="M50 48 C56 62 70 74 70 86 C70 96 61 102 50 102 C39 102 30 96 30 86 C30 74 44 62 50 48 Z" 
                  fill="#FFFFFF"
                  opacity="0.9"
                />
                <defs>
                  <linearGradient id="holyFlameGrad" x1="50" y1="10" x2="50" y2="110" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#F59E0B" />
                    <stop offset="0.6" stopColor="#EA580C" />
                    <stop offset="1" stopColor="#B91C1C" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="mt-4 font-mono text-xs uppercase tracking-[0.3em] text-slate-200 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
              YoungFire Sanctuary
            </div>
          </div>
        )}
      </div>

      {/* Skip / Enter Action */}
      <button
        onClick={handleFinish}
        className="absolute bottom-10 px-5 py-2 rounded-full border border-white/20 bg-black/60 backdrop-blur-md font-mono text-[11px] uppercase tracking-widest text-slate-300 hover:text-white hover:border-white/50 transition-all"
      >
        Skip Launch
      </button>
    </div>
  );
};
