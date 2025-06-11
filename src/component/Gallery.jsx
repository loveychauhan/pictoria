import Masonry from "react-masonry-css";
import ImageRendering from "./ImageRendering";
import useImages from "../hooks/useImages";
import { useEffect, useState } from "react";

const Gallery = ({ filterKey, search }) => {
  const { images } = useImages();
  const [filteredData, setFilteredData] = useState([]);

  const breakpoints = {
    default: 6,
    1280: 4,
    768: 2,
    400: 1,
  };

  useEffect(() => {
    let updated = images;
    const key = filterKey?.toLocaleLowerCase();

    if (search) {
      updated = images.filter(
        (img) =>
          img.name &&
          img.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
      );
    } else if (filterKey === "Most Liked") {
      updated = images
        .filter((img) => img.url)
        .sort((x, y) => y.likeCount - x.likeCount);
    } else if (["landscape", "nature", "portrait", "other"].includes(key)) {
      updated = images.filter((img) => img.tag === key);
    } else {
      updated = images;
    }
    setFilteredData(updated);
  }, [filterKey, images, search]);

  return (
    <Masonry
      breakpointCols={breakpoints}
      className="flex w-full gap-4"
      columnClassName="space-y-4"
    >
      {filteredData?.map((img) => {
        return <ImageRendering key={img.id} img={img} />;
      })}
    </Masonry>
  );
};

export default Gallery;
