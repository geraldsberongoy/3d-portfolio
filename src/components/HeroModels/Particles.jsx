import { useRef, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";

const Particles = ({ count = 200 }) => {
  const mesh = useRef();
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const frameCount = useRef(0);
  const updateFrequency = isMobile ? 3 : 1; // Only update particles every n frames on mobile
  const actualCount = isMobile ? Math.floor(count / 2) : count; // Reduce particle count on mobile

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < actualCount; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 10,
          Math.random() * 10 + 5, // higher starting point
          (Math.random() - 0.5) * 10,
        ],
        speed: 0.005 + Math.random() * 0.001,
      });
    }
    return temp;
  }, [actualCount]);

  useFrame(() => {
    // Skip frames to reduce CPU usage, especially on mobile
    frameCount.current = (frameCount.current + 1) % updateFrequency;
    if (frameCount.current !== 0) return;

    const positions = mesh.current.geometry.attributes.position.array;
    for (let i = 0; i < actualCount; i++) {
      let y = positions[i * 3 + 1];
      y -= particles[i].speed;
      if (y < -2) y = Math.random() * 10 + 5;
      positions[i * 3 + 1] = y;
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  const positions = new Float32Array(actualCount * 3);
  particles.forEach((p, i) => {
    positions[i * 3] = p.position[0];
    positions[i * 3 + 1] = p.position[1];
    positions[i * 3 + 2] = p.position[2];
  });

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
        size={0.05}
        transparent
        opacity={0.9}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
};

export default Particles;
