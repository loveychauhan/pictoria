import { Link } from "react-router";
import Like from "./Like";
import { useState } from "react";
import Favorite from "./Favorite";

const ImageRendering = ({ img }) => {
  const [error, setError] = useState(false);
  return (
    <Link className="relative block w-full">
      {!error ? (
        <div className="relative overflow-hidden rounded-xl shadow-md">
          {img?.url && (
            <img
              src={img.url}
              alt={img.title || "uploaded image"}
              className="h-auto w-full object-cover"
              onError={() => setError(true)}
            />
          )}
          <div className="absolute right-2 bottom-1 flex items-center gap-1">
            <Like image={img} />
            <Favorite image={img} />
          </div>
        </div>
      ) : (
        <div className="flex h-[150px] w-full animate-[gradientMove_6s_ease_infinite] items-center justify-center rounded-xl bg-gradient-to-r from-gray-300 via-indigo-200 to-pink-200 bg-[length:200%_200%] bg-[position:0%_50%] text-gray-600 shadow-md">
          <p>Image Failed to Load...</p>
        </div>
      )}
    </Link>
  );
};

export default ImageRendering;
