import React, { ReactNode } from "react";
import { BsArrowLeft } from "react-icons/bs";

type ModalOverlayProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  modalClassName?: string;
  modalTitle?: string;
  position?: "center" | "right"; // Add position prop
};

export const ModalOverlay: React.FC<ModalOverlayProps> = ({
  isOpen,
  onClose,
  children,
  modalClassName = "",
  modalTitle,
  position = "center"
}) => {
  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-50 ${
      position === "right" 
        ? "flex items-start justify-end" 
        : "flex items-start pt-[1rem] md:items-center justify-center px-4 2xl:px-[1vw]"
    }`}>
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div
        className={`relative border-b-4 2xl:border-b-[0.4vw] border-primary bg-[#f8f8f8] ${
          position === "right" 
            ? "rounded-l-2xl 2xl:rounded-l-[1vw] shadow-2xl h-full" 
            : "rounded-2xl 2xl:rounded-[1vw] shadow-lg"
        } p-3 2xl:p-[0.75vw] ${modalClassName}`}
      >
        <button
          className="top-4 2xl:top-[1vw] left-4 2xl:left-[1vw] flex py-2 2xl:py-[0.5vw] items-center text-black text-[1rem] 2xl:text-[1vw]"
          onClick={onClose}
        >
          <BsArrowLeft className="text-[1rem] 2xl:text-[1vw] mr-2 2xl:mr-[0.5vw]" />
          {modalTitle} 
        </button>
        {children}
      </div>
    </div>
  );
};
