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
    <div className="flex flex-col gap-6 md:gap-8  border border-gray-300 rounded-lg  bg-white p-4 ">
       <div className="flex flex-col gap-2   ">
        <h1 className="text-xl   font-medium">
         DOCUMENTS MANAGEMENT
        </h1>
      </div>
      <DocumentManagementChart />
      <DocumentListTable />
    </div>
  )
}
