"use client";

import Communities from "@/components/Community/CommunityDialogBox/CommunityModal";
import { auth } from "@/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";

const NavigationMenu: React.FC = () => {
  const [user] = useAuthState(auth);

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
