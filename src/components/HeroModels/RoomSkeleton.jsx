import React from "react";

const RoomSkeleton = ({ animated = true }) => {
  const pulseClass = animated ? "animate-pulse" : "";
  
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative w-full h-full">
        {/* Main skeleton shape mimicking room/desk setup */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Desk skeleton */}
          <div className="relative">
            {/* Monitor skeleton */}
            <div className={`w-48 h-32 md:w-64 md:h-44 lg:w-80 lg:h-52 rounded-lg bg-white/5 ${pulseClass}`} />
            {/* Desk surface skeleton */}
            <div className={`w-56 h-3 md:w-72 md:h-4 lg:w-96 lg:h-5 rounded bg-white/5 ${pulseClass} mt-2 mx-auto`} />
            {/* Keyboard skeleton */}
            <div className={`w-32 h-2 md:w-40 md:h-3 rounded bg-white/5 ${pulseClass} mt-3 mx-auto`} />
            
            {animated ? (
              <div className="mt-4 text-center">
                <p className={`text-white-50 text-sm md:text-base font-semibold ${pulseClass} tracking-wider`}>
                  Loading 3D Assets...
                </p>
              </div>
            ) : (
               <div className="mt-4 text-center opacity-50">
                <p className="text-white-50 text-xs font-medium tracking-wide">
                  3D Disabled
                </p>
              </div>
            )}
          </div>
        </div>
        {/* Ambient glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl" />
      </div>
    </div>
  );
};

export default RoomSkeleton;
