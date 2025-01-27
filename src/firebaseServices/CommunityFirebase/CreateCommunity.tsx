"use client";

import React, { useState } from "react";
import {
  doc,
  getDoc,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "@/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState, useRecoilValue } from "recoil";
import { createCommunity, validCommunityName } from "@/atoms/communitiesAtom";

interface CommunityCredentials {
  communityName: string;
  CommunityType: string;
}

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
      const communityDocRef = doc(db, "communities", communityName);

      await runTransaction(db, async (transaction) => {
        //Check if community exists in DB
        const communityDoc = await transaction.get(communityDocRef);
        if (communityDoc.exists()) {
          throw new Error(`Sorry, /r ${communityName} is taken. Try another.`);
        }

        // Create Cummonity
        transaction.set(communityDocRef, {
          creatorId: user?.uid,
          createdAt: serverTimestamp(),
          numberOfMembers: 1,
          privacyType: CommunityType,
        });

        // Create Community Snippet on User
        // Collection --> Document --> Collection --> Document --> ....
        transaction.set(
          doc(db, `users/${user?.uid}/communitySnippets`, communityName),
          {
            communityId: communityName,
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

// Checks for Unique Community Name
export function UniqueCommunityName() {
  const communityData = useRecoilValue(createCommunity);
  const [valid, setValid] = useRecoilState(validCommunityName);

  const CheckCommunityName = async () => {
    // Looking at: Firebase Database, for "communityName" in collection "communities".
    const communityDocRef = doc(db, "communities", communityData.id);

    //Check if community exists in DB
    const communityDoc = await getDoc(communityDocRef);
    if (communityDoc.exists()) {
      // Indicates that there was an error
      setValid({ nameExist: true });
      return true;
    }
    // No error
    setValid({ nameExist: false });
    return false;
  };

  return {
    CheckCommunityName,
  };
}
