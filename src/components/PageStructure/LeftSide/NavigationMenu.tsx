"use client";

import { createCommunityViewState } from "@/atoms/communitiesAtom";
import Communities from "@/components/CreateCommunity/DialogBox/CommunityModal";
import { auth } from "@/firebase/clientApp";
import { useDeleteReservedCommunityNames } from "@/firebaseServices/CommunityFirebase/CreatedCommunityFirebaseHooks/DeleteReservedCommunityNames";

import { useAuthState } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";

const NavigationMenu: React.FC = () => {
  const [user] = useAuthState(auth);
  const setcreateCommunityViewState = useSetRecoilState(
    createCommunityViewState,
  );

  const { deleteReservedNames } = useDeleteReservedCommunityNames();

  // Create Community Function
  const HandleCreateCommunityButton = () => {
    setcreateCommunityViewState({
      open: true,
      view: "CommunityNameDiscription",
      disable: true, // Next button
    });
    // Deletes reserveCommunityNames created < 30 min ago
    deleteReservedNames();
  };

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
              onClick={() => HandleCreateCommunityButton()}
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
