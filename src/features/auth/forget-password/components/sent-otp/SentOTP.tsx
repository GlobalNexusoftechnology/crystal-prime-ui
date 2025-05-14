import Link from "next/link";

import { Button } from "@/components";
import { AuthCard, OtpInput } from "@/features";

/**
 * SentOTP Component
 *
 * Second step in the "Forget Password" flow.
 * Displays OTP input fields using the `OtpInput` component.
 * Provides options to resend the OTP or navigate to account creation.
 * Includes buttons to proceed to password reset or cancel the process.
 *
 * Props:
 * - onNext: Callback function to move to the next step (Reset Password).
 */

type TSentOTPProps = {
  onNext: () => void;
};

export function SentOTP({ onNext }: TSentOTPProps) {
  return (
    <div className="flex justify-center items-center ">
      <AuthCard
        title="Forget Password"
        copyright="Copyright ©Satkar.com | 2025"
      >
        <div className="flex flex-col gap-4 2xl:gap-[1vw]">
          <OtpInput />

          <div className="flex flex-col md:flex-row gap-2 2xl:gap-[0.5vw]">
            <span className="text-sm 2xl:text-[0.875vw] text-black">
              Haven&apos;t received the OTP?
            </span>
            <Link
              href="/create-account"
              className="text-sm 2xl:text-[0.875vw] text-primary underline underline-offset-4"
            >
              Click here to resend.
            </Link>
          </div>

          <div className="flex gap-2 2xl:gap-[0.5vw]">
            <span className="text-sm 2xl:text-[0.875vw] text-primary">
              Now here
            </span>
            <Link
              href="/create-account"
              className="text-sm 2xl:text-[0.875vw] text-primary underline underline-offset-4"
            >
              Create your account now!
            </Link>
          </div>

          <Button title="Reset Password" onClick={onNext} />
          <Button title="Cancel" variant="primary-outline" />
        </div>
      </AuthCard>
    </div>
  );
}
