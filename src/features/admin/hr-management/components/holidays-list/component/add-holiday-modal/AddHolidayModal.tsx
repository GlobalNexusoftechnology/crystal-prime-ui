'use client'
import { useState } from "react";
import { Button, DatePicker, InputField } from "@/components";

interface AddHolidayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddHolidayModal({ isOpen, onClose }: AddHolidayModalProps) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = () => {
    console.log("Holiday Name:", name);
    console.log("Holiday Date:", date);
    onClose();
  };

  // Agar modal open nahi hai toh kuch return nahi karenge
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay Background */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white p-6 rounded-lg shadow-xl w-full max-w-md mx-4 z-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Add Holiday</h2>
        <div className="flex flex-col gap-4">
          <InputField
            label="Holiday Name"
            placeholder="Enter Holiday Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <DatePicker label="Date" value={date} onChange={setDate} />
          <div className="flex justify-end gap-2 mt-4">
            <Button title="Cancel" variant="primary-outline" onClick={onClose} />
            <Button title="Add" onClick={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
}