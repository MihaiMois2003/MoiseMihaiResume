import React from "react";
import { motion } from "framer-motion";
import { type Project } from "../../../data/projects.data";
import { ProjectCard } from "./ProjectCard";

interface ProjectListViewProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

export const ProjectListView: React.FC<ProjectListViewProps> = ({
  projects,
  onProjectClick,
}) => {
  return (
    <motion.div
      key="list"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      {projects.map((project, index) => (
        <ProjectCard
          key={project.id}
          project={project}
          index={index}
          onClick={onProjectClick}
        />
      ))}
    </motion.div>
  );
};
