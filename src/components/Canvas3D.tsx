"use client";
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles, Float, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// Procedural falling leaves with a realistic Bezier curve shape
const FallingLeaves = ({ season }: { season: string }) => {
  const count = 120;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const leafShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.quadraticCurveTo(0.5, 0.5, 0, 1.5);
    shape.quadraticCurveTo(-0.5, 0.5, 0, 0);
    return shape;
  }, []);

  const leavesData = useMemo(() => {
    return new Array(count).fill(0).map(() => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 30,
        Math.random() * 20,
        (Math.random() - 0.5) * 20
      ),
      rotation: new THREE.Vector3(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ),
      speed: 0.005 + Math.random() * 0.015, // Slower, more elegant falling
      spinX: Math.random() * 0.01,
      spinY: Math.random() * 0.02,
      scale: 0.4 + Math.random() * 0.6 // Large, bold leaves
    }));
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;
    leavesData.forEach((leaf, i) => {
      leaf.position.y -= leaf.speed;
      leaf.position.x += Math.sin(leaf.position.y * 0.5) * 0.01;
      leaf.position.z += Math.cos(leaf.position.y * 0.3) * 0.005;
      leaf.rotation.x += leaf.spinX;
      leaf.rotation.y += leaf.spinY;
      if (leaf.position.y < -5) {
        leaf.position.y = 15;
        leaf.position.x = (Math.random() - 0.5) * 30;
      }
      dummy.position.copy(leaf.position);
      dummy.rotation.set(leaf.rotation.x, leaf.rotation.y, leaf.rotation.z);
      dummy.scale.setScalar(leaf.scale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null as any, null as any, count]} castShadow receiveShadow>
      <extrudeGeometry args={[leafShape, { depth: 0.01, bevelEnabled: true, bevelSegments: 5, steps: 1, bevelSize: 0.02, bevelThickness: 0.02 }]} />
      {/* High-end frosted glass / golden material */}
      <meshPhysicalMaterial 
        color={
          season === 'summer' ? '#D4AF37' : // Golden
          season === 'winter' ? '#a5f3fc' : // Frosty cyan/white
          season === 'rain' ? '#065f46' : // Deep wet green
          '#10b981' // Spring elegant green
        }
        roughness={0.2} 
        metalness={0.1}
        clearcoat={1}
        clearcoatRoughness={0.1}
      />
    </instancedMesh>
  );
};

export default function Canvas3D({ season = 'spring' }: { season?: 'spring' | 'summer' | 'rain' | 'winter' }) {
  return (
    <div className="canvas-container" style={{ 
      position: 'absolute', 
      top: 0, left: 0, width: '100%', height: '100%', 
      zIndex: 0, 
      pointerEvents: 'none',
      background: 'transparent' // Let the CSS variables handle the background
    }}>
      <Canvas shadows camera={{ position: [0, 0, 12], fov: 45 }}>
        
        {/* Cinematic Studio Lighting */}
        <ambientLight intensity={0.4} />
        <spotLight position={[10, 20, 10]} angle={0.15} penumbra={1} intensity={2} castShadow color="#FDFBF9" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#C4A981" />
        <Environment preset="city" />

        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          {/* Falling elegant leaves */}
          <FallingLeaves season={season} />
        </Float>

        {/* Environmental Particle Effects */}
        {season === 'spring' && (
          <>
            <Sparkles count={150} scale={20} size={1.5} speed={0.1} color="#FFF" opacity={0.3} />
            <Sparkles count={50} scale={20} size={3} speed={0.2} color="#10b981" opacity={0.4} />
          </>
        )}
        
        {season === 'summer' && (
          <>
            <Sparkles count={150} scale={20} size={1.5} speed={0.1} color="#FFF" opacity={0.3} />
            <Sparkles count={80} scale={20} size={3} speed={0.2} color="#D4AF37" opacity={0.6} />
          </>
        )}

        {season === 'rain' && (
          // Fast falling vertical rain
          <Sparkles count={400} scale={[30, 30, 30]} size={1.5} speed={1.5} color="#60a5fa" opacity={0.6} />
        )}

        {season === 'winter' && (
          // Drifting heavy snow
          <Sparkles count={500} scale={30} size={2.5} speed={0.3} color="#ffffff" opacity={0.8} />
        )}

        {/* Contact Shadow for depth */}
        <ContactShadows position={[0, -5, 0]} opacity={0.4} scale={30} blur={2.5} far={10} color="#000" />
      </Canvas>
    </div>
  );
}
