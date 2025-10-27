import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  isLoading: boolean;
}

/**
 * Loading screen with animated progress
 * Shows while 3D models and assets are loading
 */
export const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="text-center">
            {/* Logo or Name */}
            <motion.h1
              className="text-5xl font-bold mb-8 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Moise Mihai Ioan
            </motion.h1>

            {/* Animated spinner */}
            <motion.div
              className="w-16 h-16 border-4 border-indigo-400/30 border-t-indigo-400 rounded-full mx-auto mb-6"
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Loading text */}
            <motion.p
              className="text-indigo-300 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Loading Experience...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
