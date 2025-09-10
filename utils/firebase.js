import admin from "firebase-admin";
import { readFileSync } from "fs";

// Load service account key
const serviceAccount = JSON.parse(readFileSync("./mybucket.json", "utf-8"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "mybucket-d9915.appspot.com", // replace with your actual bucket
});

const bucket = admin.storage().bucket();

export default bucket;
