"use client";

import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
import RedditInput from "@/components/ui/customUI/InputField";

const SignUp: React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [value, setValue] = useState(""); // InputValue
  const [isFocused, setIsFocused] = useState<boolean>(false); // Focus
  const [borderColor, setBorderColor] = useState<string>("border-transparent");

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

    console.log("New User Email:", newValue);
  };

  useEffect(() => {
    // Reset state to the defaultState on component mount
    setValue("");
    setIsFocused(false);
    setBorderColor("border-transparent");
  }, []);

  return (
    <>
      <div className="grid">
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
            <span className="text-gray-600">Email</span>
            <span className="ml-1 text-red-500">*</span>
          </span>
          <RedditInput
            className={`${isFocused ? "" : "pb-3"}`}
            id="userEmail"
            required
            type="email"
            value={value} // Provides Input Value
            onChange={handleChange} // Triggers when input changes
            onFocus={handleFocus} // FocusOn
            onBlur={handleBlur} // FocusOff
          />
        </div>

        <div className="mb-[108px] mt-5 flex space-x-1 text-xs tracking-tight">
          <div>Already a redditor?</div>
          <div
            className="text-blue-600 hover:cursor-pointer hover:text-blue-400"
            onClick={() => {
              setAuthModalState((prev) => ({
                ...prev,
                view: "login",
              }));
            }}
          >
            Log In
          </div>
        </div>
      </div>
    </>
  );
};
export default SignUp;
