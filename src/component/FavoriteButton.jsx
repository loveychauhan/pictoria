import { MdFavorite } from "react-icons/md";

const FavoriteButton = ({ favCollection}) => {
  return (
    <button
      title="Favorites"
      className="md:flex md:justify-center"
      onClick={favCollection}
    >
      <MdFavorite className="2s text-[20px] text-[var(--color-favorites)] transition-all ease-in-out hover:text-pink-500 md:text-3xl" />
    </button>
  );
};

export default FavoriteButton;
