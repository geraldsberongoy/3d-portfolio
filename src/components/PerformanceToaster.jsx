import React, { useState, useEffect } from 'react';
import { usePerformance, PERFORMANCE_TIERS } from '../context/PerformanceContext';
import { X, Zap, Settings, Monitor, Power, Gauge } from 'lucide-react';

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

  // Auto-open if low tier is detected and user hasn't interacted yet
  useEffect(() => {
    if (isLowTier && is3DEnabled && !hasInteracted && !hasOverride) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isLowTier, is3DEnabled, hasInteracted, hasOverride]);

  const togglePanel = () => {
    setIsOpen(!isOpen);
    setHasInteracted(true);
  };

  const activeTier = hasOverride ? tier : (isLowTier ? PERFORMANCE_TIERS.LOW : tier);

  return (
    <div className="fixed bottom-4 left-4 z-50 flex flex-col items-start gap-2">
      
      {/* Control Panel (Expanded) */}
      {isOpen && (
        <div className="bg-black-200/90 backdrop-blur-md border border-white/10 rounded-xl p-4 shadow-2xl w-64 animate-in slide-in-from-bottom-5 fade-in duration-300 mb-2">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
            <h3 className="text-white font-semibold text-sm flex items-center gap-2">
              <Settings size={14} className="text-blue-400" />
              <span>Experience Settings</span>
            </h3>
            <button onClick={() => setIsOpen(false)} className="text-white-50 hover:text-white transition-colors">
              <X size={16} />
            </button>
          </div>

          <div className="space-y-4">
            {/* 3D Toggle */}
            <div className="flex justify-between items-center bg-white/5 p-2 rounded-lg">
              <div className="flex items-center gap-2">
                <Power size={16} className={is3DEnabled ? "text-green-400" : "text-gray-400"} />
                <span className="text-sm text-white-50">3D Assets</span>
              </div>
              
              <button 
                onClick={() => setIs3DEnabled(!is3DEnabled)}
                className={`w-10 h-5 rounded-full relative transition-colors duration-300 ${is3DEnabled ? 'bg-blue-500' : 'bg-gray-600'}`}
              >
                <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all duration-300 ${is3DEnabled ? 'left-6' : 'left-1'}`} />
              </button>
            </div>

            {/* Quality Selector (Only if 3D is active) */}
            <div className={`transition-opacity duration-300 ${is3DEnabled ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
               <div className="flex items-center gap-2 mb-2 text-white-50 text-xs uppercase font-bold tracking-wider">
                 <Gauge size={12} />
                 <span>Graphics Quality</span>
               </div>
               
               <div className="grid grid-cols-3 gap-1 bg-black-100/50 p-1 rounded-lg border border-white/5">
                 {[PERFORMANCE_TIERS.LOW, PERFORMANCE_TIERS.MEDIUM, PERFORMANCE_TIERS.HIGH].map((t) => (
                   <button
                     key={t}
                     onClick={() => setPerformanceOverride(t)}
                     className={`
                       px-2 py-1.5 rounded text-[10px] font-bold transition-all
                       ${activeTier === t 
                         ? 'bg-blue-600 text-white shadow-lg' 
                         : 'text-white-50 hover:bg-white/10 hover:text-white'}
                     `}
                   >
                     {t === PERFORMANCE_TIERS.LOW ? 'FAST' : t === PERFORMANCE_TIERS.MEDIUM ? 'BALANCED' : 'BEST'}
                   </button>
                 ))}
               </div>
               <p className="text-[10px] text-white-50 mt-2 text-center h-4">
                 {activeTier === PERFORMANCE_TIERS.LOW && "Max battery life & performance."}
                 {activeTier === PERFORMANCE_TIERS.MEDIUM && "Good balance of visuals & speed."}
                 {activeTier === PERFORMANCE_TIERS.HIGH && "Full effects. High usage."}
               </p>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button (Always Visible) */}
      <button 
        onClick={togglePanel}
        className={`
          flex items-center justify-center w-10 h-10 rounded-full 
          backdrop-blur-md border shadow-lg transition-all duration-300 group
          ${isOpen ? 'bg-blue-600 border-blue-400 text-white' : 'bg-black-200/80 border-white/10 text-white-50 hover:text-white hover:bg-black-100'}
        `}
        title="Performance Settings"
      >
        <Zap size={20} className={`transition-transform duration-500 ${isOpen ? 'rotate-180' : 'group-hover:scale-110'}`} />
      </button>

    </div>
  );
};

export default PerformanceControls;
