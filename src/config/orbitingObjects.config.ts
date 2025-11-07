import type { OrbitingObjectData } from "../types/orbit.types";

/**
 * Configuration for all orbiting objects
 *
 * Add or remove objects here to update the scene
 * IMPORTANT: Keep sizes consistent to prevent visual overlap!
 */
const NUM_OBJECTS = 5;
const ANGLE_STEP = (Math.PI * 2) / NUM_OBJECTS;

const SHARED_CONFIG = {
  radius: 3,
  speed: 0.3,
  size: 0.6,
};

export const orbitingObjectsData: OrbitingObjectData[] = [
  {
    id: "projects",
    label: "Projects",
    color: "#ff6b6b",
    ...SHARED_CONFIG,
    initialAngle: ANGLE_STEP * 0,
    modelPath: "/models/Laptop.glb",
  },
  {
    id: "skills",
    label: "Skills",
    color: "#4ecdc4",
    ...SHARED_CONFIG,
    initialAngle: ANGLE_STEP * 1,
  },
  {
    id: "certifications",
    label: "certifications",
    color: "#45b7d1",
    ...SHARED_CONFIG,
    initialAngle: ANGLE_STEP * 2,
    modelPath: "/models/CertificateFolder.glb",
  },
  {
    id: "experience",
    label: "Experience",
    color: "#f9ca24",
    ...SHARED_CONFIG,
    initialAngle: ANGLE_STEP * 3,
    modelPath: "/models/SchoolBag.glb",
  },
  {
    id: "contact",
    label: "Contact",
    color: "#a29bfe",
    ...SHARED_CONFIG,
    initialAngle: ANGLE_STEP * 4,
  },
];
