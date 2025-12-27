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
    <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
      {shouldRender ? (
        <Canvas {...canvasConfig()}>
          <SceneContent 
            settings={settings} 
            viewport={viewport} 
            isInView={isInView} 
          />
        </Canvas>
      ) : (
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.2)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Placeholder when 3D scene is not rendered */}
        </div>
      )}
    </div>
  );
};

export default memo(HeroExperience);
