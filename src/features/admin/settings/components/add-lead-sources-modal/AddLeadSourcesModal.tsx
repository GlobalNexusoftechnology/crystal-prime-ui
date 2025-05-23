import { Button, InputField, ModalOverlay } from "@/components";
import React from "react";

interface AddLeadSourcesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddLeadSourcesModal: React.FC<AddLeadSourcesModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <div>
      <ModalOverlay
        isOpen={isOpen}
        onClose={onClose}
        modalClassName="w-full md:w-[70%] lg:w-[60%] xl:w-[40%] 2xl:w-[40vw]"
      >
        <form className="flex flex-col gap-4 2xl:gap-[1vw] p-4 2xl:p-[1ve] bg-white rounded-xl 2xl:rounded-[0.75vw] border-gray-400">
          <h1 className="text-md 2xl:text-[1vw] text-gray-900 ">
            Add New Lead Source
          </h1>
          <div className="flex flex-col gap-4 md:gap-8 2xl:gap-[2vw] md:flex-row justify-between items-center">
            <InputField label="Name" placeholder="Enter Lead Source Name" />
          </div>
          <div className="flex gap-4 2xl:gap-[1vw] w-full ">
            <Button title="Cancel" variant="primary-outline" width="w-full" />

            <Button title="Add Staff" width="w-full" />
          </div>
        </form>
      </ModalOverlay>
    </div>
  );
};
