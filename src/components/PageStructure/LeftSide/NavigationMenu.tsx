"use client";

import { redditUser } from "@/atoms/authModalAtom";
import {
  CommunityState,
  createCommunityViewState,
} from "@/atoms/communitiesAtom";
import Communities from "@/components/CreateCommunity/DialogBox/CommunityModal";
import { useDeleteReservedCommunityNames } from "@/firebaseServices/CommunityFirebase/CreatedCommunityFirebaseHooks/DeleteReservedCommunityNames";
import { UseCommunityData } from "@/firebaseServices/CommunityFirebase/UseCommunityData/UseCommunityData";
import { cn } from "@/lib/utils";
import { ChevronUp, LucidePlus, Star } from "lucide-react";
import Image from "next/image";
import { ReactNode, useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import SideBarButtons, {
  DropDownButtonTypes,
  DropDownButtonOption,
  Line,
  Shrink,
  Starlogo,
} from "./SideBarButton";

const NavigationMenu: React.FC = () => {
  const userState = useRecoilValue(redditUser);
  const setcreateCommunityViewState = useSetRecoilState(
    createCommunityViewState,
  );
  const mySnippets = useRecoilValue(CommunityState).mySnippets;
  const { getMySnippets } = UseCommunityData();

  const { deleteReservedNames } = useDeleteReservedCommunityNames();

  const [dropdownStates, setDropdownStates] = useState<
    Record<DropDownButtonTypes, boolean>
  >(() => {
    const entries = Object.values(DropDownButtonOption).reduce(
      (acc, key) => {
        acc[key] = true;
        return acc;
      },
      {} as Record<DropDownButtonTypes, boolean>,
    );

    return entries;
  });

  const toggleDropdown = (DropDownButtonOption: DropDownButtonTypes) => {
    setDropdownStates((prev) => ({
      ...prev,
      [DropDownButtonOption]: !prev[DropDownButtonOption],
    }));
  };

  //! Create Community Function
  const HandleCreateCommunityButton = () => {
    setcreateCommunityViewState({
      open: true,
      view: "CommunityNameDiscription",
      disable: true, // Next button
    });
    // Deletes reserveCommunityNames created < 30 min ago
    deleteReservedNames();
  };

  useEffect(() => {
    if (userState.user) {
      getMySnippets();
    }
  }, [userState.user]);

  return (
    <>
      <div className="flex flex-col items-center justify-center text-black">
        <div className="my-3 flex h-fit w-full flex-col px-3">
          {/* <Button name="Home" src="/home.svg" alt="" image={true} /> */}
          {/*  <Button name="Popular" src="/popular.svg" alt="" image={true} /> */}
          <SideBarButtons name="Home" type="normal" src="/home.svg" />

          {/*New MODERATION */}
          {userState.user && (
            <>
              <SideBarButtons
                type="dropdown"
                name="MODERATION"
                id={DropDownButtonOption.MODERATION}
                dropdownState={dropdownStates.MODERATION}
                onClick={() => {
                  toggleDropdown("MODERATION");
                }}
              />
              <Shrink
                id={DropDownButtonOption.MODERATION}
                dropdownState={dropdownStates.MODERATION}
              >
                {mySnippets
                  .filter((snippet) => snippet.isModerator)
                  .map((snippet) => (
                    <SideBarButtons
                      type="community"
                      id={snippet.communityId}
                      name={snippet.communityId}
                      src=""
                      dropdownState={dropdownStates.MODERATION}
                    >
                      <Starlogo
                        id={snippet.communityId}
                        dropdownState={dropdownStates.MODERATION}
                      />
                    </SideBarButtons>
                  ))}
              </Shrink>
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default NavigationMenu;
