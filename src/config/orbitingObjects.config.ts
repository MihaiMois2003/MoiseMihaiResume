import type { OrbitingObjectData } from "../types/orbit.types";

/**
 * Configuration for all orbiting objects
 *
 * Objects have different sizes but their EDGES orbit at same visual distance
 */

const NUM_OBJECTS = 5;
const ANGLE_STEP = (Math.PI * 2) / NUM_OBJECTS;

const BASE_VISUAL_RADIUS = 4;

const getAdjustedRadius = (size: number): number => {
  return BASE_VISUAL_RADIUS + size / 2;
};

export const orbitingObjectsData: OrbitingObjectData[] = [
  {
    id: "projects",
    label: "Projects",
    color: "#ff6b6b",
    radius: getAdjustedRadius(2),
    speed: 0.3,
    size: 2,
    initialAngle: ANGLE_STEP * 0,
    modelPath: "/models/Laptop.glb",

    landingPosition: [0.85, 0.72, -2.48],
    landingRotation: [0, 0, 0],
  },
  {
    id: "skills",
    label: "Skills",
    color: "#4ecdc4",
    radius: getAdjustedRadius(0.3),
    speed: 0.3,
    size: 0.4,
    initialAngle: ANGLE_STEP * 1,

    landingPosition: [3, 1.5, 1],
  },
  {
    id: "certifications",
    label: "Certifications",
    color: "#45b7d1",
    radius: getAdjustedRadius(1),
    speed: 0.3,
    size: 1,
    initialAngle: ANGLE_STEP * 2,
    modelPath: "/models/CertificateFolder.glb",

    landingPosition: [1.2, 0.03, -0.5],
    landingRotation: [0, 0, 0],
  },
  {
    id: "experience",
    label: "Experience",
    color: "#f9ca24",
    radius: getAdjustedRadius(2),
    speed: 0.3,
    size: 2,
    initialAngle: ANGLE_STEP * 3,
    modelPath: "/models/SchoolBag.glb",

    landingPosition: [5, 0.03, 3],
    landingRotation: [0, 1.57, 0],
  },
  {
    id: "contact",
    label: "Contact",
    color: "#a29bfe",
    radius: getAdjustedRadius(0.4),
    speed: 0.3,
    size: 0.4,
    initialAngle: ANGLE_STEP * 4,

    landingPosition: [3, 1.5, -1],
  },
  {
    id: "volunteering",
    label: "Volunteering",
    color: "#f9ca24",
    radius: getAdjustedRadius(2),
    speed: 0.3,
    size: 1,
    initialAngle: ANGLE_STEP * 3,
    modelPath: "/models/Plant.glb",

    landingPosition: [3, 0.03, 3],
    landingRotation: [0, 1.57, 0],
  },
];
