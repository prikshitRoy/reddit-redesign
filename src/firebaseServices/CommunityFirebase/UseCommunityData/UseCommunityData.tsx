"use client";

import { useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "@/firebase/clientApp";
import { useRecoilState, useRecoilValue } from "recoil";
import { CommunitySnippets, CommunityState } from "@/atoms/communitiesAtom";
import { redditUser } from "@/atoms/authModalAtom";

export function UseCommunityData() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [communityStateValue, setCommunityStateValue] =
    useRecoilState(CommunityState);
  const userState = useRecoilValue(redditUser);

  const getMySnippets = async () => {
    try {
      // get user Snippets
      if (!userState.user) return;
      setLoading(true);
      const snippetDocs = await getDocs(
        collection(db, `users/${userState.userUid}/communitySnippets`),
      );

      const snippets = snippetDocs.docs.map((doc) => ({ ...doc.data() }));
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: snippets as CommunitySnippets[],
        // or
        // mySnippets: snippets as Array<CommunitySnippets>,
        snippetsFetched: true,
      }));
      console.log("here are snippets:", snippets);
    } catch (error: any) {
      console.log("getMySnippets ERRORS", error);
      setErrorMessage(error.message);
    }

    setLoading(false);
  };

  return {
    getMySnippets,
  };
}
