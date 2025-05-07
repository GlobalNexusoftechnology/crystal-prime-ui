"use client";
import React from "react";
import { ModalOverlay } from "../modal-overlay";

interface IModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  type: "success" | "error";
  message: string;
}

/**
 * A modal component that handles success and error states.
 *
 * @param {IModalProps} props - The props for the Modal component.
 * @returns JSX.Element
 */
export const Modal: React.FC<IModalProps> = ({
  isModalOpen,
  closeModal,
  type,
  message,
}) => {
  const isSuccess = type === "success";

  return (
    <ModalOverlay isOpen={isModalOpen} onClose={closeModal}>
        <div className="text-center">
          <h2 className="text-lg font-bold mb-2">
            {isSuccess ? "Success!" : "Error!"}
          </h2>
          <p className="text-gray-700 mb-4">{message}</p>
          <button
            onClick={closeModal}
            className={`px-4 py-2 rounded text-white ${
              isSuccess ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
            } transition duration-200`}
          >
            Close
          </button>
        </div>
    </ModalOverlay>
  );
};
