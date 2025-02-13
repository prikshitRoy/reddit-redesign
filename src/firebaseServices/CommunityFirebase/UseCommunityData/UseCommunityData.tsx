"use client";

import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { auth, db } from "@/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import { CommunitySnippets, CommunityState } from "@/atoms/communitiesAtom";

export function UseCommunityData() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [communityStateValue, setCommunityStateValue] =
    useRecoilState(CommunityState);
  const [user] = useAuthState(auth);

  const getMySnippets = async () => {
    try {
      // get user Snippets
      const snippetDocs = await getDocs(
        collection(db, `users/${user?.uid}/communitySnippets`),
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

  useEffect(() => {
    if (!user) {
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: [],
        snippetsFetched: false,
      }));
      return;
    }
    getMySnippets();
  }, [user]);

  /*     return {

      errorMessage,
      isLoading,
    }; */
}
