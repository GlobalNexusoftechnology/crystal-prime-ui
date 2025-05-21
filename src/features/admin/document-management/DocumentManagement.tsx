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

import React from 'react'
import { DocumentListTable, DocumentManagementChart } from './component'

export function DocumentManagement() {
  return (
    <div className="justify-start items-start bg-gray-100">
      <DocumentManagementChart />
      <DocumentListTable />
    </div>
  )
}
