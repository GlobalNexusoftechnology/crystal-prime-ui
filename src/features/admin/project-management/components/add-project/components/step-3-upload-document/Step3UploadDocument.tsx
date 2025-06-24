import { Button } from "@/components";
import { FileAttachmentIcon } from "@/features/icons";
import React, { useRef, useState, useEffect } from "react";

interface Step3UploadDocumentProps {
  onBack: () => void;
  onNext: (files: File[]) => void;
  initialFiles?: File[];
}

export function Step3UploadDocument({
  onBack,
  onNext,
  initialFiles,
}: Step3UploadDocumentProps) {
  const [files, setFiles] = useState<File[]>(initialFiles || []);
  const [error, setError] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialFiles && initialFiles.length > 0) {
      setFiles(initialFiles);
    }
  }, [initialFiles]);

  const validateFiles = (
    fileList: FileList | File[],
    existingFiles: File[]
  ): { validFiles: File[]; errorMsg: string } => {
    const validTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];
    let errorMsg = "";
    const validFiles: File[] = [];
    for (let i = 0; i < fileList.length; i++) {
      const f = fileList[i];
      if (!validTypes.includes(f.type)) {
        errorMsg = "Only XLS or XLSX files are allowed.";
        continue;
      }
      if (f.size > 2 * 1024 * 1024) {
        errorMsg = "File size must be less than 2MB.";
        continue;
      }
      if (
        existingFiles.some((ef) => ef.name === f.name && ef.size === f.size)
      ) {
        continue;
      }
      validFiles.push(f);
    }
    return { validFiles, errorMsg };
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;
    const { validFiles, errorMsg } = validateFiles(fileList, files);
    setFiles((prev) => [...prev, ...validFiles]);
    setError(errorMsg);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const fileList = e.dataTransfer.files;
    if (fileList && fileList.length > 0) {
      const { validFiles, errorMsg } = validateFiles(fileList, files);
      setFiles((prev) => [...prev, ...validFiles]);
      setError(errorMsg);
    }
  };

  // Remove a file by index
  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-8 2xl:gap-[2vw]">
      {files.length > 0 && (
        <div className="flex mt-2 gap-4 2xl:gap-[1vw]">
          {files.map((f, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="text-primary">{f.name}</span>
              <button
                type="button"
                className="text-red-500 hover:text-red-700 text-xs px-2 py-0.5 border border-red-200 rounded"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFile(idx);
                }}
                aria-label={`Remove ${f.name}`}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
      {/* Upload Area */}
      <div
        className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg bg-gray-50 p-12 2xl:p-[4vw] mx-auto w-full max-w-2xl min-h-[300px] cursor-pointer"
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          className="hidden"
          onChange={handleFileChange}
          multiple
        />
        <div className="flex flex-col items-center gap-2">
          <FileAttachmentIcon className="w-6 h-6 2xl:w-[1.5vw] 2xl:h-[1.5vw]" />
          <span className="font-semibold text-lg 2xl:text-[1.2vw] text-gray-700">
            Upload Document(s)
          </span>
          <span className="text-sm text-red-400">
            Supported: XLS, XLSX – Max 2MB each
          </span>

          {error && <span className="text-red-600 mt-2">{error}</span>}
        </div>
      </div>
       {/* Action Buttons */}
       <div className="flex justify-center items-center mt-6 2xl:mt-[1.5vw] gap-4 2xl:gap-[1vw]">
        <Button
          title="Back"
          variant="primary-outline"
          onClick={onBack}
          width="w-full md:w-[10rem] 2xl:w-[10vw]"
        />
        <Button
          title="Next"
          onClick={() => onNext(files)}
          disabled={files.length === 0}
          width="w-full md:w-[10rem] 2xl:w-[10vw]"
        />
      </div>
    </div>
  );
}
