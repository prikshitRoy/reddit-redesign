"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";
import Image from "next/image";

interface SwitchProps {
  switchMouseDown?: boolean;
}

const RedditSwitch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & SwitchProps
>(({ switchMouseDown, className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-[1.50rem] w-[2.35rem] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className,
    )}
    {...props}
    ref={ref}
  >
    {/* //TODO: Complete the normal animation */}
    <SwitchPrimitives.Thumb
      className={cn(
        `pointer-events-none mb-[0.50px] block h-[1.30rem] rounded-full bg-background shadow-lg ring-0 transition-transform duration-500 ease-in-out data-[state=unchecked]:translate-x-0 ${switchMouseDown ? `w-[1.60rem] transition-all duration-300 data-[state=checked]:translate-x-[0.54rem]` : `w-[1.28rem] transition-all data-[state=checked]:translate-x-[0.87rem]`}`,
      )}
    >
      {props.checked && (
        <Image
          src="/checkMark.svg"
          alt="checkMark"
          height={12}
          width={12}
          className={`bg-transparent pt-1.5 transition-all duration-500 ease-in-out ${switchMouseDown ? "ml-2" : "ml-1.5"} `}
        />
      )}
    </SwitchPrimitives.Thumb>
  </SwitchPrimitives.Root>
));
RedditSwitch.displayName = SwitchPrimitives.Root.displayName;

export { RedditSwitch };
