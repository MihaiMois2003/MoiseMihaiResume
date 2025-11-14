import React, { useState } from "react";
import { Modal } from "./Modal";
import { motion, AnimatePresence } from "framer-motion";
import { projectsData, type Project } from "../../data/projects.data";
import {
  ArrowLeft,
  Github,
  ExternalLink,
  QrCode,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface ProjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * ProjectsModal Component
 *
 * Two-view system:
 * 1. Project List - Grid of all projects
 * 2. Project Detail - Full details when a project is clicked
 */
export const ProjectsModal: React.FC<ProjectsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Handle project selection
  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  // Handle back to list
  const handleBack = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };

  // Image navigation
  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) =>
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      );
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      variant="projects"
      title={selectedProject ? selectedProject.name : "Projects"}
    >
      <AnimatePresence mode="wait">
        {!selectedProject ? (
          // PROJECT LIST VIEW
          <motion.div
            key="list"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {projectsData.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.3,
                  ease: "easeOut",
                }}
                onClick={() => handleProjectClick(project)}
                className="
                  bg-gradient-to-br from-gray-800 to-gray-900
                  border border-gray-700/50
                  rounded-xl p-5
                  hover:border-blue-500/50
                  hover:shadow-lg hover:shadow-blue-500/10
                  transition-all duration-300
                  cursor-pointer
                  group
                "
              >
                {/* Project Image Preview */}
                <div
                  className="
                  relative w-full h-40 rounded-lg overflow-hidden mb-4
                  bg-gray-700/30
                "
                >
                  {project.images[0] ? (
                    <img
                      src={project.images[0]}
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500 text-4xl">
                      📱
                    </div>
                  )}

                  {/* Category Badge */}
                  <div className="absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/80 text-white">
                    {project.category}
                  </div>
                </div>

                {/* Project Info */}
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {project.name}
                </h3>
                <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                  {project.tagline}
                </p>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-2">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 rounded-full bg-gray-700/50 text-gray-300 text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className="px-2 py-1 rounded-full bg-gray-700/50 text-gray-400 text-xs">
                      +{project.techStack.length - 3}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          // PROJECT DETAIL VIEW
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Back Button */}
            <button
              onClick={handleBack}
              className="
                flex items-center gap-2 text-gray-400 hover:text-white
                transition-colors duration-200 mb-4
              "
            >
              <ArrowLeft size={20} />
              <span>Back to Projects</span>
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column: Images & QR */}
              <div className="lg:col-span-2 space-y-4">
                {/* Image Carousel */}
                <div className="relative w-full h-80 rounded-xl overflow-hidden bg-gray-700/30">
                  {selectedProject.images.length > 0 ? (
                    <>
                      <motion.img
                        key={currentImageIndex}
                        src={selectedProject.images[currentImageIndex]}
                        alt={`${selectedProject.name} screenshot ${
                          currentImageIndex + 1
                        }`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-full object-cover"
                      />

                      {/* Navigation Arrows */}
                      {selectedProject.images.length > 1 && (
                        <>
                          <button
                            onClick={prevImage}
                            className="
                              absolute left-2 top-1/2 -translate-y-1/2
                              w-10 h-10 rounded-full bg-black/50 hover:bg-black/70
                              flex items-center justify-center text-white
                              transition-colors duration-200
                            "
                          >
                            <ChevronLeft size={24} />
                          </button>
                          <button
                            onClick={nextImage}
                            className="
                              absolute right-2 top-1/2 -translate-y-1/2
                              w-10 h-10 rounded-full bg-black/50 hover:bg-black/70
                              flex items-center justify-center text-white
                              transition-colors duration-200
                            "
                          >
                            <ChevronRight size={24} />
                          </button>
                        </>
                      )}

                      {/* Image Indicators */}
                      {selectedProject.images.length > 1 && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                          {selectedProject.images.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentImageIndex(index)}
                              className={`
                                w-2 h-2 rounded-full transition-all duration-200
                                ${
                                  index === currentImageIndex
                                    ? "bg-blue-500 w-6"
                                    : "bg-gray-400"
                                }
                              `}
                            />
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500 text-6xl">
                      📱
                    </div>
                  )}
                </div>

                {/* Description */}
                <div
                  className="
                  bg-gradient-to-br from-gray-800 to-gray-900
                  border border-gray-700/50
                  rounded-xl p-5
                "
                >
                  <h4 className="text-lg font-semibold text-white mb-3">
                    About
                  </h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>
              </div>

              {/* Right Column: Tech Stack, Links, QR */}
              <div className="space-y-4">
                {/* Tech Stack */}
                <div
                  className="
                  bg-gradient-to-br from-gray-800 to-gray-900
                  border border-gray-700/50
                  rounded-xl p-5
                "
                >
                  <h4 className="text-lg font-semibold text-white mb-3">
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="
                          px-3 py-1.5 rounded-full
                          bg-gradient-to-r from-blue-500/20 to-cyan-500/20
                          border border-blue-500/50
                          text-white text-sm font-medium
                        "
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div
                  className="
                  bg-gradient-to-br from-gray-800 to-gray-900
                  border border-gray-700/50
                  rounded-xl p-5
                  space-y-3
                "
                >
                  <h4 className="text-lg font-semibold text-white mb-3">
                    Links
                  </h4>

                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        flex items-center gap-3 p-3 rounded-lg
                        bg-gray-700/30 hover:bg-gray-700/50
                        border border-gray-600/30 hover:border-gray-500/50
                        text-gray-300 hover:text-white
                        transition-all duration-200
                        group
                      "
                    >
                      <Github size={20} />
                      <span className="flex-1 text-sm font-medium">
                        View on GitHub
                      </span>
                      <ExternalLink
                        size={16}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </a>
                  )}

                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        flex items-center gap-3 p-3 rounded-lg
                        bg-blue-500/10 hover:bg-blue-500/20
                        border border-blue-500/30 hover:border-blue-500/50
                        text-blue-400 hover:text-blue-300
                        transition-all duration-200
                        group
                      "
                    >
                      <ExternalLink size={20} />
                      <span className="flex-1 text-sm font-medium">
                        Live Demo
                      </span>
                      <ExternalLink
                        size={16}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </a>
                  )}
                </div>

                {/* QR Code */}
                {selectedProject.qrCode && (
                  <div
                    className="
                    bg-gradient-to-br from-gray-800 to-gray-900
                    border border-gray-700/50
                    rounded-xl p-5
                  "
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <QrCode size={20} className="text-blue-400" />
                      <h4 className="text-lg font-semibold text-white">
                        Scan to Try
                      </h4>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <img
                        src={selectedProject.qrCode}
                        alt="QR Code"
                        className="w-full h-auto"
                      />
                    </div>
                    <p className="text-gray-400 text-xs text-center mt-2">
                      Scan with your phone to try the app
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Modal>
  );
};
