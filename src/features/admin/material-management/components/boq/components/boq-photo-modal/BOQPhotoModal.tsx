"use client";
import React from "react";
import Image from "next/image";

interface BOQPhotoModalProps {
  isOpen: boolean;
  src: string;
  onClose: () => void;
}

export function BOQPhotoModal({ isOpen, src, onClose }: BOQPhotoModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed top-[-2rem]  inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative bg-white rounded-lg shadow-xl max-w-4xl max-h-[90vh] overflow-hidden mx-4">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 z-10 w-8 h-8 bg-gray-800 hover:bg-gray-700 text-white rounded-full flex items-center justify-center transition-colors"
          onClick={onClose}
        >
          <span className="text-lg font-bold">×</span>
        </button>

        {/* Image Container */}
        <div className="flex items-center justify-center p-8">
          <Image
            src={src}
            alt="Preview"
            width={600}
            height={600}
            className="max-w-full max-h-[70vh] object-contain rounded-lg"
          />
        </div>
      </div>
    </div>
  );
} 