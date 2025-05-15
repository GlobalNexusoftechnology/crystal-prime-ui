import { Suspense } from "react";
import { Loading } from "@/components";
import { Login } from "@/features";

/**
 * LoginPage is the main entry point for the login route.
 * It uses React's Suspense to lazily render the Login component and 
 * shows a fallback loader while the content is loading.
 *
 * Components:
 * - Loading: A loading spinner or placeholder shown during lazy load.
 * - Login: The actual login form UI component.
 */
export default function LoginPage() {
  return (
    <main>
      {/* Suspense handles lazy loading with a fallback loading indicator */}
      <Suspense fallback={<Loading />}>
        <Login />
      </Suspense>
    </main>
  );
}
