// src/components/OrbitingObjects/useOrbitAnimation.ts

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { Position3D } from "../../types/three.types";

export const useOrbitAnimation = (
  radius: number,
  speed: number,
  initialAngle: number,
  centerPosition: Position3D,
  shouldOrbit: boolean = true,
  onAngleUpdate?: (angle: number) => void
) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const angleRef = useRef(initialAngle);

  useFrame((_state, delta) => {
    // Changed 'state' to '_state' to indicate unused
    if (!meshRef.current || !shouldOrbit) return;

    angleRef.current += speed * delta;

    if (onAngleUpdate) {
      onAngleUpdate(angleRef.current);
    }

    const x = centerPosition[0] + Math.cos(angleRef.current) * radius;
    const y = centerPosition[1];
    const z = centerPosition[2] + Math.sin(angleRef.current) * radius;

    meshRef.current.position.set(x, y, z);

    meshRef.current.lookAt(
      centerPosition[0],
      centerPosition[1],
      centerPosition[2]
    );
  });

  return meshRef;
};
