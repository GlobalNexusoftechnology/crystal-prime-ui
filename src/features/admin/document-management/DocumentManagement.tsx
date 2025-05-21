import { DocumentListTable, DocumentManagementChart } from './component'
/**
 * DocumentManagement Component
 *
 * This component serves as the main container for the Document Management feature.
 * It combines the document usage chart and the document listing table into a single UI layout.
 *
 * Children:
 * - DocumentManagementChart: A visual bar chart representing storage usage.
 * - DocumentListTable: A tabular view of uploaded documents and their metadata.
 */

export function DocumentManagement() {
  return (
    <div className="flex flex-col gap-6 md:gap-8 2xl:gap-[2.5vw] border border-gray-300 rounded-lg 2xl:rounded-[0.5vw] bg-white p-4 2xl:p-[1vw]">
       <div className="flex flex-col gap-2 2xl:gap-[0.5vw]  2xl:px-[1vw]">
        <h1 className="text-xl 2xl:text-[1.25vw]  font-medium">
         DOCUMENTS MANAGEMENT
        </h1>
      </div>
      <DocumentManagementChart />
      <DocumentListTable />
    </div>
  )
}
