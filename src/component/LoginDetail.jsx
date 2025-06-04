import { getDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { useEffect, useState } from "react";

const LoginDetail = () => {
  const [userDetail, setUserDetail] = useState(null);
  const fetchData = () => {
    auth.onAuthStateChanged(async (user) => {
      const docRef = doc(db, "User", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log(userDetail, "userin");
        setUserDetail(docSnap.data());
      } else {
        console.log("user did not register");
      }
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return <div></div>;
};

export default LoginDetail;
