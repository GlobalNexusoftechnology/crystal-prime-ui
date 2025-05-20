import React, { ReactNode } from "react";
import { BsArrowLeft } from "react-icons/bs";

type ModalOverlayProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  modalClassName?: string; // ➕ Add this line
};

export const ModalOverlay: React.FC<ModalOverlayProps> = ({
  isOpen,
  onClose,
  children,
  modalClassName = "", // ➕ Default to empty string
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-start pt-[1rem] md:items-center justify-center z-50 px-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div
        className={`relative bg-[#A7A7A7] rounded-2xl shadow-lg p-3  ${modalClassName}`}
      >
        <button
          className="absolute top-4 left-4 flex items-center text-black"
          onClick={onClose}
        >
          <BsArrowLeft className="text-[1rem] 2xl:text-[1vw] mr-2" />
          Back to Leads
        </button>
        {children}
      </div>
    </div>
  );
};
