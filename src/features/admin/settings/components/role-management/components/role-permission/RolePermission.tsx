import { ACTIONS, MODULES } from "@/constants"
import { decodePermissions, getLabelFromValue } from "@/utils"

export function RolePermission({ permissions }: { permissions: string[] }) {
  const decodedPermissions = decodePermissions(permissions)

  return (
    <div className="flex flex-col gap-4 2xl:gap-[0.5vw] py-4 2xl:py-[1vw] px-8 2xl:px-[2vw] bg-white">
      <h1 className="2xl:text-[1vw] text-gray-700 font-semibold bg-white">
        Permissions
      </h1>
      <table className="w-full text-[1rem] 2xl:text-[1vw]">
        <thead className="bg-white">
          <tr>
            <th className="p-2 2xl:p-[0.5vw] text-left text-gray-700">
              Modules
            </th>
            {ACTIONS.map((action) => (
              <th
                key={action.value}
                className="p-2 2xl:p-[0.5vw] text-left text-gray-700"
              >
                {action.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {MODULES.map((module) => (
            <ModulePermissionRow
              key={module.value}
              moduleId={module.value}
              actionCodes={decodedPermissions[module.value] || new Set()}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

function ModulePermissionRow({
  moduleId,
  actionCodes,
}: {
  moduleId: string
  actionCodes: Set<string>
}) {
  const moduleName = getLabelFromValue(MODULES, moduleId)
  return (
    <tr className="hover:bg-gray-100 transition-colors duration-150 bg-white text-[1rem] 2xl:text-[1vw]">
      <td className="p-2 2xl:p-[0.5vw]">{moduleName}</td>
      {ACTIONS.map((action) => {
        const actionCode = actionCodes.has(action.value) ? "Yes" : "No"
        return (
          <td
            key={action.value}
            className={`p-2 2xl:p-[0.5vw] font-thin ${
              actionCode === "Yes" ? "text-green-600" : "text-red-500"
            }`}
          >
            {actionCode}
          </td>
        )
      })}
    </tr>
  )
}
