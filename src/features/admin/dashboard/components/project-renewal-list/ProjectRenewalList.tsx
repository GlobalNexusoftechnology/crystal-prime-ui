import React from "react";

interface Project {
  name: string;
  date: string;
  status: number;
}
interface Category {
  category: string;
  projects: Project[];
}
interface ProjectRenewalListProps {
  data: Category[];
}

export const ProjectRenewalList: React.FC<ProjectRenewalListProps> = ({ data }) => (
  <div className="bg-white rounded-xl p-4 shadow border border-gray-100">
    <div className="flex justify-between items-center mb-2">
      <span className="font-medium text-gray-700">Project Renewal</span>
      <span className="text-xs text-gray-400">June</span>
    </div>
    {data.map((cat) => (
      <div key={cat.category} className="mb-2">
        <div className="font-semibold text-gray-700 mb-1">{cat.category}</div>
        {cat.projects.map((proj) => (
          <div key={proj.name} className="flex items-center justify-between mb-1">
            <span className="text-gray-600 text-sm">{proj.name}</span>
            <span className="text-gray-400 text-xs">{proj.date}</span>
            <div className="flex-1 mx-2">
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div className="h-2 rounded-full bg-primary" style={{ width: `${proj.status}%` }}></div>
              </div>
            </div>
            <span className="text-xs text-primary font-semibold">{proj.status}%</span>
          </div>
        ))}
      </div>
    ))}
  </div>
);