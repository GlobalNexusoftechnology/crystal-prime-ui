import Link from "next/link";

import { Button, InputField } from "@/components";
import { AuthCard } from "../auth-card";

/**
 * Renders the SignUp form UI.
 *
 * Includes input fields for:
 * - Email
 * - Create Password
 * - Confirm Password
 *
 * Provides buttons for:
 * - Creating an account
 * - Cancelling the process
 *
 * Includes a navigation link to the "Forget Password" page.
 */

export function SignUp() {
  return (
    <div className="flex justify-center items-center ">
      <AuthCard title="SignUp" copyright="Copyright ©Satkar.com | 2025">
        <div className="flex flex-col gap-4 2xl:gap-[1vw]">
          <span className="text-[1rem] 2xl:text-[1vw] text-center ">
            Welcome! To create your account, please enter your details below.
          </span>
          <div>
            <InputField placeholder="Enter Email" label="Email" />
          </div>
          <div>
            <InputField placeholder="Create Password" label="Create Password" />
          </div>
          <div>
            <InputField
              placeholder="Confirm Password"
              label="Confirm Password"
            />
          </div>
          <Button title="Create Account" />

          <Button title="Cancel" variant="primary-outline" />

          <Link
            href="/forget-password"
            className="text-sm 2xl:text-[0.875vw] text-primary font-medium
 "
          >
            Already a member? Sign in to your account!
          </Link>
        </div>
      </AuthCard>
    </div>
  );
}
