import React from "react";
import { Modal } from "./Modal";
import { motion } from "framer-motion";
import { contactData, socialLinks } from "../../data/contact.data";
import { ExternalLink, Linkedin, Github, Instagram } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * ContactModal Component
 *
 * Displays contact information with clickable links
 * and social media icons at the bottom
 */
export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
}) => {
  // Get the appropriate icon component
  const getSocialIcon = (iconName: string) => {
    switch (iconName) {
      case "linkedin":
        return <Linkedin size={24} />;
      case "github":
        return <Github size={24} />;
      case "instagram":
        return <Instagram size={24} />;
      default:
        return null;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} variant="other" title="Contact Me">
      <div className="space-y-6">
        {/* Contact Info Cards */}
        <div className="space-y-4">
          {contactData.map((contact, index) => (
            <motion.a
              key={contact.label}
              href={contact.href}
              target={contact.type === "location" ? "_blank" : undefined}
              rel={
                contact.type === "location" ? "noopener noreferrer" : undefined
              }
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.1,
                duration: 0.3,
                ease: "easeOut",
              }}
              className="
                block
                bg-gradient-to-br from-gray-800 to-gray-900
                border border-gray-700/50
                rounded-xl p-6
                hover:border-blue-500/50
                hover:shadow-lg hover:shadow-blue-500/10
                transition-all duration-300
                group
                cursor-pointer
              "
            >
              <div className="flex items-center gap-4">
                {/* Icon */}
                <div
                  className="
                  w-14 h-14 rounded-xl 
                  bg-gradient-to-br from-blue-500/20 to-cyan-500/20
                  border border-blue-500/30
                  flex items-center justify-center
                  text-3xl flex-shrink-0
                  group-hover:scale-110
                  transition-transform duration-300
                "
                >
                  {contact.icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm text-gray-400 uppercase tracking-wide">
                      {contact.label}
                    </p>
                    <ExternalLink
                      size={14}
                      className="text-gray-500 group-hover:text-blue-400 transition-colors"
                    />
                  </div>
                  <p className="text-white font-medium text-lg group-hover:text-blue-400 transition-colors break-words">
                    {contact.value}
                  </p>
                </div>
              </div>

              {/* Hover effect bar */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
                className="h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 mt-4 origin-left"
              />
            </motion.a>
          ))}
        </div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{
            delay: contactData.length * 0.1 + 0.1,
            duration: 0.4,
            ease: "easeOut",
          }}
          className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"
        />

        {/* Social Media Icons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: contactData.length * 0.1 + 0.2,
            duration: 0.3,
            ease: "easeOut",
          }}
          className="flex items-center justify-center gap-6"
        >
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: contactData.length * 0.1 + 0.3 + index * 0.1,
                duration: 0.3,
                ease: "easeOut",
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="
                w-14 h-14 rounded-xl
                bg-gradient-to-br from-gray-800 to-gray-900
                border border-gray-700/50
                hover:border-blue-500/50
                flex items-center justify-center
                text-gray-400 hover:text-blue-400
                transition-all duration-300
                hover:shadow-lg hover:shadow-blue-500/20
                group
              "
              aria-label={social.name}
            >
              {getSocialIcon(social.icon)}
            </motion.a>
          ))}
        </motion.div>

        {/* Footer message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: contactData.length * 0.1 + socialLinks.length * 0.1 + 0.4,
            duration: 0.3,
            ease: "easeOut",
          }}
          className="text-center text-gray-400 text-sm pt-2"
        >
          <p>
            Feel free to reach out! I'm always open to new opportunities and
            collaborations.
          </p>
        </motion.div>
      </div>
    </Modal>
  );
};
