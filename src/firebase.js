import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  // apiKey: "AIzaSyBPlbBb4lq4vL0wDSxFKMPh8qwMQ4Abj1s",
  // authDomain: "proba-4cd39.firebaseapp.com",
  // projectId: "proba-4cd39",
  // storageBucket: "proba-4cd39.appspot.com",
  // messagingSenderId: "532701905457",
  // appId: "1:532701905457:web:178a864cb08a61a6e38b10",

  apiKey: "AIzaSyD41cmaaqgcdNCrnlcuHbP50uMXr92hM6U",
  authDomain: "nickol.firebaseapp.com",
  projectId: "nickol",
  storageBucket: "nickol.appspot.com",
  messagingSenderId: "934529053031",
  appId: "1:934529053031:web:57e160a1e320d470bb3fc2",
  measurementId: "G-ML9R09PT0F",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
