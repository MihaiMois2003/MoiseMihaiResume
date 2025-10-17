import React from "react";
import type { Position3D } from "../../types/three.types";

interface CharacterPlaceholderProps {
  position: Position3D;
  radius?: number;
  color?: string;
}

/**
 * CharacterPlaceholder Component
 * represents me
 * @remarks
 * currently a simple sphere -- will be replaced with a 3d model later
 */

export const CharacterPlaceholder: React.FC<CharacterPlaceholderProps> = ({
  position,
  radius = 0.8,
  color = "#4a90e2",
}) => {
  return (
    <mesh position={position} castShadow>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial color={color} roughness={0.3} metalness={0.5} />
    </mesh>
  );
};
