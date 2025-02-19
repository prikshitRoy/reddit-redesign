"use client";

import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "@/firebase/clientApp";
import { useRecoilState, useRecoilValue } from "recoil";
import { createCommunity, validCommunityName } from "@/atoms/communitiesAtom";
import { useDeleteReservedCommunityNames } from "./DeleteReservedCommunityNames";
import { redditUser } from "@/atoms/authModalAtom";

export function useCreateReserveCommunityName() {
  //Recoil: Community Data
  const communityData = useRecoilValue(createCommunity);
  // Recoil: Valid Community Name Status
  const [valid, setValid] = useRecoilState(validCommunityName);
  // Recoil: User Data
  const userState = useRecoilValue(redditUser);

  //Deletes users all reserved CommunityName if user has more than 5 reserved community names
  //Leaves reserveCommunityName === communityData.name
  const { resetUserReservedCommunityName } = useDeleteReservedCommunityNames();

  const CheckCommunityName = async () => {
    //TODO: convert it to Transaction
    const newCommunityName = communityData.name.toLowerCase();
    const communityDocRef = doc(db, "communities", newCommunityName);
    const reserveCommunityNameDocRef = doc(
      db,
      "reserveCommunityName",
      newCommunityName,
    );

    // Get both documents in parallel for better performance
    const [communityDoc, reserveDoc] = await Promise.all([
      getDoc(communityDocRef),
      getDoc(reserveCommunityNameDocRef),
    ]);

    // First check if community already exists
    if (communityDoc.exists()) {
      // Duplicate community name exists
      setValid({ nameExist: true });
      return true;
    }

    // Then check reserved names
    if (reserveDoc.exists()) {
      // Get the creator ID from the reserve doc
      const reserveData = reserveDoc.data();

      // Check if the name is reserved by the current user
      if (reserveData.creatorId === userState.userUid) {
        // created by same user
        setValid({ nameExist: false });
        return false;
      } else {
        // Name is reserved by different user
        setValid({ nameExist: true });
        return true;
      }
    } else {
      // If name is not taken or reserved, create new reservation
      try {
        await setDoc(reserveCommunityNameDocRef, {
          name: communityData.name,
          creatorId: userState.userUid,
          createdAt: serverTimestamp(),
        });
        console.log("Document successfully written!");
        // Check if user have more then 5 communityReserved
        resetUserReservedCommunityName();
        setValid({ nameExist: false });
        return false;
      } catch (e) {
        console.error("Error adding document: ", e);
        setValid({ nameExist: true });
        return true;
      }
    }
  };

  return {
    CheckCommunityName,
  };
}
