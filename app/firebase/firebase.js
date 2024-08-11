import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBjhrN4Ya92CxOcgugoJ5s4uqyKgE4BpTg",
  authDomain: "quantum-ai-10.firebaseapp.com",
  projectId: "quantum-ai-10",
  storageBucket: "quantum-ai-10.appspot.com",
  messagingSenderId: "646990516090",
  appId: "1:646990516090:web:d331cdf30c82b4549ad0c3",
  measurementId: "G-LHPFZKXMLR"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, analytics, auth, db };