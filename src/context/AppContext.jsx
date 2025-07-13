/* eslint-disable react-refresh/only-export-components */
// context/AppContext.jsx
import React, { createContext, useEffect, useState, useContext } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [userProfile, setUserProfile] = useState(null); // ✅ Added
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);

        const db = getFirestore();
        const docRef = doc(db, 'users', firebaseUser.uid);
        const userDoc = await getDoc(docRef);

        if (userDoc.exists()) {
          const data = userDoc.data();
          setRole(data.role?.toLowerCase() || 'user');
          setUserProfile(data); // ✅ Store full name, etc.
        } else {
          setRole('user');
          setUserProfile(null);
        }
      } else {
        setUser(null);
        setRole('guest');
        setUserProfile(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AppContext.Provider value={{ user, role, userProfile, loading }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
export { AppContext };
