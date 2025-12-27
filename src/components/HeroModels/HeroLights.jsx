import React, { useMemo, memo } from "react";
import * as THREE from "three";
import { usePerformance } from "../../context/PerformanceContext";

const HeroLights = memo(() => {
  const { settings, isLowTier, isHighTier, viewport } = usePerformance();
  const { isMobile, isTablet } = viewport;

  // Use memoization for RectAreaLight to avoid recreation on re-renders
  const areaLight = useMemo(() => {
    return new THREE.RectAreaLight("#a259ff", 8, 3, 2);
  }, []);

  // Simplify lighting on low-tier devices
  const mainLightIntensity = isLowTier ? 60 : isMobile ? 80 : 100;
  const pointLightIntensity = isLowTier ? 3 : isMobile ? 5 : 10;

  return (
    <>
      {/* Main lamp's light - needed on all devices */}
      <spotLight
        position={[2, 5, 6]}
        angle={0.15}
        penumbra={0.2}
        intensity={mainLightIntensity}
        color="white"
        castShadow={settings.shadows && !isLowTier}
        // Reduce shadow map size on medium-tier devices
        shadow-mapSize-width={isHighTier ? 1024 : 512}
        shadow-mapSize-height={isHighTier ? 1024 : 512}
      />

      {/* Secondary lights - only on medium-tier and above */}
      {!isLowTier && (
        <>
          {/* bluish overhead lamp */}
          <spotLight
            position={[4, 5, 4]}
            angle={0.3}
            penumbra={0.5}
            intensity={30}
            color="#4cc9f0"
          />

          {/* purplish side fill */}
          <spotLight
            position={[-3, 5, 5]}
            angle={0.4}
            penumbra={1}
            intensity={50}
            color="#9d4edd"
          />
        </>
      )}

      {/* Computationally expensive area light - only on high-tier desktop devices */}
      {settings.enableAreaLights && isHighTier && !isTablet && (
        <primitive
          object={areaLight}
          position={[1, 3, 4]}
          rotation={[-Math.PI / 4, Math.PI / 4, 0]}
          intensity={12}
        />
      )}

      {/* Essential ambient light for all devices */}
      <pointLight
        position={[0, 1, 0]}
        intensity={pointLightIntensity}
        color="#7209b7"
      />

      {/* Additional ambient light only for medium and high tier */}
      {!isLowTier && (
        <pointLight position={[1, 2, -2]} intensity={8} color="#0d00a4" />
      )}
    </>
  );
});

HeroLights.displayName = "HeroLights";

export default HeroLights;

