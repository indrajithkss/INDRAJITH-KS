import React, { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function Particles({ count = 80 }) {
  const points = useRef();

  // Generate randomized points in 3D space
  const particlesPosition = React.useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const positions = points.current.geometry.attributes.position.array;
    // Animate drift for particles using sine wave equations
    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      positions[idx + 1] += Math.sin(time * 0.5 + i) * 0.0015;
      positions[idx] += Math.cos(time * 0.3 + i) * 0.0008;
    }
    points.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particlesPosition, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#ffffff"
        sizeAttenuation={true}
        transparent={true}
        opacity={0.15}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function DynamicSpotlight() {
  const lightRef = useRef();
  const targetRef = useRef();
  const { viewport } = useThree();

  useEffect(() => {
    if (lightRef.current && targetRef.current) {
      lightRef.current.target = targetRef.current;
    }
  }, []);

  useFrame((state) => {
    // Convert 2D screen pointer values to relative viewport space coordinates
    const x = (state.pointer.x * viewport.width) / 2;
    const y = (state.pointer.y * viewport.height) / 2;
    
    // Smoothly lerp towards pointer coords
    if (targetRef.current) {
      targetRef.current.position.x += (x - targetRef.current.position.x) * 0.08;
      targetRef.current.position.y += (y - targetRef.current.position.y) * 0.08;
    }
  });

  return (
    <>
      <mesh ref={targetRef} position={[0, 0, 0]}>
        <boxGeometry args={[0.01, 0.01, 0.01]} />
        <meshBasicMaterial visible={false} />
      </mesh>
      {/* Cinematic Spotlight following cursor */}
      <spotLight
        ref={lightRef}
        position={[0, 4, 7]}
        angle={0.65}
        penumbra={1}
        intensity={15}
        color="#ffffff"
        castShadow
      />
      <spotLight
        position={[0, -2, 6]}
        angle={0.8}
        penumbra={1}
        intensity={8}
        color="#ffffff"
      />
    </>
  );
}

export default function SpotlightScene() {
  return (
    <div className="fixed inset-0 w-full h-full -z-20 pointer-events-none opacity-45 mix-blend-screen">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.15} />
        <DynamicSpotlight />
        <Particles count={110} />
      </Canvas>
    </div>
  );
}
