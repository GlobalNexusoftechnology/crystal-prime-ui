import { Suspense } from "react";

import { Loading } from "@/components";
import { ForgetPassword } from "@/features";

/**
 * Page component for the "Forget Password" flow.
 * Wraps the ForgetPassword feature in React Suspense
 * to display a fallback loading spinner during lazy loading.
 */

export default function ForgetPasswordPage() {
  return (
    <main>
      {/* Show a loading spinner while ForgetPassword is loading */}
      <Suspense fallback={<Loading />}>
        <ForgetPassword />
      </Suspense>
    </main>
  );
}
