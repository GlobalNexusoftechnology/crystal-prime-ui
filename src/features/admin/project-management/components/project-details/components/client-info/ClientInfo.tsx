"use client";

import { IClientInfo } from "@/constants";
import React from "react";
import { FiPhone, FiMail } from "react-icons/fi";

export interface ClientInfoProps {
  clientInfoData: IClientInfo
}

export function ClientInfo({ clientInfoData }: ClientInfoProps) {
  return (
    <div className="border-b 2xl:border-[0.1vw] p-4 2xl:p-[1vw]">
      <h3 className="text-[1.2rem] 2xl:text-[1.2vw] mb-4 2xl:mb-[1vw]">Client Info</h3>
      <div className="flex flex-col gap-6 2xl:gap-[2vw] text-sm 2xl:text-[0.875vw]">
        <div className="flex flex-wrap gap-12 2xl:gap-[3vw]">
          <div className="flex flex-col">
            <p className="font-light">Client Name</p>
            <p className="underline text-[1rem] 2xl:text-[1.1vw]">{clientInfoData.client_name}</p>
          </div>
          <div className="flex flex-col">
            <p className="font-light">Company Name</p>
            <p className="text-[1rem] 2xl:text-[1.1vw]">{clientInfoData.company_name}</p>
          </div>
          <div className="flex flex-col">
            <p className="font-light">Contact Person</p>
            <p className="text-[1rem] 2xl:text-[1.1vw]">{clientInfoData.contact_person}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-12 2xl:gap-[3vw]">
          <div className="flex items-center gap-2 text-[1rem] 2xl:text-[1.1vw] text-primary">
            <FiPhone className="text-[1rem] 2xl:text-[1vw]" />
            <a href={`tel:${clientInfoData.phone}`} className="underline text-textColor">{clientInfoData.phone}</a>
          </div>
          <div className="flex items-center gap-2 text-[1rem] 2xl:text-[1.1vw] text-primary">
            <FiMail className="text-[1rem] 2xl:text-[1vw]" />
            <a href={`mailto:${clientInfoData.email}`} className="underline text-textColor">{clientInfoData.email}</a>
          </div>
        </div>
      </div>
    </div>
  );
}
