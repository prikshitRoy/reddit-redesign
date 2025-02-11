"use client";

import { useState } from "react";
import { doc, runTransaction, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { type Community } from "@/atoms/communitiesAtom";

interface CommunityProps {
  name: Community["id"];
  description: Community["description"];
  iconURL: Community["iconURL"];
  bannerURL: Community["bannerURL"];
  communityCategories: Community["communityCategories"];
  communityTopics: Community["communityTopics"];
  privacyType: Community["privacyType"];
  mature: Community["mature"];
  matureTopics: Community["matureTopics"];
}

// TODO: Handale Community Banner and Icon.

//! Creates New Community
export function Community() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [user] = useAuthState(auth);

  const CreateCommunity = async ({
    name,
    description,
    iconURL,
    bannerURL,
    communityCategories,
    communityTopics,
    privacyType,
    mature,
    matureTopics,
  }: CommunityProps) => {
    try {
      setIsLoading(true);

      // Looking at: Firebase Database, for "collection" --> "communities".
      // In "communities" looking for "communityName"
      const communityNameLC = name.toLowerCase();
      const communityDocRef = doc(db, "communities", communityNameLC);

      await runTransaction(db, async (transaction) => {
        // Create Cummonity
        transaction.set(communityDocRef, {
          name: name,
          description: description,
          iconURL: iconURL ?? null,
          bannerURL: bannerURL ?? null,
          communityCategories: communityCategories,
          communityTopics: communityTopics,
          privacyType: privacyType,
          mature: mature,
          matureTopics: matureTopics,
          creatorId: user?.uid,
          createdAt: serverTimestamp(),
          numberOfMembers: 1,
        });

        // Creates Community Snippet for User
        // Collection --> Document --> Collection --> Document --> ....
        transaction.set(
          doc(db, `users/${user?.uid}/communitySnippets`, communityNameLC),
          {
            communityId: communityNameLC,
            isModerator: true,
          },
        );
      });

      setIsLoading(false);
      return { success: true };
    } catch (error: any) {
      console.log("Handle Create Community error ", error);
      setErrorMessage(error.message);
      setIsLoading(false);
      return {
        success: false,
        error: error.message,
      };
    }
  };

  return {
    CreateCommunity,
    errorMessage,
    isLoading,
  };
}
