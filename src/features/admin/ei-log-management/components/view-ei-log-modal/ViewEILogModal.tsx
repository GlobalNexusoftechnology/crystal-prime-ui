"use client";

import { ModalOverlay } from "@/components";
import { IAllEILogList } from "@/services";

interface ViewEILogModalProps {
  isOpen: boolean;
  onClose: () => void;
  eiLogData: IAllEILogList | null;
}

function formatDateDMY(dateString?: string) {
  if (!dateString) return "-";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day} / ${month} / ${year}`;
}

function formatCurrency(val?: string | number | null) {
  if (!val) return "-";
  const num = typeof val === "string" ? parseFloat(val) : val;
  return `₹${num.toLocaleString("en-IN")}`;
}

function extractFileName(url: string) {
  return url.split("/").pop()?.split("?")[0] || "File";
}

export const ViewEILogModal: React.FC<ViewEILogModalProps> = ({
  isOpen,
  onClose,
  eiLogData,
}) => {
  if (!eiLogData) return null;

  return (
    <ModalOverlay
      modalTitle="Back to EI Log"
      isOpen={isOpen}
      onClose={onClose}
      modalClassName="w-full md:w-[70vw] lg:w-[60vw] xl:w-[50vw] "
    >
      <div className="overflow-y-auto max-h-[80vh] space-y-4">
        {/* Card Content */}
        <div className="bg-white rounded-lg  p-4  border  border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-[1rem]  text-gray-600">EI Type</p>
              <p className="underline underline-offset-2  font-medium text-textColor text-[1.1rem] ">
                {eiLogData.eilogType?.name || "-"}
              </p>
            </div>
            <div>
              <p className="text-[1rem]  text-gray-600">EI Head</p>
              <p className="underline underline-offset-2  font-medium text-textColor text-[1.1rem] ">
                {eiLogData.eilogHead?.name || "-"}
              </p>
            </div>
          </div>
          <div className="mb-4">
            <p className="text-[1rem]  text-gray-600">Description</p>
            <p className="underline underline-offset-2  font-medium text-primary text-[1.1rem]  break-words">
              {eiLogData.description || "No description"}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <p className="text-[1rem]  text-gray-600">Date</p>
              <p className="underline underline-offset-2  font-medium text-textColor text-[1.1rem] ">
                {formatDateDMY(eiLogData.created_at)}
              </p>
            </div>
            {
                eiLogData.income ?

            <div>
              <p className="text-[1rem]  text-gray-600">Income</p>
              <p className="underline underline-offset-2  font-medium text-lightGreen text-[1.1rem] ">
                {formatCurrency(eiLogData.income)}
              </p>
            </div>:
            <div>
              <p className="text-[1rem]  text-gray-600">Expense</p>
              <p className="underline text-red-500 underline-offset-2  font-medium text-[1.1rem] ">
                {`- ${formatCurrency(eiLogData.expense)}`}
              </p>
            </div>
            }
            <div>
              <p className="text-[1rem]  text-gray-600">Attachment</p>
              {eiLogData.attachment ? (
                <a
                  href={eiLogData.attachment}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2  font-medium text-primary text-[1.1rem]  break-words"
                >
                  {extractFileName(eiLogData.attachment)}
                </a>
              ) : (
                <span className="text-gray-400">No attachment</span>
              )}
            </div>
          </div>
          <div>
            <p className="text-[1rem]  text-gray-600">Payment Mode</p>
            <p className="underline underline-offset-2  font-medium text-textColor text-[1.1rem] ">
              {eiLogData.paymentMode || "-"}
            </p>
          </div>
        </div>
      </div>
    </ModalOverlay>
  );
};
