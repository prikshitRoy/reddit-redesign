"use client";

import React, { useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  runTransaction,
  serverTimestamp,
  setDoc,
  where,
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

      // TODO: Delete reserveCommunityName after community is created
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
  const [duplicate, setDuplicate] = useRecoilState(validCommunityName);
  const [user] = useAuthState(auth);

  const CheckCommunityName = async () => {
    //TODO: convert it to Transaction
    const communityDocRef = doc(db, "communities", communityData.id);
    const communityDoc = await getDoc(communityDocRef);

    const reserveCommunityNameDocRef = doc(
      db,
      "reserveCommunityName",
      communityData.id,
    );
    const reserveDoc = await getDoc(reserveCommunityNameDocRef);

    if (communityDoc.exists()) {
      // Duplicate community name exists
      setDuplicate({ nameExist: true });
      return true;
    } else if (reserveDoc.exists()) {
      // If name exist check if its created by the same user
      const q = query(
        collection(db, "reserveCommunityName"),
        where("createId", "==", user?.uid),
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot) {
        // created by same user
        setDuplicate({ nameExist: false });
        return false;
      } else {
        // Duplicate name exist created by different user
        setDuplicate({ nameExist: true });
        return true;
      }
    } else {
      try {
        await setDoc(reserveCommunityNameDocRef, {
          createId: user?.uid,
          createAt: serverTimestamp(),
        });
        console.log("Document successfully written!");
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  return {
    CheckCommunityName,
  };
}

async function reserve() {
  const communityData = useRecoilValue(createCommunity);
  const [valid, setValid] = useRecoilState(validCommunityName);
  const [user] = useAuthState(auth);
}

//TODO: Delete reserveCommunityName document if community creation fails or completed
export async function deleteDocumentsByUser() {
  const communityData = useRecoilValue(createCommunity);
  const [user] = useAuthState(auth);

  if (!user?.uid) {
    console.error("User is not authenticated");
    return;
  }

  try {
    // Query to find documents where createId equals the user's UID
    const q = query(
      collection(db, "reserveCommunityName"),
      where("createId", "==", user.uid),
    );

    // Fetch matching documents
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("No documents found for the given condition.");
      return;
    }

    // Iterate over each document and delete it
    querySnapshot.forEach(async (docSnap) => {
      // Skip deletion if the document ID matches "reserveCommunityName" and communityData.id
      if (
        docSnap.id === "reserveCommunityName" &&
        docSnap.id === communityData.id
      ) {
        console.log(`Skipping deletion for reserved document: ${docSnap.id}`);
        return;
      }

      const docRef = doc(db, "reserveCommunityName", docSnap.id);
      await deleteDoc(docRef);
      console.log(`Document with ID ${docSnap.id} deleted successfully!`);
    });
  } catch (error) {
    console.error("Error deleting documents: ", error);
  }
}
