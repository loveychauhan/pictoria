import { createPortal } from "react-dom";
import Button from "./Button";
import { useState } from "react";
import { auth, db } from "../firebase/firebase";
import { setDoc, doc, collection } from "firebase/firestore";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const UploadModal = ({
  isOpen,
  setIsOpen,
  uploadHandler,
  handleImageUrl,
  imageURL,
  uploadLoading,
  isDark,
}) => {
  const [name, setName] = useState("");
  const [tag, setTag] = useState("");

  if (isOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    const newDocRef = doc(collection(db, "Image"));
    try {
      await setDoc(newDocRef, {
        url: imageURL,
        tag,
        name,
        imgId: newDocRef.id,
        likeCount: 0,
        likes: [],
        favorites: [],
        uploadedBy: user.uid || "unknown",
      });
      window.location.reload();
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsOpen(false);
    }
  };

  const handleTagClick = (e) => {
    e.stopPropagation();
    setTag(e.target.innerText.replace("#", ""));
  };

  const tags = ["nature", "landscape", "portrait", "other"];

  return createPortal(
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center p-2 backdrop-blur">
          <form
            onSubmit={submitHandler}
            className="relative mx-auto grid w-full max-w-sm gap-4 rounded-xl bg-[var(--color-light-gray)] p-4"
            style={{
              backgroundColor: isDark ? "#2c2c2e" : "#e0e0e0",
              color: !isDark ? "#2c2c2e" : "#e0e0e0",
            }}
          >
            <h2 className="text-center text-2xl font-medium">Upload a Photo</h2>
            <input
              type="file"
              name="img"
              id="img"
              accept="image/*"
              className="hidden"
              onChange={handleImageUrl}
            />
            <label
              htmlFor="img"
              className={`flex cursor-pointer items-center justify-center gap-1 rounded-lg border-2 px-6 py-3 transition duration-300 ${
                isDark
                  ? "border-[#3a3a3c] bg-[#1c1c1c] text-[#f3f4f6] hover:bg-[#2c2c2e]"
                  : "border-[#d1d5db] bg-[#f3f4f6] text-[#2c2c2e] hover:bg-[#e5e7eb]"
              } `}
            >
              {!uploadLoading ? (
                imageURL ? (
                  <p className="flex items-center gap-2">
                    <img
                      src={imageURL}
                      alt="image available"
                      className="w-[40px] object-cover"
                    />
                    <span>Image Selected</span>
                  </p>
                ) : (
                  <p className="flex items-center gap-1">
                    <span role="img">📁</span>
                    <span>Select Image</span>
                  </p>
                )
              ) : (
                <AiOutlineLoading3Quarters className="animate-spin text-xl font-medium text-[#FCD34D] transition-all ease-in-out" />
              )}
            </label>
            <div>
              <label htmlFor="title" className="font-medium">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="(Nature)"
                className="text-gray placeholder-gray block w-full rounded-[10px] border-2 border-gray-300 p-1 outline-0 md:text-xl"
              />
            </div>
            <div className="grid gap-1.5">
              <p className="font-medium">Tags</p>
              <div className="flex justify-evenly">
                {tags.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={handleTagClick}
                    className={`cursor-pointer rounded-[6px] border border-gray-400 px-1.5 py-0.5 text-sm ${
                      tag === `${item}`
                        ? "bg-[var(--color-favorites)] text-white"
                        : ""
                    }`}
                  >
                    #{item}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-center gap-2">
              <Button text="Cancel" uploadHandler={uploadHandler} />
              <Button text="Upload" color="primary" />
            </div>
          </form>
        </div>
      )}
    </>,
    document.getElementById("modal-root"),
  );
};

export default UploadModal;
