import { Environment, Float, OrbitControls, useGLTF, AdaptiveDpr } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useState, useRef, Suspense, memo, useCallback, useMemo } from "react";
import * as THREE from "three";
import { usePerformance } from "../../context/PerformanceContext";

// Fallback component to show while model is loading
const ModelFallback = memo(() => (
  <mesh>
    <sphereGeometry args={[1, 12, 12]} />
    <meshBasicMaterial color="#4285F4" wireframe />
  </mesh>
));

ModelFallback.displayName = "ModelFallback";

// 2D Logo component for mobile/low-tier devices
const Logo2D = memo(({ model }) => (
  <div className="w-full h-full flex items-center justify-center bg-black-100 rounded-lg">
    <div className="relative w-16 h-16 flex items-center justify-center">
      <img
        src={model.logoPath}
        alt={`${model.name} logo`}
        className="w-full h-full object-contain filter drop-shadow-lg hover:scale-110 transition-transform duration-300"
        style={{
          maxWidth: "64px",
          maxHeight: "64px",
        }}
        loading="lazy"
        onError={(e) => {
          e.target.style.display = "none";
          if (e.target.parentNode) {
            e.target.parentNode.innerHTML = `
              <div class="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                <span class="text-white text-xs font-semibold">${model.name.substring(0, 2)}</span>
              </div>
            `;
          }
        }}
      />
    </div>
  </div>
));

Logo2D.displayName = "Logo2D";

// Memoized model component
const ModelWithLoading = memo(({ model, settings, isLowTier, onLoaded }) => {
  const scene = useGLTF(model.modelPath);

  useEffect(() => {
    onLoaded();

    scene.scene.traverse((child) => {
      if (child.isMesh) {
        // Use simpler materials on low-tier devices
        if (isLowTier) {
          child.material = new THREE.MeshBasicMaterial({
            color: child.material?.color || new THREE.Color(0x4285f4),
          });
        } else if (model.name === "CSS") {
          child.material = new THREE.MeshStandardMaterial({
            color: child.material?.color || new THREE.Color(0x0077ff),
            roughness: 1.0,
            metalness: 0.0,
            envMapIntensity: 0.1,
          });
        } else if (model.name === "Interactive Developer" && child.name === "Object_5") {
          child.material = new THREE.MeshStandardMaterial({ color: "white" });
        }
      }
    });
  }, [scene, model.name, isLowTier, onLoaded]);

  const floatIntensity = settings.floatIntensity;
  const rotationIntensity = settings.rotationIntensity;

  // Disable Float animation on low-tier for CPU savings
  if (!settings.enableFloat) {
    return (
      <group
        scale={model.scale}
        rotation={model.rotation}
        position={model.position}
      >
        <primitive object={scene.scene} />
      </group>
    );
  }

  return (
    <Float
      speed={4}
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
});

ModelWithLoading.displayName = "ModelWithLoading";

const TechIconCardExperience = memo(({ model, priority = false }) => {
  const { settings, isLowTier, isHighTier, viewport } = usePerformance();
  const { isMobile } = viewport;
  
  const [modelLoaded, setModelLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(priority);
  const containerRef = useRef(null);

  // Memoized onLoaded callback - MUST be before any conditional returns
  const handleModelLoaded = useCallback(() => {
    setModelLoaded(true);
  }, []);

  // Canvas options based on performance tier - MUST be before any conditional returns
  const canvasOptions = useMemo(() => ({
    dpr: settings.dpr,
    gl: {
      powerPreference: "high-performance",
      alpha: true,
      antialias: settings.antialias,
      precision: settings.precision,
      stencil: false,
      depth: true,
      failIfMajorPerformanceCaveat: false,
    },
    frameloop: modelLoaded ? "always" : "demand",
    performance: { min: settings.performanceMin },
    flat: isLowTier,
  }), [settings, modelLoaded, isLowTier]);

  // Use Intersection Observer to detect when the card comes into view
  useEffect(() => {
    // Always load on high-tier devices or if marked as priority
    if (isHighTier || priority) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "150px 0px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isHighTier, priority]);

  // Determine what to render based on conditions
  const shouldUse2DLogo = (isMobile || isLowTier) && model.logoPath;

  // Placeholder while not yet loading
  if (!shouldLoad) {
    return (
      <div
        ref={containerRef}
        className="w-full h-full flex items-center justify-center bg-black-100 rounded-lg"
      >
        <div className="animate-pulse size-12 rounded-full bg-blue-600/20" />
      </div>
    );
  }

  // Use 2D logos on mobile OR low-tier devices (not just mobile)
  // This is a major performance optimization - fewer WebGL contexts
  if (shouldUse2DLogo) {
    return (
      <div ref={containerRef} className="w-full h-full">
        <Logo2D model={model} />
      </div>
    );
  }

  // Desktop/high-tier: render 3D model with Canvas
  return (
    <div ref={containerRef} className="w-full h-full">
      <Canvas {...canvasOptions}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        
        {/* Only add spotlight on high-tier */}
        {isHighTier && (
          <spotLight
            position={[10, 15, 10]}
            angle={0.3}
            penumbra={1}
            intensity={1.5}
          />
        )}

        {/* Adaptive DPR */}
        <AdaptiveDpr pixelated />

        {/* Only add Environment on high-tier devices */}
        {settings.enableEnvironment && isHighTier && model.name !== "CSS" && (
          <Environment preset="city" />
        )}

        <Suspense fallback={<ModelFallback />}>
          <ModelWithLoading
            model={model}
            settings={settings}
            isLowTier={isLowTier}
            onLoaded={handleModelLoaded}
          />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.4}
          enableDamping={true}
          dampingFactor={0.1}
        />
      </Canvas>
    </div>
  );
});

TechIconCardExperience.displayName = "TechIconCardExperience";

export default TechIconCardExperience;


