import React, { useState, useEffect, useRef } from "react";
import { animated, useSpring } from "@react-spring/three";
import type { OrbitingObjectData } from "../../types/orbit.types";
import type { Position3D } from "../../types/three.types";
import { useOrbitAnimation } from "../../hooks/useOrbitAnimation";
import { useObjectLanding } from "../../hooks/useObjectLanding";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useObjectInteraction } from "../../hooks/useObjectInteraction";

interface OrbitingObjectProps {
  data: OrbitingObjectData;
  centerPosition: Position3D;
  phase: "orbiting" | "landing" | "interactive";
  landingDelay?: number;
  onAngleUpdate?: (id: string, angle: number) => void;
  onObjectClick?: (objectId: string) => void;
}

/**
 * OrbitingObject Component
 *
 * Renders a single object that orbits around a center point
 * Now with hover scale effect (no glow)
 */
export const OrbitingObject: React.FC<OrbitingObjectProps> = ({
  data,
  centerPosition,
  phase,
  landingDelay = 0,
  onAngleUpdate,
  onObjectClick,
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

  // Continuous tracking of current orbit position
  const [currentOrbitPos, setCurrentOrbitPos] = useState<Position3D>([0, 0, 0]);

  // Freeze position when landing starts
  const frozenPositionRef = useRef<Position3D | null>(null);

  // Interaction hook for hover and click
  const { isHovered, handleClick, handlePointerOver, handlePointerOut } =
    useObjectInteraction(data.id, data.label, onObjectClick);

  // Scale animation on hover (NO GLOW)
  const { scale } = useSpring({
    scale: isHovered ? 1.15 : 1,
    config: { tension: 300, friction: 10 },
  });

  // Update current pos every frame orbit
  useFrame(() => {
    if (phase === "orbiting" && meshRef.current) {
      const pos = meshRef.current.position;
      const newPos: Position3D = [pos.x, pos.y, pos.z];
      setCurrentOrbitPos(newPos);
    }
  });

  // Freeze position the moment phase changes from orbiting
  useEffect(() => {
    if (phase === "landing" && frozenPositionRef.current === null) {
      frozenPositionRef.current = currentOrbitPos;
      console.log(`${data.id} frozen at: `, currentOrbitPos);
    }

    if (phase === "orbiting") {
      frozenPositionRef.current = null;
    }
  }, [phase, currentOrbitPos, data.id]);

  const targetPosition: Position3D = data.landingPosition || [0, 0, 0];

  // Use frozen position as start position for landing
  const landingStartPosition = frozenPositionRef.current || currentOrbitPos;

  const landingSpring = useObjectLanding({
    isLanding: phase === "landing" || phase === "interactive",
    landingDelay,
    currentPosition: landingStartPosition,
    targetPosition,
  });

  const shouldUseLandingPosition =
    phase === "landing" || phase === "interactive";

  return (
    <animated.group
      // Only apply ref during orbiting phase
      ref={phase === "orbiting" ? meshRef : null}
      // @ts-ignore
      position={shouldUseLandingPosition ? landingSpring.position : undefined}
      rotation={shouldUseLandingPosition ? data.landingRotation : undefined}
      // Event handlers for interaction
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      castShadow
    >
      {/* Scale animation on hover */}
      <animated.group scale={scale}>
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

      {/* REMOVED: pointLight (glow effect) */}
      {/* REMOVED: aura mesh (outline effect) */}
    </animated.group>
  );
};
