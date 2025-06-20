import React from "react";
import { Dropdown, InputField, DatePicker } from "@/components";
import { HiCheck, HiXMark, HiChevronDown, HiChevronUp, HiOutlineCalendar } from "react-icons/hi2";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { TreeStructureIcon } from "@/features";
import { getInitials, getRandomColor } from "@/utils";

interface MilestoneType {
    id: number;
    name: string;
    assignedTo: string;
    status: string;
    estimatedStart: string;
    estimatedEnd: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tasks: any[];
}

interface MilestoneProps {
    milestone: MilestoneType;
    editingId: number | null;
    editMilestone: MilestoneType | null;
    onEdit: (milestone: MilestoneType) => void;
    onDelete: (id: number) => void;
    onSave: () => void;
    onCancel: () => void;
    onChange: (milestone: MilestoneType) => void;
    onToggle: (id: number) => void;
    expanded: boolean;
    menuOpen: number | null;
    setMenuOpen: (id: number | null) => void;
    userOptions: { label: string; value: string }[];
    statusOptions: { label: string; value: string }[];
    children?: React.ReactNode;
}

export function Milestone({
    milestone,
    editingId,
    editMilestone,
    onEdit,
    onDelete,
    onSave,
    onCancel,
    onChange,
    onToggle,
    expanded,
    menuOpen,
    setMenuOpen,
    userOptions,
    statusOptions,
    children,
}: MilestoneProps) {
    return (
        <tr className="bg-white rounded-lg shadow">
            {editingId === milestone.id && editMilestone ? (
                <>
                    <td className="px-2 py-2 font-medium flex items-center gap-2">
                        <InputField value={editMilestone.name} onChange={e => onChange({ ...editMilestone, name: e.target.value })} className="w-40" />
                    </td>
                    <td className="px-2 py-2">
                        <Dropdown options={userOptions} value={editMilestone.assignedTo} onChange={val => onChange({ ...editMilestone, assignedTo: val })} dropdownWidth="w-40" />
                    </td>
                    <td className="px-2 py-2">
                        <Dropdown options={statusOptions} value={editMilestone.status} onChange={val => onChange({ ...editMilestone, status: val })} dropdownWidth="w-32" />
                    </td>
                    <td className="px-2 py-2">
                        <DatePicker value={editMilestone.estimatedStart} onChange={val => onChange({ ...editMilestone, estimatedStart: val })} />
                    </td>
                    <td className="px-2 py-2">
                        <DatePicker value={editMilestone.estimatedEnd} onChange={val => onChange({ ...editMilestone, estimatedEnd: val })} />
                    </td>
                    <td className="px-2 py-4 text-right flex gap-2">
                        <button onClick={onSave} className="text-green-600" title="Save"><HiCheck className="w-6 h-6" /></button>
                        <button onClick={onCancel} className="text-red-600" title="Cancel"><HiXMark className="w-6 h-6" /></button>
                    </td>
                </>
            ) : (
                <>
                    <td className="px-2 py-2 font-medium flex items-center gap-2">
                        <button onClick={() => onToggle(milestone.id)} className="focus:outline-none" title={expanded ? "Collapse" : "Expand"} type="button">
                            {expanded ? <HiChevronUp className="w-6 h-6" /> : <HiChevronDown className="w-6 h-6" />}
                        </button>
                        <span className="text-sm">{milestone.name}</span>
                        <span className="flex items-center gap-1">
                            <TreeStructureIcon className="w-4 h-4" />
                            <span className="border-2 border-dotted border-primary rounded-full text-xs px-1 text-primary">{milestone.tasks.length}</span>
                        </span>
                    </td>
                    <td className="px-2 py-2 text-sm">
                        <div className="flex items-center gap-2">
                            <p className="flex items-center justify-center p-2 w-10 h-10 text-white text-[0.9rem] rounded-full" style={{ backgroundColor: getRandomColor(milestone.assignedTo) }}>{getInitials(milestone.assignedTo)}</p>
                            <p className="px-3 py-1 text-[0.9rem]">{milestone.assignedTo}</p>
                        </div>
                    </td>
                    <td className="px-2 py-2"><span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold">{milestone.status}</span></td>
                    <td className="px-2 py-2"><span className="flex items-center gap-2"><HiOutlineCalendar className="w-6 h-6 text-gray-400" /><span className="text-sm">{milestone.estimatedStart}</span></span></td>
                    <td className="px-2 py-2"><span className="flex items-center gap-2"><HiOutlineCalendar className="w-6 h-6 text-gray-400" />{milestone.estimatedEnd}</span></td>
                    <td className="px-2 py-2 text-right relative">
                        <button className="text-gray-400 hover:text-blue-600" title="Menu" type="button" onClick={() => setMenuOpen(menuOpen === milestone.id ? null : milestone.id)}><HiOutlineDotsVertical className="w-6 h-6" /></button>
                        {menuOpen === milestone.id && (
                            <div className="absolute right-0 mt-2 bg-white border rounded shadow z-10 min-w-[100px]">
                                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => onEdit(milestone)}>Edit</button>
                                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600" onClick={() => onDelete(milestone.id)}>Delete</button>
                            </div>
                        )}
                    </td>
                </>
            )}
            {children}
        </tr>
    );
} 