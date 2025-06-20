import React from "react";
import { Dropdown, InputField, DatePicker } from "@/components";
import { HiCheck, HiXMark, HiOutlineCalendar } from "react-icons/hi2";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { getInitials, getRandomColor } from "@/utils";

interface TaskType {
    id: number;
    name: string;
    description: string;
    assignedTo: string;
    status: string;
    dueDate: string;
}

interface TaskProps {
    task: TaskType;
    editingTask: { milestoneId: number; taskId: number } | null;
    editTask: TaskType | null;
    onEdit: (milestoneId: number, task: TaskType) => void;
    onDelete: (milestoneId: number, taskId: number) => void;
    onSave: () => void;
    onCancel: () => void;
    onChange: (task: TaskType) => void;
    menuOpen: { milestoneId: number; taskId: number } | null;
    setMenuOpen: (menu: { milestoneId: number; taskId: number } | null) => void;
    userOptions: { label: string; value: string }[];
    statusOptions: { label: string; value: string }[];
    milestoneId: number;
}

export function Task({
    task,
    editingTask,
    editTask,
    onEdit,
    onDelete,
    onSave,
    onCancel,
    onChange,
    menuOpen,
    setMenuOpen,
    userOptions,
    statusOptions,
    milestoneId,
}: TaskProps) {
    return (
        <tr className="border-t border-gray-200">
            {editingTask && editingTask.milestoneId === milestoneId && editingTask.taskId === task.id && editTask ? (
                <>
                    <td className="pl-8 py-2 font-medium">
                        <InputField value={editTask.name} onChange={e => onChange({ ...editTask, name: e.target.value })} className="w-32" />
                    </td>
                    <td className="py-2">
                        <InputField value={editTask.description} onChange={e => onChange({ ...editTask, description: e.target.value })} className="w-40" />
                    </td>
                    <td className="py-2">
                        <Dropdown options={userOptions} value={editTask.assignedTo} onChange={val => onChange({ ...editTask, assignedTo: val })} dropdownWidth="w-32" />
                    </td>
                    <td className="py-2">
                        <Dropdown options={statusOptions} value={editTask.status} onChange={val => onChange({ ...editTask, status: val })} dropdownWidth="w-28" />
                    </td>
                    <td className="py-2">
                        <DatePicker value={editTask.dueDate} onChange={val => onChange({ ...editTask, dueDate: val })} />
                    </td>
                    <td className="px-2 py-4 text-right flex gap-2">
                        <button onClick={onSave} className="text-green-600" title="Save"><HiCheck className="w-6 h-6" /></button>
                        <button onClick={onCancel} className="text-red-600" title="Cancel"><HiXMark className="w-6 h-6" /></button>
                    </td>
                </>
            ) : (
                <>
                    <td className="pl-8 py-2 text-sm font-medium">{task.name}</td>
                    <td className="py-2 text-sm">{task.description}</td>
                    <td className="py-2 text-sm">
                        <div className="flex items-center gap-2">
                            <p className="flex items-center justify-center p-2 w-10 h-10 text-white text-[0.9rem] rounded-full" style={{ backgroundColor: getRandomColor(task.assignedTo) }}>{getInitials(task.assignedTo)}</p>
                            <p className="px-3 py-1 text-[0.9rem]">{task.assignedTo}</p>
                        </div>
                    </td>
                    <td className="py-2"><span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold">{task.status}</span></td>
                    <td className="py-2"><span className="flex items-center gap-2"><HiOutlineCalendar className="w-6 h-6 text-gray-400" /><span className="text-sm">{task.dueDate}</span></span></td>
                    <td className="py-2 text-right relative">
                        <button className="text-gray-400 hover:text-blue-600" title="Menu" type="button" onClick={() => setMenuOpen(menuOpen && menuOpen.taskId === task.id ? null : { milestoneId, taskId: task.id })}><HiOutlineDotsVertical className="w-6 h-6" /></button>
                        {menuOpen && menuOpen.taskId === task.id && (
                            <div className="absolute right-0 mt-2 bg-white border rounded shadow z-10 min-w-[100px]">
                                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => onEdit(milestoneId, task)}>Edit</button>
                                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600" onClick={() => onDelete(milestoneId, task.id)}>Delete</button>
                            </div>
                        )}
                    </td>
                </>
            )}
        </tr>
    );
} 