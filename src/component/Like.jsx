import { useEffect, useState } from "react";
import { BiSolidLike } from "react-icons/bi";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { toast } from "react-toastify";

const Like = ({ image }) => {
  const [likeCount, setLikeCount] = useState(image.likeCount || 0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (!auth.currentUser || !image.likes) {
      setIsLiked(false);
      return;
    }
    const liked = image.likes.includes(auth.currentUser.uid);
    setIsLiked(liked);
    // setLikeCount(image.likeCount || 0);
  }, [image.likes, image.likeCount, auth.currentUser]);

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
        className="absolute right-2 bottom-1 flex items-center gap-1"
      >
        {" "}
        <p className="mt-0.5 text-center text-[14px] font-medium text-white">
          {likeCount}
        </p>
        <BiSolidLike
          className={`text-[20px] shadow-2xl shadow-gray-800/60 transition-all duration-300 hover:shadow-2xl ${isLiked ? "text-blue-600" : "text-white"}`}
        />
      </button>
    </>
  );
};

export default Like;
