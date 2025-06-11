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
    768: 3,
    400: 2,
  };

  useEffect(() => {
    let updated = images;
    if (search) {
      updated = images.filter(
        (img) =>
          img.name &&
          img.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
      );
    } else if (filterKey === "Most Liked") {
      updated = images.sort((x, y) => y.likeCount - x.likeCount);
    } else if (filterKey === "Landscape") {
      updated = images.filter(
        (img) => img.tag && img.tag === filterKey.toLocaleLowerCase(),
      );
    } else if (filterKey === "Portrait") {
      updated = images.filter(
        (img) => img.tag && img.tag === filterKey.toLocaleLowerCase(),
      );
    } else if (filterKey === "Other") {
      updated = images.filter(
        (img) => img.tag && img.tag === filterKey.toLocaleLowerCase(),
      );
    } else if (filterKey === "Nature") {
      updated = images.filter(
        (img) => img.tag && img.tag === filterKey.toLocaleLowerCase(),
      );
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
