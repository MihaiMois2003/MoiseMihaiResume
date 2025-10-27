import React from "react";
import type { OrbitingObjectData } from "../../types/orbit.types";
import type { Position3D } from "../../types/three.types";
import { useOrbitAnimation } from "./useOrbitAnimation";
import { useGLTF } from "@react-three/drei";

interface OrbitingObjectProps {
  data: OrbitingObjectData;
  centerPosition: Position3D;
}

/**
 * OrbitingObject Component
 *
 * Renders a single object that orbits around a center point
 *
 */
export const OrbitingObject: React.FC<OrbitingObjectProps> = ({
  data,
  centerPosition,
}) => {
  const meshRef = useOrbitAnimation(
    data.radius,
    data.speed,
    data.initialAngle,
    centerPosition
  );

  const model = data.modelPath ? useGLTF(data.modelPath) : null;

  return (
    <group ref={meshRef as any} castShadow>
      {model ? (
        // Render the 3D model
        <primitive object={model.scene.clone()} scale={data.size} />
      ) : (
        // Fallback to cube if no model
        <mesh castShadow>
          <boxGeometry args={[data.size, data.size, data.size]} />
          <meshStandardMaterial
            color={data.color}
            roughness={0.4}
            metalness={0.6}
          />
        </mesh>
      )}
    </group>
  );
};
