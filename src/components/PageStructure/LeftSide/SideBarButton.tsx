"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";
import { ChevronUp, LucidePlus, Star } from "lucide-react";
import { CommunitySnippets } from "@/atoms/communitiesAtom";

export type SideBarButtonType = "normal" | "dropdown" | "community";

//TODO: Complete Topics list
export type SideBarButtonName =
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

export interface SideBarButtonsProps {
  id: string;
  type: SideBarButtonType;
  name: SideBarButtonName | CommunitySnippets["communityId"];
  onClick?: () => void;
  children?: ReactNode;
  src?: string;
  dropdownState: boolean;
  alt: string;
  clicked: boolean;
}

const createOption = <T extends SideBarButtonName[]>(...items: T) =>
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

export type DropDownButtonTypes =
  (typeof DropDownButtonOption)[keyof typeof DropDownButtonOption];

const SideBarButtons: React.FC<Partial<SideBarButtonsProps>> = ({
  type = "normal",
  name,
  onClick,
  children,
  dropdownState = true,
  alt,
  src,
  id = "",
  clicked = false,
}) => {
  return (
    /* //TODO: How to make Props requried true */
    <>
      {/* Normal */}
      {type === "normal" && (
        <>
          <div
            className={`navMenuItem px-[1.12rem] transition-all duration-500 ${dropdownState ? "opacity-100" : "pointer-events-none opacity-0"} ${clicked && "bg-gray-200"}`}
            id={name}
            onClick={onClick}
          >
            {/* //TODO: Add skeleton svg */}
            <Image
              alt={alt ? alt : ""}
              height="20"
              width="20"
              src={`${src ? src : "/reddit-community-logo.svg"}`}
            />
            <div className={`w-fit text-left text-[0.70rem]`}>{name}</div>
          </div>
        </>
      )}

      {/* Dropdown */}
      {type === "dropdown" && (
        <>
          <Line />
          <div
            className="navMenuItem justify-between"
            id={id}
            onClick={onClick}
          >
            <div className="w-fit text-left text-[0.70rem] tracking-[0.099em] text-gray-500">
              {name}
            </div>
            <ChevronUp
              className={`dropDownStyle transition-transform duration-300 ease-in-out ${!dropdownState && "-rotate-180"}`}
            />
          </div>
        </>
      )}

      {/* Communities */}
      {type === "community" && (
        <>
          <div
            className={`navMenuItem transition-all duration-500 ${dropdownState ? "opacity-100" : "pointer-events-none opacity-0"} ${clicked && "bg-gray-200"}`}
            id={id}
            onClick={onClick}
          >
            {/* //TODO: Add skeleton svg */}
            <Image
              alt={alt ? alt : ""}
              height="32"
              width="32"
              src={`${src ? src : "/reddit-community-logo.svg"}`}
            />
            <div
              className={`line-clamp-1 overflow-hidden text-left text-[0.70rem] ${children ? `w-[6rem]` : `w-fit`}`}
            >
              {"r/" + name + "sdfsdfsdfsdfsdsdsf"}
            </div>
            {children}
          </div>
        </>
      )}
    </>
  );
};
export default SideBarButtons;

export function Starlogo({
  onClick,
  id = "",
  clicked = false,
  dropdownState = true,
}: Partial<SideBarButtonsProps>) {
  return (
    <div
      className={`starButton transition-all duration-500 ${dropdownState ? "opacity-100" : "pointer-events-none opacity-0"} ${clicked && "bg-gray-200"}`}
      onClick={onClick}
      id={id}
    >
      <Star className="stroke-1 p-[0.15rem]" />
    </div>
  );
}

export function Shrink({
  id = "",
  dropdownState = true,
  children,
}: Partial<SideBarButtonsProps>) {
  return (
    <div
      className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${dropdownState ? "h-fit max-h-[1000px]" : "max-h-0"}`}
      id={id}
    >
      {children}
    </div>
  );
}

export function Line() {
  return (
    <div className="my-2 h-0 w-[11.5rem] flex-grow border-t border-gray-300" />
  );
}
