import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { billing } from "firebase-functions/alerts";

admin.initializeApp();
const db = admin.firestore();
