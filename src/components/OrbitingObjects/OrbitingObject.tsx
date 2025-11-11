import React, { useState, useEffect } from "react";
import { animated } from "@react-spring/three";
import type { OrbitingObjectData } from "../../types/orbit.types";
import type { Position3D } from "../../types/three.types";
import { useOrbitAnimation } from "./useOrbitAnimation";
import { useObjectLanding } from "../../hooks/useObjectLanding";
import { useGLTF } from "@react-three/drei";

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

  // Track current position for landing
  const [currentPos, setCurrentPos] = useState<Position3D>([0, 0, 0]);

  // Update current position from mesh ref
  useEffect(() => {
    if (meshRef.current && phase === "orbiting") {
      const pos = meshRef.current.position;
      setCurrentPos([pos.x, pos.y, pos.z]);
    }
  }, [meshRef, phase]);

  // Capture position snapshot when landing starts
  const [landingStartPos, setLandingStartPos] = useState<Position3D>([0, 0, 0]);
  useEffect(() => {
    if (phase === "landing" && meshRef.current) {
      const pos = meshRef.current.position;
      setLandingStartPos([pos.x, pos.y, pos.z]);
    }
  }, [phase, meshRef]);

  const targetPosition: Position3D = data.landingPosition || [0, 0, 0];

  // Landing animation
  const landingSpring = useObjectLanding({
    isLanding: phase === "landing" || phase === "interactive",
    landingDelay,
    currentPosition: landingStartPos,
    targetPosition,
  });

  // Use landing position when landing/interactive, otherwise let orbit animation control it
  const shouldUseLandingPosition =
    phase === "landing" || phase === "interactive";

  return (
    <animated.group
      // Only apply ref during orbiting phase
      ref={phase === "orbiting" ? meshRef : null}
      // @ts-ignore
      position={shouldUseLandingPosition ? landingSpring.position : undefined}
      rotation={shouldUseLandingPosition ? data.landingRotation : undefined}
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
