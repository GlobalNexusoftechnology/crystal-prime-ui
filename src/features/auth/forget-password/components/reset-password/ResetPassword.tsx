import { AuthCard } from "@/features";
import { Button, InputField } from "@/components";
/**
 * ResetPassword Component
 *
 * Final step in the "Forget Password" flow.
 * Provides input fields for entering and confirming the new password.
 * Includes buttons to save the password or cancel the process.
 */

export function ResetPassword() {
  return (
    <div className="flex justify-center items-center ">
      <AuthCard
        title="Forget Password"
        copyright="Copyright ©Satkar.com | 2025"
      >
        <div className="flex flex-col gap-4 2xl:gap-[1vw]">
          <div>
            <InputField placeholder="Enter Password" label="Enter Password" />
          </div>
           <div>
            <InputField placeholder="Confirm Password" label="Confirm Password" />
          </div>

          <Button title="Save Password" />
          <Button title="Cancel" variant="primary-outline" />

        </div>
      </AuthCard>
    </div>
  );
}
