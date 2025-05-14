import Link from "next/link";

import { InputField, Button } from "@/components";
import { AuthCard } from "@/features";
/**
 * EmailValidation Component
 *
 * Step 1 of the "Forget Password" flow.
 * Renders an input field for the user to enter their email.
 * Includes a "Send OTP" button that triggers the `onNext` callback to proceed to the next step.
 *
 * Props:
 * - onNext: Function called when user clicks "Send OTP" button.
 */

type TEmailValidationProps = {
  onNext: () => void;
};

export function EmailValidation({ onNext }: TEmailValidationProps) {
  return (
    <div className="flex justify-center items-center ">
      <AuthCard
        title="Forget Password"
        copyright="Copyright ©Satkar.com | 2025"
      >
        <div className="flex flex-col gap-4 2xl:gap-[1vw]">
          <span className="text-[1rem] 2xl:text-[1vw] text-center ">
            Please provide your credentials to access your account.
          </span>
          <div>
            <InputField placeholder="Enter Email" label="Email" />
          </div>

          <Button title="Send OTP" onClick={onNext} />
          <Button title="Cancel" variant="primary-outline" />

          <div className="flex gap-2 2xl:gap-[0.5vw]">
            <span className="text-sm 2xl:text-[0.875vw] text-primary font-medium">
              Now here
            </span>
            <Link
              href="/create-account"
              className="text-sm 2xl:text-[0.875vw] text-primary underline underline-offset-4 font-medium"
            >
              Create your account now
            </Link>
          </div>
        </div>
      </AuthCard>
    </div>
  );
}
