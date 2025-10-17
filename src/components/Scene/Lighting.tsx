import React from "react";

/**
 * lightning component responsible for all light sources in the scnee
 * @remarks
 * -ambient light: soft overall illumination(no shadows)
 * -directional light: main light source creating shadows and depth
 */

export const Lighting: React.FC = () => {
  return (
    <>
      {/*ambient light provides base illumination to all objects*/}
      <ambientLight intensity={0.5} />

      {/**directional light simulates sunlight */}
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
    </>
  );
};
