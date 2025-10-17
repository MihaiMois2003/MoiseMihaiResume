import React from "react";
import { OrbitingObject } from "./OrbitingObject";
import type { OrbitSystemConfig } from "../../types/orbit.types";

interface OrbitSystemProps {
  config: OrbitSystemConfig;
}

/**
 * components that manages and renders all orbiting objects
 *
 * @param config - configuration contaiining center position and object data
 */
export const OrbitSystem: React.FC<OrbitSystemProps> = ({ config }) => {
  return (
    <>
      {config.objects.map((objectData) => (
        <OrbitingObject
          key={objectData.id}
          data={objectData}
          centerPosition={config.centerPosition}
        />
      ))}
    </>
  );
};
