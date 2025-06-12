import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { toast } from "react-toastify";

const useImages = () => {
  const [images, setImages] = useState([]);
  useEffect(() => {
    const fetchQuery = async () => {
      try {
        const queryContainer = await getDocs(collection(db, "Image"))
        const imageContainer = queryContainer.docs.map((doc) => ({
          id: doc.id, ...doc.data()
        }))
        setImages(imageContainer.filter((img) => Array.isArray(img.url)));
      } catch (error) {
        toast.error('Image failing to load', {
          position: 'top-center'
        })
      }
    }
    fetchQuery()
  }, [])

  return { images };
};

export default useImages;
