import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { type Project } from "../../../data/projects.data";
import { ImageCarousel } from "./ImageCarousel";
import { ProjectLinks } from "./ProjectLinks";
import { ProjectQRCode } from "./ProjectsQrCode";

interface ProjectDetailViewProps {
  project: Project;
  currentImageIndex: number;
  onBack: () => void;
  onNextImage: () => void;
  onPrevImage: () => void;
  onSelectImage: (index: number) => void;
}

export const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({
  project,
  currentImageIndex,
  onBack,
  onNextImage,
  onPrevImage,
  onSelectImage,
}) => {
  return (
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
        onClick={onBack}
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200 mb-4"
      >
        <ArrowLeft size={20} />
        <span>Back to Projects</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Images & Description */}
        <div className="lg:col-span-2 space-y-4">
          <ImageCarousel
            images={project.images}
            projectName={project.name}
            currentIndex={currentImageIndex}
            onNext={onNextImage}
            onPrev={onPrevImage}
            onSelectIndex={onSelectImage}
          />

          {/* Description */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-xl p-5">
            <h4 className="text-lg font-semibold text-white mb-3">About</h4>
            <p className="text-gray-300 text-sm leading-relaxed">
              {project.description}
            </p>
          </div>
        </div>

        {/* Right Column: Tech Stack, Links, QR */}
        <div className="space-y-4">
          {/* Tech Stack */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-xl p-5">
            <h4 className="text-lg font-semibold text-white mb-3">
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
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

          <ProjectLinks
            githubUrl={project.githubUrl}
            liveUrl={project.liveUrl}
          />

          {project.qrCode && <ProjectQRCode qrCode={project.qrCode} />}
        </div>
      </div>
    </motion.div>
  );
};
