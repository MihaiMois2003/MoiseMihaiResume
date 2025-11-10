// src/components/OrbitingObjects/OrbitSystem.tsx

import React, { useEffect, useState, useRef } from "react";
import { OrbitingObject } from "./OrbitingObject";
import type { OrbitSystemConfig } from "../../types/orbit.types";

interface OrbitSystemProps {
  config: OrbitSystemConfig;
  phase: "orbiting" | "landing" | "interactive";
}

const STAGGER_DELAY = 500;

export const OrbitSystem: React.FC<OrbitSystemProps> = ({ config, phase }) => {
  const [landingOrder, setLandingOrder] = useState<string[]>([]);
  const angleRefs = useRef<Map<string, number>>(new Map());

  // Fixed: Add landingOrder.length to dependency array
  useEffect(() => {
    if (phase === "landing" && landingOrder.length === 0) {
      calculateLandingOrder();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]); // Only depend on phase

  const calculateLandingOrder = () => {
    const objectsWithAngles = config.objects.map((obj) => {
      const currentAngle = angleRefs.current.get(obj.id) || obj.initialAngle;
      const normalizedAngle =
        ((currentAngle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);

      return {
        id: obj.id,
        angle: normalizedAngle,
      };
    });

    objectsWithAngles.sort((a, b) => a.angle - b.angle);

    const order = objectsWithAngles.map((obj) => obj.id);
    setLandingOrder(order);

    console.log("🎯 Landing order (clockwise):", order);
  };

  const updateAngle = (id: string, angle: number) => {
    angleRefs.current.set(id, angle);
  };

  return (
    <>
      {config.objects.map((objectData) => {
        const orderIndex = landingOrder.indexOf(objectData.id);
        const landingDelay = orderIndex >= 0 ? orderIndex * STAGGER_DELAY : 0;

        return (
          <OrbitingObject
            key={objectData.id}
            data={objectData}
            centerPosition={config.centerPosition}
            phase={phase}
            landingDelay={landingDelay}
            onAngleUpdate={updateAngle}
          />
        );
      })}
    </>
  );
};
