"use client";

import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { useAuth } from "../components/context/AuthContext";
import { useRouter } from "next/navigation";

interface datatype {
  id: string;
  name: string;
  userId: string;
}

const Login = () => {
  const router = useRouter();
  const { currentUser } = useAuth();
  const [username, setUsername] = useState("");
  const [user, setUser] = useState<datatype[]>([]);
  const [editingUser, setEditingUser] = useState<datatype | null>(null);
  const [updatedName, setUpdatedName] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "Users"), {
        name: username,
        userId: currentUser?.uid,
      });
      setUsername("");
      fetchUser();
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };
const handleUpdate=async()=>{
    if (editingUser) {
        try {
            const userDoc=doc(db,"Users",editingUser.id)
            await updateDoc(userDoc,{name:updatedName})
            setUpdatedName('')
            setEditingUser(null)
        } catch (error) {
            
        }
    }
}
  const fetchUser = async () => {
    try {
      const q = collection(db, "Users");
      const querySnap = await getDocs(q);
      const usersList = querySnap.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as datatype)
      );
      setUser(usersList);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (userId: string) => {
    try {
      await deleteDoc(doc(db, "Users", userId));
      setUser(user.filter((users) => users.id !== userId));
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };
const update=(user:datatype)=>{
setEditingUser(user)
setUpdatedName(user.name)
}
 

 

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">User Data</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              id="username"
              value={username}
              placeholder="Enter your User data"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add Data
          </button>
        </form>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Users List</h2>
          <ul className="space-y-4">
            {user.map((user) => (
              <li
                key={user.id}
                className="flex items-center justify-between p-4 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50 transition-colors"
              >
                <span className="text-lg font-medium text-gray-900">{user.name}</span>
                <div className="flex gap-3">
                  <button
                    onClick={() => update(user)}
                    className="px-3 py-1.5 bg-purple-600 text-white rounded-md hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="px-3 py-1.5 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {editingUser && (
          <form onSubmit={handleUpdate} className="mt-8 space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Update User</h2>
            <div>
              <label
                htmlFor="updatedName"
                className="block text-sm font-medium text-gray-700"
              >
                New Username
              </label>
              <input
                type="text"
                id="updatedName"
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Save Changes
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
