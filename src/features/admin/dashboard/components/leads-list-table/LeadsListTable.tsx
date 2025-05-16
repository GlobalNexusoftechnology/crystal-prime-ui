"use client";
import { Table } from "@/components";
import { actions, leadsList, leadsListColumn } from "@/constants";

export function LeadsListTable() {
  return (
    <main>
      <Table
        data={leadsList}
        columns={leadsListColumn}
        actions={actions}
      />
    </main>
  );
}
