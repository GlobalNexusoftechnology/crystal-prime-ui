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
    <div className="border-b border-gray-400 2xl:border-[0.1vw] p-4 2xl:p-[1vw]">
      <h3 className="text-[1.2rem] font-medium 2xl:text-[1.2vw] mb-4 2xl:mb-[1vw]">
        Documents
      </h3>
      <div className="flex flex-col gap-4 2xl:gap-[1vw] text-[0.9rem] 2xl:text-[0.875vw]">
        {documentSectionData?.length > 0 && documentSectionData?.map((doc, idx) => {         
          return (
            <div
              key={idx}
              className="flex flex-wrap gap-4 2xl:gap-[1vw]"
            >
              <div className="border border-gray-300 2xl:border-[0.1vw] rounded-lg 2xl:rounded-[0.5vw] p-4 2xl:p-[1vw] min-w-[200px] 2xl:min-w-[12vw] flex-1">
                <p className="font-light text-[0.9rem] 2xl:text-[0.875vw] mb-2 2xl:mb-[0.5vw]">
                  Document Name
                </p>
                <Link
                  href={`${doc?.file_path}`}
                  target="_blank"
                  // rel="noopener noreferrer"
                  className="text-[1rem] 2xl:text-[1.1vw] underline hover:text-blue-600 transition-colors duration-200 break-words"
                >
                  {doc?.name || "---"}
                </Link>
              </div>
              <div className="border border-gray-300 2xl:border-[0.1vw] rounded-lg 2xl:rounded-[0.5vw] p-4 2xl:p-[1vw] min-w-[200px] 2xl:min-w-[12vw] flex-1">
                <p className="font-light text-[0.9rem] 2xl:text-[0.875vw] mb-2 2xl:mb-[0.5vw]">
                  Uploaded By
                </p>
                <p
                  className={`${
                    doc.uploaded_by && "underline"
                  } text-[1rem] 2xl:text-[1.1vw] break-words`}
                >
                  {getUserNameById(doc.uploaded_by)}
                </p>
              </div>
              <div className="border border-gray-300 2xl:border-[0.1vw] rounded-lg 2xl:rounded-[0.5vw] p-4 2xl:p-[1vw] min-w-[200px] 2xl:min-w-[12vw] flex-1">
                <p className="font-light text-[0.9rem] 2xl:text-[0.875vw] mb-2 2xl:mb-[0.5vw]">
                  Uploaded At
                </p>
                <p
                  className={`${
                    doc.created_at && "underline"
                  } text-[1rem] 2xl:text-[1.1vw] break-words`}
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
