import { createPortal } from "react-dom";
import Button from "./Button";
import { useState } from "react";

const UplaodModal = ({ isOpen, setIsOpen, onclickHandler }) => {
  const [isImage, setIsImage] = useState(false);
  const submitHandler = (e) => {
    e.preventDefault();
    if (isImage) {
      setIsOpen((prev) => !prev);
    }
  };
  return createPortal(
    <>
      {isOpen && (
        <div
          className="absolute top-0 grid h-screen w-screen place-items-center backdrop-blur"
        >
          <form
            action="/upload"
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
            />
            <label
              htmlFor="img"
              className="flex cursor-pointer items-center justify-center rounded-lg border-[2px] border-gray-300 bg-gray-100 px-6 py-3 text-gray-700 transition duration-300 hover:bg-gray-200"
            >
              📁 Select Image
            </label>
            <div className="">
              <label htmlFor="title" className="font-medium">
                Title
              </label>
              <input
                type="text"
                id="title"
                placeholder="(Nature)"
                className="text-gray placeholder-gray block w-full rounded-[10px] border-2 border-gray-300 p-1 outline-0 md:text-xl"
              />
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

export default UplaodModal;
