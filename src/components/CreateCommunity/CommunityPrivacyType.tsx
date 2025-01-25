"use client";

import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/customUI/Communitydialog";
import React, { useEffect, useState } from "react";

import PublicCommunityLogo from "@/lib/PublicCommunityLogo";
import RestrictedCommunityLogo from "@/lib/RestrictedCommunit-logo";
import PrivateCommunityLogo from "@/lib/PrivateCommunit-logo";
import MatureCommunityLogo from "../../lib/MatureCommunit-logo";

import { cn } from "@/lib/utils";
import { RedditSwitch } from "../ui/customUI/RedditSwitch";

interface PrivacyTypeProps {
  children?: React.ReactNode;
  privacyType: "public" | "private" | "restricted" | "mature";
  className?: string;
  onClick?: () => void;
}

const CommunityPrivacyType: React.FC = () => {
  // Community Type
  const [CommunityType, setCommunityType] = useState<string>("public");
  const [matureContent, setMatureContent] = useState<boolean>(false);

  const onCommunityTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCommunityType(event.target.id);
  };

  const handleMatureContentToggle = () => {
    setMatureContent((prevState) => !prevState);
  };

  useEffect(() => {
    setCommunityType("public");
    setMatureContent(false);
  }, []);

  return (
    <>
      <DialogHeader>
        <DialogTitle className="mb-1">
          What kind of community is this?
        </DialogTitle>
        <DialogDescription className="w-[718px] flex-wrap text-[14px] tracking-[-0.010em] text-gray-800">
          Decide who can view and contribute in your community. Only public
          communities show up in search.
          <span className="font-bold">Important:</span> Once set, you will need
          to submit a request to change your community type.
        </DialogDescription>
      </DialogHeader>
      <div className="mt-5 flex flex-col">
        {/* community Types: */}
        <div className="flex flex-row">
          <div>
            {/* PUBLIC */}
            <PrivacyType
              privacyType="public"
              className={cn(
                `${CommunityType === "public" ? "bg-gray-200" : "hover:bg-gray-100"}`,
              )}
              onClick={() => {
                setCommunityType("public");
              }}
            >
              <input
                type="radio"
                id="public"
                checked={CommunityType === "public"}
                onChange={onCommunityTypeChange}
                className="mr-5 h-3 w-3 border-gray-300 accent-black"
              />
            </PrivacyType>

            {/* RESTRICTED */}
            <PrivacyType
              privacyType="restricted"
              className={cn(
                `${CommunityType === "restricted" ? "bg-gray-200" : "hover:bg-gray-100"}`,
              )}
              onClick={() => {
                setCommunityType("restricted");
              }}
            >
              <input
                type="radio"
                id="restricted"
                checked={CommunityType === "restricted"}
                onChange={onCommunityTypeChange}
                className="mr-5 h-3 w-3 border-gray-300 accent-black"
              />
            </PrivacyType>

            {/* PRIVATE */}
            <PrivacyType
              privacyType="private"
              className={cn(
                `${CommunityType === "private" ? "bg-gray-200" : "hover:bg-gray-100"}`,
              )}
              onClick={() => {
                setCommunityType("private");
              }}
            >
              <input
                type="radio"
                id="private"
                checked={CommunityType === "private"}
                onChange={onCommunityTypeChange}
                className="mr-5 h-3 w-3 border-gray-300 accent-black"
              />
            </PrivacyType>

            <span className="my-3 flex h-px w-full border-0 bg-gray-300" />

            {/* MATURE */}
            <PrivacyType
              privacyType="mature"
              className={`hover:hover:bg-gray-100`}
              onClick={handleMatureContentToggle}
            >
              <RedditSwitch
                color="blue"
                className="mr-5 bg-gray-200 data-[state=checked]:bg-blue-800 data-[state=unchecked]:bg-gray-200"
                id="mature"
                checked={matureContent}
                onCheckedChange={handleMatureContentToggle}
                onClick={handleMatureContentToggle}
                aria-readonly
              />
            </PrivacyType>

            <div className="mt-28 text-[14px] text-gray-500">
              By continuing, you agree to our{" "}
              <span
                className="cursor-pointer text-black underline"
                style={{
                  textUnderlineOffset: "1.5px",
                }}
              >
                Mod Code of Conduct
              </span>{" "}
              and acknowledge that you understand the{" "}
              <span
                className="cursor-pointer text-black underline"
                style={{
                  textUnderlineOffset: "1.5px",
                }}
              >
                Reddit Rules
              </span>
              .
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CommunityPrivacyType;

function PrivacyType({
  children,
  privacyType,
  className,
  onClick,
}: PrivacyTypeProps) {
  const privacyDetails = {
    public: {
      description: "Anyone can view, post, and comment to this community",
      iconClass: "",
      name: "Public",
    },
    restricted: {
      description: "Anyone can view, but only approved users can contribute",
      name: "Restricted",
    },
    private: {
      description: "Only approved users can view and contribute",

      name: "Private",
    },
    mature: {
      description: "Users must be over 18 to view and contribute",
      name: "Mature (18+)",
    },
  };

  const { description, name } = privacyDetails[privacyType];

  return (
    <div
      className={cn(
        `flex h-12 w-[35.8rem] cursor-pointer items-center justify-between`,
        className,
      )}
      onClick={onClick}
    >
      <div className="flex items-center">
        {privacyType === "public" && (
          <PublicCommunityLogo
            className={`ml-4 h-5 w-5 rounded-full border-[1.8px] border-gray-800 bg-gray-800`}
          />
        )}
        {privacyType === "restricted" && (
          <RestrictedCommunityLogo className="ml-4 h-5 w-5" />
        )}
        {privacyType === "private" && (
          <PrivateCommunityLogo className="ml-4 h-5 w-5" />
        )}

        {privacyType === "mature" && (
          <MatureCommunityLogo className="ml-4 h-5 w-5" />
        )}

        <div className="ml-4">
          <div className="flex h-4 items-center text-xs">{name}</div>
          <div className="flex h-3 items-center text-[13px] text-gray-500">
            {description}
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
