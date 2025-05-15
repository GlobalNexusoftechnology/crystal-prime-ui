import { Suspense } from "react";

import { Loading } from "@/components";
import { SignUp } from "@/features";

/**
 * Page component for user Sign Up.
 * Uses React Suspense to lazy-load the SignUp component
 * and shows a fallback loader while loading.
 */

export default function SignUpPage() {
  return (
    <main>
      {/* Suspense allows loading fallback while SignUp component is being rendered */}
      <Suspense fallback={<Loading />}>
        <SignUp />
      </Suspense>
    </main>
  );
}
