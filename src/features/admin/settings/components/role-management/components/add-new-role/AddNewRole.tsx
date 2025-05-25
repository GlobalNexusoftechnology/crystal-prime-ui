import { useState } from "react";
import { Button, InputField, ModalOverlay } from "@/components";

const modules = [
  {
    id: 1,
    name: "Lead Management Module",
  },
  {
    id: 2,
    name: "Project Management Module",
  },
];

const permissions = ["Read Only", "Add", "edit", "Delete"];

interface RolePermissionModalProps {
  onClose: () => void;
}

export function AddNewRole({ onClose }: RolePermissionModalProps) {
  const [formData, setFormData] = useState<Record<number, string[]>>({});

  const togglePermission = (moduleId: number, permission: string) => {
    setFormData((prev) => {
      const current = prev[moduleId] || [];
      const updated = current.includes(permission)
        ? current.filter((p) => p !== permission)
        : [...current, permission];
      return { ...prev, [moduleId]: updated };
    });
  };

  const toggleAll = (moduleId: number) => {
    setFormData((prev) => {
      const current = prev[moduleId] || [];
      const allSelected = permissions.every((p) => current.includes(p));
      return {
        ...prev,
        [moduleId]: allSelected ? [] : [...permissions],
      };
    });
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
              className="w-full border rounded px-3 py-2 text-[1rem] 2xl:text-[1vw] text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {modules.map((mod) => (
            <div key={mod.id} className="mb-4">
              <div className="flex items-start mb-2 text-[1rem] 2xl:text-[1vw]">
                <span className="font-medium text-gray-800 text-[1rem] 2xl:text-[1vw]">
                  {mod.id}. {mod.name}
                </span>
              </div>
              <div className="ml-6 flex flex-wrap gap-4">
              <label className="flex items-center space-x-2 text-gray-700 text-[1rem] 2xl:text-[1vw]">
                <input
                  type="checkbox"
                  checked={permissions.every((p) =>
                    formData[mod.id]?.includes(p)
                  )}
                  onChange={() => toggleAll(mod.id)}
                  className="w-4 h-4 2xl:w-[1.2vw] 2xl:h-[1.2vw]"
                />
                <span>All</span>
              </label>

              {permissions.map((perm) => (
                <label
                  key={perm}
                  className="flex items-center space-x-2 text-gray-700 text-[1rem] 2xl:text-[1vw]"
                >
                  <input
                    type="checkbox"
                    checked={formData[mod.id]?.includes(perm) || false}
                    onChange={() => togglePermission(mod.id, perm)}
                    className="w-4 h-4 2xl:w-[1.2vw] 2xl:h-[1.2vw]"
                  />
                  <span>{perm}</span>
                </label>
              ))}
            </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-6 space-x-4">
          <Button
            title="Cancel"
            // onClick={handleCancel}
            variant="primary-outline"
            type="button"
            width="w-full"
          />
          <Button
            title="Add Lead"
            type="submit"
            // isLoading={isPending}
            width="w-full"
          />
        </div>
      </div>
    </ModalOverlay>
  );
}
