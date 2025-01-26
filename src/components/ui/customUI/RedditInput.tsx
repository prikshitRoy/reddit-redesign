"use client";

import { cn } from "@/lib/utils";
import { useMergeRefs } from "use-callback-ref";
import React, { useState, useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import { createCommunity } from "@/atoms/communitiesAtom";

interface InputProps {
  PlaceHolder?: string;
  setErrorByUser: boolean;
  setonBlurByUser: boolean;
  setOnFocusByUser: boolean;
  setInputValueByUser: string;
  setBorderColorByUser?: string;
}

const RedditInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input"> & InputProps
>(
  (
    {
      setBorderColorByUser,
      setInputValueByUser,
      setOnFocusByUser,
      setonBlurByUser,
      setErrorByUser,
      PlaceHolder,
      className,
      type,
      ...props
    },
    ref,
  ) => {
    // Focus cursor on Inputfield
    const inputRef = useRef<HTMLInputElement>(null);

    // Input Value
    const [inputValue, setInputValue] = useState<string>("");
    const Community = useRecoilValue(createCommunity);

    // Focus: Usign on Place Holder & Inputbox movement
    const [isFocused, setIsFocused] = useState<boolean>(false);

    // Border Color
    const [borderColor, setBorderColor] =
      useState<string>("border-transparent");

    // OnFocus
    const handleFocus = () => {
      inputRef.current?.focus();
      setIsFocused(true);
      setBorderColor("border-blue-500");
    };

    // OffFocus
    const handleBlur = () => {
      if (inputValue && setErrorByUser) {
        setBorderColor("border-red-500");
        setIsFocused(true);
      }
      if (inputValue && !setErrorByUser) {
        setBorderColor("border-transparent");
        setIsFocused(true);
      }

      if (inputValue === "" && !setErrorByUser) {
        setBorderColor("border-transparent");
        setIsFocused(false);
      }
    };

    // Reset state
    useEffect(() => {
      setInputValue("");
      setIsFocused(false);
      setBorderColor("border-transparent");
    }, []);

    useEffect(() => {
      // InputValue
      if (setInputValueByUser != "") {
        setInputValue(setInputValueByUser!);
      }
      if (setInputValueByUser === "") {
        setInputValue("");
      }

      // OnFocused
      if (setOnFocusByUser) {
        handleFocus();
      }
      if (setonBlurByUser) {
        handleBlur();
      }
    }, [
      setErrorByUser,
      setInputValueByUser,
      setOnFocusByUser,
      setonBlurByUser,
    ]);

    // Reset
    useEffect(() => {
      setInputValue("");
      setIsFocused(false);
      setBorderColor("border-transparent");
    }, []);

    return (
      <>
        <div
          className={`w-fll group relative h-[2.9rem] rounded-2xl border-2 bg-gray-200 hover:bg-gray-300 ${borderColor}`}
          onClick={handleFocus}
        >
          <span
            className={`pointer-events-none absolute left-3 border-transparent transition-all duration-300 ${
              isFocused || inputValue || Community.id
                ? "top-2 text-[12px]"
                : "top-1/2 -translate-y-1/2 text-xs"
            }`}
          >
            <span className="text-gray-600">
              {PlaceHolder ? `${PlaceHolder}` : "Enter Place Holder"}
            </span>
            <span className="ml-1 text-red-500">*</span>
          </span>
          <input
            ref={useMergeRefs([ref, inputRef])}
            {...props}
            type={type}
            className={cn(
              `absolute left-3 max-w-[calc(100%-1.5rem)] overflow-hidden bg-transparent text-[16px] leading-tight outline-none ${isFocused || inputValue ? "bottom-0 mb-[9px] h-[24px]" : "top-1/2 h-[1rem] -translate-y-1/2"}`,
              className,
            )}

            //value={inputValue} // Provides Input Value
            //onFocus={handleFocus} // FocusOn
            //onBlur={handleBlur} // onBlur
          />

          {setErrorByUser && (
            <div className="absolute right-0 flex h-full w-10 items-center justify-center rounded-br-[18px] rounded-tr-[18px] bg-gray-200 px-3 text-red-800 group-hover:bg-gray-300">
              O
            </div>
          )}
        </div>
      </>
    );
  },
);
RedditInput.displayName = "Input";

export default RedditInput;
