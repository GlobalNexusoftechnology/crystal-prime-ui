"use client";

import { useState } from "react";
import { Button, SearchBar, Table } from "@/components";
import { clientList, clientListColumn, clientListActions } from "@/constants";
import { ExportIcon } from "@/features";
import { AddClientModal } from "../add-client-modal";

/**
 * ClientListTable component renders a section displaying the list of clients.
 */
export function ClientListTable() {
  const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4 2xl:gap-[1vw]">
      <div className="flex flex-col lg:items-center gap-4 lg:flex-row lg:gap-0 justify-between">
        <h1 className="font-medium text-2xl 2xl:text-[1.5vw]">Client List</h1>
        <div className="flex flex-col md:flex-row justify-between gap-4 2xl:gap-[1vw]">
          <Button
            title="Export"
            variant="primary-outline-blue"
            rightIcon={<ExportIcon color="#034A9F"  />}
            width="w-full md:w-fit"
          />
          <Button
            title="Import"
            variant="primary-outline-blue"
            rightIcon={<ExportIcon color="#034A9F" className="rotate-180 " />}
            width="w-full md:w-fit"
          />
          <Button
            title="Add New Client"
            variant="primary-outline-blue"
            width="w-full md:w-fit"
            onClick={() => setIsAddClientModalOpen(true)}
          />
          <SearchBar
            width="w-full"
            onSearch={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        </div>
      </div>

      <Table
        data={clientList}
        columns={clientListColumn}
        actions={clientListActions}
      />

      {isAddClientModalOpen && (
        <AddClientModal onClose={() => setIsAddClientModalOpen(false)} />
      )}
    </div>
  );
}
