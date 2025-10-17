import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

/**
 * Type Definitions
 * These define the "contracts" for our components
 */

/**
 * Position in 3D space
 * Tuple of [x, y, z] coordinates
 */
type Position3D = [number, number, number];

/**
 * Props for CharacterPlaceholder component
 */
interface CharacterPlaceholderProps {
  position: Position3D;
  radius?: number;
  color?: string;
}

/**
 * Props for Lighting component
 * Currently empty, but good practice to define even if unused
 */
interface LightingProps {}

/**
 * Camera configuration interface
 */
interface CameraConfig {
  position: Position3D;
  fov: number;
  near: number;
  far: number;
}

/**
 * Lighting Component
 * Responsible for all light sources in the scene
 *
 * @remarks
 * - ambientLight: Soft overall illumination (no shadows)
 * - directionalLight: Main light source creating shadows and depth
 */
const Lighting: React.FC<LightingProps> = () => {
  return (
    <>
      {/* Ambient light provides base illumination to all objects */}
      <ambientLight intensity={0.5} />

      {/* 
        Directional light simulates sunlight 
        Position: [x, y, z] where light originates
        Creates shadows and definition on objects
      */}
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
    </>
  );
};

/**
 * CharacterPlaceholder Component
 * Represents "you" on the left side of the screen
 * Currently a simple sphere - will be replaced with your 3D model later
 *
 * @param position - 3D coordinates [x, y, z]
 * @param radius - Size of the sphere (default: 0.8)
 * @param color - Hex color string (default: #4a90e2)
 *
 * @remarks
 * Position explanation:
 * - x: negative values = left side of screen
 * - y: 0 = centered vertically
 * - z: 0 = at origin depth
 */
const CharacterPlaceholder: React.FC<CharacterPlaceholderProps> = ({
  position,
  radius = 0.8,
  color = "#4a90e2",
}) => {
  return (
    <mesh position={position} castShadow>
      {/* 
        Sphere geometry parameters:
        - radius: size of sphere
        - widthSegments: horizontal detail (more = smoother)
        - heightSegments: vertical detail (more = smoother)
      */}
      <sphereGeometry args={[radius, 32, 32]} />

      {/* 
        Material determines how light interacts with the surface
        - color: base color of the material
        - roughness: 0 (smooth/reflective) to 1 (rough/matte)
        - metalness: 0 (non-metallic) to 1 (fully metallic)
      */}
      <meshStandardMaterial color={color} roughness={0.3} metalness={0.5} />
    </mesh>
  );
};

/**
 * Scene Component
 * Main container for all 3D elements
 *
 * @remarks
 * Responsible for:
 * - Setting up the Canvas (R3F's rendering context)
 * - Camera configuration
 * - Composing all scene elements
 *
 * Architecture Pattern: Composition Root
 * This component orchestrates all sub-components but doesn't
 * contain complex logic itself (Single Responsibility Principle)
 */
const Scene: React.FC = () => {
  /**
   * Camera configuration object
   * Extracted for better readability and potential reusability
   */
  const cameraConfig: CameraConfig = {
    position: [0, 0, 10], // 10 units away from origin, looking at center
    fov: 50, // Field of view in degrees (human eye ≈ 50-60)
    near: 0.1, // Objects closer than this won't render
    far: 1000, // Objects farther than this won't render
  };

  /**
   * Character position
   * Extracted as constant for clarity and easy modification
   */
  const characterPosition: Position3D = [-3, 0, 0];

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#0a0a0a" }}>
      {/* 
        Canvas: R3F's main component
        Creates WebGL rendering context and manages the render loop
        
        Props:
        - shadows: enables shadow rendering (performance cost)
        - camera: configuration for the default perspective camera
      */}
      <Canvas shadows camera={cameraConfig}>
        {/* Scene composition - each component is independent */}
        <Lighting />

        <CharacterPlaceholder position={characterPosition} />

        {/* 
          OrbitControls: Development helper
          Allows mouse interaction with camera
          TODO: Remove in production when camera is fixed
        */}
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />

        {/* 
          Grid helper: Visual reference for ground plane
          Args: [size, divisions, centerLineColor, gridColor]
          TODO: Remove in production
        */}
        <gridHelper args={[20, 20, "#333", "#111"]} />
      </Canvas>

      {/* Development info overlay */}
      <div
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          color: "white",
          fontFamily: "monospace",
          background: "rgba(0,0,0,0.7)",
          padding: "15px",
          borderRadius: "8px",
          fontSize: "14px",
        }}
      >
        <strong>Step 1: Basic Scene (TypeScript)</strong>
        <div style={{ marginTop: "10px", fontSize: "12px", lineHeight: "1.6" }}>
          ✓ R3F Canvas initialized
          <br />✓ Camera positioned at {JSON.stringify(cameraConfig.position)}
          <br />
          ✓ Lighting setup (ambient + directional)
          <br />✓ Character placeholder at {JSON.stringify(characterPosition)}
          <br />
          ✓ TypeScript types enforced
          <br />
          <br />
          <em>Use mouse to orbit camera (temporary)</em>
        </div>
      </div>
    </div>
  );
};

export default Scene;
