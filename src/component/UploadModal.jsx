import { createPortal } from "react-dom";
import Button from "./Button";
import { useState } from "react";
import { auth, db } from "../firebase/firebase";
import { setDoc, doc, collection } from "firebase/firestore";
import { RiFolderCheckFill } from "react-icons/ri";

const UploadModal = ({
  isOpen,
  setIsOpen,
  onclickHandler,
  handleImageUrl,
  imageURL,
  isFile,
}) => {
  const [name, setName] = useState("");
  const [tag, setTag] = useState("");
  // console.log("hello modal");

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
        likes: 0,
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
    setTag(e.target.innerText);
  };

  const tags = ["nature", "landscape", "portrait", "other"];

  return createPortal(
    <>
      {isOpen && (
        <div className="absolute top-0 grid h-screen w-full place-items-center backdrop-blur">
          <form
            onSubmit={submitHandler}
            className="bg-light-gray relative mx-auto grid w-full max-w-[320px] gap-3 rounded-[10px] p-4"
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
              className="flex cursor-pointer items-center justify-center gap-1 rounded-lg border-2 border-gray-300 bg-gray-100 px-6 py-3 text-gray-700 transition duration-300 hover:bg-gray-200"
            >
              {isFile ? (
                <RiFolderCheckFill className="text-2xl text-[#FCD34D]" />
              ) : (
                "📁"
              )}{" "}
              Select Image
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
                      tag === `#${item}` ? "bg-favorites text-white" : ""
                    }`}
                  >
                    #{item}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-center gap-2">
              <Button text="Cancel" onclickHandler={onclickHandler} />
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
