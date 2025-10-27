import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import type { Position3D, CameraConfig } from "../../types/three.types";
import { CharacterPlaceholder } from "../Character/CharacterPlaceholder";
import { Lighting } from "./Lighting";
import type { OrbitSystemConfig } from "../../types/orbit.types";
import { OrbitSystem } from "../OrbitingObjects/OrbitSystem";
import { IntroText } from "../UI/IntroText";
import type { AppPhase } from "../../types/ui.types";
import { FurnitureSet } from "../Furniture/FurnitureSet";

/**
 * Scene Component
 * Main container for all 3D elements
 *
 * @remarks
 * this component sets up the 3D canvas, camera, lighting, and character placeholder
 */

const Scene: React.FC = () => {
  const [phase, setPhase] = useState<AppPhase>("intro");
  const [showIntroText, setShowIntroText] = useState(true);
  const [showFurniture, setShowFurniture] = useState(false);

  const cameraConfig: CameraConfig = {
    position: [0, 2, 8],
    fov: 50,
    near: 0.1,
    far: 1000,
  };

  const characterPosition: Position3D = [-4, 0, 0];
  const roomPosition: Position3D = [3, 0.3, 1];
  const chairPosition: Position3D = [1.9, 0.35, 0.3];

  /**
   * orbit system configutaion
   */
  const orbitConfig: OrbitSystemConfig = {
    centerPosition: characterPosition,
    objects: [
      {
        id: "projects",
        label: "Projects",
        color: "#ff6b6b", // Red
        radius: 2, // 2 units from center
        speed: 0.5, // Rotation speed
        size: 0.4, // Box size
        initialAngle: 0, // Start at 0 degrees
      },
      {
        id: "skills",
        label: "Skills",
        color: "#4ecdc4", // Teal
        radius: 2,
        speed: 0.5,
        size: 0.4,
        initialAngle: ((Math.PI * 2) / 5) * 1, // 72 degrees (360/5)
      },
      {
        id: "about",
        label: "About",
        color: "#45b7d1", // Blue
        radius: 2,
        speed: 0.5,
        size: 0.4,
        initialAngle: ((Math.PI * 2) / 5) * 2, // 144 degrees
      },
      {
        id: "experience",
        label: "Experience",
        color: "#f9ca24", // Yellow
        radius: 2,
        speed: 0.5,
        size: 0.4,
        initialAngle: ((Math.PI * 2) / 5) * 3, // 216 degrees
      },
      {
        id: "contact",
        label: "Contact",
        color: "#a29bfe", // Purple
        radius: 2,
        speed: 0.5,
        size: 0.4,
        initialAngle: ((Math.PI * 2) / 5) * 4, // 288 degrees
      },
    ],
  };

  const handleEnterPress = () => {
    console.log("Enter pressed! Moving to transition phase...");
    setShowIntroText(false);

    setTimeout(() => {
      console.log("Text faded out. Starting transition...");
      setPhase("transition");
      setShowFurniture(true);
    }, 500); //500 ms duration of fade out animation
  };
  return (
    <div className="w-screen h-screen bg-black">
      <Canvas shadows camera={cameraConfig}>
        <Lighting />
        <CharacterPlaceholder position={characterPosition} />
        <OrbitSystem config={orbitConfig} />

        <FurnitureSet
          isVisible={showFurniture}
          roomPosition={roomPosition}
          chairPosition={chairPosition}
        />

        <OrbitControls />
        <gridHelper args={[20, 20, "#333", "#111"]} />
      </Canvas>

      {/* Show intro text only in 'intro' phase */}
      {phase === "intro" && (
        <IntroText onEnterPress={handleEnterPress} isVisible={showIntroText} />
      )}
    </div>
  );
};

export default Scene;
