"use client";

import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/customUI/Communitydialog";
import React, { useState } from "react";
import CommunityName from "./CommunityName";
import CommunityDescription from "./CommunityDescription";
import { useRecoilState } from "recoil";
import { createCommunity } from "@/atoms/communitiesAtom";

const CommunityNameDescription: React.FC = () => {
  const [CommunityData, setCommunityData] = useRecoilState(createCommunity);

  // Community Name
  const [communityName, setCommunityName] = useState("");
  const handleDataFromCommunityName = (data: string) => {
    setCommunityName(data);
  };

  // Community Description
  const [communityDescription, setCommunityDescription] = useState("");
  const handleDataFromCommunityDescription = (data: string) => {
    setCommunityDescription(data);
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle className="mb-1">Tell us about your community</DialogTitle>
        <DialogDescription className="text-xs text-black">
          A name and description help people understand what your community is
          all about.
        </DialogDescription>
      </DialogHeader>
      <div className="flex">
        <div className="grid w-[19rem] gap-4 py-4">
          <div className="grid w-[19rem] grid-cols-4 items-center gap-4">
            <div className="flex w-[19rem] flex-col">
              <CommunityName
                CommunityNameChange={handleDataFromCommunityName}
              />

              <CommunityDescription
                CommunityDescriptionChange={handleDataFromCommunityDescription}
              />
            </div>
          </div>
        </div>

        <div className="mx-2 flex w-full justify-center">
          <div className="flex max-h-fit w-[14rem] flex-col rounded-xl px-2 py-2 font-bold shadow-md shadow-gray-400">
            <div
              className="break-words"
              style={{ lineHeight: "1", marginBottom: "0" }}
            >
              r/
              {!CommunityData.name ? "communityname" : CommunityData.name}
            </div>
            <div className="flex flex-col text-[0.6rem] font-thin text-gray-500">
              <div>1 member ·1 online</div>
              <div className="max-h-[12rem] overflow-y-auto break-words py-1 text-xs text-black">
                {!CommunityData.description
                  ? "Your community description"
                  : CommunityData.description}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CommunityNameDescription;
