export type ModalVariant = "projects" | "other";

export type ModalId =
  | "projects"
  | "skills"
  | "certifications"
  | "experience"
  | "contact"
  | "volunteering";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  variant: ModalVariant;
  title: string;
  children?: React.ReactNode;
}
