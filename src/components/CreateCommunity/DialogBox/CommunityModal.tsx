"use client";

import {
  Dialog,
  DialogContent,
} from "@/components/ui/customUI/Communitydialog";
import React from "react";

import CommunityNameDescription from "../CommunityNameDescription";
import { useRecoilState } from "recoil";
import {
  createCommunity,
  defaultCommunity,
  createCommunityViewState,
  validCommunityName,
} from "@/atoms/communitiesAtom";
import { DialogFooter } from "@/components/ui/customUI/dialog";
import StyleYourCommunity from "../StyleYourCommunity";
import CommunityTopics from "../CommunityTopics";
import CommunityPrivacyType from "../CommunityPrivacyType";
import { viewValues } from "@/atoms/communitiesAtom";
import { Community } from "@/firebaseServices/CommunityFirebase/CreatedCommunityFirebaseHooks/CreateCommunity";
import { useCreateReserveCommunityName } from "@/firebaseServices/CommunityFirebase/CreatedCommunityFirebaseHooks/CreateReservedCommunityNames";
import { useDeleteReservedCommunityNames } from "@/firebaseServices/CommunityFirebase/CreatedCommunityFirebaseHooks/DeleteReservedCommunityNames";

const Communities: React.FC = () => {
  // Firebase Hook to create Community
  const { CreateCommunity, communityStatus, errorInCreatingCommunity } =
    Community();
  // Firebase Hook to check community Name
  const { CheckCommunityName } = useCreateReserveCommunityName();
  const [valid, setValid] = useRecoilState(validCommunityName);

  // Recoil: DialogBox view to Create a Community
  const [CommunityView, setCommunityView] = useRecoilState(
    createCommunityViewState,
  );

  // Recoil Value: Community Data to create a Community
  const [CommunityData, setCommunityData] = useRecoilState(createCommunity);

  // Delete all reserved community names of user
  const { deleteAllReservedCommunityNamesOfUser } =
    useDeleteReservedCommunityNames();

  // Close Button
  const handleClose = () => {
    setCommunityView((prev) => ({
      ...prev,
      open: false,
      disable: true,
    }));
    setCommunityData(defaultCommunity);
    setValid({ nameExist: false });
    deleteAllReservedCommunityNamesOfUser();
  };

  // Next Button
  const HandleNext = async () => {
    const index = viewValues.indexOf(CommunityView.view);

    if (
      CommunityView.view === "CommunityNameDiscription" &&
      CommunityData.id != "" &&
      CommunityData.description != ""
    ) {
      const sameName = await CheckCommunityName();

      // If Same community Name exist then return
      if (sameName) return;

      setCommunityView((prev) => ({
        ...prev,
        view: viewValues[index + 1],
      }));
    }

    if (
      CommunityView.view === "CommunityTopics" &&
      CommunityData.communityTopics.length > 0
    ) {
      setCommunityView((prev) => ({
        ...prev,
        view: viewValues[index + 1],
      }));
    }

    if (CommunityView.view === "StyleYourCommunity") {
      setCommunityView((prev) => ({
        ...prev,
        view: viewValues[index + 1],
      }));
      CommunityView.disable = false;
    }
  };

  // Back Button
  const handleBack = () => {
    const index = viewValues.indexOf(CommunityView.view);
    setCommunityView((prev) => ({
      ...prev,
      view: viewValues[index - 1],
    }));
  };

  const handleCreateCommunity = () => {};

  return (
    <>
      <Dialog open={CommunityView.open} onOpenChange={handleClose}>
        <DialogContent
          className="w-full pb-1"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          {CommunityView.view === "CommunityNameDiscription" && (
            <CommunityNameDescription />
          )}
          {CommunityView.view === "StyleYourCommunity" && (
            <StyleYourCommunity />
          )}
          {CommunityView.view === "CommunityTopics" && <CommunityTopics />}
          {CommunityView.view === "CommunityPrivacyType" && (
            <CommunityPrivacyType />
          )}

          {/* Footer */}
          <DialogFooter className="center mb-1 flex h-fit flex-row items-center justify-between">
            <div className="mr-auto flex flex-row gap-1">
              {viewValues.map((view) =>
                CommunityView.view === view ? (
                  <div
                    className="h-[6px] w-[6px] rounded-full bg-black"
                    key={view}
                  />
                ) : (
                  <div
                    className="h-[6px] w-[6px] rounded-full bg-gray-400"
                    key={view}
                  />
                ),
              )}
            </div>
            <div className="flex gap-1">
              {/* {viewValues.includes(wantistheValue.view) } */}
              {viewValues.indexOf(CommunityView.view) === 0 && (
                <button
                  type="submit"
                  className="rounded-full bg-gray-200 p-2 text-xs font-semibold"
                  onClick={handleClose}
                >
                  Cancel
                </button>
              )}
              {viewValues.indexOf(CommunityView.view) != 0 && (
                <button
                  type="submit"
                  className="rounded-full bg-gray-200 p-2 text-xs font-semibold"
                  onClick={handleBack}
                >
                  Back
                </button>
              )}

              {viewValues.indexOf(CommunityView.view) <= 2 ? (
                <button
                  type="submit"
                  className={`rounded-full p-2 text-xs font-semibold ${CommunityView.disable ? "bg-gray-100 text-gray-400" : "bg-gray-200"}`}
                  onClick={HandleNext}
                  disabled={CommunityView.disable}
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className={`rounded-full p-2 text-xs font-semibold ${CommunityView.disable ? "bg-gray-100 text-gray-400" : "bg-gray-200"}`}
                  onClick={handleCreateCommunity}
                  disabled={CommunityView.disable}
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
