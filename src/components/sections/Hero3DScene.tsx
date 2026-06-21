"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function StarField() {
  const pointsRef = useRef<THREE.Points>(null);
  const timeRef = useRef(0);

  const count = 5000;
  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 100;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 100;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 100;
      spd[i] = Math.random() * 0.2 + 0.1;
    }
    return [pos, spd];
  }, [count]);

  useFrame((_state, delta) => {
    if (!pointsRef.current) return;
    timeRef.current += delta;
    const isWarping = timeRef.current < 2.0;
    const warpMultiplier = isWarping ? 15 : 1;
    const positionsAttr = pointsRef.current.geometry.attributes.position;
    const posArray = positionsAttr.array as Float32Array;
    for (let i = 0; i < count; i++) {
      posArray[i * 3 + 2] += speeds[i] * warpMultiplier * (delta * 60);
      if (posArray[i * 3 + 2] > 50) posArray[i * 3 + 2] = -50;
    }
    positionsAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.1} color={0xffffff} transparent opacity={0.8} sizeAttenuation />
    </points>
  );
}

function FloatingTorus() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.x = t * 0.11;
    meshRef.current.rotation.y = t * 0.17;
    meshRef.current.position.y = Math.sin(t * 0.4) * 0.6;
  });

  return (
    <mesh ref={meshRef} position={[4.5, 0.5, -10]}>
      <torusKnotGeometry args={[1.4, 0.38, 120, 16]} />
      <meshStandardMaterial
        color="#3B82F6"
        emissive="#6366f1"
        emissiveIntensity={0.55}
        wireframe
        transparent
        opacity={0.35}
      />
    </mesh>
  );
}

export const Hero3DScene = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-80" id="hero-3d-scene">
      <Canvas
        camera={{ position: [0, 0, 50], fov: 60 }}
        gl={{ antialias: false, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.15} />
        <pointLight position={[8, 8, 5]} intensity={0.8} color="#3B82F6" />
        <pointLight position={[-6, -4, 3]} intensity={0.4} color="#8B5CF6" />
        <StarField />
        <FloatingTorus />
      </Canvas>
    </div>
  );
};
