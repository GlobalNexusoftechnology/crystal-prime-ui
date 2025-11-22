"use client";

import React, { useState, useEffect } from "react";


interface IUploadFileProps {
  name: string;
  value: File | File[] | string | string[] | null;
  error?: string;
  touched?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setFieldValue: (field: string, value: any) => void;
  placeholder: string;
  widthClassName?: string;
  heightClassName?: string;
  multiple?: boolean; // allow multiple file upload
  onFilesSelected?: (files: File[]) => void;
}


export const UploadPhotos: React.FC<IUploadFileProps> = ({
  name,
  value,
  error,
  touched,
  setFieldValue,
  placeholder,
  widthClassName = "w-full",
  heightClassName = "h-[8rem] ",
  multiple = false,
  onFilesSelected,
}) => {
  const [fileNames, setFileNames] = useState<string[]>([]);


  useEffect(() => {
    if (multiple) {
      if (Array.isArray(value)) {
        setFileNames(
          value.map((v) =>
            v instanceof File
              ? v.name
              : typeof v === "string"
              ? v.split("/").pop() || ""
              : ""
          )
        );
      } else if (value instanceof File) {
        setFileNames([value.name]);
      } else if (typeof value === "string" && value) {
        setFileNames([value.split("/").pop() || ""]);
      } else {
        setFileNames([]);
      }
    } else {
      if (value instanceof File) {
        setFileNames([value.name]);
      } else if (typeof value === "string" && value) {
        setFileNames([value.split("/").pop() || ""]);
      } else {
        setFileNames([]);
      }
    }
  }, [value, multiple]);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      // Only allow image files
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      const fileArr = Array.from(files).filter((file) => allowedTypes.includes(file.type));
      if (multiple) {
        setFileNames(fileArr.map((f) => f.name));
        setFieldValue(name, fileArr);
        if (onFilesSelected) onFilesSelected(fileArr);
      } else if (fileArr.length > 0) {
        setFileNames([fileArr[0].name]);
        setFieldValue(name, fileArr[0]);
        if (onFilesSelected) onFilesSelected([fileArr[0]]);
      } else {
        setFileNames([]);
        setFieldValue(name, multiple ? [] : null);
        if (onFilesSelected) onFilesSelected([]);
      }
    } else {
      setFileNames([]);
      setFieldValue(name, multiple ? [] : null);
      if (onFilesSelected) onFilesSelected([]);
    }
  };

  const handleRemoveFile = (index: number) => {
    if (multiple && Array.isArray(value)) {
      const newFiles = [...value];
      newFiles.splice(index, 1);
      setFileNames(newFiles.map((v) => v instanceof File ? v.name : typeof v === "string" ? v.split("/").pop() || "" : ""));
      setFieldValue(name, newFiles);
      if (onFilesSelected) onFilesSelected(newFiles.filter(f => f instanceof File));
    } else {
      setFileNames([]);
      setFieldValue(name, multiple ? [] : null);
      if (onFilesSelected) onFilesSelected([]);
    }
  };

  return (
    <div
      className={`${widthClassName} ${heightClassName} flex flex-col items-center justify-center gap-1  border border-dashed border-gray-300  rounded-2xl  text-center cursor-pointer px-4 py-2  `}
    >
      <label
        htmlFor={`file-upload-${name}`}
        className="cursor-pointer flex flex-col items-center justify-center gap-1  text-grey w-full"
      >
        <div className="h-5 w-5  ">
          {/* <UploadFileIcon className="h-full w-full" /> */}
        </div>

        {fileNames.length > 0 ? (
          <div className="flex flex-wrap gap-4 items-center">
            {fileNames.map((fileName, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="text-blue-800 font-semibold text-base ">{fileName}</span>
                <button
                  type="button"
                  className="w-6 h-6 flex items-center justify-center rounded border border-red-300 bg-white text-red-500 hover:bg-red-100"
                  onClick={e => { e.stopPropagation(); handleRemoveFile(idx); }}
                  tabIndex={-1}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="font-semibold text-sm  truncate text-grey max-w-full">
            {placeholder}
          </p>
        )}

        <p className="text-sm  text-red-500 text-center">
          Supported: JPG, JPEG, PNG – Images Only – Max 5MB
        </p>
      </label>

      <input
        type="file"
        id={`file-upload-${name}`}
        className="hidden"
        onChange={handleFileChange}
        multiple={multiple}
        accept=".jpg,.jpeg,.png,image/jpeg,image/png,image/jpg"
      />

      {touched && error && (
        <p className="text-sm  text-red mt-1 text-center">
          {error}
        </p>
      )}
    </div>
  );
};
