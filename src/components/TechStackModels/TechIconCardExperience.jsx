import { Environment, Float, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect } from "react";
import * as THREE from "three";

const TechIconCardExperience = ({ model }) => {
  const scene = useGLTF(model.modelPath);

  useEffect(() => {
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
  }, [scene, model.name]);

  return (
    <Canvas>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <spotLight
        position={[10, 15, 10]}
        angle={0.3}
        penumbra={1}
        intensity={2}
      />
      {model.name === "CSS" ? null : <Environment preset="city" />}

      {/* 
        The Float component from @react-three/drei is used to 
        create a simple animation of the model floating in space.
        The rotationIntensity and floatIntensity props control the
        speed of the rotation and float animations respectively.

        The group component is used to scale and rotate the model.
        The rotation is set to the value of the model.rotation property,
        which is an array of three values representing the rotation in
        degrees around the x, y and z axes respectively.

        The primitive component is used to render the 3D model.
        The object prop is set to the scene object returned by the
        useGLTF hook, which is an instance of THREE.Group. The
        THREE.Group object contains all the objects (meshes, lights, etc)
        that make up the 3D model.
      */}
      <Float speed={5.5} rotationIntensity={0.5} floatIntensity={0.9}>
        <group
          scale={model.scale}
          rotation={model.rotation}
          position={model.position}
        >
          <primitive object={scene.scene} />
        </group>
      </Float>

      <OrbitControls enableZoom={false} />
    </Canvas>
  );
};

export default TechIconCardExperience;
