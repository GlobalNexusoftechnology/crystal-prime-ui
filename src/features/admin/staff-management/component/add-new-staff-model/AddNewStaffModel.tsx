import { Button, Dropdown, InputField, ModalOverlay } from "@/components";
import React from "react";

interface AddNewStaffModelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddNewStaffModel: React.FC<AddNewStaffModelProps> = ({
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
            <h1 className="text-md 2xl:text-[1vw] text-gray-900 ">Add New Staff</h1>
          <div className="flex flex-col gap-4 md:gap-8 2xl:gap-[2vw] md:flex-row justify-between items-center">
            <InputField label="First Name" placeholder="Enter First name" />
            <InputField label="Last Name" placeholder="Enter Last name" />
          </div>
          <div className="flex flex-col gap-4 md:gap-8 2xl:gap-[2vw] md:flex-row justify-between items-center">
            <InputField label="DOB" placeholder="Enter DOB" />
            <InputField label="Phone Number" placeholder="Enter Phone Number" />
          </div>

          <div className="flex flex-col gap-4 md:gap-8 2xl:gap-[2vw] md:flex-row justify-between items-center">
            <InputField label="Email" placeholder="Enter Email" />
            <Dropdown
            label="Role Name"
              options={[
                { label: "Add Staff", value: "add_staff" },
                { label: "Edit Staff", value: "edit_staff" },
                {
                  label: "Assign Project",
                  value: "assign_project",
                },
                {
                  label: "View Progress",
                  value: "view_progress",
                },
              ]}
              value={""}
              onChange={(val: string) => {
                console.log("Selected role:", val);
              }}
            />
          </div>
          <InputField
            label="Enter Password"
            placeholder="Enter Enter Password"
          />
          <div className="flex gap-4 2xl:gap-[1vw] w-full ">
            <Button title="Cancel" variant="primary-outline" width="w-full" />

            <Button title="Add Staff" width="w-full" />
          </div>
        </form>
      </ModalOverlay>
    </div>
  );
};
