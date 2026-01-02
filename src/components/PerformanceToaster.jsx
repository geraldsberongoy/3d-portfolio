import React, { useState, useEffect } from 'react';
import { usePerformance, PERFORMANCE_TIERS } from '../context/PerformanceContext';
import { X, Zap } from 'lucide-react';

const PerformanceControls = () => {
  const { 
    tier, 
    isLowTier, 
    is3DEnabled, 
    setIs3DEnabled, 
    setPerformanceOverride,
    hasOverride 
  } = usePerformance();
  
  const [isOpen, setIsOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const togglePanel = () => {
    setIsOpen(!isOpen);
    setHasInteracted(true);
  };

  const activeTier = hasOverride ? tier : (isLowTier ? PERFORMANCE_TIERS.LOW : tier);

  return (
    <div className="fixed bottom-4 left-4 z-50 flex flex-col items-start gap-2">
      
      {/* Control Panel (Expanded) */}
      {isOpen && (
        <div className="bg-black-200/95 backdrop-blur-md border border-white/10 rounded-xl p-5 shadow-2xl w-72 animate-in slide-in-from-bottom-5 fade-in duration-300 mb-2">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-5 pb-3 border-b border-white/10">
            <h3 className="text-white font-semibold text-sm tracking-wide">
              Performance Settings
            </h3>
            <button 
              onClick={() => setIsOpen(false)} 
              className="text-white/50 hover:text-white transition-colors cursor-pointer p-1 hover:bg-white/5 rounded"
            >
              <X size={14} />
            </button>
          </div>

          <div className="space-y-5">
            {/* 3D Toggle */}
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-white">3D Assets</span>
              
              <button 
                onClick={() => setIs3DEnabled(!is3DEnabled)}
                className={`w-11 h-6 rounded-full relative transition-all duration-300 cursor-pointer ${is3DEnabled ? 'bg-blue-600' : 'bg-white/10'}`}
              >
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 shadow-md ${is3DEnabled ? 'left-6' : 'left-1'}`} />
              </button>
            </div>

            {/* Quality Selector */}
            <div className={`transition-opacity duration-300 ${is3DEnabled ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
               <p className="text-xs font-medium text-white/60 mb-3 uppercase tracking-wider">
                 Graphics Quality
               </p>
               
               <div className="grid grid-cols-3 gap-2">
                 {[
                   { tier: PERFORMANCE_TIERS.LOW, label: 'Fast' },
                   { tier: PERFORMANCE_TIERS.MEDIUM, label: 'Balanced' },
                   { tier: PERFORMANCE_TIERS.HIGH, label: 'Best' }
                 ].map(({ tier: t, label }) => (
                   <button
                     key={t}
                     onClick={() => setPerformanceOverride(t)}
                     className={`
                       px-3 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer
                       ${activeTier === t 
                         ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/30' 
                         : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'}
                     `}
                   >
                     {label}
                   </button>
                 ))}
               </div>
               
               <p className="text-[10px] text-white/40 mt-3 text-center leading-relaxed">
                 {activeTier === PERFORMANCE_TIERS.LOW && "Optimized for battery life & smooth performance"}
                 {activeTier === PERFORMANCE_TIERS.MEDIUM && "Good balance of visuals & speed"}
                 {activeTier === PERFORMANCE_TIERS.HIGH && "Full visual effects with high GPU usage"}
               </p>
            </div>
          </div>
        </div>
      )}

      {/* Button Row Container */}
      <div className="relative flex items-center">
          {/* Toggle Button (Always Visible) */}
          <button 
            onClick={togglePanel}
            className={`
              flex items-center justify-center w-11 h-11 rounded-full 
              backdrop-blur-md border shadow-lg transition-all duration-300 group z-10 cursor-pointer relative
              ${isOpen ? 'bg-blue-600 border-blue-500 text-white' : 'bg-black-200/90 border-white/10 text-white/70 hover:text-white hover:bg-black-100 hover:border-white/20'}
            `}
            title="Performance Settings"
          >
            {/* Subtle pulse ring to attract attention if never interacted */}
            {!hasInteracted && !isOpen && (
              <span className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping" />
            )}
            
            <Zap size={18} className={`relative transition-transform duration-500 ${isOpen ? 'rotate-180' : 'group-hover:scale-110'}`} />
          </button>

          {/* Bubble Notification (Only when closed and low tier/hint needed) */}
          {!isOpen && isLowTier && !hasInteracted && !hasOverride && (
             <div className="absolute left-14 whitespace-nowrap bg-black-200/95 border border-white/10 backdrop-blur-md text-white text-xs font-medium py-2 px-3 rounded-lg shadow-xl animate-in fade-in slide-in-from-left-2 duration-500 flex items-center gap-2 after:content-[''] after:absolute after:left-[-5px] after:top-1/2 after:-translate-y-1/2 after:w-2 after:h-2 after:bg-black-200 after:border-l after:border-b after:border-white/10 after:rotate-45">
                 <span className="cursor-pointer" onClick={togglePanel}>Experiencing lag?</span>
                 <button 
                   onClick={(e) => { e.stopPropagation(); setHasInteracted(true); }} 
                   className="hover:bg-white/10 rounded p-0.5 transition-colors cursor-pointer"
                 >
                    <X size={12} className="text-white/60" />
                 </button>
             </div>
          )}
      </div>

    </div>
  );
};

export default PerformanceControls;
