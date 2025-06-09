import { useState } from "react";
import { BiSolidLike } from "react-icons/bi";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { toast } from "react-toastify";

const Like = ({ image }) => {
  const [likeCount, setLikeCount] = useState(image.likes || 0);
  const [isLiked, setIsLiked] = useState(false);

  const likeHandler = async () => {
    const newLikeCount = isLiked ? likeCount - 1 : likeCount + 1;
    const docRef = doc(db, "Image", image.id);

    try {
      await updateDoc(docRef, {
        likes: newLikeCount,
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
        className="absolute right-2 bottom-1 flex  items-center  gap-1"
      >
        {" "}
        <p className="text-center text-[14px] mt-0.5 font-medium text-white">
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
