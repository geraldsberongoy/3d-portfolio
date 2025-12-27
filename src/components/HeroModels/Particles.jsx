import { useRef, useMemo, memo } from "react";
import { useFrame } from "@react-three/fiber";
import { usePerformance } from "../../context/PerformanceContext";

const Particles = memo(({ count = 200 }) => {
  const mesh = useRef();
  const { settings, isLowTier } = usePerformance();
  const frameCount = useRef(0);
  
  // Use performance tier settings for update frequency
  const updateFrequency = settings.particleUpdateFrequency;
  
  // Adjust particle count based on performance tier and prop
  const actualCount = useMemo(() => {
    // If count is passed as prop, respect it but apply tier multiplier
    const tierMultiplier = isLowTier ? 0.3 : 1;
    return Math.floor(Math.min(count, settings.particleCount) * tierMultiplier);
  }, [count, settings.particleCount, isLowTier]);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < actualCount; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 10,
          Math.random() * 10 + 5,
          (Math.random() - 0.5) * 10,
        ],
        speed: 0.005 + Math.random() * 0.001,
      });
    }
    return temp;
  }, [actualCount]);

  const positions = useMemo(() => {
    const posArray = new Float32Array(actualCount * 3);
    particles.forEach((p, i) => {
      posArray[i * 3] = p.position[0];
      posArray[i * 3 + 1] = p.position[1];
      posArray[i * 3 + 2] = p.position[2];
    });
    return posArray;
  }, [particles, actualCount]);

  useFrame(() => {
    // Skip more frames on low-tier devices
    frameCount.current = (frameCount.current + 1) % updateFrequency;
    if (frameCount.current !== 0) return;

    if (!mesh.current?.geometry?.attributes?.position) return;

    const positionsArray = mesh.current.geometry.attributes.position.array;
    for (let i = 0; i < actualCount; i++) {
      let y = positionsArray[i * 3 + 1];
      y -= particles[i].speed;
      if (y < -2) y = Math.random() * 10 + 5;
      positionsArray[i * 3 + 1] = y;
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  // Don't render particles on extremely low-tier devices
  if (actualCount < 5) return null;

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={actualCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ffffff"
        size={isLowTier ? 0.03 : 0.05}
        transparent
        opacity={isLowTier ? 0.7 : 0.9}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
});

Particles.displayName = "Particles";

export default Particles;

