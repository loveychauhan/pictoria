import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { toast } from "react-toastify";

const useImages = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "Image"),
      (snapshot) => {
        const imageContainer = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const filtered = imageContainer.filter((img) =>
          Array.isArray(img.url)
        );

        setImages(filtered);
        setLoading(false)
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

  return { images, loading };
};

export default useImages;
