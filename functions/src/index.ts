import * as admin from "firebase-admin";
import * as functions from "firebase-functions/v1";

admin.initializeApp();
const db = admin.firestore();

export const createUserDocumnet = functions.auth
  .user()
  .onCreate(async (user) => {
    const newUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      providerData: user.providerData,
    };

    //db.collection("users").doc(user.uid).set(newUser);

    // Store user document with detailed user information
    await db.collection("users").doc(user.uid).set(newUser);

    // Store only email in a separate collection for easy retrieval of all emails
    if (user.email) {
      await db.collection("emailIDs").doc(user.uid).set({ email: user.email });
    }

    // Store only displayName in a separate collection for easy retrieval of all displayName
    if (user.displayName) {
      await db
        .collection("displayName")
        .doc(user.uid)
        .set({ Name: user.displayName });
    }
  });
