// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { envs } from "./envs";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: envs.API_KEY,
  projectId: envs.PROJECT_ID,
  storageBucket: envs.STORAGE_BUCKET,
  appId: envs.APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export const utilsFirebase = { storage, ref, uploadBytes, getDownloadURL };
