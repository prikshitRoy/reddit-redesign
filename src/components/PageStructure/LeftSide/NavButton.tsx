"use client";

import { CommunitySnippets } from "@/atoms/communitiesAtom";
import React, { forwardRef, ReactNode } from "react";
import { useMergeRefs } from "use-callback-ref";
import { cn } from "@/lib/utils";
import { ChevronUp, LucidePlus, Star } from "lucide-react";

/* export type logo =  */

//TODO: Complete Topics list
export type ButtonName =
  | "ENTER BUTTON NAME"
  | "Home"
  | "Popular"
  | "Explore"
  | "All"
  | "MODERATION"
  | "Mod Queue"
  | "Mod Mail"
  | "r/Mod"
  | "CUSTOM FEEDS"
  | "Create a custom feed"
  | "RECENT"
  | "COMMUNITIES"
  | "Create a community"
  | "RESOURCES"
  | "About Reddit"
  | "Advertise"
  | "Help"
  | "Blog"
  | "Careers"
  | "Press"
  | "Communities"
  | "Best of Reddit"
  | "Reddit Rules"
  | "Privacy Policy"
  | "User Agreement"
  | "TOPICS"
  | "Internet Culture (Viral)"
  | "Games"
  | "Q&As"
  | "Technology"
  | "Pop Culture"
  | "Movies & TV"
  | "Anime"
  | "Art"
  | "Business"
  | "see more";
export type ButtonType = "normal" | "dropdown" | "community";
export type CommunityName = CommunitySnippets["communityId"];

export interface NavButtonProps {
  name: ButtonName;
  src: string;
}

//! NavButton
const NavButton = forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & NavButtonProps
>(({ src, name, children, ...props }, ref) => {
  const inputRef = React.useRef<HTMLDivElement>(null);
  return (
    <div
      className={`navButton`}
      ref={useMergeRefs([ref, inputRef])}
      {...props}
      id={name}
    >
      <img src={src} className="h-[0.99rem] w-[0.99rem]" />
      <div className="w-fit">{name}</div>
    </div>
  );
});

const createOption = <T extends ButtonName[]>(...items: T) =>
  Object.fromEntries(items.map((item) => [item, item])) as {
    [K in T[number]]: K;
  };

export const DropDownButtonOption = createOption(
  "MODERATION",
  "CUSTOM FEEDS",
  "RECENT",
  "COMMUNITIES",
  "RESOURCES",
  "TOPICS",
);

// Extract type correctly for Intellisense support
type DropDownButtonOptionType =
  (typeof DropDownButtonOption)[keyof typeof DropDownButtonOption];
export interface DropdownMenuProps {
  name: DropDownButtonOptionType;
  children: ReactNode;
}

//! Nav Drop Down Button
const DropdownButton = forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & DropdownMenuProps
>(({ name, onClick, children, ...props }, ref) => {
  const inputRef = React.useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = React.useState(true);
  return (
    <>
      <Line />
      <div
        className={`DropdownButton`}
        ref={useMergeRefs([ref, inputRef])}
        onClick={() => setIsOpen((prev) => !prev)}
        {...props}
      >
        <div className="w-fit">{name}</div>
        <ChevronUp className={`dropDownStyle ${!isOpen && "-rotate-180"}`} />
      </div>
      <div
        className={`overflow-hidden transition-all ease-in-out ${
          isOpen
            ? "h-fit max-h-[1000px] opacity-100"
            : "pointer-events-none max-h-0 opacity-0"
        } [transition-duration:300ms,300ms] [transition-property:max-height,opacity]`}
      >
        {children}
      </div>
    </>
  );
});

const HandleStar = (communityId: string) => {
  console.log(`Clicked on Star in community: ${communityId}`);
};
const HandleNavCommunityBtn = (communityId: string) => {
  console.log(`Clicked on Nav Community Button in community: ${communityId}`);
};

export interface NavcommunityBtnProps {
  name: CommunitySnippets["communityId"];
  src: string;
}

//! Nav Community Button
const NavcommunityBtn = forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & NavcommunityBtnProps
>(({ src, name, children, ...props }, ref) => {
  const inputRef = React.useRef<HTMLDivElement>(null);
  return (
    <div
      className={`NavcommunityBtnCSS`}
      ref={useMergeRefs([ref, inputRef])}
      {...props}
      id={name}
      onClick={() => {
        HandleNavCommunityBtn(name);
      }}
    >
      <img
        src={`${src ? src : "/reddit-community-logo.svg"}`}
        className="h-[1.6rem] w-[1.6rem]"
      />
      <div className="mx-2 w-[5.8rem] overflow-hidden overflow-ellipsis text-nowrap">
        {"r/" + name}
      </div>
      <div
        className={`starButton`}
        onClick={(e) => {
          e.stopPropagation(); // Prevent parent div click event
          HandleStar(name);
        }}
      >
        <Star className="stroke-1 p-[0.15rem]" />
      </div>
    </div>
  );
});

export function Line() {
  return (
    <div className="my-2 h-0 w-[11.5rem] flex-grow border-t border-gray-300" />
  );
}

export { NavButton, DropdownButton, NavcommunityBtn };
