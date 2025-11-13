import React from "react";
import { Modal } from "./Modal";
import { motion } from "framer-motion";
import { skillsData } from "../../data/skills.data";

interface SkillsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * SkillsModal Component
 *
 * Displays skills as colorful tags with staggered animations
 */
export const SkillsModal: React.FC<SkillsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const categoryColors = [
    "from-blue-500/20 to-cyan-500/20 border-blue-500/50 hover:border-blue-400",
    "from-purple-500/20 to-pink-500/20 border-purple-500/50 hover:border-purple-400",
    "from-green-500/20 to-emerald-500/20 border-green-500/50 hover:border-green-400",
    "from-orange-500/20 to-yellow-500/20 border-orange-500/50 hover:border-orange-400",
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} variant="other" title="Skills">
      <div className="space-y-8">
        {skillsData.map((category, categoryIndex) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: categoryIndex * 0.15 }}
            className="space-y-4"
          >
            {/* Category Header with Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: categoryIndex * 0.15,
                type: "spring",
                stiffness: 200,
              }}
              className="flex items-center gap-3"
            >
              <div
                className="
                w-12 h-12 rounded-xl 
                bg-gradient-to-br from-gray-700 to-gray-800
                border border-gray-600/50
                flex items-center justify-center
                text-2xl
              "
              >
                {category.icon}
              </div>
              <h3 className="text-xl font-bold text-white">{category.title}</h3>
            </motion.div>

            {/* Skills as Animated Pills/Tags */}
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, skillIndex) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: categoryIndex * 0.05 + skillIndex * 0.02,
                    duration: 0.3,
                    ease: "easeOut",
                  }}
                  whileHover={{ scale: 1.05 }}
                  className={`
                    px-4 py-2 rounded-full
                    bg-gradient-to-r ${
                      categoryColors[categoryIndex % categoryColors.length]
                    }
                    border
                    transition-all duration-300
                    cursor-default
                    shadow-lg
                  `}
                >
                  <span className="text-sm font-medium text-white">
                    {skill.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Modal>
  );
};
