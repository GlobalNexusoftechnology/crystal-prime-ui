'use client'

import { useEffect, useState } from "react"
import { Button, InputField, ModalOverlay } from "@/components"
import { MODULES, ACTIONS, TOptionItem } from "@/constants"
import { IApiError } from "@/utils"
import {
  ICreateRoleResponse,
  IUpdateRoleResponse,
  useCreateRoleMutation,
  useUpdateRoleMutation,
} from "@/services"
import toast from "react-hot-toast"

interface RolePermissionModalProps {
  onClose: () => void
  refetchRoles: () => void
  mode: "create" | "edit"
  defaultValues?: {
    id: string
    role: string
    permissions: string[]
  }
}

const getModuleKey = (value: string) => parseInt(value, 10)

export function RolePermissionModal({
  onClose,
  refetchRoles,
  mode,
  defaultValues,
}: RolePermissionModalProps) {
  const [formData, setFormData] = useState<Record<number, string[]>>({})
  const [roleName, setRoleName] = useState<string>("")
  const [roleNameError, setRoleNameError] = useState<string>("")
  const [permissionError, setPermissionError] = useState<string>("")

  const isEditMode = mode === "edit";

  const handleCommonSuccessCallback = (response: ICreateRoleResponse | IUpdateRoleResponse) => {
    toast.success(response?.message)
    refetchRoles()
    onClose()
  }

  const { createRole, isPending: creating } = useCreateRoleMutation({
    onSuccessCallback: (response: ICreateRoleResponse)=> handleCommonSuccessCallback(response),
    onErrorCallback: (err: IApiError) => {
      toast.error(err?.message)
    },
  })

  const { updateRole, isPending: updating } = useUpdateRoleMutation({
    onSuccessCallback: (response: IUpdateRoleResponse)=> handleCommonSuccessCallback(response),
    onErrorCallback: (err: IApiError) => {
      toast.error(err?.message)
    },
  })

  useEffect(() => {
    if (isEditMode && defaultValues) {
      setRoleName(defaultValues.role)
      const permissionMap: Record<number, string[]> = {}

      defaultValues.permissions.forEach((perm) => {
        const moduleKey = parseInt(perm.slice(0, 2), 10)
        const perms = perm.slice(2).split("")
        permissionMap[moduleKey] = perms
      })

      setFormData(permissionMap)
    }
  }, [defaultValues, isEditMode])

  const togglePermission = (moduleValue: string, actionValue: string) => {
    setPermissionError("")
    const key = getModuleKey(moduleValue)
    setFormData((prev) => {
      const current = prev[key] || []
      const updated = current.includes(actionValue)
        ? current.filter((p) => p !== actionValue)
        : [...current, actionValue]
      return { ...prev, [key]: updated }
    })
  }

  const toggleAll = (moduleValue: string) => {
    setPermissionError("")
    const key = getModuleKey(moduleValue)
    setFormData((prev) => {
      const current = prev[key] || []
      const allSelected = ACTIONS.every((action) =>
        current.includes(action.value)
      )
      return {
        ...prev,
        [key]: allSelected ? [] : [...ACTIONS?.map((action) => action.value)],
      }
    })
  }

  const validateForm = () => {
    let isValid = true

    if (roleName.trim() === "") {
      setRoleNameError("Role name is required.")
      isValid = false
    }

    let emptyPermission = 0
    for (const actionValues of Object.values(formData)) {
      if (actionValues.length === 0) {
        emptyPermission++
      }
    }

    if (Object.entries(formData).length === emptyPermission) {
      setPermissionError("Permission selection is required.")
      isValid = false
    }

    return isValid
  }

  const handleFormSubmit = () => {
    if (!validateForm()) return

    const permissions: string[] = []

    for (const [moduleValue, actionValues] of Object.entries(formData)) {
      if (actionValues.length > 0) {
        const sorted = [...actionValues].sort()
        permissions.push(`${moduleValue}${sorted.join("")}`)
      }
    }

    const payload = {
      role: roleName,
      permissions,
    }

    if (isEditMode && defaultValues?.id) {
      updateRole({ id: defaultValues.id, payload })
    } else {
      createRole(payload)
    }
  }

  const handleRoleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoleName(e.target.value)
    if (e.target.value.trim() !== "") setRoleNameError("")
  }

  return (
    <ModalOverlay modalTitle="Back to Roles" isOpen={true} onClose={onClose} modalClassName="">
      <div className="overflow-y-auto max-h-[80vh] space-y-4">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <h2 className="text-[1rem]  font-semibold mb-4 text-gray-800">
            {isEditMode ? "Edit Role" : "Add Role"}
          </h2>

          <div className="mb-6">
            <label className="block text-[1rem]  font-medium mb-1 text-gray-700">
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
            <p className="text-red-500 text-[0.9rem]   mt-1">
              {permissionError}
            </p>
          )}

          {MODULES?.map((mod: TOptionItem, idx) => (
            <div key={mod.value} className="mb-4">
              <div className="flex items-start mb-2 text-[1rem] ">
                <span className="font-medium text-gray-800">
                  {idx + 1}. {mod.label}
                </span>
              </div>
              <div className="ml-6 flex flex-wrap gap-4">
                <label className="flex items-center space-x-2 text-gray-700">
                  <input
                    type="checkbox"
                    checked={ACTIONS.every((a) =>
                      formData[getModuleKey(mod.value)]?.includes(a.value)
                    )}
                    onChange={() => toggleAll(mod.value)}
                    className="w-4 h-4"
                  />
                  <span>All</span>
                </label>

                {ACTIONS?.map((perm) => (
                  <label
                    key={perm.value}
                    className="flex items-center space-x-2 text-gray-700"
                  >
                    <input
                      type="checkbox"
                      checked={
                        formData[getModuleKey(mod.value)]?.includes(
                          perm.value
                        ) || false
                      }
                      onChange={() => togglePermission(mod.value, perm.value)}
                      className="w-4 h-4"
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
            title={isEditMode ? "Update Role" : "Add Role"}
            type="submit"
            onClick={handleFormSubmit}
            width="w-full"
            disabled={creating || updating}
          />
        </div>
      </div>
    </ModalOverlay>
  )
}
