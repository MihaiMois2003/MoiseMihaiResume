import React from "react";
import { RoomModel } from "./RoomModel";
import { Chair } from "./Chair";
import type { FurnitureSetProps } from "../../types/furniture.types";
import { PhoneTable } from "./PhoneTable";

/**
 * FurnitureSet components - both chair and desk as a unit
 *
 * @param isVisible - control entrance animation
 * @param roomPosition - where to place room model
 * @param chairPosition - where to place chair
 * @param PhoneTablePosition - where to place Phone Table
 */
export const FurnitureSet: React.FC<FurnitureSetProps> = ({
  isVisible,
  roomPosition,
  chairPosition,
  phoneTablePosition,
}) => {
  return (
    <>
      <RoomModel position={roomPosition} isVisible={isVisible} />
      <Chair position={chairPosition} isVisible={isVisible} />
      <PhoneTable position={phoneTablePosition} isVisible={isVisible} />
    </>
  );
};
