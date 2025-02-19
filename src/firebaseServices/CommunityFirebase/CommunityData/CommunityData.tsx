"use client";

import { db } from "@/firebase/clientApp";
import { doc, getDoc } from "firebase/firestore";
import { Community } from "@/atoms/communitiesAtom";

interface searchCommunityName {
  name?: string;
}

export function UseCommunityData() {
  const getCommunityData = async ({
    name,
  }: searchCommunityName): Promise<Community | false> => {
    if (!name) return false;

    const communityName = name.toLowerCase();
    const communityDocRef = doc(db, "communities", communityName);
    const communityDoc = await getDoc(communityDocRef);

    if (communityDoc.exists()) {
      return communityDoc.data() as Community;
    } else return false;
  };

  return {
    getCommunityData,
  };
}
