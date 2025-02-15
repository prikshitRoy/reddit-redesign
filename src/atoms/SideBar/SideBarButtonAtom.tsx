import { ReactNode } from "react";
import { atom, AtomEffect } from "recoil";

export type SideBarButtonType = "normal" | "dropdown" | "community";
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
  | "About Reddit"
  | "Advertise"
  | "Help"
  | "Blog"
  | "Careers"
  | "Press"
  | "Communities"
  | "Best of Reddit"
  | "Topics"
  | "Reddit Rules"
  | "Privacy Policy"
  | "User Agreement";

export interface NavButton {
  type: SideBarButtonType;
  name: SideBarButtonName;
  onClick?: () => void;
  children?: ReactNode;
  src?: string;
  className?: string;
  id: string;
}

export const defaultNavButton: NavButton = {
  type: "normal",
  name: "ENTER BUTTON NAME",
  src: "",
  className: "",
  id: "",
};

export const NavButton = atom<NavButton>({
  key: "NavButton",
  default: defaultNavButton,
});
