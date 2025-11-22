"use client";
import React from "react";
import { Dropdown, DatePicker, InputField } from "@/components";

interface BOQFiltersProps {
  businessNameOptions: { label: string; value: string }[];
  selectedLead: string;
  selectedLeadId: string; 
  selectedBusiness: string;
  selectedDate: string;
  onLeadChange: (leadId: string) => void;
  onDateChange: (date: string) => void;
  minDate: string;
  leadError?: string;
  businessError?: string;
  dateError?: string;
}

export function BOQFilters({
  businessNameOptions,
  selectedLead,
  selectedLeadId,
  selectedDate,
  onLeadChange,
  onDateChange,
  minDate,
  leadError,
  businessError,
  dateError,
}: BOQFiltersProps) {

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
      <Dropdown
        label="Business Name"
        options={businessNameOptions || []} 
        value={selectedLeadId} 
        onChange={onLeadChange}
        error={leadError}
      />
      <InputField
        label="Lead Name"
        placeholder="Lead Name"
        value={selectedLead}
        onChange={() => {}}
        disabled
        error={businessError}
      />
      <DatePicker
        label="Date"
        value={selectedDate}
        onChange={onDateChange}
        minDate={minDate}
        error={dateError}
      />
    </div>
  );
} 