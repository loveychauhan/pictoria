import { useOutletContext } from "react-router";
import Gallery from "./Gallery";

const Home = () => {
  const { filterKey, search, customCollection, isDark } = useOutletContext();
  return (
    <div>
      <Gallery
        filterKey={filterKey}
        search={search}
        customCollection={customCollection}
        isDark={isDark}
      />
    </div>
  );
};

export default Home;
