"use client";

import { useEffect, useState } from "react";
import RedditInput from "@/components/ui/customUI/InputField";

const VerifyEmail: React.FC = () => {
  const [value, setValue] = useState<string>(""); // InputValue
  const [isFocused, setIsFocused] = useState<boolean>(false); // Focus
  const [borderColor, setBorderColor] = useState<string>("border-transparent"); // border color state

  // FocusOn
  const handleFocus = () => {
    setIsFocused(true);
    setBorderColor("border-blue-500");
  };

  // FocusOff
  const handleBlur = () => {
    if (!value) {
      setIsFocused(false);
    }
    setBorderColor("border-transparent");
  };

  // Triggers Input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value; // Get the current value from input
    setValue(newValue); // Update state

    console.log("Reset Password:", newValue);
  };

  useEffect(() => {
    // Reset state to the defaultState on component mount
    setValue("");
    setIsFocused(false);
    setBorderColor("border-transparent");
  }, []);

  return (
    <>
      {/* TODO: Pass Email ID from SignUp to VerifyEmail */}
      {/* TODO: Add skip button */}
      <span className="w-72 pb-4 pt-1 text-xs tracking-tight">
        Enter the 6-digit code we sent to useremail00@gmail.com
      </span>
      <div className="mb-[290px] grid">
        <div
          className={`relative h-[2.9rem] w-72 rounded-2xl border-2 bg-gray-200 transition-all duration-300 hover:bg-gray-300 ${borderColor}`}
        >
          <span
            className={`pointer-events-none absolute border-transparent transition-all duration-300 ${
              isFocused || value
                ? "left-3 top-2 text-[12px]"
                : "left-3 top-1/2 -translate-y-1/2 text-xs"
            }`}
          >
            <span className="text-gray-600">Verification code</span>
          </span>
          <RedditInput
            className={`${isFocused ? "" : "pb-3"}`}
            id="resetPassword"
            required
            type="email"
            value={value} // Provides Input Value
            onChange={handleChange} // Triggers when input changes
            onFocus={handleFocus} // FocusOn
            onBlur={handleBlur} // FocusOff
          />
        </div>
      </div>
      <div className="mt-[10px] flex justify-center space-x-1 text-xs tracking-tight">
        <div>Didn't get an email?</div>{" "}
        {/* TODO: Resend Email. Set limit to 3 times */}
        {/* TODO: Didn't get an email? Resend in 0:30 */}
        <div
          className="font-semibold text-gray-950 underline hover:cursor-pointer"
          onClick={() => {}}
        >
          Resend
        </div>
      </div>
    </>
  );
};
export default VerifyEmail;
