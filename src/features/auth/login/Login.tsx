import Link from "next/link";

import { Button, InputField } from "@/components";
import { AuthCard } from "../auth-card";

/**
 * Login Component
 * 
 * Renders the user login form inside the AuthCard layout.
 * Includes input fields for email and password, a login button,
 * and navigation links for "Forget Password?" and "Create Account".
 */


export function Login() {
  return (
    <div className="flex justify-center items-center ">
      <AuthCard title="Login" copyright="Copyright ©Satkar.com | 2025">
        <div className="flex flex-col gap-4 2xl:gap-[1vw]">
          <span className="text-[1rem] 2xl:text-[1vw] text-center ">
            Please provide your credentials to access your account.
          </span>
          <div>
            <InputField placeholder="Enter Email" label="Email" />
          </div>
          <div>
            <InputField placeholder="Enter Password" label="Password" />
          </div>
          <Button title="Login" />

          <Link
            href="/forget-password"
            className="text-sm 2xl:text-[0.875vw] text-black  underline underline-offset-4
 "
          >
            Forget Password?
          </Link>
          <div className="flex gap-2 2xl:gap-[0.5vw]">
            <span className="text-sm 2xl:text-[0.875vw]  text-primary">
              Now here
            </span>
            <Link
              href="/create-account"
              className="text-sm 2xl:text-[0.875vw] text-primary  underline underline-offset-4"
            >
              Create your account now
            </Link>
          </div>
        </div>
      </AuthCard>
    </div>
  );
}
