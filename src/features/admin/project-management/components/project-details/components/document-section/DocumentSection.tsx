import React from "react";
import { useAllUsersQuery } from "@/services";
import { IDocumentInfo } from "@/constants";
import Link from "next/link";
import { formatIndiaTime } from "@/utils";

export interface DocumentSectionProps {
  documentSectionData: IDocumentInfo[];
}

export function DocumentSection({ documentSectionData }: DocumentSectionProps) {
  // Fetch all users to map user IDs to names
  const { allUsersData } = useAllUsersQuery();

  // Function to get user name by ID
  const getUserNameById = (userId: string) => {
    if (!allUsersData || !userId) return "---";
    const user = allUsersData?.data?.list?.find((user) => user.id === userId);
    return user ? `${user.first_name} ${user.last_name}`.trim() : "---";
  };

  return (
    <div className="border-b border-gray-400  p-4 ">
      <h3 className="text-[1.2rem] font-medium  mb-4 ">
        Documents
      </h3>
      <div className="flex flex-col gap-4  text-[0.9rem] ">
        {documentSectionData?.length > 0 && documentSectionData?.map((doc, idx) => {         
          return (
            <div
              key={idx}
              className="flex flex-wrap gap-4 "
            >
              <div className="border border-gray-300  rounded-lg  p-4  min-w-[200px]  flex-1">
                <p className="font-light text-[0.9rem]  mb-2 ">
                  Document Name
                </p>
                <Link
                  href={`${doc?.file_path}`}
                  target="_blank"
                  // rel="noopener noreferrer"
                  className="text-[1rem]  underline hover:text-blue-600 transition-colors duration-200 break-words"
                >
                  {doc?.name || "---"}
                </Link>
              </div>
              <div className="border border-gray-300  rounded-lg  p-4  min-w-[200px]  flex-1">
                <p className="font-light text-[0.9rem]  mb-2 ">
                  Uploaded By
                </p>
                <p
                  className={`${
                    doc.uploaded_by && "underline"
                  } text-[1rem]  break-words`}
                >
                  {getUserNameById(doc.uploaded_by)}
                </p>
              </div>
              <div className="border border-gray-300  rounded-lg  p-4  min-w-[200px]  flex-1">
                <p className="font-light text-[0.9rem]  mb-2 ">
                  Uploaded At
                </p>
                <p
                  className={`${
                    doc.created_at && "underline"
                  } text-[1rem]  break-words`}
                >
                  {formatIndiaTime(doc?.created_at, "toReadable") || "---"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
