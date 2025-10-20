import React, { useRef } from "react";
import type { DeskProps } from "../../types/furniture.types";
import * as THREE from "three";
import { useSpring, animated } from "@react-spring/three";

/**
 * desk component
 *
 * mock desk soon to be replaced by blender model
 * @param position - 3d position
 * @param isVisible - triggers entrance animation
 *
 * @remarks - use react-spring for physics base bounce animation
 */
export const Desk: React.FC<DeskProps> = ({ position, isVisible }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  //bouncy entrance effect
  const springs = useSpring({
    scale: isVisible ? 1 : 0,
    position: isVisible
      ? position
      : [position[0], position[1] - 2, position[2]],
    config: {
      tension: 180, //higher = snappier
      friction: 12, //higher = less bouncy
      mass: 1, //object weight
    },
  });

  return (
    // @ts-ignore
    <animated.mesh
      ref={meshRef}
      //@ts-ignore
      position={springs.position}
      //@ts-ignore
      scale={springs.scale}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[3, 0.1, 1.5]} />
      <meshStandardMaterial color="#8B4513" roughness={0.8} metalness={0.2} />
    </animated.mesh>
  );
};
