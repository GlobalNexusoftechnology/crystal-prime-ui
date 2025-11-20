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
    <div className={`fixed inset-0 z-50 ${position === "right"
        ? "flex items-start justify-end"
        : "flex items-start pt-[1rem] md:items-center justify-center px-4 "
      }`}>
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 top-[-1rem] "
      ></div>

      {/* Modal Content */}
      <div
        className={`relative border-b-4  border-primary bg-[#f8f8f8] ${position === "right"
            ? "rounded-l-2xl shadow-2xl h-full"
            : "rounded-2xl  shadow-lg"
          } p-3  ${modalClassName}`}
      >
        <button
          className="top-4  left-4  flex py-2  items-center text-black text-[1rem] "
          onClick={onClose}
        >
          <BsArrowLeft className="text-[1rem]  mr-2 " />
          {modalTitle}
        </button>
        {children}
      </div>
    </div>
  );
};
