"use client";
import { ModalOverlay } from "@/components";
import { MaterialHistory } from "@/components/material-history";
import { useEffect, useRef, useState } from "react";
import { FiPlusSquare } from "react-icons/fi";
import { IoMdCloseCircleOutline } from "react-icons/io";

interface LeadDetailsModalProps {
    data: any;
  onClose: () => void;
}

const tabs = ["History"];

export function MaterialHistoryTab({ data, onClose }: LeadDetailsModalProps) {
  const [activeTab, setActiveTab] = useState("Followups");
  const [showForm, setShowForm] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showForm && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [showForm]);

  return (
    <ModalOverlay
      modalTitle="Back to Inventory"
      isOpen={true}
      onClose={onClose}
      modalClassName="w-full md:w-[70vw] lg:w-[60vw] xl:w-[50vw] "
    >
      <div
        className="overflow-y-auto max-h-[80vh] space-y-4"
        ref={containerRef}
      >
   
        <div className="flex flex-col gap-4  p-4  bg-white border  rounded-xl ">
          {/* Tabs */}
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              {tabs?.length > 0 && tabs.map((tab) => (
                <button
                  key={tab}
                  className={`pb-2   font-medium text-[1rem]  ${
                    activeTab === tab
                      ? "border-b-2 border-primary text-primary"
                      : "text-gray-500"
                  }`}
                  onClick={() => {
                    setActiveTab(tab);
                    setShowForm(false);
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
        
          </div>

          {/* Tab Contents */}
          <div>
            {activeTab === "History" && (
              <MaterialHistory
                leadId={data.id}
                showForm={showForm}
                setShowForm={setShowForm}
              />
            )}
          
          </div>

          <div ref={bottomRef} />
        </div>
      </div>
    </ModalOverlay>
  );
}
