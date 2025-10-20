import React, { useRef } from "react";
import type { ChairProps } from "../../types/furniture.types";
import * as THREE from "three";
import { useSpring, animated } from "@react-spring/three";
import { useGLTF } from "@react-three/drei";

/**
 * Chair components
 *
 * to be replaced by blender model later
 *
 * @param position - 3d position
 * @param isVisible - triggers entrance animation
 *
 * @remarks - use react-spring for physics base bounce animation
 *          - appears slightly after desk
 */
export const Chair: React.FC<ChairProps> = ({ position, isVisible }) => {
  const { scene } = useGLTF("../../../public/models/OfficeChair.glb");

  //bouncy effect different timing than desk
  const springs = useSpring({
    scale: isVisible ? 1 : 0,
    position: isVisible
      ? position
      : [position[0], position[1] - 2, position[2]],
    config: {
      tension: 200,
      friction: 14,
      mass: 0.8,
    },
    delay: 200,
  });

  return (
    // @ts-ignore
    <animated.primitive
      object={scene.clone()}
      //@ts-ignore
      position={springs.position}
      //@ts-ignore
      scale={springs.scale}
      castShadow
      receiveShadow
    />
  );
};
