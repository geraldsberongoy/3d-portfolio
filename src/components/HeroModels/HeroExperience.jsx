import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";
import React from "react";
import { Room } from "./Room";
import HeroLights from "./HeroLights";
import Particles from "./Particles";


const HeroExperience = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });

  return (
    <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
      <HeroLights/>
      {/* <Particles count={isMobile ? 50 : 100} /> Adjust particle count based on device size */}
      <OrbitControls
        enablePan={false} // Prevents panning of the scene
        enableZoom={!isTablet} // Disables zoom on tablets
        maxDistance={20} // Maximum distance for zooming out
        minDistance={10} // Minimum distance for zooming in
        minPolarAngle={Math.PI / 5} // Minimum angle for vertical rotation
        maxPolarAngle={Math.PI / 2} // Maximum angle for vertical rotation
      />
      <group  scale={isMobile ? 0.7 : 1} position={[0, -3.5, 0 ]} rotation={[0, -Math.PI /4, 0]}>
        <Room />
      </group>
    </Canvas>
  );
};

export default HeroExperience;
