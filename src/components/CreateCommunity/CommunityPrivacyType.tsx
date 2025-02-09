"use client";

import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/customUI/Communitydialog";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import React, { useCallback, useEffect, useState } from "react";
import {
  createCommunity,
  communityPrivacyType,
  Mature,
} from "@/atoms/communitiesAtom";
import { cn } from "@/lib/utils";
import { useRecoilState } from "recoil";
import PublicCommunityLogo from "@/lib/PublicCommunityLogo";
import RestrictedCommunityLogo from "@/lib/RestrictedCommunit-logo";
import PrivateCommunityLogo from "@/lib/PrivateCommunit-logo";
import MatureCommunityLogo from "../../lib/MatureCommunit-logo";
import { RedditSwitch } from "@/components/ui/customUI/RedditSwitch";

interface BaseTypeProps {
  children: React.ReactNode;
  label: string;
  info: string;
  className: string;
  onClick: () => void;
  onMouseDown?: () => void;
  onMouseUp?: () => void;
  icon: React.ReactNode;
}

const BaseType: React.FC<BaseTypeProps> = ({
  children,
  label,
  info,
  className,
  onClick,
  onMouseDown,
  onMouseUp,
  icon,
}) => {
  return (
    <div
      className={cn(
        `flex h-12 w-[35.8rem] cursor-pointer items-center justify-between`,
        className,
      )}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      <div className="flex items-center">
        <div className="ml-4">{icon}</div>
        <div className="ml-4">
          <div className="flex h-4 items-center text-xs">{label}</div>
          <div className="flex h-3 items-center text-[13px] text-gray-500">
            {info}
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

const PrivacyTypes = [
  {
    label: "Public",
    info: "Anyone can view, post, and comment to this community",
    id: "public" as communityPrivacyType,
    icon: (
      <PublicCommunityLogo className="h-5 w-5 rounded-full border-[1.8px] border-gray-800 bg-gray-800" />
    ),
  },
  {
    label: "Restricted",
    info: "Anyone can view, but only approved users can contribute",
    id: "restricted" as communityPrivacyType,
    icon: <RestrictedCommunityLogo className="h-5 w-5" />,
  },
  {
    label: "Private",
    info: "Only approved users can view and contribute",
    id: "private" as communityPrivacyType,
    icon: <PrivateCommunityLogo className="h-5 w-5" />,
  },
];

const CommunityPrivacyType: React.FC = () => {
  // Community Privacy Type State
  const [communityType, setCommunityType] =
    useState<communityPrivacyType>("public");

  // Community Mature State
  const [isMature, setIsMature] = useState<Mature>(false);
  const [communityData, setCommunityData] = useRecoilState(createCommunity);

  //! OnChange: Community Type
  const onCommunityTypeChange = useCallback(
    (value: communityPrivacyType) => {
      setCommunityType(value);
      setCommunityData((prev) => ({
        ...prev,
        privacyType: value,
      }));
    },
    [setCommunityData],
  );

  //! Toogle Mature State
  const handleMatureContentToggle = useCallback(() => {
    // If there is mature topics return
    if (communityData.matureTopics) return;

    setIsMature((prevState) => {
      // Compute the new value by toggling the previous state
      const newValue = !prevState;

      // Update communityData with the new mature state
      setCommunityData((prevCommunityData) => ({
        ...prevCommunityData,
        mature: newValue,
      }));

      // Return the new value to update isMature state
      return newValue;
    });
  }, [communityData.matureTopics]);

  //! Check privacyType and matureTopics value
  useEffect(() => {
    setCommunityType(communityData.privacyType || "public");
    setIsMature(communityData.matureTopics || communityData.mature);
  }, []);

  //! On_Mouse_Down : Privacy Type
  const [isPressed, setIsPressed] = useState<communityPrivacyType | null>(null);
  const handleMouseDown = (value: communityPrivacyType) => {
    setIsPressed(value);
  };
  const handleMouseUp = () => setIsPressed(null);

  //! On_Mouse_Down : Mature
  const [isMaturePressed, setIsMaturePressed] = useState<boolean>(false);
  const onMatureMouseDown = () => setIsMaturePressed(true);
  const onMatureMouseUp = () => setIsMaturePressed(false);

  //! ON_Hover Mature
  const [isHovered, setIsHovered] = useState<boolean>(false);

  //! On_Mouse_Down : Toogle
  const [isMatureToogle, setIsMatureToogle] = useState<boolean>(false);
  const onToogleSet = () => setIsMatureToogle(true);
  const onToogleRelese = () => setIsMatureToogle(false);

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

      {/* //TODO: LOGO bg changes when user click on it. */}

      <div className="mt-5 flex flex-col">
        <div className="flex flex-row">
          {/* //! PrivacyType */}
          <div>
            {PrivacyTypes.map(({ id, label, info, icon }) => (
              <BaseType
                key={id}
                label={label}
                info={info}
                icon={icon}
                className={cn(
                  ` ${
                    communityType === id
                      ? `bg-slate-200`
                      : `${isPressed === id ? `bg-gray-300` : `hover:bg-slate-100`} `
                  } `,
                )}
                onClick={() => onCommunityTypeChange(id)}
                onMouseDown={() => handleMouseDown(id)}
                onMouseUp={handleMouseUp}
              >
                <input
                  type="radio"
                  id={id}
                  name="privacyType"
                  checked={communityType === id}
                  onChange={() => onCommunityTypeChange(id)}
                  className="mr-5 h-3 w-3 border-gray-300 accent-black"
                />
              </BaseType>
            ))}

            <span className="my-3 flex h-px w-full border-0 bg-gray-300" />

            {communityData.matureTopics && (
              <div className="m-[2px] mb-3 h-[14px] text-[14px] text-red-700">
                Community marked as Mature (18+) because you selected a mature
                topic
              </div>
            )}

            {/* //TODO: Imrove Code */}
            {/* //! Mature */}
            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <BaseType
                label="Mature (18+)"
                info="Users must be over 18 to view and contribute"
                icon={<MatureCommunityLogo className="h-5 w-5" />}
                className={`relative ${isMaturePressed ? `bg-gray-300` : `hover:bg-slate-100`} `}
                onClick={handleMatureContentToggle}
                onMouseDown={onMatureMouseDown}
                onMouseUp={onMatureMouseUp}
              >
                <RedditSwitch
                  color="blue"
                  className={`mr-5 bg-gray-200 data-[state=unchecked]:bg-gray-200 ${communityData.matureTopics ? `data-[state=checked]:bg-blue-800 hover:data-[state=checked]:bg-blue-900` : `data-[state=checked]:bg-blue-800`}`}
                  id="mature"
                  checked={isMature}
                  onCheckedChange={handleMatureContentToggle}
                  onClick={handleMatureContentToggle}
                  switchMouseDown={communityData.matureTopics && isMatureToogle}
                  onMouseDown={onToogleSet}
                  onMouseUp={onToogleRelese}
                  aria-readonly
                />
                <div
                  className={cn(
                    "pointer-events-none absolute",
                    `${communityData.matureTopics && "inset-0 bg-white/25"}`,
                  )}
                />
              </BaseType>
            </div>
            {/* Hover Card */}
            <HoverCard open={isHovered && communityData.matureTopics}>
              <HoverCardTrigger asChild>
                <div />
              </HoverCardTrigger>
              <HoverCardContent className="relative mr-[26rem] w-40 bg-gray-800 p-1 pl-2 text-[12px] font-semibold text-white">
                Community marked as Mature (18+) because you selected a mature
                topic
                <span className="absolute top-[-15px] flex h-0 w-0 border-8 border-transparent border-b-gray-800" />
              </HoverCardContent>
            </HoverCard>

            <div className="mt-28 text-[14px] text-gray-500">
              By continuing, you agree to our{" "}
              <span
                className="cursor-pointer text-black underline"
                style={{ textUnderlineOffset: "1.5px" }}
              >
                Mod Code of Conduct
              </span>{" "}
              and acknowledge that you understand the{" "}
              <span
                className="cursor-pointer text-black underline"
                style={{ textUnderlineOffset: "1.5px" }}
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
