import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { use, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Gallery = ({ imageUrl }) => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(false);

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
        console.log("error");
      }
    };
    fetchImage();
  }, []);

  return (
    <div className="flex w-full flex-wrap gap-2">
      {images.map((img) => {
        return (
          <Link key={img.id}>
            {" "}
            {error ? (
              <div className="bg-light-gray h-[240px] w-[180px]"></div>
            ) : (
              ""
            )}
            {img ? (
              <img
                className="w-[200px] object-cover"
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
    </div>
  );
};

export default Gallery;
