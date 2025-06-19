import React, { useRef, useState } from "react";

interface Step3UploadDocumentProps {
  onBack: () => void;
  onNext: (file: File | null) => void;
}

export function Step3UploadDocument({ onBack, onNext }: Step3UploadDocumentProps) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!["application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"].includes(f.type)) {
      setError("Only XLS or XLSX files are allowed.");
      setFile(null);
      return;
    }
    if (f.size > 2 * 1024 * 1024) {
      setError("File size must be less than 2MB.");
      setFile(null);
      return;
    }
    setFile(f);
    setError("");
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (f) {
      // Create a synthetic event with the required properties for handleFileChange
      const syntheticEvent = {
        target: { files: [f] },
        // Add minimal required properties to satisfy the type checker
        preventDefault: () => {},
        stopPropagation: () => {},
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      handleFileChange(syntheticEvent);
    }
  };

  return (
    <div className="flex flex-col gap-8 2xl:gap-[2vw]">

      {/* Upload Area */}
      <div
        className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg bg-gray-50 p-12 2xl:p-[4vw] mx-auto w-full max-w-2xl min-h-[300px] cursor-pointer"
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={e => e.preventDefault()}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          className="hidden"
          onChange={handleFileChange}
        />
        <div className="flex flex-col items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          <span className="font-semibold text-lg 2xl:text-[1.2vw] text-gray-700">Upload Document</span>
          <span className="text-sm text-red-400">Supported: XLS, XLSX – Max 2MB</span>
          {file && <span className="text-green-600 mt-2">{file.name}</span>}
          {error && <span className="text-red-600 mt-2">{error}</span>}
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex justify-between mt-6 max-w-2xl mx-auto w-full">
        <button
          className="border border-[#4E5EFF] text-[#4E5EFF] px-6 py-2 rounded-md 2xl:rounded-[0.5vw] font-medium hover:bg-[#f0f3ff] transition"
          onClick={onBack}
        >
          Back
        </button>
        <button
          className="bg-[#0047AB] text-white px-6 py-2 rounded-md 2xl:rounded-[0.5vw] font-medium hover:bg-[#003580] transition disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => onNext(file)}
          disabled={!file}
        >
          Next
        </button>
      </div>
    </div>
  );
} 