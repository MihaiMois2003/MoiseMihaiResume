import React from "react";
import type { ChairProps } from "../../types/furniture.types";
import { animated } from "@react-spring/three";
import { useGLTF } from "@react-three/drei";
import { useEntranceAnimation } from "../../hooks/useEntranceAnimation";

/**
 * Chair component
 *
 * Office chair that appears after the room
 */
export const Chair: React.FC<ChairProps> = ({ position, isVisible }) => {
  const { scene } = useGLTF("../../../models/OfficeChair.glb");

  const springs = useEntranceAnimation({
    isVisible,
    position,
    variant: "chair",
  });

  return (
    //@ts-ignore
    <animated.primitive
      object={scene.clone()}
      //@ts-ignore
      position={springs.position}
      //@ts-ignore
      scale={springs.scale.to((s) => s * 0.6)}
      rotation={[0, -Math.PI, 0]}
      castShadow
      receiveShadow
    />
  );
};
