import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";
import { Suspense, useState, useEffect } from "react";

import { Room } from "./Room";
import HeroLights from "./HeroLights";
import Particles from "./Particles";
import useInView from "./useInView";

const HeroExperience = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });

  // Use our custom hook with a generous margin to start loading before it's in view
  const [containerRef, isInView] = useInView({
    rootMargin: "200px 0px", // Start loading 200px before it comes into view
    threshold: 0.1,
  });

  // Add state for a small delay after leaving view
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Set immediate true when in view
    if (isInView) {
      setShouldRender(true);
    } else {
      // Use a small timeout to prevent flickering when scrolling
      const timeoutId = setTimeout(() => {
        setShouldRender(false);
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [isInView]);

  // Performance settings based on device
  const dpr = isMobile ? [1, 1.5] : isTablet ? [1, 2] : [1, 2]; // Device pixel ratio
  const particleCount = isMobile ? 30 : isTablet ? 60 : 100;

  // Only enable shadows on desktop
  const shadows = !isMobile;

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
      {shouldRender ? (
        <Canvas
          camera={{ position: [0, 0, 15], fov: isMobile ? 50 : 45 }}
          dpr={dpr}
          shadows={shadows}
          gl={{
            antialias: !isMobile,
            alpha: true,
            powerPreference: "high-performance",
            precision: isMobile ? "lowp" : "highp", // Lower precision on mobile
            stencil: false, // Disable stencil buffer for performance
          }}
          frameloop={isInView ? "always" : "demand"} // Another optimization to reduce renders when not in view
          performance={{ min: 0.5 }} // Allow dropping to 30fps if needed
        >
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
            rotateSpeed={0.8} // Reduced rotate speed for better performance
          />

          <Suspense fallback={null}>
            <HeroLights />
            <Particles count={particleCount} />
            <group
              scale={isMobile ? 0.6 : isTablet ? 0.8 : 1}
              position={[0, -3.5, 0]}
              rotation={[0, -Math.PI / 4, 0]}
            >
              <Room />
            </group>
          </Suspense>
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
          {/* Optional placeholder when 3D model is not rendered */}
        </div>
      )}
    </div>
  );
};

export default HeroExperience;
