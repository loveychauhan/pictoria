import { useEffect, useState } from "react";
import { BiSolidLike } from "react-icons/bi";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { toast } from "react-toastify";

const Like = ({ image, isDark }) => {
  const [likeCount, setLikeCount] = useState(image.likeCount || 0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (!auth.currentUser) {
      setIsLiked(false);
      return;
    }
    if (image.likes.includes(auth.currentUser.uid)) {
      setIsLiked(true);
    }
  }, [image.likes, auth.currentUser]);

  const likeHandler = async () => {
    const newLikeCount = isLiked ? likeCount - 1 : likeCount + 1;
    const docRef = doc(db, "Image", image.id);

    if (!auth.currentUser) {
      toast.info("Login to like  Images , It's free 😊", {
        position: "top-center",
      });
      return;
    }

    try {
      await updateDoc(docRef, {
        likeCount: newLikeCount,
        likes: isLiked
          ? arrayRemove(auth.currentUser.uid)
          : arrayUnion(auth.currentUser.uid),
      });
      setLikeCount(newLikeCount);
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Error while liking:", error);
      toast.error("Failed to update like");
    }
  };

  return (
    <>
      {" "}
      <button
        onClick={likeHandler}
        className="flex items-center gap-1 px-1 py-1"
      >
        <p
          className="pt-0.5 align-middle text-[14px] leading-tight font-medium"
          style={{
            color: isDark ? "#ffffff" : "#2c2c2c",
          }}
        >
          {likeCount}
        </p>
        <BiSolidLike
          className={`align-middle text-[18px] transition-all duration-300 hover:shadow-2xl ${
            isLiked
              ? "text-blue-600"
              : isDark
                ? "text-[#fefefe]"
                : "text-[#4A4A4A]"
          }`}
        />
      </button>
    </>
  );
};

export default Like;
