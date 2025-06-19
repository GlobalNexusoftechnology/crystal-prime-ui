import React from "react";

interface Task {
  id: number;
  name: string;
  description: string;
  assignedTo: string;
  status: string;
  dueDate: string;
}

interface Milestone {
  id: number;
  name: string;
  assignedTo: string;
  status: string;
  estimatedStart: string;
  estimatedEnd: string;
  tasks: Task[];
}

interface ProjectInfo {
  name: string;
  type: string;
  contactPerson: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface ClientInfo {
  clientName: string;
  companyName: string;
  contactPerson: string;
  phone: string;
  email: string;
}

interface Estimates {
  estimatedStart: string;
  actualStart: string;
  estimatedEnd: string;
  actualEnd: string;
  estimatedCost: string;
  actualCost: string;
  labourCost: string;
  overheadCost: string;
  budget: string;
}

interface DocumentInfo {
  name: string;
  uploadedBy: string;
  uploadedAt: string;
}

interface Step4PreviewProps {
  projectInfo: ProjectInfo;
  clientInfo: ClientInfo;
  estimates: Estimates;
  documents: DocumentInfo[];
  milestones: Milestone[];
  onSubmit: () => void;
}

export function Step4Preview({ projectInfo, clientInfo, estimates, documents, milestones, onSubmit }: Step4PreviewProps) {
  return (
    <div className="flex flex-col gap-8 2xl:gap-[2vw]">
 
      {/* Info Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Project Info */}
        <div className="bg-white rounded-lg p-6 border flex flex-col gap-4">
          <div className="font-semibold text-lg mb-2">Project Info</div>
          <div className="flex flex-col gap-1">
            <div><span className="font-medium">Project Name:</span> {projectInfo.name}</div>
            <div><span className="font-medium">Type Of Project:</span> {projectInfo.type}</div>
            <div><span className="font-medium">Contact person:</span> {projectInfo.contactPerson}</div>
            <div><span className="font-medium">Project Description:</span> {projectInfo.description}</div>
            <div><span className="font-medium">Created At:</span> {projectInfo.createdAt}</div>
            <div><span className="font-medium">Updated At:</span> {projectInfo.updatedAt}</div>
          </div>
        </div>
        {/* Client Info */}
        <div className="bg-white rounded-lg p-6 border flex flex-col gap-4">
          <div className="font-semibold text-lg mb-2">Client Info</div>
          <div className="flex flex-col gap-1">
            <div><span className="font-medium">Client Name:</span> {clientInfo.clientName}</div>
            <div><span className="font-medium">Company Name:</span> {clientInfo.companyName}</div>
            <div><span className="font-medium">Contact person:</span> {clientInfo.contactPerson}</div>
            <div><span className="font-medium">Phone:</span> {clientInfo.phone}</div>
            <div><span className="font-medium">Email:</span> {clientInfo.email}</div>
          </div>
        </div>
        {/* Project Estimates */}
        <div className="bg-white rounded-lg p-6 border flex flex-col gap-4">
          <div className="font-semibold text-lg mb-2">Project Estimates</div>
          <div className="flex flex-col gap-1">
            <div><span className="font-medium">Estimated start Date:</span> {estimates.estimatedStart}</div>
            <div><span className="font-medium">Actual start Date:</span> {estimates.actualStart}</div>
            <div><span className="font-medium">Estimated End Date:</span> {estimates.estimatedEnd}</div>
            <div><span className="font-medium">Actual End Date:</span> {estimates.actualEnd}</div>
            <div><span className="font-medium">Estimated Cost:</span> {estimates.estimatedCost}</div>
            <div><span className="font-medium">Actual Cost:</span> {estimates.actualCost}</div>
            <div><span className="font-medium">Cost Of Labour:</span> {estimates.labourCost}</div>
            <div><span className="font-medium">Over Head Cost:</span> {estimates.overheadCost}</div>
            <div><span className="font-medium">Budget:</span> {estimates.budget}</div>
          </div>
        </div>
        {/* Documents */}
        <div className="bg-white rounded-lg p-6 border flex flex-col gap-4">
          <div className="font-semibold text-lg mb-2">Documents</div>
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-gray-500">
                <th className="text-left px-2 py-2">Document Name</th>
                <th className="text-left px-2 py-2">Uploaded By</th>
                <th className="text-left px-2 py-2">Uploaded At</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => (
                <tr key={doc.name}>
                  <td className="px-2 py-2">{doc.name}</td>
                  <td className="px-2 py-2">{doc.uploadedBy}</td>
                  <td className="px-2 py-2">{doc.uploadedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Milestone Table */}
      <div className="bg-white rounded-lg p-6 border flex flex-col gap-4">
        <div className="font-semibold text-lg mb-2">Milestone</div>
        <table className="min-w-full border-separate border-spacing-y-2">
          <thead>
            <tr className="text-gray-500 text-sm">
              <th className="text-left px-2 py-2">Milestone Name</th>
              <th className="text-left px-2 py-2">Assigned To</th>
              <th className="text-left px-2 py-2">Status</th>
              <th className="text-left px-2 py-2">Estimated Start Date</th>
              <th className="text-left px-2 py-2">Estimated End Date</th>
            </tr>
          </thead>
          <tbody>
            {milestones.map((milestone) => (
              <React.Fragment key={milestone.id}>
                <tr>
                  <td className="px-2 py-2 font-medium">{milestone.name}</td>
                  <td className="px-2 py-2">{milestone.assignedTo}</td>
                  <td className="px-2 py-2">{milestone.status}</td>
                  <td className="px-2 py-2">{milestone.estimatedStart}</td>
                  <td className="px-2 py-2">{milestone.estimatedEnd}</td>
                </tr>
                {milestone.tasks.length > 0 && (
                  <tr className="bg-gray-50">
                    <td colSpan={5} className="p-0">
                      <table className="w-full">
                        <tbody>
                          {milestone.tasks.map((task) => (
                            <tr key={task.id} className="border-t border-gray-200">
                              <td className="pl-8 py-2 font-medium">{task.name}</td>
                              <td className="py-2">{task.description}</td>
                              <td className="py-2">{task.assignedTo}</td>
                              <td className="py-2">{task.status}</td>
                              <td className="py-2">{task.dueDate}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      {/* Submit Button */}
      <div className="flex justify-center mt-6">
        <button
          className="bg-[#4E5EFF] text-white px-8 py-2 rounded-md 2xl:rounded-[0.5vw] font-medium hover:bg-[#3b47cc] transition"
          onClick={onSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
} 