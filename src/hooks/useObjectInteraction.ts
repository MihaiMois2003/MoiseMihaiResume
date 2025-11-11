import { useState, useCallback } from "react";

interface UseObjectInteractionReturn {
  isHovered: boolean;
  handleClick: (e: any) => void;
  handlePointerOver: (e: any) => void;
  handlePointerOut: (e: any) => void;
}

/**
 * Custom hook to manage hover and click interactions for orbiting objects
 *
 * @param objectId - The unique identifier for the object
 * @param objectLabel - The display name for the object
 * @param onObjectClick - Optional callback when object is clicked
 */
export const useObjectInteraction = (
  objectId: string,
  objectLabel: string,
  onObjectClick?: (objectId: string) => void
): UseObjectInteractionReturn => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = useCallback(
    (e: any) => {
      e.stopPropagation();

      console.log(`${objectLabel} pressed`);

      if (onObjectClick) {
        onObjectClick(objectId);
      }
    },
    [objectId, objectLabel, onObjectClick]
  );

  const handlePointerOver = useCallback((e: any) => {
    e.stopPropagation();
    setIsHovered(true);
    document.body.style.cursor = "pointer";
  }, []);

  const handlePointerOut = useCallback((e: any) => {
    e.stopPropagation();
    setIsHovered(false);
    document.body.style.cursor = "default";
  }, []);

  return {
    isHovered,
    handleClick,
    handlePointerOver,
    handlePointerOut,
  };
};
