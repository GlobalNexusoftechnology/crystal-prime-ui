"use client";
import React, { useRef } from "react";
import { ImDownload2 } from "react-icons/im";

import { Button, SearchBar } from "@/components";
import { ExportIcon } from "@/features";

import { downloadBlobFile, IApiError } from "@/utils";
import toast from "react-hot-toast";
import { useImportMaterialFromExcelMutation } from "@/services/apis/clients/community-client/query-hooks/useImportMaterialFromExcelMutation";
import { useMaterialExportFromExcelQuery } from "@/services/apis/clients/community-client/query-hooks/useMaterialExportFromExcelQuery";
import { useMaterialDownloadTemplateExcelQuery } from "@/services/apis/clients/community-client/query-hooks/useMaterialDownloadTemplateExcelQuery";

interface MaterialFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onAddMaterial: () => void;
  isUploading: boolean;
  onRefetch?: () => void;
  currentFilters?: {
    searchText?: string;
  };
}

export function MaterialFilters({
  searchQuery,
  onSearchChange,
  onAddMaterial,
  isUploading,
  onRefetch,
  currentFilters,
}: MaterialFiltersProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { onMaterialDownloadTemplateExcel } =
    useMaterialDownloadTemplateExcelQuery();

  const { onImportMaterialFromExcel } = useImportMaterialFromExcelMutation({
    onSuccessCallback: (data) => {
      toast.success(data.message || "Materials imported successfully");
      onRefetch?.();
    },
    onErrorCallback: (err: IApiError) => {
      toast.error(err.message || "Failed to import materials");
    },
  });

  const { onMaterialExport } = useMaterialExportFromExcelQuery();

  /**
   * Triggers file input click for importing materials.
   */
  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  /**
   * Handles file change and uploads the selected Excel file.
   * @param e - File input change event
   */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      onImportMaterialFromExcel(formData);
      e.target.value = ""; // reset input
    }
  };

  const handleExport = () => {
    // Pass current filters to export function
    const exportParams: Record<string, string> = {};
    if (currentFilters?.searchText) {
      exportParams.searchText = currentFilters.searchText;
    }
    onMaterialExport(exportParams);
  };

  /**
   * Downloads the Excel template for uploading materials.
   */
  const handleDownloadTemplate = async () => {
    const { data } = await onMaterialDownloadTemplateExcel();
    if (data instanceof Blob) {
      await downloadBlobFile(data, `material_download_template.xlsx`);
    }
  };

  return (
    <div className="flex justify-between items-center flex-wrap gap-4 ">
      <h1 className="text-[1.2rem]  font-medium">Inventory  List</h1>
      <div className="flex items-center flex-wrap gap-4 ">
        <SearchBar
          onSearch={onSearchChange}
          value={searchQuery}
          bgColor="white"
          width="w-full min-w-[12rem] md:w-[25vw] "
        />
        <Button
          title="Add Inventory "
          variant="background-white"
          width="w-full md:w-fit"
          hover
          onClick={onAddMaterial}
        />
        <Button
          title="Import"
          variant="primary-outline-blue"
          rightIcon={<ExportIcon color="#034A9F" className="rotate-180" />}
          width="w-full md:w-fit"
          onClick={handleImportClick}
          disabled={isUploading}
        />
        <input
          type="file"
          accept=".xlsx,.xls"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <Button
          title="Export"
          variant="primary-outline-blue"
          rightIcon={<ExportIcon color="#034A9F" className="rotate-180" />}
          width="w-full md:w-fit"
          onClick={handleExport}
        />
        <Button
          variant="primary-outline-blue"
          width="w-full md:w-fit"
          onClick={handleDownloadTemplate}
          leftIcon={<ImDownload2 className="w-5 h-5  " color="#034A9F" />}
          tooltip="Download Template"
        />
      </div>
    </div>
  );
}
