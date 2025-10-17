import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import type { IntroTextProps } from "../../types/ui.types";
import { PressEnterPrompt } from "./PressEnterPrompt";
import { useKeyPress } from "./useKeyPress";

export const IntroText: React.FC<IntroTextProps> = ({
  onEnterPress,
  isVisible,
}) => {
  useKeyPress("Enter", onEnterPress);

  //stagger children animation(makes each text element appear one after another)
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  //individual item animation
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="absolute right-0 top-0 h-full w-1/2 flex items-center justify-center p-12 pointer-events-none">
          <motion.div
            className="max-w-lg text-white pointer-events-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Name/Title */}
            <motion.h1
              className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
              variants={itemVariants}
            >
              Moise Mihai Ioan
            </motion.h1>

            {/* Subtitle */}
            <motion.h2
              className="text-2xl font-light mb-6 text-white/80"
              variants={itemVariants}
            >
              Full Stack Developer
            </motion.h2>

            {/* Description */}
            <motion.p
              className="text-lg leading-relaxed text-white/70 mb-8"
              variants={itemVariants}
            >
              Welcome to my interactive 3D portfolio. Explore my projects,
              skills, and experience in an immersive environment.
            </motion.p>

            {/* Divider */}
            <motion.div
              className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mb-8"
              variants={itemVariants}
            />

            {/* Press Enter Prompt */}
            <motion.div variants={itemVariants}>
              <PressEnterPrompt />
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
