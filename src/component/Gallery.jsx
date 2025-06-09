import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import Like from "./Like";
import Masonry from "react-masonry-css";
import ImageRendering from "./ImageRendering";

const Gallery = () => {
  const [error, setError] = useState(false);
  const [images, setImages] = useState([]);

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
    default: 5,
    1280: 4,
    1024: 3,
    768: 2,
    400: 1,
  };

  return (
    <Masonry
      breakpointCols={breakpoints}
      className="flex w-full gap-4"
      columnClassName="space-y-4"
    >
      {images
        .filter((img) => img.url)
        .map((img) => {
          return <ImageRendering key={img.id} img={img} />;
        })}
    </Masonry>
  );
};

export default Gallery;
