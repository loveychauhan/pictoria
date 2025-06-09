import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import Like from "./Like";
import Masonry from "react-masonry-css";

const Gallery = () => {
  const [error, setError] = useState(false);
  const [images, setImages] = useState([]);
  console.log("hello gallery");

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Image"));
        const imageContainer = [];
        querySnapshot.forEach((doc) => {
          imageContainer.push({ id: doc.id, ...doc.data() });
        });
        setImages(imageContainer);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchImage();
  }, []);

  const breakpoints = {
    default: 4,
    1100: 3,
    768: 2,
    500: 1,
  };

  return (
    <Masonry
      breakpointCols={breakpoints}
      className="flex w-full gap-4"
      columnClassName="space-y-4"
    >
      {images.map((img) => {
        return (
          <Link key={img.id} className="relative block">
            <Like image={img} />{" "}
            {error ? (
              <div className="bg-light-gray h-[240px] w-[180px] w-full rounded-xl"></div>
            ) : (
              ""
            )}
            {img?.url ? (
              <img
                className="w-full rounded-xl object-cover"
                src={img.url}
                onError={(e) => {
                  setError(true);
                }}
              />
            ) : (
              ""
            )}
          </Link>
        );
      })}
    </Masonry>
  );
};

export default Gallery;
