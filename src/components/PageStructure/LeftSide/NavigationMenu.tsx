"use client";

import { redditUser } from "@/atoms/authModalAtom";
import {
  CommunityState,
  createCommunityViewState,
} from "@/atoms/communitiesAtom";
import Communities from "@/components/CreateCommunity/DialogBox/CommunityModal";
import { useDeleteReservedCommunityNames } from "@/firebaseServices/CommunityFirebase/CreatedCommunityFirebaseHooks/DeleteReservedCommunityNames";
import { UseCommunityData } from "@/firebaseServices/CommunityFirebase/UseCommunityData/UseCommunityData";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { DropdownButton, Line, NavButton, NavcommunityBtn } from "./NavButton";

const NavigationMenu: React.FC = () => {
  const userState = useRecoilValue(redditUser);
  const setcreateCommunityViewState = useSetRecoilState(
    createCommunityViewState,
  );
  const mySnippets = useRecoilValue(CommunityState).mySnippets;
  const { getMySnippets } = UseCommunityData();

  const { deleteReservedNames } = useDeleteReservedCommunityNames();

  //! Create Community Function
  const HandleCreateCommunityButton = () => {
    console.log("HandleCreateCommunityButton Clicked");
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
      {/* //TODO: Complete diff. button logics */}
      <div className="flex flex-col items-center justify-center text-black">
        <div className="my-3 flex h-fit w-full flex-col px-3">
          <NavButton name="Home" src="/home.svg" />
          <NavButton name="Popular" src="/popular.svg" />
          <NavButton name="Explore" src="/explore.svg" />
          <NavButton name="All" src="/all.svg" />

          {userState.user && (
            <>
              {/* MODERATION */}
              <DropdownButton name="MODERATION">
                <>
                  <NavButton name="Mod Queue" src="/mod-queue.svg" />
                  <NavButton name="Mod Mail" src="/mod-mail.svg" />
                  <NavButton name="r/Mod" src="/r-mod.svg" />
                  {mySnippets
                    .filter((snippet) => snippet.isModerator)
                    .map((snippet) => (
                      <NavcommunityBtn name={snippet.communityId} src="" />
                    ))}
                </>
              </DropdownButton>

              {/* CUSTOM FEEDS */}
              <DropdownButton name="CUSTOM FEEDS">
                <NavButton name="Create a custom feed" src="/plus.svg" />
              </DropdownButton>
              <DropdownButton name="RECENT">
                <></>
              </DropdownButton>
              <DropdownButton name="COMMUNITIES">
                <>
                  <NavButton
                    name="Create a community"
                    src="/plus.svg"
                    onClick={() => HandleCreateCommunityButton()}
                  />
                  <Communities />
                </>
              </DropdownButton>
            </>
          )}

          {/* //TODO:  {!userState.user && <DropdownButton name="TOPICS" />} */}
          <DropdownButton name="RESOURCES">
            <>
              <NavButton name="About Reddit" src="/about-reddit.svg" />
              <NavButton name="Advertise" src="/advertise.svg" />
              <NavButton name="Help" src="/help.svg" />
              <NavButton name="Blog" src="/blog.svg" />
              <NavButton name="Careers" src="careers.svg" />
              <NavButton name="Press" src="/press.svg" />
              <Line />
              <NavButton name="Communities" src="/communities.svg" />
              <NavButton name="Best of Reddit" src="/best-of-reddit.svg" />
              <NavButton name="Topics" src="/topics.svg" />
              <Line />
              <NavButton name="Reddit Rules" src="/reddit-rules.svg" />
              <NavButton name="Privacy Policy" src="/privacy-policy.svg" />
              <NavButton name="User Agreement" src="user-agreement.svg" />
            </>
          </DropdownButton>
        </div>
      </div>
    </>
  );
};
export default NavigationMenu;
