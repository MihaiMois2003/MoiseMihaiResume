import React from "react";
import { Modal } from "./Modal";
import { motion } from "framer-motion";
import { experienceData, educationData } from "../../data/experience.data";
import { GraduationCap, MapPin, Calendar } from "lucide-react";

interface ExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * ExperienceModal Component
 *
 * Displays work experience and education with smooth animations
 */
export const ExperienceModal: React.FC<ExperienceModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} variant="other" title="Experience">
      <div className="space-y-8">
        {/* Work Experience Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {experienceData.map((experience, expIndex) => (
            <motion.div
              key={experience.company}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: expIndex * 0.1,
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
              {/* Company Header */}
              <div className="flex items-start gap-4 mb-6">
                <div
                  className="
                  w-12 h-12 rounded-xl 
                  bg-gradient-to-br from-blue-500/20 to-cyan-500/20
                  border border-blue-500/30
                  flex items-center justify-center
                  text-2xl flex-shrink-0
                "
                >
                  {experience.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-1">
                    {experience.company}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <MapPin size={14} />
                    <span>{experience.location}</span>
                  </div>
                </div>
              </div>

              {/* Roles */}
              <div className="space-y-4">
                {experience.items.map((item, itemIndex) => (
                  <motion.div
                    key={item.role}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: expIndex * 0.1 + itemIndex * 0.1,
                      duration: 0.3,
                      ease: "easeOut",
                    }}
                    className="pl-4 border-l-2 border-blue-500/30 space-y-2"
                  >
                    {/* Role Title */}
                    <div className="flex items-start justify-between gap-4">
                      <h4 className="text-lg font-semibold text-white">
                        {item.role}
                      </h4>
                    </div>

                    {/* Period */}
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <Calendar size={14} />
                      <span>{item.period}</span>
                    </div>

                    {/* Description */}
                    <ul className="space-y-1 mt-3">
                      {item.description.map((desc, descIndex) => (
                        <li
                          key={descIndex}
                          className="text-gray-300 text-sm leading-relaxed flex items-start gap-2"
                        >
                          <span className="text-blue-400 mt-1">•</span>
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: experienceData.length * 0.1 + 0.1,
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
          {/* Education Header */}
          <div className="flex items-start gap-4 mb-4">
            <div
              className="
              w-12 h-12 rounded-xl 
              bg-gradient-to-br from-purple-500/20 to-pink-500/20
              border border-purple-500/30
              flex items-center justify-center
              text-2xl flex-shrink-0
            "
            >
              {educationData.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 text-gray-400 text-xs uppercase tracking-wide mb-2">
                <GraduationCap size={14} />
                <span>Education</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-1">
                {educationData.institution}
              </h3>
              <p className="text-gray-300 text-sm">{educationData.degree}</p>
            </div>
          </div>

          {/* Education Details */}
          <div className="pl-4 border-l-2 border-purple-500/30 mt-4">
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Calendar size={14} />
              <span>{educationData.period}</span>
              <span className="text-gray-500">•</span>
              <span className="text-purple-400 font-medium">
                {educationData.graduation}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </Modal>
  );
};
