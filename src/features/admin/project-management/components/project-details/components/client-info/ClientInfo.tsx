"use client";

import { FiPhone, FiMapPin, FiMail } from "react-icons/fi";

export function ClientInfo() {
  return (
    <div className="border-b p-4 2xl:p-[1vw]">
      <h3 className="text-[1.2vw] font-semibold mb-4 2xl:mb-[1vw]">Client Info</h3>

      <div className="flex flex-col gap-6 2xl:gap-[2vw] text-sm 2xl:text-[0.875vw]">
        <div className="flex flex-wrap gap-12 2xl:gap-[3vw]">
          <div className="flex flex-col">
            <p className="font-light">Client Name</p>
            <p className="underline text-[1rem] 2xl:text-[1.1vw]">Nisha Sharma</p>
          </div>
          <div className="flex flex-col">
            <p className="font-light">Company Name</p>
            <p className="text-[1rem] 2xl:text-[1.1vw]">Nisha Sharma</p>
          </div>
          <div className="flex flex-col">
            <p className="font-light">Contact Person</p>
            <p className="text-[1rem] 2xl:text-[1.1vw]">Nisha Sharma</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-12 2xl:gap-[3vw]">
          <div className="flex items-center gap-2 text-[1rem] 2xl:text-[1.1vw] text-primary">
            <FiPhone className="text-[1rem] 2xl:text-[1vw]" />
            <a href="tel:9516431584" className="underline text-textColor">951-643-1584</a>
          </div>
          <div className="flex items-center gap-2 text-[1rem] 2xl:text-[1.1vw] text-primary">
            <FiMapPin className="text-[1rem] 2xl:text-[1vw]" />
            <span className="underline text-textColor">Schoenview</span>
          </div>
          <div className="flex items-center gap-2 text-[1rem] 2xl:text-[1.1vw] text-primary">
            <FiMail className="text-[1rem] 2xl:text-[1vw]" />
            <a href="mailto:Alia.Dibbert@hotmail.com" className="underline text-textColor">
              Alia.Dibbert@hotmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
