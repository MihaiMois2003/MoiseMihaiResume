import React from "react";
import { animated } from "@react-spring/three";
import { useGLTF } from "@react-three/drei";
import { useEntranceAnimation } from "../../hooks/useEntranceAnimation";
import type { Position3D } from "../../types/three.types";

interface RoomModelProps {
  position: Position3D;
  isVisible: boolean;
}

/**
 * RoomModel component
 *
 * loads the complete room with walls and desk and all
 */
export const RoomModel: React.FC<RoomModelProps> = ({
  position,
  isVisible,
}) => {
  const { scene } = useGLTF("../../../models/RoomModel.glb");

  const springs = useEntranceAnimation({
    isVisible,
    position,
    variant: "room",
  });

  return (
    // @ts-ignore
    <animated.primitive
      object={scene.clone()}
      //@ts-ignore
      position={springs.position}
      //@ts-ignore
      scale={springs.scale.to((s) => s * 0.3)}
      rotation={[0, -Math.PI / 2, 0]}
      castShadow
      receiveShadow
    />
  );
};
