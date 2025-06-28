import React from "react";
import { Dropdown, InputField, DatePicker } from "@/components";
import { HiCheck, HiXMark, HiOutlineCalendar } from "react-icons/hi2";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { getInitials, getRandomColor } from "@/utils";
import { useRouter } from "next/navigation";
import { IProjectTaskResponse } from "@/services";

export interface Task {
    id: string;
    title: string;
    description: string;
    assigned_to: string;
    status: string;
    due_date: string;
}

interface TaskProps {
    task: IProjectTaskResponse;
    projectId: string;
    editingTask: { milestoneId: string; taskId: string } | null;
    editTask: Task | null;
    onEdit: (milestoneId: string, task: Task) => void;
    onDelete: (milestoneId: string, taskId: string) => void;
    onSave: () => void;
    onCancel: () => void;
    onChange: (task: Task) => void;
    menuOpen: { milestoneId: string; taskId: string } | null;
    setMenuOpen: (menu: { milestoneId: string; taskId: string } | null) => void;
    userOptions: { label: string; value: string }[];
    statusOptions: { label: string; value: string }[];
    milestoneId: string;
}

export function Task({
    projectId,
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
    const router = useRouter()
    const handleRedirectView = (taskId: string) => {
        router.push(`/admin/project-management/${projectId}/${milestoneId}/${taskId}`)
    }
    return (
        <tr className="border-t border-gray-200">
            {editingTask && editingTask.milestoneId === milestoneId && editingTask.taskId === task.id && editTask ? (
                <>
                    <td className="pl-8 py-2 font-medium">
                        <InputField value={editTask.title} onChange={e => onChange({ ...editTask, title: e.target.value })} className="w-32" />
                    </td>
                    <td className="py-2">
                        <InputField value={editTask.description} onChange={e => onChange({ ...editTask, description: e.target.value })} className="w-40" />
                    </td>
                    <td className="py-2">
                        <Dropdown options={userOptions} value={editTask.assigned_to} onChange={val => onChange({ ...editTask, assigned_to: val })} dropdownWidth="w-32" />
                    </td>
                    <td className="py-2">
                        <Dropdown options={statusOptions} value={editTask.status} onChange={val => onChange({ ...editTask, status: val })} dropdownWidth="w-28" />
                    </td>
                    <td className="py-2">
                        <DatePicker value={editTask.due_date} onChange={val => onChange({ ...editTask, due_date: val })} />
                    </td>
                    <td className="px-2 py-4 text-right flex gap-2">
                        <button onClick={onSave} className="text-green-600" title="Save"><HiCheck className="w-6 h-6" /></button>
                        <button onClick={onCancel} className="text-red-600" title="Cancel"><HiXMark className="w-6 h-6" /></button>
                    </td>
                </>
            ) : (
                <>
                    <td className="pl-8 py-2 text-sm font-medium">{task.title}</td>
                    <td className="py-2 text-sm">{task.description}</td>
                    <td className="py-2 text-sm">
                        <div className="flex items-center gap-2">
                            <p className="flex items-center justify-center p-2 w-10 h-10 text-white text-[0.9rem] rounded-full" style={{ backgroundColor: getRandomColor(task.assigned_to || '') }}>{getInitials(task.assigned_to || "")}</p>
                            <p className="px-3 py-1 text-[0.9rem]">{task.assigned_to}</p>
                        </div>
                    </td>
                    <td className="py-2"><span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold">{task.status}</span></td>
                    <td className="py-2"><span className="flex items-center gap-2"><HiOutlineCalendar className="w-6 h-6 text-gray-400" /><span className="text-sm">{task.due_date}</span></span></td>
                    <td className="py-2 text-right relative">
                        <button className="text-gray-400 hover:text-blue-600" title="Menu" type="button" onClick={() => setMenuOpen(menuOpen && menuOpen.taskId === task.id ? null : { milestoneId, taskId: task.id })}><HiOutlineDotsVertical className="w-6 h-6" /></button>
                        {menuOpen && menuOpen.taskId === task.id && (
                            <div className="absolute right-0 mt-2 bg-white border rounded shadow z-10 min-w-[100px]">
                                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => handleRedirectView(task.id)}>View</button>
                                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => onEdit(milestoneId, {
                                    id: task.id,
                                    title: task.title,
                                    description: task.description || "",
                                    assigned_to: task.assigned_to || "",
                                    status: task.status || "",
                                    due_date: task.due_date || ""
                                })}>Edit</button>
                                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600" onClick={() => onDelete(milestoneId, task.id)}>Delete</button>
                            </div>
                        )}
                    </td>
                </>
            )}
        </tr>
    );
} 