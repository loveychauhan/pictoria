import { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

const useDocData = () => {
  const [userDetail, setUserDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(db, "User", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setUserDetail(userData);
        } else {
          console.log("User document does not exist.");
        }
      } else {
        setUserDetail(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  return { userDetail, loading };
};

export default useDocData;
