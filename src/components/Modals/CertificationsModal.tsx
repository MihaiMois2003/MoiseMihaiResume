import React from "react";
import { Modal } from "./Modal";
import { motion } from "framer-motion";
import {
  certificationsData,
  certificationsSummary,
} from "../../data/certifications.data";
import { Award, Calendar, ExternalLink } from "lucide-react";

interface CertificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * CertificationsModal Component
 *
 * Displays summary section and certifications with smooth animations
 */
export const CertificationsModal: React.FC<CertificationsModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      variant="other"
      title="Certifications"
    >
      <div className="space-y-8">
        {/* Summary Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="
            bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10
            border border-blue-500/30
            rounded-xl p-6
          "
        >
          {/* Website Link Header */}
          <motion.a
            href={certificationsSummary.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="
              inline-flex items-center gap-2
              text-blue-400 hover:text-blue-300
              font-bold text-lg mb-4
              transition-colors duration-200
              group
            "
          >
            <span>{certificationsSummary.heading}</span>
            <ExternalLink
              size={18}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </motion.a>

          {/* Description */}
          <div className="space-y-3">
            {certificationsSummary.description.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.2 + index * 0.1,
                  duration: 0.3,
                  ease: "easeOut",
                }}
                className="text-gray-300 text-sm leading-relaxed"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </motion.div>

        {/* Certifications Section */}
        <div className="space-y-6">
          {certificationsData.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.4 + categoryIndex * 0.1,
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
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-700/30">
                <div
                  className="
                  w-10 h-10 rounded-lg
                  bg-gradient-to-br from-yellow-500/20 to-orange-500/20
                  border border-yellow-500/30
                  flex items-center justify-center
                  text-2xl
                "
                >
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-white">
                  {category.title}
                </h3>
              </div>

              {/* Certifications List */}
              <div className="space-y-3">
                {category.certifications.map((cert, certIndex) => (
                  <motion.div
                    key={cert.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.5 + categoryIndex * 0.1 + certIndex * 0.05,
                      duration: 0.3,
                      ease: "easeOut",
                    }}
                    className="
                      flex items-start gap-3
                      pl-4 border-l-2 border-yellow-500/30
                      group
                    "
                  >
                    {/* Icon */}
                    <Award
                      size={18}
                      className="text-yellow-500/70 mt-0.5 flex-shrink-0 group-hover:text-yellow-400 transition-colors"
                    />

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium text-sm">
                        {cert.name}
                      </p>
                      <div className="flex items-center gap-2 text-gray-400 text-xs mt-1">
                        <Calendar size={12} />
                        <span>{cert.date}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Modal>
  );
};
