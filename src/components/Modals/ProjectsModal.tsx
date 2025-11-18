import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Modal } from "./Modal";
import { projectsData, type Project } from "../../data/projects.data";
import { ProjectListView } from "./ProjectsModalComponents/ProjectListView";
import { ProjectDetailView } from "./ProjectsModalComponents/ProjectDetailView";

interface ProjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectsModal: React.FC<ProjectsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  const handleBack = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };

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
          <ProjectListView
            projects={projectsData}
            onProjectClick={handleProjectClick}
          />
        ) : (
          <ProjectDetailView
            project={selectedProject}
            currentImageIndex={currentImageIndex}
            onBack={handleBack}
            onNextImage={nextImage}
            onPrevImage={prevImage}
            onSelectImage={setCurrentImageIndex}
          />
        )}
      </AnimatePresence>
    </Modal>
  );
};
