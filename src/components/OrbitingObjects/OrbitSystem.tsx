// src/components/OrbitingObjects/OrbitSystem.tsx

import React, { useState } from "react";
import { OrbitingObject } from "./OrbitingObject";
import type { OrbitSystemConfig } from "../../types/orbit.types";

interface OrbitSystemProps {
  config: OrbitSystemConfig;
  phase: "orbiting" | "landing" | "interactive";
}

export const OrbitSystem: React.FC<OrbitSystemProps> = ({ config, phase }) => {
  const [angles, setAngles] = useState<Record<string, number>>({});
  const handleAngleUpdate = (id: string, angle: number) => {
    setAngles((prev) => ({ ...prev, [id]: angle }));
  };

  /**
   * stagger delay configuration,
   * each object lands 300 ms later than the one  before
   *
   */
  const STAGGER_DELAY = 200;

  return (
    <>
      {config.objects.map((objectData, index) => (
        <OrbitingObject
          key={objectData.id}
          data={objectData}
          centerPosition={config.centerPosition}
          phase={phase}
          landingDelay={index * STAGGER_DELAY}
          onAngleUpdate={handleAngleUpdate}
        />
      ))}
    </>
  );
};
