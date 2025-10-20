import React from "react";
import { Desk } from "./Desk";
import { Chair } from "./Chair";
import type { FurnitureSetProps } from "../../types/furniture.types";

/**
 * FurnitureSet components - both chair and desk as a unit
 *
 * @param isVisible - control entrance animation
 * @param deskPosition - where to place desk
 * @param chairPosition - where to place chair
 */
export const FurnitureSet: React.FC<FurnitureSetProps> = ({
  isVisible,
  deskPosition,
  chairPosition,
}) => {
  return (
    <>
      <Desk position={deskPosition} isVisible={isVisible} />
      <Chair position={chairPosition} isVisible={isVisible} />
    </>
  );
};
