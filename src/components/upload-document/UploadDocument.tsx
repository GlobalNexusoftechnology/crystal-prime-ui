"use client"
import React, { useRef } from "react";

interface UploadDocumentProps {
  label?: string;
  placeholder?: string;
  accept?: string;
  onChange: (files: FileList | null) => void;
  error?: string;
}

export const UploadDocument: React.FC<UploadDocumentProps> = ({
  label = "Upload Document",
  placeholder = "Upload Document",
  accept = ".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg",
  onChange,
  error,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.files);
  };

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-800">{label}</label>
      )}
      <div
        onClick={handleFileClick}
        className="w-full cursor-pointer px-3 py-2 border rounded-md bg-white text-gray-400 border-gray-300 hover:border-gray-400 transition"
      >
        {placeholder}
        <input
          type="file"
          accept={accept}
          onChange={handleFileChange}
          ref={fileInputRef}
          className="hidden"
        />
      </div>
      {/* Error Message */}
      {error && (
        <p className="text-red-500 text-sm 2xl:text-[0.9vw] 2xl:mt-[0.25vw] mt-1">
          {error}
        </p>
      )}{" "}
    </div>
  );
};
