"use client";
import React, { useRef, useState } from "react";

interface UploadDocumentProps {
  label?: string;
  placeholder?: string;
  accept?: string;
  onChange: (files: FileList | null) => void;
  error?: string;
  className?: string
}

export const UploadDocument: React.FC<UploadDocumentProps> = ({
  label = "Upload Document",
  placeholder = "Upload Document",
  accept = ".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg",
  onChange,
  error,
  className
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFileName, setSelectedFileName] = useState<string>("");

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    onChange(files);
    if (files && files[0]) {
      setSelectedFileName(files[0].name);
    } else {
      setSelectedFileName("");
    }
  };

  // Helper to truncate file name or placeholder to 30 characters
  function truncateName(name: string) {
    if (!name) return "";
    return name.length > 30 ? name.slice(0, 27) + "..." : name;
  }

  return (
    <div className={`flex flex-col gap-2 2xl:gap-[0.25vw]`}>
      {label && (
        <label className="text-[0.9rem] 2xl:text-[0.9vw] font-medium text-gray-800">{label}</label>
      )}
      <div
        onClick={handleFileClick}
        className={`w-full cursor-pointer px-3 2xl:px-[0.75vw] py-[0.6rem] 2xl:py-[0.6vw] border 2xl:text-[0.9vw] 2xl:border-[0.05vw] rounded-md 2xl:rounded-[0.375vw] bg-white text-gray-600 border-gray-300 hover:border-gray-400 transition ${className}`}
      >
        {truncateName(selectedFileName || placeholder || "Upload Attachment")}
        <input
          type="file"
          accept={accept}
          onChange={handleFileChange}
          ref={fileInputRef}
          className="hidden"
        />
      </div>
      {error && (
        <p className="text-red-500 text-[0.9rem] 2xl:text-[0.9vw] 2xl:mt-[0.25vw] mt-1">
          {error}
        </p>
      )}
    </div>
  );
};
