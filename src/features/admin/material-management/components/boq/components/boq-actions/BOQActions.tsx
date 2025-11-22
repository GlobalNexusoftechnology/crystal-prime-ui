"use client";
import React from "react";
import { Button } from "@/components";

interface BOQActionsProps {
  isEditing: boolean;
  isCreating: boolean;
  isUpdating: boolean;
  hasMaterials: boolean;
  title?: string;
  onCreateBOQ: () => void;
}

export function BOQActions({
  isEditing,
  isCreating,
  isUpdating,
  hasMaterials,
  onCreateBOQ,
  title = "BOQ"
}: BOQActionsProps) {
  return (
    <div className="mt-6  flex justify-end">
      <Button
        title={title ==="BOQ" ? (isEditing ? "Update BOQ" : "Create BOQ") : (isEditing ? "Update Proposal" : "Create Proposal")}
        variant="primary-outline"
        onClick={onCreateBOQ}
        isLoading={isCreating || isUpdating}
        disabled={!hasMaterials || isCreating || isUpdating}
        width="w-fit"
      />
    </div>
  );
} 