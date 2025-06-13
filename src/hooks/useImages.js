import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { toast } from "react-toastify";

const useImages = () => {
  const [images, setImages] = useState([]);
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "Image"),
      (snapshot) => {
        const imageContainer = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const filtered = imageContainer.filter((img) =>
          Array.isArray(img.url) // or typeof img.url === 'string' depending on your schema
        );

        setImages(filtered);
      },
      (error) => {
        toast.error("Image failing to load", {
          position: "top-center",
        });
        console.error("Snapshot error:", error);
      }
    );

    return () => unsubscribe();
  }, [])

  return { images };
};

export default useImages;
