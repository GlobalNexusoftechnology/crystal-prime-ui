/**
 * Document Management Page
 * 
 * This page renders the Document Management feature section,
 * including charts, tables, and related UI for managing documents.
 */

import React from 'react'
import { DocumentManagement } from '@/features'

export default function page() {
    return (
        <div>
            <h1 className="text-[1.2rem] 2xl:text-[1.2vw] font-medium whitespace-nowrap pb-8">
                DOCUMENT MANAGEMENT
            </h1>
            <DocumentManagement />
        </div>
    )
}
