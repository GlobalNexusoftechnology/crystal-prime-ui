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
          <h2 className="text-lg 2xl:text-[1.125vw] font-bold mb-2 2xl:mb-[0.5vw]">
            {isSuccess ? "Success!" : "Error!"}
          </h2>
          <p className="text-gray-700 mb-4 2xl:mb-[1vw]">{message}</p>
          <button
            onClick={closeModal}
            className={`px-4 2xl:px-[1vw] py-2 2xl:py-[0.5vw] rounded 2xl:rounded-[0.25vw] text-white ${
              isSuccess ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
            } transition duration-200`}
          >
            Close
          </button>
        </div>
    </ModalOverlay>
  );
};
