import React from "react";
import { OrbitingObject } from "./OrbitingObject";
import type { OrbitSystemConfig } from "../../types/orbit.types";

interface OrbitSystemProps {
  config: OrbitSystemConfig;
  phase: "orbiting" | "landing" | "interactive";
  onObjectClick?: (objectId: string) => void;
}

/**
 * OrbitSystem Component
 *
 * Manages all orbiting objects and passes interactions through
 */
export const OrbitSystem: React.FC<OrbitSystemProps> = ({
  config,
  phase,
  onObjectClick,
}) => {
  return (
    <group>
      {config.objects.map((objectData, index) => (
        <OrbitingObject
          key={objectData.id}
          data={objectData}
          centerPosition={config.centerPosition}
          phase={phase}
          landingDelay={index * 0.15}
          onObjectClick={onObjectClick}
        />
      ))}
    </group>
  );
};
