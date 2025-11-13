import React from "react";
import { Modal } from "./Modal";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Projects Modal - Complex variant
export const ProjectsModal: React.FC<BaseModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      variant="projects"
      title="Projects"
    />
  );
};

// Skills Modal - Simple variant
export const SkillsModal: React.FC<BaseModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} variant="other" title="Skills" />
  );
};

// Certifications Modal - Simple variant
export const CertificationsModal: React.FC<BaseModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      variant="other"
      title="Certifications"
    />
  );
};

// Experience Modal - Simple variant
export const ExperienceModal: React.FC<BaseModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      variant="other"
      title="Experience"
    />
  );
};

// Contact Modal - Simple variant
export const ContactModal: React.FC<BaseModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} variant="other" title="Contact" />
  );
};

// Volunteering Modal - Simple variant
export const VolunteeringModal: React.FC<BaseModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      variant="other"
      title="Volunteering"
    />
  );
};
