import Image from "next/image";

import { FileUpload } from "../file-upload";

import { ImageRegistry } from "@/constants";
import { Button, InputField } from "@/components";

/**
 * PersonalInfo component
 *
 * Renders a user interface for updating personal details such as name, email, role, and profile photo.
 * Includes input fields, an image preview, file upload functionality, and action buttons.
 */
export function PersonalInfo() {
  return (
    <div className="flex flex-col gap-2 2xl:gap-[0.5vw] p-4 2xl:p-[1vw] rounded-lg 2xl:rounded-[0.5vw]">
      <div className="flex flex-col px-4 2xl:px-[1vw] mb-3 2xl:mb-[0.75vw]">
        <h1 className="text-lg 2xl:text-[1.125vw] text-[#414651] font-medium 2xl:mb-[0.5vw]">
          Personal Info
        </h1>
        <span className="text-sm 2xl:text-[0.875vw]">
          Update your photo and personal details.
        </span>
      </div>

      <div className="bg-white flex flex-col gap-4 2xl:gap-[1vw] p-4 2xl:p-[1vw] rounded-lg 2xl:rounded-[0.5vw]">
        <div className="flex-flex-col gap-2 2xl:gap-[0.5vw]">
          <div className="flex flex-col md:flex-row gap-4 2xl:gap-[1vw] mb-4 2xl:mb-[1vw]">
            <InputField label="First Name" placeholder="Enter name" />
            <InputField label="Last Name" placeholder="Enter name" />
          </div>
          <div className="mb-4 2xl:mb-[1vw]">
            <InputField label="Email" placeholder="Enter email" />
          </div>
          <div className="mb-4 2xl:mb-[1vw]">
            <InputField label="Role" placeholder="Enter role" />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 2xl:gap-[1vw]">
          <div className="h-16 w-16 2xl:h-[4vw] 2xl:w-[4vw]">
            <Image
              src={ImageRegistry.profileImage}
              alt="profile image"
              className="object-contain w-full h-full"
            />
          </div>
          <FileUpload />
        </div>
        <div className="flex justify-end gap-2 2xl:gap-[0.5vw]">
          <Button title="cancel" variant="primary-outline" />
          <Button title="Save changes" />
        </div>
      </div>
    </div>
  );
}
