import { IDocumentInfo } from "@/constants";
import React from "react";

export interface DocumentSectionProps {
  documentSectionData: IDocumentInfo[];
}

export function DocumentSection({ documentSectionData }: DocumentSectionProps) {
  return (
    <div className="border-b 2xl:border-[0.1vw] p-4 2xl:p-[1vw]">
      <h3 className="text-[1.2rem] 2xl:text-[1.2vw] mb-4 2xl:mb-[1vw]">
        Documents
      </h3>
      <div className="flex flex-col gap-8 2xl:gap-[2vw] text-sm 2xl:text-[0.875vw]">
        {documentSectionData.map((doc, idx) => (
          <div
            key={idx}
            className="flex flex-wrap gap-12 2xl:gap-[3vw] items-center"
          >
            <div className="flex flex-col">
              <p className="font-light text-sm 2xl:text-[0.875vw]">
                Document Name
              </p>
              <p className="text-[1rem] 2xl:text-[1.1vw]">
                {doc?.name || "---"}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="font-light text-sm 2xl:text-[0.875vw]">
                Uploaded By
              </p>
              <p
                className={`${
                  doc.uploaded_by && "underline"
                } text-[1rem] 2xl:text-[1.1vw]`}
              >
                {doc?.uploaded_by || "---"}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="font-light text-sm 2xl:text-[0.875vw]">
                Uploaded At
              </p>
              <p
                className={`${
                  doc.created_at && "underline"
                } text-[1rem] 2xl:text-[1.1vw]`}
              >
                {doc?.created_at || "---"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
