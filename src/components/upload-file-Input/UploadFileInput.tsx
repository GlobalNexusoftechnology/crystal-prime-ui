"use client";
import React, { useState } from "react";

interface IUploadFileProps {
  /**
   * Callback function triggered when a file is uploaded.
   * @param file - The uploaded file object.
   */
  onFileUpload: (file: File | null) => void;
  placeholder: string;
}

export const UploadFileInput: React.FC<IUploadFileProps> = ({
  onFileUpload,
  placeholder,
}) => {
  const [fileName, setFileName] = useState<string | null>(null);

  /**
   * Handles the file upload and updates the file state.
   * @param event - The file input change event.
   */
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      setFileName(file.name);
      onFileUpload(file);
    } else {
      setFileName(null);
      onFileUpload(null);
    }
  };

  return (
    <div className="w-full">
      <label
        htmlFor="file-upload"
        className="block w-full 2xl:text-[1vw] px-4 2xl:px-[1vw] py-2 2xl:py-[0.5vw] border 2xl:border-[0.05vw] border-gray-300 text-gray-400 rounded-md 2xl:rounded-[0.375vw] bg-transparent cursor-pointer bg-white"
      >
        {fileName || placeholder || "Upload Business License"}
      </label>
      <input
        type="file"
        id="file-upload"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};
