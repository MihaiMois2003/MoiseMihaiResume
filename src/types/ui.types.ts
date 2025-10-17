/**
 * UI-related type definitions
 */

/**
 * Application state
 * Tracks which "phase" the app is in
 */
export type AppPhase = "intro" | "transition" | "interactive";

/**
 * Props for IntroText component
 */
export interface IntroTextProps {
  onEnterPress: () => void;
  isVisible: boolean;
}
