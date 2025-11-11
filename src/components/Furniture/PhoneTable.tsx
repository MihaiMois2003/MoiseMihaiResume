import React from "react";
import type { FurnitureProps } from "../../types/furniture.types";
import { animated } from "@react-spring/three";
import { useGLTF } from "@react-three/drei";
import { useEntranceAnimation } from "../../hooks/useEntranceAnimation";

/**
 * PhoneTable component
 *
 * The table where the contact phone sits
 */
export const PhoneTable: React.FC<FurnitureProps> = ({
  position,
  isVisible,
}) => {
  const { scene } = useGLTF("/models/PhoneTable.glb");

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
      scale={springs.scale.to((s) => s * 0.8)}
      rotation={[0, -Math.PI, 0]}
      castShadow
      receiveShadow
    />
  );
};
