import { useState } from "react";

import { Button, InputField, ModalOverlay } from "@/components";
import { MODULES, ACTIONS, TOptionItem } from "@/constants";
import { IApiError } from "@/utils";
import { ICreateRoleResponse, useCreateRoleMutation } from "@/services";

interface RolePermissionModalProps {
  onClose: () => void;
  refetchRoles: () => void;
}

// Converts string keys for consistent permission tracking
const getModuleKey = (value: string) => parseInt(value, 10);

export function AddNewRole({ onClose, refetchRoles }: RolePermissionModalProps) {
  const [formData, setFormData] = useState<Record<number, string[]>>({});
  const [roleName, setRoleName] = useState<string>("");
  const [roleNameError, setRoleNameError] = useState<string>("");
  const [permissionError, setPermissionError] = useState<string>("");

  const { createRole, isPending } = useCreateRoleMutation({
    onSuccessCallback: (data: ICreateRoleResponse) => {
      console.log("Lead role successfully", data);
      refetchRoles();
      onClose()
    },
    onErrorCallback: (err: IApiError) => {
      console.error("Failed to create role:", err);
    },
  });

  const togglePermission = (moduleValue: string, actionValue: string) => {
    setPermissionError('');
    const key = getModuleKey(moduleValue);
    setFormData((prev) => {
      const current = prev[key] || [];
      const updated = current.includes(actionValue)
        ? current.filter((p) => p !== actionValue)
        : [...current, actionValue];
      return { ...prev, [key]: updated };
    });
  };

  const toggleAll = (moduleValue: string) => {
    setPermissionError('');
    const key = getModuleKey(moduleValue);
    setFormData((prev) => {
      const current = prev[key] || [];
      const allSelected = ACTIONS.every((action) => current.includes(action.value));
      return {
        ...prev,
        [key]: allSelected ? [] : [...ACTIONS.map((action) => action.value)],
      };
    });
  };

  const handleFormSubmit = () => {
    if (!validateForm()) return;
    const permissions: string[] = [];

    for (const [moduleValue, actionValues] of Object.entries(formData)) {
      if (actionValues.length > 0) {
        const sorted = [...actionValues].sort(); // Ensure consistent order
        permissions.push(`${moduleValue}${sorted.join("")}`);
      }
    }

    const payload = {
      role: roleName,
      permissions,
    };

    createRole(payload)
  };

  const handleRoleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoleName(e.target.value);
    if (e.target.value.trim() !== "") {
      setRoleNameError(""); // Clear error if valid
    }
  };

  const validateForm = () => {
    let isValid = true;

    if (roleName.trim() === "") {
      setRoleNameError("Role name is required.");
      isValid = false;
    }

    let emptyPermission = 0;
    for (const actionValues of Object.values(formData)) {
      if (actionValues.length === 0) {
       emptyPermission = emptyPermission + 1;
      }
    }

    
    if(Object.entries(formData).length === emptyPermission) {
      setPermissionError('Permission selection is required.');
      isValid = false;
    }

    return isValid;
  };


  return (
    <ModalOverlay isOpen={true} onClose={onClose} modalClassName="2xl:w-[40vw]">
      <div className="overflow-y-auto max-h-[80vh] space-y-4">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <h2 className="text-[1rem] 2xl:text-[1vw] font-semibold mb-4 text-gray-800">
            Add Role
          </h2>

          <div className="mb-6">
            <label className="block text-[1rem] 2xl:text-[1vw] font-medium mb-1 text-gray-700">
              Role Name
            </label>
            <InputField
              type="text"
              placeholder="Enter Role Name"
              value={roleName}
              error={roleNameError}
              onChange={handleRoleNameChange}
            />
          </div>

          {permissionError && (
            <p className="text-red-500 text-sm 2xl:text-[0.9vw] 2xl:mt-[0.25vw] mt-1">
              {permissionError}
            </p>
          )}

          {MODULES.map((mod: TOptionItem, idx) => (
            <div key={mod.value} className="mb-4">
              <div className="flex items-start mb-2 text-[1rem] 2xl:text-[1vw]">
                <span className="font-medium text-gray-800 text-[1rem] 2xl:text-[1vw]">
                  {idx + 1}. {mod.label}
                </span>
              </div>
              <div className="ml-6 flex flex-wrap gap-4">
                <label className="flex items-center space-x-2 text-gray-700 text-[1rem] 2xl:text-[1vw]">
                  <input
                    type="checkbox"
                    checked={ACTIONS.every((a) =>
                      formData[getModuleKey(mod.value)]?.includes(a.value)
                    )}
                    onChange={() => toggleAll(mod.value)}
                    className="w-4 h-4 2xl:w-[1.2vw] 2xl:h-[1.2vw]"
                  />
                  <span>All</span>
                </label>

                {ACTIONS.map((perm) => (
                  <label
                    key={perm.value}
                    className="flex items-center space-x-2 text-gray-700 text-[1rem] 2xl:text-[1vw]"
                  >
                    <input
                      type="checkbox"
                      checked={formData[getModuleKey(mod.value)]?.includes(perm.value) || false}
                      onChange={() => togglePermission(mod.value, perm.value)}
                      className="w-4 h-4 2xl:w-[1.2vw] 2xl:h-[1.2vw]"
                    />
                    <span>{perm.label}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-6 space-x-4">
          <Button
            title="Cancel"
            onClick={onClose}
            variant="primary-outline"
            type="button"
            width="w-full"
          />
          <Button
            title="Add Role"
            type="submit"
            onClick={handleFormSubmit}
            width="w-full"
            disabled={isPending}
          />
        </div>
      </div>
    </ModalOverlay>
  );
}