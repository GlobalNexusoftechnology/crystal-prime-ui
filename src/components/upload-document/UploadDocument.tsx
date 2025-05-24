"use client";
import React, { useRef, useState } from "react";

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

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-800">{label}</label>
      )}
      <div
        onClick={handleFileClick}
        className="w-full cursor-pointer px-3 py-2 border rounded-md bg-white text-gray-600 border-gray-300 hover:border-gray-400 transition"
      >
        {selectedFileName || placeholder}
        <input
          type="file"
          accept={accept}
          onChange={handleFileChange}
          ref={fileInputRef}
          className="hidden"
        />
      </div>
      {error && (
        <p className="text-red-500 text-sm 2xl:text-[0.9vw] 2xl:mt-[0.25vw] mt-1">
          {error}
        </p>
      )}
    </div>
  );
};
