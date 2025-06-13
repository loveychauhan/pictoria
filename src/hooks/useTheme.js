import { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const useTheme = () => {
    const [theme, setTheme] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const docRef = doc(db, "User", user.uid);
                    const docSnap = await getDoc(docRef);
                    const userData = docSnap.data();
                    if (userData?.isDark !== undefined) {
                        setTheme(userData.isDark);
                    }
                } catch (error) {
                    console.error("Failed to fetch theme:", error);
                }
            } else {
                setTheme(false); // default to light theme if user is logged out
            }
        });

        return () => unsubscribe();
    }, []);

    return theme;
};

export default useTheme;
