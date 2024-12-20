import * as React from "react";
import { cn } from "@/lib/utils";

const RedditInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "h-full w-full cursor-pointer rounded-2xl border-transparent bg-transparent px-[15px] pt-3 text-[16px] outline-none hover:bg-transparent",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
RedditInput.displayName = "Input";

export default RedditInput;
