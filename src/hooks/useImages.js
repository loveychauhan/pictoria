import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { toast } from "react-toastify";

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
        toast.error('Image failing to load', {
          position: 'top-center'
        })
      }
    };
    fetchImage();
  }, []);

  return { images };
};

export default useImages;
