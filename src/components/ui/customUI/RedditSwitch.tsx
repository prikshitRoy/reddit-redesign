"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";
import Image from "next/image";

const RedditSwitch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-[1.50rem] w-[2.35rem] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className,
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        `pointer-events-none block h-[1.30rem] w-[1.30rem] rounded-full bg-background shadow-lg ring-0 transition-transform duration-500 ease-in-out data-[state=checked]:translate-x-[0.87rem] data-[state=unchecked]:translate-x-0`,
      )}
    >
      {props.checked && (
        <Image
          src="/checkMark.svg"
          alt="checkMark"
          height={12}
          width={12}
          className="ml-[0.35rem] bg-transparent pt-[0.35rem] transition-opacity duration-500"
        />
      )}
    </SwitchPrimitives.Thumb>
  </SwitchPrimitives.Root>
));
RedditSwitch.displayName = SwitchPrimitives.Root.displayName;

export { RedditSwitch };
/* 
     
*/
