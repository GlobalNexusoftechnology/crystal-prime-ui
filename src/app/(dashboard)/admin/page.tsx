import { Loading } from "@/components";
import { Suspense } from "react";

export default function AdminDashboard() {
  return (
    <main>
      <Suspense fallback={<Loading />}>
        <h1>Admin Dashboard</h1>
      </Suspense>
    </main>
  );
}
