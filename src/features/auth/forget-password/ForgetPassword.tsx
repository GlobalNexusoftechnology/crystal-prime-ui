"use client"

import { useState } from "react";
import { EmailValidation, ResetPassword, SentOTP } from "./components";
/**
 * Multi-step "Forget Password" flow component.
 *
 * Renders the following steps in sequence:
 * 1. EmailValidation – user enters email, proceeds by clicking "Send OTP"
 * 2. SentOTP – user enters OTP, proceeds by clicking "Reset Password"
 * 3. ResetPassword – user enters and confirms new password
 *
 * Controlled by a `step` state variable to manage transitions between steps.
 */
export function ForgetPassword() {
  const [step, setStep] = useState("email"); 
  const [email, setEmail] = useState("");

  return (
    <div>
      {step === "email" && <EmailValidation onNext={(enteredEmail) => { setEmail(enteredEmail); setStep("otp"); }} />}
      {step === "otp" && <SentOTP email={email} onNext={() => setStep("reset")} />}
      {step === "reset" && <ResetPassword email={email} />}
    </div>
  );
}
