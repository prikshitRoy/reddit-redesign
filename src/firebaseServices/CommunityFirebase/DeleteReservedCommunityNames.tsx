"use client";

import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "@/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilValue } from "recoil";
import { createCommunity } from "@/atoms/communitiesAtom";

//! Delete Reserve Community Names
export function useDeleteReservedCommunityNames() {
  const [user] = useAuthState(auth);
  const communityData = useRecoilValue(createCommunity);
  const newCommunityName = communityData.id.toLowerCase();

  //! Deletes documents from the reserveCommunityName collection that were created more than 30 minutes ago.
  //! This function is triggered each time the user opens the Create Community button.
  //! There should not be any reserved community names, as `deleteAllReservedCommunityNames` deletes all reserved community names of the user when the Create Community dialog box is closed.
  //! This is just a precautionary scenario code.
  const deleteReservedNames = async () => {
    try {
      // Calculate the timestamp for "30 minutes ago"
      const deleteThirtyMinName = new Date();
      deleteThirtyMinName.setMinutes(deleteThirtyMinName.getMinutes() - 30);

      const q = query(
        collection(db, "reserveCommunityName"),
        where("creatorId", "!=", user?.uid),
        where("createdAt", "<", deleteThirtyMinName),
      );

      // Fetch matching documents
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("No documents found older than 30 min.");
        return;
      }

      // Iterate over each document and delete it
      querySnapshot.forEach(async (docSnap) => {
        const docRef = doc(db, "reserveCommunityName", docSnap.id);
        await deleteDoc(docRef);
        console.log(`Document with ID ${docSnap.id} deleted successfully!`);
      });
    } catch (error) {
      console.error("Error deleting documents: ", error);
    }
  };

  //! Deletes all reserveCommunityName if user has more than 5 reserved community names
  //! Leaves reserveCommunityName === communityData.id
  //! Runs everythime new reserveCommunityName gets created
  const resetUserReservedCommunityName = async () => {
    try {
      // Create a query to fetch reserveCommunityName documents for the current user
      const q = query(
        collection(db, "reserveCommunityName"),
        where("creatorId", "==", user?.uid),
        orderBy("createdAt", "desc"),
      );

      // Fetch matching documents
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) return;

      const totalDocs = querySnapshot.size;

      if (totalDocs <= 5) return; // No need to delete

      // Convert snapshot to an array of documents
      const docsArray = querySnapshot.docs;

      // Filter out docs where reserveCommunityName != communityName
      const filteredDocs = docsArray.filter((docSnap) => {
        const data = docSnap.data();
        return data.reserveCommunityName != newCommunityName;
      });

      // Create an array of delete promises for the filtered documents
      const deletePromises = filteredDocs.map((docSnap) =>
        deleteDoc(docSnap.ref),
      );
      await Promise.all(deletePromises);

      console.log(`${filteredDocs.length} excess documents deleted.`);
    } catch (error) {
      console.error("Error deleting documents: ", error);
    }
  };

  //! Function to delete all reserved community names of user
  //! Runs when user close Create Create Community DialogBox
  //TODO: Runs when user refreshes the page
  const deleteAllReservedCommunityNamesOfUser = async () => {
    // Get the current authenticated user state
    const [user] = useAuthState(auth);

    try {
      // Create a query to find all reserved community names created by the current user
      const q = query(
        collection(db, "reserveCommunityName"),
        where("creatorId", "==", user?.uid), // Filter by user ID
      );

      // Fetch matching documents
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("No reserveCommunityName Collection created by user.");
        return;
      }

      // Convert snapshot to an array of documents
      const docsToDelete = querySnapshot.docs;

      // Delete documents asynchronously
      const deletePromises = docsToDelete.map((docSnap) =>
        deleteDoc(docSnap.ref),
      );
      await Promise.all(deletePromises);

      console.log(`documents deleted.`);
    } catch (error) {
      console.error("Error deleting documents: ", error);
    }
  };

  return {
    deleteReservedNames,
    resetUserReservedCommunityName,
    deleteAllReservedCommunityNamesOfUser,
  };
}
