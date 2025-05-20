import { Button } from "@/components";
import { useState } from "react";


type ImportExcelProps = {
  setAddLeadModalOpen: (open: boolean) => void;
};
export function ImportExcel({ setAddLeadModalOpen }: ImportExcelProps) {
  const [step, setStep] = useState(1);
  const [customFieldsChecked, setCustomFieldsChecked] = useState(true);
  const [ignoreFieldsChecked, setIgnoreFieldsChecked] = useState(false);
  const [multiAssignChecked, setMultiAssignChecked] = useState(true);

  const handleCancel = () => {
    setAddLeadModalOpen(false);
    setStep(1); // reset step if modal reused
  };

  const handleNext = () => {
    // example logic for step advancement
    if (step === 1) {
      setStep(2);
    } else {
      setAddLeadModalOpen(false);
    }
  };

  return (
    <div className="  overflow-y-auto h-[30rem] 2xl:h-[30vw]">
      <div className="space-y-6 p-4 2xl:p-[3vw] ">
        {/* Step 1 */}
        {step === 1 && (
          <>
            {/* Warning Section */}
            <div className="rounded-lg bg-white ">
              <p className="text-[1rem] 2xl:text-[1vw] text-red-600 font-medium mb-2">
                The following columns were found in the file but do not match
                any fields in the system:
              </p>
              <div className="space-y-2 ml-2 text-[1rem] 2xl:text-[1vw] text-gray-700">
                {["Company Size", "Website", "Lead Budget"].map(
                  (item, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 text-[1rem] 2xl:text-[1vw]"
                    >
                      <input
                        type="checkbox"
                        checked
                        readOnly
                        className="accent-black"
                        id={`warn-${index}`}
                      />
                      <label htmlFor={`warn-${index}`}>{item}</label>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Action Choice Section */}
            <div className="space-y-3">
              <p className="text-[1rem] 2xl:text-[1vw] font-semibold text-gray-700">
                WHAT WOULD YOU LIKE TO DO WITH THESE COLUMNS?
              </p>

              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="addCustomFields"
                  checked={customFieldsChecked}
                  onChange={(e) => setCustomFieldsChecked(e.target.checked)}
                  className="accent-black mt-1 text-[1rem] 2xl:text-[1vw]"
                />
                <label
                  htmlFor="addCustomFields"
                  className="text-sm text-gray-700"
                >
                  <span className="font-medium text-[1rem] 2xl:text-[1vw]">
                    Add these as Custom Fields in the Lead Table
                  </span>
                  <br />
                  <span className="text-gray-500 text-[1rem] 2xl:text-[1vw]">
                    This will create new fields visible in lead details/edit
                    form.
                  </span>
                </label>
              </div>

              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="ignoreFields"
                  checked={ignoreFieldsChecked}
                  onChange={(e) => setIgnoreFieldsChecked(e.target.checked)}
                  className="accent-black mt-1"
                />
                <label htmlFor="ignoreFields" className="text-sm text-gray-700">
                  <span className="font-medium text-[1rem] 2xl:text-[1vw]">
                    Ignore these columns
                  </span>
                  <br />
                  <span className="text-gray-500">Data will not be saved.</span>
                </label>
              </div>
            </div>

            {/* Lead Type Input */}
            <div className="space-y-2">
              <label
                htmlFor="leadType"
                className="text-[1rem] 2xl:text-[1vw] font-medium text-gray-700"
              >
                Lead Type
              </label>
              <select
                id="leadType"
                className="w-full border border-gray-300 rounded-md p-2 text-[1rem] 2xl:text-[1vw]"
              >
                <option value="">Select Lead Type</option>
              </select>
            </div>

            {/* Assigned To Input */}
            <div className="space-y-2">
              <label
                htmlFor="assignedTo"
                className="text-[1rem] 2xl:text-[1vw] font-medium text-gray-700"
              >
                Assigned To
              </label>
              <select
                id="assignedTo"
                className="w-full border border-gray-300 rounded-md p-2 text-[1rem] 2xl:text-[1vw]"
              >
                <option value="">Select Staff</option>
              </select>

              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="multiAssign"
                  checked={multiAssignChecked}
                  onChange={(e) => setMultiAssignChecked(e.target.checked)}
                  className="accent-black"
                />
                <label
                  htmlFor="multiAssign"
                  className="text-[1rem] 2xl:text-[1vw] text-gray-700"
                >
                  Assign to Multiple Staff Members
                </label>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-between pt-4">
              <Button title="Cancel" onClick={handleCancel} />
              <Button title="Add Lead" onClick={handleNext} />
            </div>
          </>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="text-center">
            <p className="text-gray-600 text-[1rem] 2xl:text-[1vw]">
              Next step goes here...
            </p>
            <Button title="Finish" onClick={handleCancel} className="mt-4" />
          </div>
        )}
      </div>
    </div>
  );
}
