/**
 * Shared TypeScript type definitions for 3D components
 */

//position in 3D space
export type Position3D = [number, number, number];

//camera interface
export interface CameraConfig {
  position: Position3D;
  fov: number;
  near: number;
  far: number;
}
