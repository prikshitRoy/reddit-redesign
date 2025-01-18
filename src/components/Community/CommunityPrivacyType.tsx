"use client";

import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/customUI/Communitydialog";
import React, { useEffect, useState } from "react";

import { Community } from "@/firebaseServices/CommunityFirebase/CreateCommunity";

const CommunityPrivacyType: React.FC = () => {
  // Community Type
  const [CommunityType, setCommunityType] = useState("public");

  const onCommunityTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCommunityType(event.target.id);
  };

  useEffect(() => {
    setCommunityType("public");
  }, []);

  return (
    <>
      <DialogHeader>
        <DialogTitle>What kind of community is this?</DialogTitle>
        <DialogDescription className="text-xs text-black">
          Decide who can view and contribute in your community. Only public
          communities show up in search.{" "}
          <div className="font-semibold">Important:</div> Once set, you will
          need to submit a request to change your community type.
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col">
        <div>community Types:</div>
        <div className="flex flex-row">
          <div>
            <div className="flex w-56 items-center justify-between">
              <div>Public</div>
              <input
                type="checkbox"
                id="public"
                checked={CommunityType === "public"}
                onChange={onCommunityTypeChange}
                className=""
              />
            </div>
            <div className="flex w-56 items-center justify-between">
              <div>Restricted</div>
              <input
                type="checkbox"
                id="restricted"
                checked={CommunityType === "restricted"}
                onChange={onCommunityTypeChange}
              />
            </div>
            <div className="flex w-56 items-center justify-between">
              <div>Private</div>
              <input
                type="checkbox"
                id="private"
                checked={CommunityType === "private"}
                onChange={onCommunityTypeChange}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CommunityPrivacyType;
