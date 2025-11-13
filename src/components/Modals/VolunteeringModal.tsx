import React from "react";
import { Modal } from "./Modal";
import { motion } from "framer-motion";
import { volunteeringData } from "../../data/volunteering.data";
import { Calendar, Heart } from "lucide-react";

interface VolunteeringModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * VolunteeringModal Component
 *
 * Displays volunteering experiences with smooth animations
 */
export const VolunteeringModal: React.FC<VolunteeringModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      variant="other"
      title="Volunteering"
    >
      <div className="space-y-6">
        {volunteeringData.map((item, index) => (
          <motion.div
            key={item.role}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.1,
              duration: 0.3,
              ease: "easeOut",
            }}
            className="
              bg-gradient-to-br from-gray-800 to-gray-900
              border border-gray-700/50
              rounded-xl p-6
              hover:border-gray-600/50
              transition-all duration-300
            "
          >
            {/* Header */}
            <div className="flex items-start gap-4 mb-4">
              <div
                className="
                w-12 h-12 rounded-xl 
                bg-gradient-to-br from-green-500/20 to-emerald-500/20
                border border-green-500/30
                flex items-center justify-center
                text-2xl flex-shrink-0
              "
              >
                {item.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-1">
                  {item.role}
                </h3>
                <p className="text-gray-300 text-sm font-medium mb-2">
                  {item.organization}
                </p>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Calendar size={14} />
                  <span>{item.period}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="pl-4 border-l-2 border-green-500/30">
              <ul className="space-y-2">
                {item.description.map((desc, descIndex) => (
                  <motion.li
                    key={descIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: index * 0.1 + descIndex * 0.05,
                      duration: 0.3,
                      ease: "easeOut",
                    }}
                    className="text-gray-300 text-sm leading-relaxed flex items-start gap-2"
                  >
                    <span className="text-green-400 mt-1">•</span>
                    <span>{desc}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}

        {/* Optional: Add a nice footer message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: volunteeringData.length * 0.1 + 0.1,
            duration: 0.3,
            ease: "easeOut",
          }}
          className="
            flex items-center justify-center gap-2
            text-gray-400 text-sm italic pt-4
          "
        >
          <Heart size={16} className="text-red-400" />
          <span>Passionate about giving back to the community</span>
        </motion.div>
      </div>
    </Modal>
  );
};
