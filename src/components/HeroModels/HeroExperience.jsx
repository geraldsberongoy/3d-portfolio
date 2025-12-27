import { OrbitControls, AdaptiveDpr, AdaptiveEvents } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useEffect, memo, useCallback } from "react";

import { Room } from "./Room";
import HeroLights from "./HeroLights";
import useInView from "./useInView";
import { usePerformance } from "../../context/PerformanceContext";

// Memoized 3D scene content to prevent unnecessary re-renders
const SceneContent = memo(({ settings, viewport, isInView }) => {
  const { isMobile, isTablet } = viewport;
  
  return (
    <>
      {/* deep blue ambient */}
      <ambientLight intensity={0.2} color="#1a1a40" />

      {/* Configure OrbitControls with optimized settings */}
      <OrbitControls
        enablePan={false}
        enableZoom={!isTablet}
        maxDistance={20}
        minDistance={5}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 2}
        enableDamping={true}
        dampingFactor={0.05}
        rotateSpeed={0.8}
      />

      {/* Adaptive DPR - automatically adjusts based on performance */}
      <AdaptiveDpr pixelated />
      
      {/* Adaptive Events - throttles pointer events when performance is low */}
      <AdaptiveEvents />

      <Suspense fallback={null}>
        <HeroLights />
        <group
          scale={isMobile ? 0.6 : isTablet ? 0.8 : 1}
          position={[0, -3.5, 0]}
          rotation={[0, -Math.PI / 4, 0]}
        >
          <Room />
        </group>
      </Suspense>
    </>
  );
});

SceneContent.displayName = "SceneContent";

const HeroExperience = () => {
  const { viewport, settings, isLowTier } = usePerformance();
  const { isMobile, isTablet } = viewport;

  // Use our custom hook with a generous margin to start loading before it's in view
  const [containerRef, isInView] = useInView({
    rootMargin: "200px 0px",
    threshold: 0.1,
  });

  // Add state for a small delay after leaving view
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isInView) {
      setShouldRender(true);
    } else {
      // Longer timeout for low-tier devices to prevent constant remounting
      const delay = isLowTier ? 2000 : 1000;
      const timeoutId = setTimeout(() => {
        setShouldRender(false);
      }, delay);

      return () => clearTimeout(timeoutId);
    }
  }, [isInView, isLowTier]);

  // Memoized canvas configuration
  const canvasConfig = useCallback(() => ({
    camera: { position: [0, 0, 15], fov: isMobile ? 50 : 45 },
    dpr: settings.dpr,
    shadows: settings.shadows,
    gl: {
      antialias: settings.antialias,
      alpha: true,
      powerPreference: "high-performance",
      precision: settings.precision,
      stencil: false,
      depth: true,
      // Reduce WebGL context overhead
      failIfMajorPerformanceCaveat: false,
    },
    frameloop: isInView ? settings.frameloop : "demand",
    performance: { min: settings.performanceMin },
    // Flat rendering for better performance
    flat: isLowTier,
  }), [isMobile, settings, isInView, isLowTier]);

  return (
    <div ref={containerRef} className="w-full h-full">
      {shouldRender ? (
        <Canvas {...canvasConfig()}>
          <SceneContent 
            settings={settings} 
            viewport={viewport} 
            isInView={isInView} 
          />
        </Canvas>
      ) : (
        /* Skeleton Screen - mimics the 3D scene layout */
        <div className="w-full h-full flex items-center justify-center">
          <div className="relative w-full h-full">
            {/* Main skeleton shape mimicking room/desk setup */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Desk skeleton */}
              <div className="relative">
                {/* Monitor skeleton */}
                <div className="w-48 h-32 md:w-64 md:h-44 lg:w-80 lg:h-52 rounded-lg bg-white/5 animate-pulse" />
                {/* Desk surface skeleton */}
                <div className="w-56 h-3 md:w-72 md:h-4 lg:w-96 lg:h-5 rounded bg-white/5 animate-pulse mt-2 mx-auto" />
                {/* Keyboard skeleton */}
                <div className="w-32 h-2 md:w-40 md:h-3 rounded bg-white/5 animate-pulse mt-3 mx-auto" />
              </div>
            </div>
            {/* Ambient glow effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl" />
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(HeroExperience);
