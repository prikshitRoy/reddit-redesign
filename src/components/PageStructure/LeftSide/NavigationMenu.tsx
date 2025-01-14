"use client";

import { createCommunityViewState } from "@/atoms/communitiesAtom";
import Communities from "@/components/Community/DialogBox/CommunityModal";
import { auth } from "@/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";

const NavigationMenu: React.FC = () => {
  const [user] = useAuthState(auth);
  const setcreateCommunityViewState = useSetRecoilState(
    createCommunityViewState,
  );

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="text-gray-400">Home</div>
        <div className="text-gray-400">Popular</div>
        <div className="w-full flex-grow border-t" />
        {user && (
          <>
            {/* TODO: Make it Dropdown */}
            <div className="text-gray-400">COMMUNITIES</div>
            <button
              className="w-full hover:bg-gray-100"
              onClick={() =>
                setcreateCommunityViewState({
                  open: true,
                  view: "CommunityNameDiscription",
                })
              }
            >
              Create a Community
            </button>
            <Communities />
          </>
        )}
      </div>
      {/* 
          Home
          Popular
          Explore
          All
          MODERATION
          CUSTOM FEEDS
          Communities COMMUNITIES
          TOPICS
          RESOURCES
        */}
    </>
  );
};
export default NavigationMenu;
