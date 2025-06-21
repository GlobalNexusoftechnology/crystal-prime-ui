import React from "react";
import Image from "next/image";
import { Button, ModalOverlay } from "@/components";
import { useRouter } from "next/navigation";
import { ImageRegistry } from "@/constants";

interface ProjectCreatedModalProps {
  onClose: () => void;
  isOpen: boolean;
}

export function ProjectCreatedModal({
  onClose,
  isOpen,
}: ProjectCreatedModalProps) {
  const router = useRouter();

  const handleViewProject = () => {
    router.push("/admin/project-management");
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay
      onClose={onClose}
      isOpen={isOpen}
      modalTitle="Back To Projects"
    >
      <div className="w-full max-w-lg 2xl:max-w-[32vw] text-center flex flex-col items-center gap-6">
        <div className="flex flex-col gap-6 bg-white rounded-lg border border-gray-300 p-8 ">
          <div>
            <Image
              src={ImageRegistry.projectCreated}
              alt="Project Created"
              width={500}
              height={500}
              className="w-full h-full"
            />
          </div>
          <p className="text-lg 2xl:[1.2vw] text-gray-600">
            Project created successfully. View it in project management.
          </p>
        </div>
        <div className="flex gap-4 w-full justify-center">
          <Button
            title="Cancel"
            variant="primary-outline"
            onClick={onClose}
            width="w-full md:w-[10rem] 2xl:w-[10vw]"
          />
          <Button
            title="View Project"
            onClick={handleViewProject}
            width="w-full md:w-[10rem] 2xl:w-[10vw]"
          />
        </div>
      </div>
    </ModalOverlay>
  );
}
