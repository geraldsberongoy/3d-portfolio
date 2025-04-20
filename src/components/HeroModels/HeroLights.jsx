import React, { useMemo } from "react";
import * as THREE from "three";
import { useMediaQuery } from "react-responsive";

const HeroLights = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });

  // Use memoization for RectAreaLight to avoid recreation on re-renders
  const areaLight = useMemo(() => {
    return new THREE.RectAreaLight("#a259ff", 8, 3, 2);
  }, []);

  return (
    <>
      {/* Main lamp's light - needed on all devices */}
      <spotLight
        position={[2, 5, 6]}
        angle={0.15}
        penumbra={0.2}
        intensity={isMobile ? 80 : 100}
        color="white"
        castShadow={!isMobile} // Disable shadow on mobile
      />

      {/* Secondary lights - conditionally render based on device */}
      {!isMobile && (
        <>
          {/* bluish overhead lamp */}
          <spotLight
            position={[4, 5, 4]}
            angle={0.3}
            penumbra={0.5}
            intensity={40}
            color="#4cc9f0"
          />

          {/* purplish side fill */}
          <spotLight
            position={[-3, 5, 5]}
            angle={0.4}
            penumbra={1}
            intensity={60}
            color="#9d4edd"
          />
        </>
      )}

      {/* Computationally expensive area light - only on desktop */}
      {!isTablet && (
        <primitive
          object={areaLight}
          position={[1, 3, 4]}
          rotation={[-Math.PI / 4, Math.PI / 4, 0]}
          intensity={15}
        />
      )}

      {/* Essential ambient light for all devices */}
      <pointLight
        position={[0, 1, 0]}
        intensity={isMobile ? 5 : 10}
        color="#7209b7"
      />

      {/* Additional ambient light only for desktop */}
      {!isMobile && (
        <pointLight position={[1, 2, -2]} intensity={10} color="#0d00a4" />
      )}
    </>
  );
};

export default React.memo(HeroLights);
