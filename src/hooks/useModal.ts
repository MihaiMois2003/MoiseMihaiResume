import { useState, useCallback } from "react";
import type { ModalId } from "../types/modal.types";

interface UseModalReturn {
  activeModal: ModalId | null;
  openModal: (modalId: ModalId) => void;
  closeModal: () => void;
  isModalOpen: (modalId: ModalId) => boolean;
}

/**
 * Hook to manage modal state
 *
 * @example
 * const { activeModal, openModal, closeModal, isModalOpen } = useModal();
 *
 * openModal('projects'); // Opens projects modal
 * closeModal(); // Closes any open modal
 * isModalOpen('projects') // Returns true if projects modal is open
 */
export const useModal = (): UseModalReturn => {
  const [activeModal, setActiveModal] = useState<ModalId | null>(null);

  const openModal = useCallback((modalId: ModalId) => {
    setActiveModal(modalId);
  }, []);

  const closeModal = useCallback(() => {
    setActiveModal(null);
  }, []);

  const isModalOpen = useCallback(
    (modalId: ModalId) => {
      return activeModal === modalId;
    },
    [activeModal]
  );

  return {
    activeModal,
    openModal,
    closeModal,
    isModalOpen,
  };
};
