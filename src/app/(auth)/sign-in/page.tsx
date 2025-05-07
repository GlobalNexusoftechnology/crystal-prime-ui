import { Suspense } from "react";
// import { SignIn } from "@/components";

export default function SignInPage() {
  return (
    <main>
       <Suspense fallback={<div>Loading...</div>}>
          {/* <SignIn /> */}
       </Suspense>
    </main>
  );
}
