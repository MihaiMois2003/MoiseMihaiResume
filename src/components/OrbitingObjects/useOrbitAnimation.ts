import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { Position3D } from "../../types/three.types";

/**
 * custom hook that handler the animation logic for single orbiting object
 * separates "what to animate" from "how to render"
 */

export const useOrbitAnimation = (
  radius: number,
  speed: number,
  initialAngle: number,
  centerPosition: Position3D
) => {
  const meshRef = useRef<THREE.Mesh>(null);

  //track current angle
  const angleRef = useRef(initialAngle);

  /**
   * useFrame: called every frame by r3f
   * this is where animation happens
   *
   * @param state - ref state(contains clock, camera)
   * @param delta - time since last frame (for frame-independent animation)
   */
  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Increment angle based on speed
    // Using delta makes animation frame-rate independent
    angleRef.current += speed * delta;

    // Calculate new position using trigonometry
    // Circular motion: x = radius * cos(angle), z = radius * sin(angle)
    const x = centerPosition[0] + Math.cos(angleRef.current) * radius;
    const y = centerPosition[1]; // Keep Y constant (orbit on horizontal plane)
    const z = centerPosition[2] + Math.sin(angleRef.current) * radius;

    // Update mesh position
    meshRef.current.position.set(x, y, z);

    // Optional: Make object face the center (billboard effect)
    // Uncomment if you want objects to always face inward
    // meshRef.current.lookAt(centerPosition[0], centerPosition[1], centerPosition[2]);
  });

  return meshRef;
};
