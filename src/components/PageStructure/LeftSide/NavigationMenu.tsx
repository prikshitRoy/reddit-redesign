"use client";

import {
  CommunityState,
  createCommunityViewState,
} from "@/atoms/communitiesAtom";
import Communities from "@/components/CreateCommunity/DialogBox/CommunityModal";
import { auth } from "@/firebase/clientApp";
import { useDeleteReservedCommunityNames } from "@/firebaseServices/CommunityFirebase/CreatedCommunityFirebaseHooks/DeleteReservedCommunityNames";
import { cn } from "@/lib/utils";
import { LucidePlus, Star } from "lucide-react";
import Image from "next/image";
import { ReactNode } from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilValue, useSetRecoilState } from "recoil";

interface ButtonProps {
  alt?: string;
  src?: string;
  name: string;
  h?: number;
  w?: number;
  onClick?: () => void;
  image?: boolean;
  star?: boolean;
  logo?: boolean;
  className?: string;
  children?: ReactNode;
}

export function Button({
  alt,
  src,
  name,
  h,
  w,
  onClick,
  image = false,
  star = false,
  logo = false,
  className,
  children,
}: ButtonProps) {
  return (
    <>
      <div className={cn(`navMenuItem`, className)} onClick={onClick}>
        {logo && children}

        {image && src && (
          <div className="navLogo">
            <Image
              alt={alt ? alt : ""}
              height={h ? h : "20"}
              width={w ? w : "20"}
              src={`${src}`}
            />
          </div>
        )}
        <div
          className={`line-clamp-1 overflow-hidden text-left ${star ? "w-[6.1rem]" : "w-fit"}`}
        >
          {star ? `${"r/" + name}` : `${name}`}
        </div>
        {star && (
          <div className="starButton">
            <Star className="stroke-1 p-[0.15rem]" />
          </div>
        )}
      </div>
    </>
  );
}

const NavigationMenu: React.FC = () => {
  const [user] = useAuthState(auth);
  const setcreateCommunityViewState = useSetRecoilState(
    createCommunityViewState,
  );
  const mySnippets = useRecoilValue(CommunityState).mySnippets;

  const { deleteReservedNames } = useDeleteReservedCommunityNames();

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

  return (
    <>
      <div className="flex flex-col items-center justify-center text-xs text-black">
        <div className="my-3 flex h-fit w-full flex-col px-3">
          <Button name="Home" src="/home.svg" alt="" image={true} />
          <Button name="Popular" src="/popular.svg" alt="" image={true} />

          <div className="my-3 h-0 w-[11.5rem] flex-grow border-t border-gray-300" />

          {user && (
            <>
              {/* //TODO: Make it Dropdown */}
              <Button name="COMMUNITIES" className="text-gray-500" />

              <Button
                name="Create a community"
                logo={true}
                onClick={() => HandleCreateCommunityButton()}
              >
                <LucidePlus className="navLogo" />
              </Button>
              <Communities />
            </>
          )}
        </div>
        {mySnippets
          .filter((snippet) => snippet.isModerator)
          .map((snippet) => (
            <div key={snippet.communityId}></div>
          ))}
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
