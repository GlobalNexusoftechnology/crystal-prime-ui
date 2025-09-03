"use client";

import React from "react";
import { ModalOverlay } from "../modal-overlay/ModalOverlay";
import { Button } from "../button";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
}

export function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Delete",
  cancelText = "Cancel",
  isLoading = false,
}: DeleteConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <ModalOverlay isOpen={isOpen} onClose={onClose}>
      <div className="bg-white rounded-lg 2xl:rounded-[0.75vw] p-6 2xl:p-[1.5vw] w-full max-w-md 2xl:max-w-[25vw] mx-4">
        {/* Header */}
        <div className="flex items-center mb-4 2xl:mb-[1vw]">
          <div className="flex-shrink-0 w-10 2xl:w-[2.5vw] h-10 2xl:h-[2.5vw] bg-red-100 rounded-full flex items-center justify-center">
            <svg
              className="w-6 2xl:w-[1.5vw] h-6 2xl:h-[1.5vw] text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-lg 2xl:text-[1.1vw] font-medium text-gray-900">
              {title}
            </h3>
          </div>
        </div>

        {/* Message */}
        <div className="mb-6 2xl:mb-[1.5vw]">
          <p className="text-sm 2xl:text-[0.9vw] text-gray-500">
            {message}
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-3 2xl:space-x-[0.75vw]">
          <Button
            title={cancelText}
            variant="background-white"
            onClick={onClose}
            disabled={isLoading}
            width="w-auto"
          />
          <Button
            title={confirmText}
            variant="primary"
            onClick={onConfirm}
            disabled={isLoading}
            width="w-auto"
            isLoading={isLoading}
            className="bg-red-600 hover:bg-red-700"
          />
        </div>
      </div>
    </ModalOverlay>
  );
}
