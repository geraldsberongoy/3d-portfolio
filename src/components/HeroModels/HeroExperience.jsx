import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";
import { Suspense, useState, useEffect } from "react";

import { Room } from "./Room";
import HeroLights from "./HeroLights";
import Particles from "./Particles";

const HeroExperience = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });

  // Performance settings based on device
  const dpr = isMobile ? [1, 1.5] : isTablet ? [1, 2] : [1, 2]; // Device pixel ratio
  const particleCount = isMobile ? 30 : isTablet ? 60 : 100;

  // Only enable shadows on desktop
  const shadows = !isMobile;

  return (
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
  );
};

export default HeroExperience;
