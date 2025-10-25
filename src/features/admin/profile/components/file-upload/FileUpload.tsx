"use client";

import { useRef } from "react";
import { UploadCloud } from "lucide-react";

/**
 * FileUpload component
 *
 * Renders a styled file upload area with a dashed border and upload icon.
 * - Clicking the area opens the native file picker via a hidden input.
 * - Supports SVG, PNG, JPG, JPEG, and GIF formats.
 * - Logs the selected file to the console on change.
 *
 * Usage:
 * <FileUpload />
 */
export function FileUpload() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Selected file:", file);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer border border-dashed border-gray-300 rounded-lg  p-6  flex items-center justify-center w-full bg-white"
    >
      <input
        type="file"
        accept=".svg,.png,.jpg,.jpeg,.gif"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <div className="text-center">
        <div className="flex justify-center mb-2 ">
          <div className="bg-gray-100 rounded-full p-2 ">
            <UploadCloud className="h-6 w-6   text-gray-500" />
          </div>
        </div>
        <p className="text-[1rem]  text-gray-600">
          <span className="text-[1rem]  text-primary font-semibold">
            Click to upload
          </span>{" "}
          or drag and drop
        </p>
        <p className="text-[0.9rem]  text-gray-400">
          SVG, PNG, JPG or GIF (max. 800×400px)
        </p>
      </div>
    </div>
  );
}
