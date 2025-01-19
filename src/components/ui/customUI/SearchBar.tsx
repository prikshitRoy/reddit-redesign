"use client";

import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { useMergeRefs } from "use-callback-ref";
import React, { useState, useEffect, useRef } from "react";

interface SearchBarProps {
  className?: string;
  PlaceHolder?: string;
  setErrorByUser: boolean;
  setonBlurByUser: boolean;
  setOnFocusByUser: boolean;
  setInputValueByUser: string;
  setBorderColorByUser?: string;
}

const SearchBar = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input"> & SearchBarProps
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

    // OnBlur
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

      // OnBlur
      if (setonBlurByUser) {
        handleBlur();
      }
      // Click
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
          className={cn(
            `flex h-8 items-center rounded-full border-[2px] bg-gray-200 px-3 py-1 ${borderColor}`,
            className,
          )}
          onClick={handleFocus}
        >
          <div className="flex flex-row items-center py-1">
            <div className="h-fit w-6">
              <Search className="h-[19px] w-[19px]" strokeWidth={1.4} />
            </div>
            <input
              ref={useMergeRefs([ref, inputRef])}
              {...props}
              type={type}
              placeholder={
                PlaceHolder ? `${PlaceHolder}` : "Enter Place Holder"
              }
              className="w-full bg-transparent text-xs text-gray-900 placeholder-gray-600 outline-none placeholder:text-[15px] placeholder:font-[90]"
            />
          </div>
        </div>
      </>
    );
  },
);
SearchBar.displayName = "SearchBar";
export default SearchBar;
