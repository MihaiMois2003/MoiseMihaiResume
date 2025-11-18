import React from "react";
import { motion } from "framer-motion";
import { type Project } from "../../../data/projects.data";

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  onClick,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3, ease: "easeOut" }}
      onClick={() => onClick(project)}
      className="
        bg-gradient-to-br from-gray-800 to-gray-900
        border border-gray-700/50 rounded-xl p-5
        hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10
        transition-all duration-300 cursor-pointer group
      "
    >
      {/* Project Image Preview */}
      <div className="relative w-full h-40 rounded-lg overflow-hidden mb-4 bg-gray-700/30">
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
  );
};
