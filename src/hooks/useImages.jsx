import { getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";

const useImages = () => {
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
        console.log("error");
      }
    };
    fetchImage();
  }, []);
  return [images];
};

export default useImages;
