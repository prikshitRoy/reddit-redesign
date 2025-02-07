"use client";

import {
  Dialog,
  DialogContent,
} from "@/components/ui/customUI/Communitydialog";
import React, { useEffect } from "react";

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
import { useDeleteReservedCommunityNames } from "@/firebaseServices/CommunityFirebase/CreatedCommunityFirebaseHooks/DeleteReservedCommunityNames";

const Communities: React.FC = () => {
  // Firebase Hook to create Community
  const { CreateCommunity, communityStatus, errorInCreatingCommunity } =
    Community();

  //Firebase: Delete all reserved community names of user
  const { deleteAllReservedCommunityNamesOfUser } =
    useDeleteReservedCommunityNames();

  // Recoil: Valid Community Name Status
  const [valid, setValid] = useRecoilState(validCommunityName);

  // Recoil: DialogBox view to Create a Community
  const [CommunityView, setCommunityView] = useRecoilState(
    createCommunityViewState,
  );

  // Recoil Value: Community Data to create a Community
  const [CommunityData, setCommunityData] = useRecoilState(createCommunity);

  // Community name and Discription check
  function validNameDescription() {
    if (
      valid.nameExist === false &&
      CommunityData.id.length >= 3 &&
      CommunityData.description != ""
    )
      return false;
    else return true;
  }

  /* Next Button disable condtion */
  const ValidData = () => {
    switch (CommunityView.view) {
      case "CommunityNameDiscription":
        setCommunityView((prev) => ({
          ...prev,
          disable: validNameDescription(),
        }));
        break;

      case "StyleYourCommunity":
        setCommunityView((prev) => ({
          ...prev,
          disable: false, // conditions
        }));
        break;

      case "CommunityTopics":
        setCommunityView((prev) => ({
          ...prev,
          disable: CommunityData.communityTopics.length === 0,
        }));
        break;

      case "CommunityPrivacyType":
        setCommunityView((prev) => ({
          ...prev,
          disable: false,
        }));
        break;

      default:
        break;
    }
  };

  //! Next Button
  const HandleNext = () => {
    const index = viewValues.indexOf(CommunityView.view);
    const nextView = viewValues[index + 1];

    setCommunityView((prev) => ({
      ...prev,
      view: nextView,
    }));
  };

  //! Close Button
  const handleClose = () => {
    setCommunityView((prev) => ({
      ...prev,
      open: false,
      disable: true,
    }));
    setCommunityData(defaultCommunity);
    setValid({ nameExist: undefined });
    deleteAllReservedCommunityNamesOfUser();
  };

  //! Back Button
  const handleBack = () => {
    const index = viewValues.indexOf(CommunityView.view);
    const previousView = viewValues[index - 1];

    setCommunityView((prev) => ({
      ...prev,
      view: previousView,
    }));
  };

  // State monitor
  useEffect(() => {
    ValidData();
  }, [
    CommunityView.view,
    valid.nameExist,
    CommunityData.description,
    CommunityData.communityCategories,
  ]);

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
            {/* Footer Buttons */}
            <div className="flex gap-1">
              {/* Back and Cancel */}
              <button
                type="submit"
                className="rounded-full bg-gray-200 p-2 text-xs font-semibold"
                onClick={
                  viewValues.indexOf(CommunityView.view) === 0
                    ? handleClose
                    : handleBack
                }
              >
                {viewValues.indexOf(CommunityView.view) === 0
                  ? "Cancel"
                  : "Back"}
              </button>

              {/* Next and Create Community */}
              <button
                type="submit"
                className={`rounded-full p-2 text-xs font-semibold ${
                  CommunityView.disable
                    ? "bg-gray-100 text-gray-400"
                    : "bg-blue-500"
                }`}
                onClick={
                  viewValues.indexOf(CommunityView.view) <= 2
                    ? HandleNext
                    : handleCreateCommunity
                }
                disabled={CommunityView.disable}
              >
                {viewValues.indexOf(CommunityView.view) <= 2
                  ? "Next"
                  : "Create Community"}
              </button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default Communities;
