// src/hooks/useObjectLanding.ts

import { useRef } from "react";
import { useSpring, config } from "@react-spring/three";
import * as THREE from "three";
import type { Position3D } from "../types/three.types";

interface UseLandingParams {
  isLanding: boolean;
  landingDelay: number;
  currentPosition: THREE.Vector3;
  targetPosition: Position3D;
  onLandingComplete?: () => void;
}

/**
 * Hook for animating object landing from orbit to final position
 */
export const useObjectLanding = ({
  isLanding,
  landingDelay,
  currentPosition,
  targetPosition,
  onLandingComplete,
}: UseLandingParams) => {
  const hasLanded = useRef(false);

  // Convert current position to array, with fallback
  const currentPosArray: Position3D = [
    currentPosition?.x ?? 0,
    currentPosition?.y ?? 0,
    currentPosition?.z ?? 0,
  ];

  const springs = useSpring({
    position: isLanding ? targetPosition : currentPosArray,
    config: config.slow,
    delay: landingDelay,
    onRest: () => {
      if (isLanding && !hasLanded.current) {
        hasLanded.current = true;
        onLandingComplete?.();
      }
    },
  });

  return springs;
};
