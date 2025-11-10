import React from "react";
import { animated } from "@react-spring/three";
import type { OrbitingObjectData } from "../../types/orbit.types";
import type { Position3D } from "../../types/three.types";
import { useOrbitAnimation } from "./useOrbitAnimation";
import { useObjectLanding } from "../../hooks/useObjectLanding";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface OrbitingObjectProps {
  data: OrbitingObjectData;
  centerPosition: Position3D;
  phase: "orbiting" | "landing" | "interactive";
  landingDelay?: number;
  onAngleUpdate?: (id: string, angle: number) => void;
}

/**
 * OrbitingObject Component
 *
 * Renders a single object that orbits around a center point
 *
 */
export const OrbitingObject: React.FC<OrbitingObjectProps> = ({
  data,
  centerPosition,
  phase,
  landingDelay = 0,
  onAngleUpdate,
}) => {
  const meshRef = useOrbitAnimation(
    data.radius,
    data.speed,
    data.initialAngle,
    centerPosition,
    phase === "orbiting",
    (angle) => onAngleUpdate?.(data.id, angle)
  );

  const model = data.modelPath ? useGLTF(data.modelPath) : null;

  const currentPosition = meshRef.current?.position || new THREE.Vector3();
  const targetPosition: Position3D = data.landingPosition || [0, 0, 0];

  const landingSpring = useObjectLanding({
    isLanding: phase === "landing" || phase === "interactive",
    landingDelay,
    currentPosition,
    targetPosition,
  });

  const finalPosition =
    phase === "orbiting" ? undefined : landingSpring.position;

  return (
    <animated.group
      ref={meshRef as any}
      // @ts-ignore
      position={finalPosition}
      rotation={data.landingRotation}
      castShadow
    >
      {model ? (
        <primitive object={model.scene.clone()} scale={data.size} />
      ) : (
        <mesh castShadow>
          <boxGeometry args={[data.size, data.size, data.size]} />
          <meshStandardMaterial
            color={data.color}
            roughness={0.4}
            metalness={0.6}
          />
        </mesh>
      )}
    </animated.group>
  );
};
