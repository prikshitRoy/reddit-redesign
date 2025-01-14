"use client";

import {
  Dialog,
  DialogContent,
} from "@/components/ui/customUI/Communitydialog";
import React from "react";

import CommunityNameDescription from "../CommunityNameDescription";
import { useRecoilState, useRecoilValue } from "recoil";
import { createCommunityViewState } from "@/atoms/communitiesAtom";
import { DialogFooter } from "@/components/ui/customUI/dialog";
import StyleYourCommunity from "../StyleYourCommunity";
import CommunityTopics from "../CommunityTopics";
import CommunityPrivacyType from "../CommunityPrivacyType";
import { viewValues } from "@/atoms/communitiesAtom";
import { Community } from "@/firebaseServices/CommunityFirebase/CreateCommunity";

const Communities: React.FC = () => {
  // Firebase Hook to create Community
  const { CreateCommunity, communityStatus, errorInCreatingCommunity } =
    Community();

  // Recoil
  const [createCommunityView, setcreateCommunityView] = useRecoilState(
    createCommunityViewState,
  );
  // Recoil Value
  const CommunityViewStateValue = useRecoilValue(createCommunityViewState);

  // Close Button
  const handleClose = () => {
    setcreateCommunityView((prev) => ({
      ...prev,
      open: false,
    }));
  };

  // Next Button
  const HandleNext = () => {
    const index = viewValues.indexOf(CommunityViewStateValue.view);
    setcreateCommunityView((prev) => ({
      ...prev,
      view: viewValues[index + 1],
    }));
  };

  // Back Button
  const handleBack = () => {
    const index = viewValues.indexOf(CommunityViewStateValue.view);
    setcreateCommunityView((prev) => ({
      ...prev,
      view: viewValues[index - 1],
    }));
  };

  const handleCreateCommunity = () => {};

  return (
    <>
      <Dialog open={createCommunityView.open} onOpenChange={handleClose}>
        <DialogContent className="w-full pb-1">
          {createCommunityView.view === "CommunityNameDiscription" && (
            <CommunityNameDescription />
          )}
          {createCommunityView.view === "StyleYourCommunity" && (
            <StyleYourCommunity />
          )}
          {createCommunityView.view === "CommunityTopics" && (
            <CommunityTopics />
          )}
          {createCommunityView.view === "CommunityPrivacyType" && (
            <CommunityPrivacyType />
          )}

          {/* Footer */}
          <DialogFooter className="center flex h-fit flex-row items-center justify-between">
            <div className="mr-auto flex flex-row gap-1">
              {createCommunityView.view === "CommunityNameDiscription" ? (
                <div className="h-[6px] w-[6px] rounded-full bg-black" />
              ) : (
                <div className="h-[6px] w-[6px] rounded-full bg-gray-400" />
              )}
              {createCommunityView.view === "StyleYourCommunity" ? (
                <div className="h-[6px] w-[6px] rounded-full bg-black" />
              ) : (
                <div className="h-[6px] w-[6px] rounded-full bg-gray-400" />
              )}
              {createCommunityView.view === "CommunityTopics" ? (
                <div className="h-[6px] w-[6px] rounded-full bg-black" />
              ) : (
                <div className="h-[6px] w-[6px] rounded-full bg-gray-400" />
              )}
              {createCommunityView.view === "CommunityPrivacyType" ? (
                <div className="h-[6px] w-[6px] rounded-full bg-black" />
              ) : (
                <div className="h-[6px] w-[6px] rounded-full bg-gray-400" />
              )}
            </div>
            <div className="flex gap-1">
              {/* {viewValues.includes(wantistheValue.view) } */}
              {viewValues.indexOf(CommunityViewStateValue.view) === 0 && (
                <button
                  type="submit"
                  className="rounded-full bg-gray-200 p-2 text-xs font-semibold"
                  onClick={handleClose}
                >
                  Cancel
                </button>
              )}
              {viewValues.indexOf(CommunityViewStateValue.view) != 0 && (
                <button
                  type="submit"
                  className="rounded-full bg-gray-200 p-2 text-xs font-semibold"
                  onClick={handleBack}
                >
                  Back
                </button>
              )}

              {viewValues.indexOf(CommunityViewStateValue.view) <= 2 ? (
                <button
                  type="submit"
                  className="rounded-full bg-gray-200 p-2 text-xs font-semibold"
                  onClick={HandleNext}
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="rounded-full bg-gray-200 p-2 text-xs font-semibold"
                  onClick={handleCreateCommunity}
                >
                  Create Community
                </button>
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default Communities;
