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

interface ButtonProps {
  alt?: string;
  src?: string;
  name: string;
  onClick?: () => void;
  image?: boolean;
  star?: boolean;
  logo?: boolean;
  dropDown?: boolean;
  className?: string;
  children?: ReactNode;
}

const option = {
  MODERATION: "MODERATION",
  CUSTOM_FEEDS: "CUSTOM FEEDS",
  RECENT: "RECENT",
  COMMUNITIES: "COMMUNITIES",
  RESOURCES: "RESOURCES",
  TOPICS: "TOPICS",
} as const;
type TypeOption = (typeof option)[keyof typeof option];

export function Button({
  alt,
  src,
  name,
  onClick,
  image = false,
  star = false,
  logo = false,
  dropDown = false,
  className,
  children,
}: ButtonProps) {
  return (
    <>
      {dropDown && (
        <div className="my-2 h-0 w-[11.5rem] flex-grow border-t border-gray-300" />
      )}

      <div
        className={cn(
          `navMenuItem ${dropDown && "justify-between"}`,
          className,
        )}
        onClick={onClick}
      >
        {logo && !dropDown && children}

        {image && (
          <div className="navLogo">
            <Image
              alt={alt ? alt : ""}
              height={star ? "32" : "20"}
              width={star ? "32" : "20"}
              src={`${src ? src : "/reddit-community-logo.svg"}`}
            />
          </div>
        )}
        <div
          className={`line-clamp-1 overflow-hidden text-left ${star ? `w-[6.1rem]` : `w-fit`} ${dropDown ? "text-[0.62rem] tracking-[0.099em] text-gray-500" : "text-[0.70rem]"}`}
        >
          {star ? `${"r/" + name}` : `${name}`}
        </div>

        {dropDown && logo && children}
        {star && (
          <div className="starButton" onClick={onClick}>
            <Star className="stroke-1 p-[0.15rem]" />
          </div>
        )}
      </div>
    </>
  );
}

const NavigationMenu: React.FC = () => {
  const userState = useRecoilValue(redditUser);
  const setcreateCommunityViewState = useSetRecoilState(
    createCommunityViewState,
  );
  const mySnippets = useRecoilValue(CommunityState).mySnippets;
  const { getMySnippets } = UseCommunityData();

  const { deleteReservedNames } = useDeleteReservedCommunityNames();

  const [dropdownStates, setDropdownStates] = useState<
    Record<TypeOption, boolean>
  >(() => {
    const entries = Object.values(option).reduce(
      (acc, key) => {
        acc[key] = true;
        return acc;
      },
      {} as Record<TypeOption, boolean>,
    );

    return entries;
  });

  const toggleDropdown = (option: TypeOption) => {
    setDropdownStates((prev) => ({
      ...prev,
      [option]: !prev[option],
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
          <Button name="Home" src="/home.svg" alt="" image={true} />
          <Button name="Popular" src="/popular.svg" alt="" image={true} />

          {/* //TODO: make text translucent as hight decrease, Add transition , for rotate, hight, text */}

          {/* MODERATION */}
          {userState.user && (
            <>
              <Button
                name={option.MODERATION}
                dropDown={true}
                logo={true}
                onClick={() => {
                  toggleDropdown("MODERATION");
                }}
              >
                <ChevronUp
                  className={`dropDownStyle right-0 ${!dropdownStates.MODERATION && "rotate-180"}`}
                />
              </Button>
              <div className={dropdownStates.MODERATION ? "h-fit" : "h-0"}>
                {mySnippets
                  .filter((snippet) => snippet.isModerator)
                  .map((snippet) => (
                    <Button
                      className={`${!dropdownStates.MODERATION && "-z-10 text-transparent hover:pointer-events-none hover:bg-white"}`}
                      key={snippet.communityId}
                      name={snippet.communityId}
                      image={dropdownStates.MODERATION}
                      star={dropdownStates.MODERATION}
                    />
                  ))}
              </div>
            </>
          )}

          {/* CUSTOM FEEDS */}
          {userState.user && (
            <>
              <Button
                name={option.CUSTOM_FEEDS}
                dropDown={true}
                logo={true}
                onClick={() => {
                  toggleDropdown("CUSTOM FEEDS");
                }}
              >
                <ChevronUp
                  className={`dropDownStyle right-0 ${!dropdownStates["CUSTOM FEEDS"] && "rotate-180"}`}
                />
              </Button>
            </>
          )}

          {/* RECENT */}
          {userState.user && (
            <>
              <Button
                name={option.RECENT}
                dropDown={true}
                logo={true}
                onClick={() => {
                  toggleDropdown("RECENT");
                }}
              >
                <ChevronUp
                  className={`dropDownStyle right-0 ${!dropdownStates.RECENT && "rotate-180"}`}
                />
              </Button>
            </>
          )}

          {/* COMMUNITIES */}
          {userState.user && (
            <>
              <Button
                name={option.COMMUNITIES}
                dropDown={true}
                logo={true}
                onClick={() => {
                  toggleDropdown("COMMUNITIES");
                }}
              >
                <ChevronUp
                  className={`dropDownStyle right-0 ${!dropdownStates.COMMUNITIES && "rotate-180"}`}
                />
              </Button>

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

          {/* TOPICS */}
          {!userState.user && (
            <>
              <Button
                name={option.TOPICS}
                dropDown={true}
                logo={true}
                onClick={() => {
                  toggleDropdown("TOPICS");
                }}
              >
                <ChevronUp
                  className={`dropDownStyle right-0 ${!dropdownStates.TOPICS && "rotate-180"}`}
                />
              </Button>
            </>
          )}

          {/* RESOURCES */}
          <Button
            name={option.RESOURCES}
            dropDown={true}
            logo={true}
            onClick={() => {
              toggleDropdown("RESOURCES");
            }}
          >
            <ChevronUp
              className={`dropDownStyle right-0 ${!dropdownStates.RESOURCES && "rotate-180"}`}
            />
          </Button>
        </div>
      </div>
    </>
  );
};
export default NavigationMenu;
