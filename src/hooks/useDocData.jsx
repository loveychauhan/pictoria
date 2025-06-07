import { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

const useDocData = (collection) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let unsubscribeAuth;

    const fetchData = async (id) => {
      try {
        const docRef = doc(db, collection, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setData(docSnap.data());
        } else {
          setData(null);
        }
      } catch (error) {
        console.error("Error fetching document:", error);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchData(user.uid);
      } else {
        setData(null);
        setLoading(false);
      }
    });

    return () => {
      if (unsubscribeAuth) unsubscribeAuth();
    };
  }, [collection]);

  return { data, loading };
};

export default useDocData;
