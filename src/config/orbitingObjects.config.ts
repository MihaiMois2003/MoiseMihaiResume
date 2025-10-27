import type { OrbitingObjectData } from "../types/orbit.types";

/**
 * Configuration for all orbiting objects
 *
 * Add or remove objects here to update the scene
 */
export const orbitingObjectsData: OrbitingObjectData[] = [
  {
    id: "projects",
    label: "Projects",
    color: "#ff6b6b",
    radius: 2,
    speed: 0.5,
    size: 2,
    initialAngle: 0,
    modelPath: "../../../models/Laptop.glb",
  },
  {
    id: "skills",
    label: "Skills",
    color: "#4ecdc4",
    radius: 2,
    speed: 0.5,
    size: 0.4,
    initialAngle: ((Math.PI * 2) / 5) * 1,
  },
  {
    id: "certifications",
    label: "certifications",
    color: "#45b7d1",
    radius: 2,
    speed: 0.5,
    size: 1,
    initialAngle: ((Math.PI * 2) / 5) * 2,
    modelPath: "../../../models/CertificateFolder.glb",
  },
  {
    id: "experience",
    label: "Experience",
    color: "#f9ca24",
    radius: 2,
    speed: 0.5,
    size: 2,
    initialAngle: ((Math.PI * 2) / 5) * 3,
    modelPath: "../../../models/SchoolBag.glb",
  },
  {
    id: "contact",
    label: "Contact",
    color: "#a29bfe",
    radius: 2,
    speed: 0.5,
    size: 0.4,
    initialAngle: ((Math.PI * 2) / 5) * 4,
  },
];
