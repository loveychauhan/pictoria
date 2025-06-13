import Masonry from "react-masonry-css";
import ImageRendering from "./ImageRendering";
import useImages from "../hooks/useImages";
import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

const Gallery = ({ filterKey, search, customCollection, isDark }) => {
  const { images } = useImages();
  const [filteredData, setFilteredData] = useState([]);
  const [user, setUser] = useState(null);

  const breakpoints = {
    default: 6,
    1280: 4,
    768: 2,
    400: 1,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const key = filterKey?.toLowerCase();
    let updated = images;

    if (customCollection && user) {
      updated = images.filter(
        (img) =>
          Array.isArray(img.favorites) && img.favorites.includes(user.uid),
      );
    }

    if (search) {
      updated = updated.filter(
        (img) =>
          img.name && img.name.toLowerCase().includes(search.toLowerCase()),
      );
    } else if (filterKey === "Most Liked") {
      updated = updated
        .filter((img) => img.url)
        .sort((x, y) => y.likeCount - x.likeCount);
    } else if (["landscape", "nature", "portrait", "other"].includes(key)) {
      updated = updated.filter((img) => img.tag === key);
    }

    setFilteredData(updated);
  }, [filterKey, images, search, customCollection, user]);

  return (
    <Masonry
      breakpointCols={breakpoints}
      className="flex w-full gap-4"
      columnClassName="space-y-4"
    >
      {filteredData?.map((img) => (
        <ImageRendering key={img.id} img={img} isDark={isDark} />
      ))}
    </Masonry>
  );
};

export default Gallery;
