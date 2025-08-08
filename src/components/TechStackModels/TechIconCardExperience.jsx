import { Environment, Float, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useState, useRef, Suspense } from "react";
import { useMediaQuery } from "react-responsive";
import * as THREE from "three";

// Fallback component to show while model is loading
const ModelFallback = () => (
  <mesh>
    <sphereGeometry args={[1, 16, 16]} />
    <meshStandardMaterial color="#4285F4" wireframe />
  </mesh>
);

const TechIconCardExperience = ({ model, priority = false }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [modelLoaded, setModelLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(priority); // Only load high priority models immediately
  const containerRef = useRef(null);

  // Use Intersection Observer to detect when the card comes into view
  useEffect(() => {
    // Always load on desktop or if marked as priority
    if (!isMobile || priority) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only load the model when it's close to viewport
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px" } // Start loading 200px before it comes into view
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.disconnect();
      }
    };
  }, [isMobile, priority]);

  // Use a lightweight placeholder until the model is loaded
  if (!shouldLoad) {
    return (
      <div
        ref={containerRef}
        className="w-full h-full flex items-center justify-center bg-black-100 rounded-lg"
      >
        <div className="animate-pulse size-12 rounded-full bg-blue-600/20"></div>
      </div>
    );
  }

  // On mobile, render 2D logo instead of 3D model
  if (isMobile && model.logoPath) {
    return (
      <div
        ref={containerRef}
        className="w-full h-full flex items-center justify-center bg-black-100 rounded-lg"
      >
        <div className="relative w-16 h-16 flex items-center justify-center">
          <img
            src={model.logoPath}
            alt={`${model.name} logo`}
            className="w-full h-full object-contain filter drop-shadow-lg hover:scale-110 transition-transform duration-300"
            style={{
              maxWidth: "64px",
              maxHeight: "64px",
            }}
            onError={(e) => {
              // Fallback if logo fails to load
              e.target.style.display = "none";
              e.target.parentNode.innerHTML = `
                <div class="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                  <span class="text-white text-xs font-semibold">${model.name.substring(
                    0,
                    2
                  )}</span>
                </div>
              `;
            }}
          />
        </div>
      </div>
    );
  }

  // Desktop: render 3D model with Canvas
  return (
    <div ref={containerRef} className="w-full h-full">
      <Canvas
        dpr={isMobile ? [1, 1.5] : [1, 2]} // Lower resolution on mobile
        gl={{
          powerPreference: "high-performance",
          alpha: true,
          antialias: !isMobile,
          precision: isMobile ? "lowp" : "highp",
        }}
        frameloop={modelLoaded ? "always" : "demand"} // Conserve power until model is loaded
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <spotLight
          position={[10, 15, 10]}
          angle={0.3}
          penumbra={1}
          intensity={2}
        />

        {/* Only add Environment on desktop or for loaded models to save resources */}
        {(!isMobile || modelLoaded) && model.name !== "CSS" && (
          <Environment preset="city" />
        )}

        <Suspense fallback={<ModelFallback />}>
          <ModelWithLoading
            model={model}
            isMobile={isMobile}
            onLoaded={() => setModelLoaded(true)}
          />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.5}
          enableDamping={true}
          dampingFactor={0.1}
        />
      </Canvas>
    </div>
  );
};

// Separate component to handle model loading and customization
const ModelWithLoading = ({ model, isMobile, onLoaded }) => {
  const scene = useGLTF(model.modelPath);

  useEffect(() => {
    // Let parent know the model is loaded
    onLoaded();

    // Handle special cases for specific models
    scene.scene.traverse((child) => {
      if (child.isMesh) {
        // Only apply non-reflective material to the CSS model
        if (model.name === "CSS") {
          child.material = new THREE.MeshStandardMaterial({
            color: child.material?.color || new THREE.Color(0x0077ff),
            roughness: 1.0, // Maximum roughness = no reflections
            metalness: 0.0, // No metalness = no reflections
            envMapIntensity: 0.1, // Minimal environment reflections
          });
        }
        // Handle Interactive Developer model special case
        else if (
          model.name === "Interactive Developer" &&
          child.name === "Object_5"
        ) {
          child.material = new THREE.MeshStandardMaterial({ color: "white" });
        }
      }
    });
  }, [scene, model.name, isMobile, onLoaded]);

  const floatIntensity = isMobile ? 0.3 : 0.9;
  const rotationIntensity = isMobile ? 0.2 : 0.5;

  return (
    <Float
      speed={5.5}
      rotationIntensity={rotationIntensity}
      floatIntensity={floatIntensity}
    >
      <group
        scale={model.scale}
        rotation={model.rotation}
        position={model.position}
      >
        <primitive object={scene.scene} />
      </group>
    </Float>
  );
};

export default TechIconCardExperience;
