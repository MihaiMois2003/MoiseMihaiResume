/**
 * UI-related type definitions
 */

/**
 * Application state
 * Tracks which "phase" the app is in
 */
export type AppPhase =
  | "loading"
  | "intro"
  | "transition"
  | "landing"
  | "interactive";

/**
 * Props for IntroText component
 */
export interface IntroTextProps {
  onEnterPress: () => void;
  isVisible: boolean;
}
