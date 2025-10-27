import { useSpring } from "@react-spring/three";
import type { Position3D } from "../types/three.types";

export type AnimationVariant = "room" | "chair" | "desk";

interface UseEntranceAnimationProps {
  isVisible: boolean;
  position: Position3D;
  variant?: AnimationVariant;
}

const variantConfigs = {
  room: {
    tension: 150,
    friction: 20,
    mass: 2,
    delay: 0, // appears first
  },
  chair: {
    tension: 200,
    friction: 14,
    mass: 0.8,
    delay: 400, // appears after room
  },
  desk: {
    tension: 180,
    friction: 12,
    mass: 1,
    delay: 200,
  },
};

export const useEntranceAnimation = ({
  isVisible,
  position,
  variant = "room",
}: UseEntranceAnimationProps) => {
  const config = variantConfigs[variant];

  return useSpring({
    scale: isVisible ? 1 : 0,
    position: isVisible
      ? position
      : [position[0], position[1] - 2, position[2]],
    config: {
      tension: config.tension,
      friction: config.friction,
      mass: config.mass,
    },
    delay: config.delay,
  });
};
