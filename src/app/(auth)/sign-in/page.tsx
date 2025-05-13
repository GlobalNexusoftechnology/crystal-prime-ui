import { Loading } from "@/components";
import { Suspense } from "react";
// import { SignIn } from "@/components";

export default function SignInPage() {
  return (
    <main>
      <Suspense fallback={<Loading />}>
          {/* <SignIn /> */}
       </Suspense>
    </main>
  );
}
