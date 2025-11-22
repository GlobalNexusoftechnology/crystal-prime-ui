"use client";

import { PurchaseOrderForm } from "@/features";
import { useSearchParamsSafe } from "@/utils/hooks";
import { Suspense } from "react";

function AddPurchaseOrderPageContent() {
  const searchParams = useSearchParamsSafe();
  const salesOrderId = searchParams.get("salesOrderId");

  return <PurchaseOrderForm salesOrderId={salesOrderId || undefined} />;
}

export default function AddPurchaseOrderPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AddPurchaseOrderPageContent />
    </Suspense>
  );
}
