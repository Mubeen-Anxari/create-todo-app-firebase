"use client"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useRouter } from "next/navigation";

export default function Register() {
    const router =useRouter()
   
  const handleGoogleSignUp = async() => {
    try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log("User signed in:", user);
        router.push('/addData')
      } catch (error) {
        console.error("Error signing in with Google:", error);
      }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-4 bg-white rounded-md shadow-md">
        <h1  onClick={handleGoogleSignUp} className="cursor-pointer text-2xl font-bold mb-4">Sign Up</h1>
      </div>
    </div>
  );
}
