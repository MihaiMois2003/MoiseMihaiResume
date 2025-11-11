import React, { useState, useEffect, useRef } from "react";
import { animated } from "@react-spring/three";
import type { OrbitingObjectData } from "../../types/orbit.types";
import type { Position3D } from "../../types/three.types";
import { useOrbitAnimation } from "../../hooks/useOrbitAnimation";
import { useObjectLanding } from "../../hooks/useObjectLanding";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useObjectInteraction } from "../../hooks/useObjectInteraction";
import { useSpring } from "@react-spring/three";
import * as THREE from "three";

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
 *
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

  //continous tracking of current orbit position
  const [currentOrbitPos, setCurrentOrbitPos] = useState<Position3D>([0, 0, 0]);

  //freeze position when landing starts
  const frozenPositionRef = useRef<Position3D | null>(null);

  //interaction hook for hover and click
  const { isHovered, handleClick, handlePointerOver, handlePointerOut } =
    useObjectInteraction(data.id, data.label, onObjectClick);

  const { scale } = useSpring({
    scale: isHovered ? 1.15 : 1,
    config: { tension: 300, friction: 10 },
  });

  const { glowIntensity } = useSpring({
    glowIntensity: isHovered ? 2.5 : 0,
    config: { tension: 200, friction: 20 },
  });

  //update current pos every frame orbit
  useFrame(() => {
    if (phase === "orbiting" && meshRef.current) {
      const pos = meshRef.current.position;
      const newPos: Position3D = [pos.x, pos.y, pos.z];
      setCurrentOrbitPos(newPos);
    }
  });

  //freeze position the moment phase changes from orbiting
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

  //use frozen position as start position for landing
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
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      castShadow
    >
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

      <animated.pointLight
        position={[0, 0, 0]}
        intensity={glowIntensity}
        distance={4}
        color={data.color}
        decay={2}
      />

      {isHovered && (
        <mesh scale={[1.2, 1.2, 1.2]}>
          <sphereGeometry args={[data.size * 0.6, 16, 16]} />
          <meshBasicMaterial
            color={data.color}
            transparent
            opacity={0.15}
            side={THREE.BackSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}
    </animated.group>
  );
};
