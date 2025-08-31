"use client";

import { IClientInfo } from "@/constants";
import React from "react";
import { FiPhone, FiMail } from "react-icons/fi";

export interface ClientInfoProps {
  clientInfoData: IClientInfo
}

export function ClientInfo({ clientInfoData }: ClientInfoProps) {
  return (
    <div className="border-b border-gray-400 2xl:border-[0.05vw] p-4 2xl:p-[1vw]">
      <h3 className="text-[1.2rem] font-medium 2xl:text-[1.2vw] mb-4 2xl:mb-[1vw]">Client Info</h3>
      <div className="flex flex-wrap gap-4 2xl:gap-[1vw] text-[0.9rem] 2xl:text-[0.875vw]">
        <div className="border border-gray-300 2xl:border-[0.05vw] rounded-lg 2xl:rounded-[0.5vw] p-4 2xl:p-[1vw] min-w-[200px] 2xl:min-w-[12vw] flex-1">
          <p className="font-light text-[0.9rem] 2xl:text-[0.875vw] mb-2 2xl:mb-[0.5vw]">Client Name</p>
          <p className="underline break-words text-[1rem] 2xl:text-[1.1vw]">{clientInfoData.client_name}</p>
        </div>
        <div className="border border-gray-300 2xl:border-[0.05vw] rounded-lg 2xl:rounded-[0.5vw] p-4 2xl:p-[1vw] min-w-[200px] 2xl:min-w-[12vw] flex-1">
          <p className="font-light text-[0.9rem] 2xl:text-[0.875vw] mb-2 2xl:mb-[0.5vw]">Company Name</p>
          <p className="break-words text-[1rem] 2xl:text-[1.1vw]">{clientInfoData.company_name}</p>
        </div>
        <div className="border border-gray-300 2xl:border-[0.05vw] rounded-lg 2xl:rounded-[0.5vw] p-4 2xl:p-[1vw] min-w-[200px] 2xl:min-w-[12vw] flex-1">
          <p className="font-light text-[0.9rem] 2xl:text-[0.875vw] mb-2 2xl:mb-[0.5vw]">Contact Person</p>
          <p className="break-words text-[1rem] 2xl:text-[1.1vw]">{clientInfoData.contact_person}</p>
        </div>
        <div className="border border-gray-300 2xl:border-[0.05vw] rounded-lg 2xl:rounded-[0.5vw] p-4 2xl:p-[1vw] min-w-[200px] 2xl:min-w-[12vw] flex-1">
          <div className="flex items-center gap-2 text-[1rem] 2xl:text-[1.1vw] text-primary">
            <FiPhone className="text-[1rem] 2xl:text-[1vw] flex-shrink-0" />
            <a href={`tel:${clientInfoData.phone}`} className="underline text-textColor break-words">{clientInfoData.phone}</a>
          </div>
        </div>
        <div className="border border-gray-300 2xl:border-[0.05vw] rounded-lg 2xl:rounded-[0.5vw] p-4 2xl:p-[1vw] min-w-[200px] 2xl:min-w-[12vw] flex-1">
          <div className="flex items-center gap-2 text-[1rem] 2xl:text-[1.1vw] text-primary">
            <FiMail className="text-[1rem] 2xl:text-[1vw] flex-shrink-0" />
            <a href={`mailto:${clientInfoData.email}`} className="underline text-textColor break-words">{clientInfoData.email}</a>
          </div>
        </div>
      </div>
    </div>
  );
}
