"use client";

import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/customUI/Communitydialog";
import React, { useEffect, useState } from "react";

import { Community } from "@/firebaseServices/CommunityFirebase/CreateCommunity";
import PublicCommunityLogo from "@/lib/PublicCommunityLogo";

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
        <DialogDescription className="flex-wrap text-xs tracking-tight text-gray-700">
          Decide who can view and contribute in your community. Only public
          communities show up in search.
          <span className="font-bold">Important:</span> Once set, you will need
          to submit a request to change your community type.
        </DialogDescription>
      </DialogHeader>
      <div className="mt-5 flex flex-col">
        {/* community Types: */}
        <div className="flex cursor-pointer flex-row">
          <div>
            <div className="flex h-12 w-[35.8rem] items-center justify-between">
              <div className="flex items-center">
                <PublicCommunityLogo className="ml-4 h-5 w-5" />
                <div className="ml-4">
                  <div className="flex h-4 items-center text-sm">Public</div>
                  <div className="flex h-3 items-center text-xs text-gray-500">
                    Anyone can view, post, and comment to this community
                  </div>
                </div>
              </div>
              <input
                type="radio"
                id="public"
                checked={CommunityType === "public"}
                onChange={onCommunityTypeChange}
                className="mr-5"
              />
            </div>
            <div className="flex h-12 w-[35.8rem] items-center justify-between">
              <div className="flex items-center">
                <PublicCommunityLogo className="ml-4 h-5 w-5" />
                <div className="ml-4">
                  <div className="flex h-4 items-center text-sm">
                    Restricted
                  </div>
                  <div className="flex h-3 items-center text-xs text-gray-500">
                    Anyone can view, but only approved users can contribute
                  </div>
                </div>
              </div>
              <input
                type="radio"
                id="restricted"
                checked={CommunityType === "restricted"}
                onChange={onCommunityTypeChange}
                className="mr-5"
              />
            </div>
            <div className="flex h-12 w-[35.8rem] items-center justify-between">
              <div className="flex items-center">
                <PublicCommunityLogo className="ml-4 h-5 w-5" />
                <div className="ml-4">
                  <div className="flex h-4 items-center text-sm">Private</div>
                  <div className="flex h-3 items-center text-xs text-gray-500">
                    Only approved users can view and contribute
                  </div>
                </div>
              </div>
              <input
                type="radio"
                id="private"
                checked={CommunityType === "private"}
                onChange={onCommunityTypeChange}
                className="mr-5"
              />
            </div>
            <span className="my-3 flex h-px w-full border-0 bg-gray-300" />
            <div className="flex h-12 w-[35.8rem] items-center justify-between">
              <div className="flex items-center">
                <PublicCommunityLogo className="ml-4 h-5 w-5" />
                <div className="ml-4">
                  <div className="flex h-4 items-center text-sm">
                    Mature (18+)
                  </div>
                  <div className="flex h-3 items-center text-xs text-gray-500">
                    Users must be over 18 to view and contribute
                  </div>
                </div>
              </div>
              <input
                className="mr-5"
                type="radio"
                id="mature"
                /* checked={CommunityType === "private"} */
                /*  onChange={onCommunityTypeChange} */
              />
            </div>
            <div className="mt-20 text-xs tracking-tight text-gray-500">
              By continuing, you agree to our
              <span className="cursor-pointer text-black underline">
                Mod Code of Conduct
              </span>
              and acknowledge that you understand the
              <span className="cursor-pointer text-black underline">
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
