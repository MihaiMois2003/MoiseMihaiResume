import React from "react";
import { motion } from "framer-motion";

/**
 * Animated press enter to continue indicator
 *
 * @remarks
 * uses Framer Motion for : fade in/out animation or pulsing effect to draw attention
 */
export const PressEnterPrompt: React.FC = () => {
  return (
    <motion.div
      className="mt-8 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: [1, 1.05, 1], //pulsing scale effect
      }}
      transition={{
        duration: 0.6,
        delay: 1.5,
        scale: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
    >
      <div className="inline-flex items-center gap-3 px-6 py-3 bg-indigo-600/90 backdrop-blur-sm rounded-full border border-indigo-400/50 shadow-lg">
        <span className="text-white text-sm font-medium">Press</span>
        <kbd className="px-3 py-1 bg-white/30 rounded text-white font-mono text-xs font-bold">
          ENTER
        </kbd>
        <span className="text-white text-sm font-medium">to continue</span>
      </div>
    </motion.div>
  );
};
