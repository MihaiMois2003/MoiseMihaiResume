import { useEffect, type FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ModalProps } from "../../types/modal.types";
import { X } from "lucide-react";

/**
 * Modal component
 *
 * Variants:
 * - "projects": larger, more complex layout
 * - "other": simpler layout
 */
export const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  variant,
  title,
  children,
}) => {
  //prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  //handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const isProjectsVariant = variant === "projects";

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{
                scale: 0.5,
                opacity: 0,
                y: 50,
                rotateX: -15,
              }}
              animate={{
                scale: 1,
                opacity: 1,
                y: 0,
                rotateX: 0,
              }}
              exit={{
                scale: 0.8,
                opacity: 0,
                y: 30,
              }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 300,
              }}
              onClick={(e) => e.stopPropagation()}
              className={`
                relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900
                rounded-2xl shadow-2xl pointer-events-auto
                border border-gray-700/50
                ${
                  isProjectsVariant
                    ? "w-full max-w-5xl max-h-[85vh]"
                    : "w-full max-w-2xl max-h-[70vh]"
                }
                overflow-hidden
              `}
              style={{
                perspective: "1000px",
              }}
            >
              {/* Glowing border effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl -z-10" />

              {/* Header */}
              <div className="relative bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700/50 px-6 py-4">
                <motion.h2
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-2xl font-bold text-white"
                >
                  {title}
                </motion.h2>

                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-700/50"
                  aria-label="Close modal"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Content */}
              <div
                className={`
                p-6 overflow-y-auto
                ${
                  isProjectsVariant
                    ? "h-[calc(85vh-80px)]"
                    : "h-[calc(70vh-80px)]"
                }
              `}
              >
                {/* ADDED: Render children if provided, otherwise show default */}
                {children ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {children}
                  </motion.div>
                ) : (
                  // Default "coming soon" content if no children
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col items-center justify-center h-full text-center space-y-6"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: 0.3,
                        type: "spring",
                        stiffness: 200,
                      }}
                      className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center"
                    >
                      <span className="text-4xl">🚀</span>
                    </motion.div>

                    <div className="space-y-2">
                      <h3 className="text-3xl font-bold text-white">
                        Future Improvements Soon
                      </h3>
                      <p className="text-gray-400 text-lg">
                        This section is currently under construction
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
