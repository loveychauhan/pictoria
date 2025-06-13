import { useEffect, useState } from "react";
import { MdFavorite } from "react-icons/md";
import { auth, db } from "../firebase/firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const Favorite = ({ image, isDark }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!auth.currentUser) {
      setIsFavorite(false);
      return;
    }
    if (image.favorites.includes(auth.currentUser.uid)) {
      setIsFavorite(true);
    }
  }, [auth.currentUser, image.favorites]);

  const favHandler = async () => {
    const docRef = doc(db, "Image", image.id);
    if (!auth.currentUser) {
      toast.info("Login to select favorites, It's free 😊", {
        position: "top-center",
      });
      return;
    }
    try {
      await updateDoc(docRef, {
        favorites: isFavorite
          ? arrayRemove(auth.currentUser.uid)
          : arrayUnion(auth.currentUser.uid),
      });
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error while liking:", error);
      toast.error("Failed to update like");
    }
  };

  return (
    <button onClick={favHandler}>
      <MdFavorite
        className={`text-[18px] shadow-2xl shadow-gray-800/60 transition-all duration-300 hover:shadow-2xl ${
          isFavorite
            ? "animate-bounce text-[var(--color-favorites)]"
            : isDark
              ? "text-[#fefefe]"
              : "text-[#4A4A4A]"
        }`}
      />
    </button>
  );
};

export default Favorite;
