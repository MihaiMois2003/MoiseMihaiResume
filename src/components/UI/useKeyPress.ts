import { useEffect } from "react";

/**
 * custom hook: useKeyPress
 *
 * @param targetKey - the key to listen for
 * @param callback - function to call when key is pressed
 */

export const useKeyPress = (targetKey: string, callback: () => void): void => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent): void => {
      if (event.key === targetKey) {
        callback();
      }
    };

    //add event listener when component mounts
    window.addEventListener("keydown", handleKeyPress);

    //cleanup: remove event listener when component unmounts to prevent memory leaks
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [targetKey, callback]);
};
