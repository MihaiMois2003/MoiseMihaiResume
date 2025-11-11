import type { Position3D } from "./three.types";

export interface FurnitureProps {
  position: Position3D;
  isVisible: boolean;
}

//furniture that manages both chair and desk
export interface FurnitureSetProps {
  isVisible: boolean;
  roomPosition: Position3D;
  chairPosition: Position3D;
  phoneTablePosition: Position3D;
}
