// import PermissionAccordion from "./PermissionAccordion";
import { ChevronDown, ChevronRight } from "lucide-react";
import { RolePermission } from "../role-permission/RolePermission";
import { ThreeIcon } from "@/features/icons";
import { useAllRoleListQuery } from "@/services";

interface Permission {
  module: string;
  read: boolean;
  edit: boolean;
  add: boolean;
  delete: boolean;
}

interface RoleRowProps {
  role: {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    permissions: Permission[];
  };
  isExpanded: boolean;
  onToggle: () => void;
}

export function RoleRowTable({ role, isExpanded, onToggle }: RoleRowProps) {

 const {isError,isPending, data, isLoading, RoleRefetch } = useAllRoleListQuery();
 const hasNoData = data?.length===0
 const shouldRenderFallback = isError|| isPending|| isLoading|| hasNoData
 console.log("data",data);
 console.log(shouldRenderFallback);

 
 


  return (
    <>
      <tr
        className="bg-white hover:bg-gray-50 transition-colors"
        onClick={onToggle}
      >
        <td className="p-3 flex items-center gap-2 ">
          {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          {role.id}
        </td>
        <td className="p-3">{role.name}</td>
        <td className="p-3">{role.createdAt}</td>
        <td className="p-3">{role.updatedAt}</td>
        <td className="p-3 ">{role.deletedAt}</td>
        <td className="p-3">
          <div className="flex justify-start">
            <ThreeIcon className="w-5 h-5 text-gray-600" />
          </div>
        </td>
      </tr>
      {isExpanded && (
        <tr className="bg-gray-50">
          <td colSpan={6}>
            <RolePermission permissions={role.permissions} />
          </td>
        </tr>
      )}
    </>
  );
}
