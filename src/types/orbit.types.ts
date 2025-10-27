import type { Position3D } from "./three.types";

//singe orbiting object with its properties
export interface OrbitingObjectData {
  id: string;
  label: string; //projects, skills, etc.
  color: string; //hex color
  radius: number; //distance from center
  speed: number; //rotation speed
  size: number; //object size
  initialAngle: number; //starting angle(radians)
  modelPath?: string;
}

//configuration for entire orbit system
export interface OrbitSystemConfig {
  centerPosition: Position3D;
  objects: OrbitingObjectData[];
}
