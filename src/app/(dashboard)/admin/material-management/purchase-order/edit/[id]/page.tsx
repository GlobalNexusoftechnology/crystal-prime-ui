import { PurchaseOrderForm } from "@/features";

interface EditPurchaseOrderPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditPurchaseOrderPage({ params }: EditPurchaseOrderPageProps) {
  const { id } = await params;
  return <PurchaseOrderForm isEdit purchaseOrderId={id} />;
}
