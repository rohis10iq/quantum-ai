"use client";

import { useRouter } from "next/navigation";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "./firebase/firebase";

export default function Home() {
    const router = useRouter();
    const auth = getAuth(app); // Initialize Firebase Authentication
    const provider = new GoogleAuthProvider();
  
    const handleContinue = () => {
      router.push("./chat");
    };
  
    const handleSignIn = async () => {
      try {
        const result = await signInWithPopup(auth, provider);
        
        router.push("/chat"); 
      } catch (error) {
        console.error("Error during sign-in:", error);
        alert("Failed to sign in. Please try again.");
      }
    };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white selection:text-[#723ff3]">
      <h1
        className="text-9xl font-bold text-center mb-4 gradient-text"
        
      >
        Quantum
      </h1>
      <p
        className="text-4xl font-bold text-gray-400 mb-8 gradient-text-p"
        
      >
        Your AI Chat Assistant, for now. 
      </p>
      <div className="flex space-x-6">
        <button
          className="button py-3 px-6 rounded-lg font-bold shadow-md text-xl"
          onClick={handleSignIn}
        >
          {" "}
          Sign In
        </button>
        <button
          className="button-2 py-3 px-6 rounded-lg font-bold shadow-md text-xl"
          onClick={handleContinue}
        >
          Continue without Signing In
        </button>
      </div>
    </div>
  );
}
