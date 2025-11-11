import { useSpring } from "@react-spring/three";
import type { Position3D } from "../types/three.types";
import * as THREE from "three";
import { useState, useEffect } from "react";

interface UseObjectLandingProps {
  isLanding: boolean;
  landingDelay: number;
  currentPosition: THREE.Vector3 | Position3D;
  targetPosition: Position3D;
}

export const useObjectLanding = ({
  isLanding,
  landingDelay,
  currentPosition,
  targetPosition,
}: UseObjectLandingProps) => {
  // Track if we've captured the start position
  const [startPosition, setStartPosition] = useState<Position3D>([0, 0, 0]);
  const [hasStarted, setHasStarted] = useState(false);

  // Capture the current position when landing starts
  useEffect(() => {
    if (isLanding && !hasStarted) {
      const pos: Position3D =
        currentPosition instanceof THREE.Vector3
          ? [currentPosition.x, currentPosition.y, currentPosition.z]
          : currentPosition;
      setStartPosition(pos);
      setHasStarted(true);
    }

    // Reset when not landing
    if (!isLanding && hasStarted) {
      setHasStarted(false);
    }
  }, [isLanding, currentPosition, hasStarted]);

  const springs = useSpring({
    from: {
      position: startPosition,
    },
    to: {
      position: isLanding ? targetPosition : startPosition,
    },
    config: {
      mass: 1,
      tension: 80,
      friction: 26,
      clamp: false,
    },
    delay: isLanding ? landingDelay : 0,
    reset: isLanding && !hasStarted,
  });

  return springs;
};
