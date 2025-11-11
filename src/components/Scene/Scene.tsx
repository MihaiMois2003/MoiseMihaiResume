import React, { useCallback, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  Sky,
  useProgress,
} from "@react-three/drei";
import type { Position3D, CameraConfig } from "../../types/three.types";
import { CharacterPlaceholder } from "../Character/CharacterPlaceholder";
import { Lighting } from "./Lighting";
import type { OrbitSystemConfig } from "../../types/orbit.types";
import { OrbitSystem } from "../OrbitingObjects/OrbitSystem";
import { IntroText } from "../UI/IntroText";
import { LoadingScreen } from "../UI/LoadingScreen";
import type { AppPhase } from "../../types/ui.types";
import { FurnitureSet } from "../Furniture/FurnitureSet";
import { orbitingObjectsData } from "../../config/orbitingObjects.config";
import { AnimatePresence } from "framer-motion";

const LoadingManager: React.FC<{ onLoad: () => void }> = ({ onLoad }) => {
  const { progress } = useProgress();
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (progress === 100 && !hasLoaded) {
      setHasLoaded(true);
      setTimeout(() => {
        onLoad();
      }, 500);
    }
  }, [progress, onLoad, hasLoaded]);

  return null;
};

const Scene: React.FC = () => {
  const [phase, setPhase] = useState<AppPhase>("loading");
  const [showIntroText, setShowIntroText] = useState(false);
  const [showFurniture, setShowFurniture] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const cameraConfig: CameraConfig = {
    position: [0, 2, 8],
    fov: 50,
    near: 0.1,
    far: 1000,
  };

  const characterPosition: Position3D = [-4, 0, 0];
  const roomPosition: Position3D = [3, 0.3, 1];
  const chairPosition: Position3D = [2.85, 0.07, 0];
  const phoneTablePosition: Position3D = [-0.4, 0.05, -0.5];

  const orbitConfig: OrbitSystemConfig = {
    centerPosition: characterPosition,
    objects: orbitingObjectsData,
  };

  const handleLoadComplete = () => {
    setPhase((currentPhase) => {
      if (currentPhase === "loading") {
        console.log("Load complete - moving to intro");
        setIsLoading(false);
        setTimeout(() => {
          setShowIntroText(true);
        }, 500);
        return "intro";
      }
      console.log("Load complete called but ignoring - already past loading");
      return currentPhase;
    });
  };

  const handleEnterPress = () => {
    console.log("Enter pressed!");
    setShowIntroText(false);

    setTimeout(() => {
      console.log("Exit animation complete, changing phase");
      setPhase("transition");
      setShowFurniture(true);

      setTimeout(() => {
        console.log("🚀 Starting landing sequence");
        setPhase("landing");
      }, 900); // Wait for chair bounce to finish
    }, 600);
  };

  const handleObjectClick = useCallback((objectId: string) => {
    console.log(`Scene received click for: ${objectId}`);
    //add modal logic later
  }, []);

  const orbitPhase =
    phase === "loading" || phase === "intro" || phase === "transition"
      ? "orbiting"
      : phase === "landing"
      ? "landing"
      : "interactive";

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      <div className="w-screen h-screen bg-black">
        <Canvas shadows camera={cameraConfig}>
          <LoadingManager onLoad={handleLoadComplete} />
          <Sky
            distance={450000}
            sunPosition={[0, 1, 0]}
            inclination={0.5}
            azimuth={0.25}
          />

          <Environment preset="park" />
          <Lighting />
          <CharacterPlaceholder position={characterPosition} />

          <OrbitSystem
            config={orbitConfig}
            phase={orbitPhase}
            onObjectClick={handleObjectClick}
          />

          <FurnitureSet
            isVisible={showFurniture}
            roomPosition={roomPosition}
            chairPosition={chairPosition}
            phoneTablePosition={phoneTablePosition}
          />

          <OrbitControls />
          <gridHelper args={[20, 20, "#333", "#111"]} />
        </Canvas>

        <AnimatePresence mode="wait">
          {phase === "intro" && (
            <IntroText
              key="intro-text"
              onEnterPress={handleEnterPress}
              isVisible={showIntroText}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Scene;
