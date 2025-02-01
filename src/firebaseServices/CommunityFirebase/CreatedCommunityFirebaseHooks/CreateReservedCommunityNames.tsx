"use client";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "@/firebase/clientApp";
import { useRecoilState, useRecoilValue } from "recoil";
import { createCommunity, validCommunityName } from "@/atoms/communitiesAtom";
import { useDeleteReservedCommunityNames } from "./DeleteReservedCommunityNames";
import { redditUser } from "@/atoms/authModalAtom";

export function useCreateReserveCommunityName() {
  const communityData = useRecoilValue(createCommunity);
  const [duplicate, setDuplicate] = useRecoilState(validCommunityName);
  const userState = useRecoilValue(redditUser);

  //Deletes users all reserved CommunityName if user has more than 5 reserved community names
  //Leaves reserveCommunityName === communityData.id
  const { resetUserReservedCommunityName } = useDeleteReservedCommunityNames();

  const CheckCommunityName = async () => {
    //TODO: convert it to Transaction
    const newCommunityName = communityData.id.toLowerCase();
    const communityDocRef = doc(db, "communities", newCommunityName);
    const communityDoc = await getDoc(communityDocRef);

    const reserveCommunityNameDocRef = doc(
      db,
      "reserveCommunityName",
      newCommunityName,
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
        where("creatorId", "==", userState.userUid),
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
      // Community Name does not exist in reserveCommunityName Collection
      // Creating a new document with the community name
      try {
        await setDoc(reserveCommunityNameDocRef, {
          creatorId: userState,
          createdAt: serverTimestamp(),
        });
        console.log("Document successfully written!");
      } catch (e) {
        console.error("Error adding document: ", e);
      }

      // Check if user have more then 5 communityReserved
      resetUserReservedCommunityName();
    }
  };

  return {
    CheckCommunityName,
  };
}
