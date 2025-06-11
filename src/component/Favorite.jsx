import { useEffect, useState } from "react";
import { MdFavorite } from "react-icons/md";
import { auth, db } from "../firebase/firebase";
import { doc } from "firebase/firestore";
const Favorite = ({ image }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  //   console.log(image.id);

  useEffect(() => {
    if (!auth.currentUser) {
      setIsFavorite(false);
      return;
    }
    if (setIsFavorite(image.favorites.includes(auth.currentUser.uid))) {
      setIsFavorite(true);
    }
  }, [auth.currentUser, image.favorites]);
  const favHandler = () => {
    const docRef = doc(db, "Images", image.id);
    if (!auth.currentUser) {
      toast.info("Login to favorite Images , It's free 😊", {
        position: "top-center",
      });
      return;
    }

    console.log(docRef);
    setIsFavorite((prev) => !prev);
  };
  return (
    <button onClick={favHandler}>
      <MdFavorite
        className={`text-[18px] shadow-2xl shadow-gray-800/60 transition-all duration-300 hover:shadow-2xl ${
          isFavorite ? "text-favorites animate-wiggle" : "text-white"
        }`}
      />
    </button>
  );
};

export default Favorite;
