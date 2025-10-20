import type { Position3D } from "./three.types";

export interface DeskProps {
  position: Position3D;
  isVisible: boolean;
}

export interface ChairProps {
  position: Position3D;
  isVisible: boolean;
}

//furniture that manages both chair and desk
export interface FurnitureSetProps {
  isVisible: boolean;
  deskPosition: Position3D;
  chairPosition: Position3D;
}
