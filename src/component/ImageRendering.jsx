import { Link } from "react-router";
import Like from "./Like";
import { useState } from "react";
import Favorite from "./Favorite";
import { IoMdClose } from "react-icons/io";

const ImageRendering = ({ img, isDark }) => {
  const [error, setError] = useState(false);
  const [preview, setPreview] = useState(false);

  const previewHandler = (e) => {
    e.stopPropagation();
    setPreview((prev) => !prev);
  };
  return (
    <div className="relative">
      <Link className="block w-full" onClick={previewHandler}>
        {!error ? (
          <div className="overflow-hidden rounded-xl shadow-md">
            {img?.url && (
              <img
                src={img.url}
                alt={img.title || "uploaded image"}
                className="h-auto w-full object-cover"
                onError={() => setError(true)}
              />
            )}
          </div>
        ) : (
          <div className="flex h-[150px] w-full animate-[gradientMove_6s_ease_infinite] items-center justify-center rounded-xl bg-gradient-to-r from-gray-300 via-indigo-200 to-pink-200  text-gray-600 shadow-md">
            <p>Image Failed to Load...</p>
          </div>
        )}
      </Link>
      <div className="flex items-center justify-end gap-1">
        <Like image={img} isDark={isDark} />
        <Favorite image={img} isDark={isDark} />
      </div>

      <>
        {preview ? (
          <div className="fixed inset-0 z-50 grid h-screen place-items-center p-2 backdrop-blur">
            <div
              className="hide-scrollbar max-h-screen w-full max-w-[640px] overflow-y-auto rounded-[10px] p-2 md:p-4"
              style={{ backgroundColor: isDark ? "#2c2c2e" : "#e0e0e0" }}
            >
              <button onClick={previewHandler} className="ml-auto block">
                <IoMdClose
                  className="text-2xl font-medium"
                  style={{ color: isDark ? "#e0e0e0 " : "#2c2c2e" }}
                />
              </button>
              <div className="w-full object-cover p-4 text-black">
                <img
                  className="mx-auto rounded-[10px]"
                  src={img.url[0]}
                  alt=""
                />
                <div className="flex items-baseline justify-between">
                  <div className="flex items-center gap-1 text-3xl">
                    <Like image={img} isDark={isDark} />
                    <Favorite image={img} isDark={isDark} />
                  </div>
                  <div
                    className="flex flex-col items-end px-4"
                    style={{ color: isDark ? "#e0e0e0 " : "#2c2c2e" }}
                  >
                    <p className="text-xl font-medium">
                      {img.name ? img.name : ""}
                    </p>
                    <p>{img.tag ? <span>#{img.tag}</span> : ""}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </>
    </div>
  );
};

export default ImageRendering;
