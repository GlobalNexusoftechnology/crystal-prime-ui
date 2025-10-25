import React, { useRef, useState, useEffect } from "react";
import { Button, DeleteModal } from "@/components";
import { FileAttachmentIcon } from "@/features";

interface Step3UploadDocumentProps {
  onBack: () => void;
  isPending: boolean,
  onNext: (files: File[], removedIds: string[]) => void;
  initialFiles?: File[];
  mode?: "create" | "edit";
}

export function Step3UploadDocument({
  onBack,
  onNext,
  initialFiles,
  isPending,
  mode = "create",
}: Step3UploadDocumentProps) {
  const [files, setFiles] = useState<File[]>(initialFiles || []);
  const [removedAttachmentIds, setRemovedAttachmentIds] = useState<string[]>([]);
  const [error, setError] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [fileToDeleteIdx, setFileToDeleteIdx] = useState<number | null>(null);

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
      // Excel
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      // Word
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      // PDF
      "application/pdf",
      // Images
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/bmp",
      "image/webp",
    ];
    let errorMsg = "";
    const validFiles: File[] = [];
    for (let i = 0; i < fileList.length; i++) {
      const f = fileList[i];
      if (!validTypes.includes(f.type)) {
        errorMsg = "Only PDF, Word, Excel, or image files are allowed.";
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
    const fileToRemove = files[index];
    // Check if this is an existing attachment with an ID
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const originalAttachment = (fileToRemove as any)?.originalAttachment;
    if (originalAttachment?.id) {
      setRemovedAttachmentIds((prev) => [...prev, originalAttachment.id]);
    }
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-8 ">
      {files.length > 0 && (
        <div className="flex mt-2 gap-4 ">
          {files?.length > 0 && files?.map((f, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="text-primary">{f.name}</span>
              <button
                type="button"
                className="text-red-500 hover:text-red-700 text-xs px-2 py-0.5 border border-red-200 rounded"
                onClick={(e) => {
                  e.stopPropagation();
                  setFileToDeleteIdx(idx);
                  setDeleteModalOpen(true);
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
        className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg bg-gray-50 p-12  mx-auto w-full min-h-[300px] cursor-pointer"
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".xls,.xlsx,.doc,.docx,.pdf,.jpg,.jpeg,.png,.gif,.bmp,.webp,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf,image/jpeg,image/png,image/gif,image/bmp,image/webp"
          className="hidden"
          onChange={handleFileChange}
          multiple
        />
        <div className="flex flex-col items-center gap-2">
          <FileAttachmentIcon className="w-6 h-6  " />
          <span className="font-semibold text-lg  text-gray-700">
            Upload Document(s)
          </span>
          <span className="text-[0.9rem] text-red-400">
            Supported: PDF, Word, Excel, Images – Max 2MB each
          </span>
          {mode === "edit" && (
            <span className="text-[0.9rem] text-blue-600">
              Documents are optional - you can proceed without uploading any files
            </span>
          )}

          {error && <span className="text-red-600 mt-2">{error}</span>}
        </div>
      </div>
       {/* Action Buttons */}
       <div className="flex justify-center items-center mt-6  gap-4 ">
        <Button
          title="Back"
          variant="primary-outline"
          onClick={onBack}
          width="w-full md:w-[10rem] "
        />
        <Button
          title="Next"
          
          onClick={() => onNext(files, removedAttachmentIds)}
          disabled={isPending}
          width="w-full md:w-[10rem] "
        />
      </div>
      {/* Render DeleteModal for file removal confirmation */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setFileToDeleteIdx(null);
        }}
        onConfirm={() => {
          if (fileToDeleteIdx !== null) {
            handleRemoveFile(fileToDeleteIdx);
            setDeleteModalOpen(false);
            setFileToDeleteIdx(null);
          }
        }}
        itemName={fileToDeleteIdx !== null ? files[fileToDeleteIdx]?.name : ""}
        title="Remove File"
        message="Are you sure you want to remove this file"
        confirmText="Remove"
        cancelText="Cancel"
      />
    </div>
  );
}
