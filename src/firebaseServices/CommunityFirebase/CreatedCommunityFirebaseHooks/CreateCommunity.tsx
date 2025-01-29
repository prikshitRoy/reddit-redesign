"use client";

import { useState } from "react";
import { doc, runTransaction, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";

interface CommunityCredentials {
  communityName: string;
  CommunityType: string;
}

//! Creates New Community
export function Community() {
  const [communityStatus, setCommunityStatus] = useState<boolean>(false);
  const [errorInCreatingCommunity, setErrorInCreatingCommunity] =
    useState<string>("");
  const [user] = useAuthState(auth);

  const CreateCommunity = async ({
    communityName,
    CommunityType,
  }: CommunityCredentials) => {
    try {
      // Looking at: Firebase Database, for "collection" --> "communities".
      // In "communities" looking for "communityName"
      const communityNameLC = communityName.toLowerCase();
      const communityDocRef = doc(db, "communities", communityNameLC);

      // TODO: Delete reserveCommunityName after community is created
      await runTransaction(db, async (transaction) => {
        // Create Cummonity
        transaction.set(communityDocRef, {
          name: communityName,
          creatorId: user?.uid,
          createdAt: serverTimestamp(),
          numberOfMembers: 1,
          privacyType: CommunityType,
        });

        // Create Community Snippet on User
        // Collection --> Document --> Collection --> Document --> ....
        transaction.set(
          doc(db, `users/${user?.uid}/communitySnippets`, communityNameLC),
          {
            communityId: communityNameLC,
            isModerator: true,
          },
        );
      });
    } catch (error: any) {
      console.log("Handle Create Community error ", error);
      setErrorInCreatingCommunity(error.message);
    }
  };

  return {
    CreateCommunity,
    errorInCreatingCommunity,
    communityStatus,
  };
}
