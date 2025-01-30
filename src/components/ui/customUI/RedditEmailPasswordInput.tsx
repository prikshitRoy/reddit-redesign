"use client";

import { cn } from "@/lib/utils";
import { useMergeRefs } from "use-callback-ref";
import React, { useState, useEffect, useRef } from "react";

interface InputProps {
  PlaceHolder?: string;
  setErrorByUser?: boolean;
}

const RedditEmailPasswordInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input"> & InputProps
>(({ setErrorByUser, PlaceHolder, className, type, ...props }, ref) => {
  // Focus cursor on Inputfield
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus: Usign on Place Holder & Inputbox movement
  const [isFocused, setIsFocused] = useState<boolean>(false);

  // Border Color
  const [borderColor, setBorderColor] = useState<string>("border-transparent");

  //! OnFocus
  const handleFocus = (e: React.PointerEvent<HTMLDivElement>) => {
    if (inputRef.current?.contains(e.target as Node)) {
      setIsFocused(true);
      setBorderColor("border-blue-500");
      return;
    }
    e.preventDefault();
    inputRef.current?.focus();
    setIsFocused(true);
    setBorderColor("border-blue-500");
  };

  //! OnBlur
  const handleBlur = () => {
    if (inputRef.current?.value && setErrorByUser) {
      setBorderColor("border-red-500");
      setIsFocused(true);
    }
    if (inputRef.current?.value && !setErrorByUser) {
      setBorderColor("border-transparent");
      setIsFocused(true);
    }

    if (inputRef.current?.value === "" && !setErrorByUser) {
      setBorderColor("border-transparent");
      setIsFocused(false);
    }
  };

  //! Error Handle
  useEffect(() => {
    if (setErrorByUser) {
      setBorderColor("border-red-500");
    }
    if (!setErrorByUser) {
      setBorderColor(
        document.activeElement === inputRef.current
          ? "border-blue-500"
          : "border-transparent",
      );
    }
  }, [setErrorByUser]);

  //! Reset state
  useEffect(() => {
    setIsFocused(false);
    setBorderColor("border-transparent");
  }, []);

  return (
    <>
      <div
        className={cn(
          `group relative h-[2.9rem] rounded-2xl border-2 bg-gray-200 hover:bg-gray-300 ${borderColor}`,
          className,
        )}
        onPointerDown={handleFocus}
        onBlur={handleBlur}
      >
        <span
          className={`pointer-events-none absolute left-3 border-transparent transition-all duration-300 ${
            isFocused || inputRef.current?.value
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
          className={`autoc absolute left-3 w-full max-w-[calc(100%-1.5rem)] overflow-hidden bg-transparent text-[16px] leading-tight outline-none ${isFocused || inputRef.current?.value ? "bottom-0 mb-[9px] h-[19px]" : "top-1/2 h-[1rem] -translate-y-1/2"}`}
          //! autoComplete will set different color no need to change
        />

        {/* //TODO: Green Check Mark */}
        {setErrorByUser && (
          <div className="absolute right-0 flex h-full w-10 items-center justify-center rounded-br-[18px] rounded-tr-[18px] bg-gray-200 px-3 text-red-800 group-hover:bg-gray-300">
            O
          </div>
        )}
      </div>
    </>
  );
});
RedditEmailPasswordInput.displayName = "Input";

export default RedditEmailPasswordInput;
