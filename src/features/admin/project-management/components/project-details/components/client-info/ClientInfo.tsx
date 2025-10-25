"use client";

import { IClientInfo } from "@/constants";
import React from "react";
import { FiPhone, FiMail } from "react-icons/fi";

export interface ClientInfoProps {
  clientInfoData: IClientInfo
}

export function ClientInfo({ clientInfoData }: ClientInfoProps) {
  return (
    <div className="border-b border-gray-400  p-4 ">
      <h3 className="text-[1.2rem] font-medium  mb-4 ">Client Info</h3>
      <div className="flex flex-wrap gap-4  text-[0.9rem] ">
        <div className="border border-gray-300  rounded-lg  p-4  min-w-[200px]  flex-1">
          <p className="font-light text-[0.9rem]  mb-2 ">Client Name</p>
          <p className="underline break-words text-[1rem] ">{clientInfoData.client_name}</p>
        </div>
        <div className="border border-gray-300  rounded-lg  p-4  min-w-[200px]  flex-1">
          <p className="font-light text-[0.9rem]  mb-2 ">Company Name</p>
          <p className="break-words text-[1rem] ">{clientInfoData.company_name}</p>
        </div>
        <div className="border border-gray-300  rounded-lg  p-4  min-w-[200px]  flex-1">
          <p className="font-light text-[0.9rem]  mb-2 ">Contact Person</p>
          <p className="break-words text-[1rem] ">{clientInfoData.contact_person}</p>
        </div>
        <div className="border border-gray-300  rounded-lg  p-4  min-w-[200px]  flex-1">
          <div className="flex items-center gap-2 text-[1rem]  text-primary">
            <FiPhone className="text-[1rem]  flex-shrink-0" />
            <a href={`tel:${clientInfoData.phone}`} className="underline text-textColor break-words">{clientInfoData.phone}</a>
          </div>
        </div>
        <div className="border border-gray-300  rounded-lg  p-4  min-w-[200px]  flex-1">
          <div className="flex items-center gap-2 text-[1rem]  text-primary">
            <FiMail className="text-[1rem]  flex-shrink-0" />
            <a href={`mailto:${clientInfoData.email}`} className="underline text-textColor break-words">{clientInfoData.email}</a>
          </div>
        </div>
      </div>
    </div>
  );
}
