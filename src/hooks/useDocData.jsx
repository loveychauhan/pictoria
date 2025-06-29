import { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

const useDocData = (collection) => {
  const [data, setData] = useState(null);
  
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
      }
    };

    unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchData(user.uid);
      } else {
        setData(null);
      }
    });

    return () => {
      if (unsubscribeAuth) unsubscribeAuth();
    };
  }, [collection]);

  return { data };
};

export default useDocData;
