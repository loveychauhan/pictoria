import { useState } from "react";
import Button from "../../component/Button";
import Searchbar from "../../component/Searchbar";
import UploadModal from "../../component/UploadModal";
import { Link } from "react-router-dom";
import useDocData from "../../hooks/useDocData";
import { CiUser } from "react-icons/ci";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";
import Gallery from "../../component/Gallery";
import { auth } from "../../firebase/firebase";
import { toast } from "react-toastify";
import FilterButton from "../../component/FilterButton";
import Footer from "../../component/Footer";

const home = ({}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, loading } = useDocData("User");
  const [imageURL, setImageURL] = useState(null);
  const [isFile, setIsFile] = useState(false);
  const [filterKey, setFilterKey] = useState();
  const [search, setSearch] = useState("");
  const [openFilter, setOpenFilter] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);

  document.body.style.backgroundColor = "light-gray";

  const onclickHandler = (e) => {
    e.preventDefault();
    if (!auth.currentUser) {
      toast.info("Login to upload images , It's free 😊", {});
      return;
    }

    setIsOpen((prev) => !prev);
  };

  const handleImageUrl = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      <p className="text-red text-center">No File Present!</p>;
      return;
    }
    try {
      setUploadLoading(true);
      const imgUrl = await uploadToCloudinary(file);
      console.log(imageURL);
      setImageURL(imgUrl);
      if (imageURL) setIsFile(true);
    } catch (error) {
      console.log("upload failed");
    } finally {
      setUploadLoading(false);
    }
  };

  const clickHandler = () => {
    setOpenFilter((prev) => !prev);
  };

  const filterHandler = (e) => {
    setFilterKey(e.target.innerText);
    setOpenFilter(false);
  };

  const inputHandler = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <div className="xs:px-4 px-2 pt-2">
        <nav className="flex w-full items-center justify-between">
          <h1 className="text-gray text-2xl font-medium md:text-3xl">
            Pictoria
          </h1>
          <div className="flex gap-3">
            <Button text="Upload" onclickHandler={onclickHandler} />

            <Link
              className={`flex w-full max-w-[96px] cursor-pointer place-items-center ${loading ? "" : "mx-auto"} `}
              to={data ? "/logout" : "/login"}
            >
              {data ? (
                <>
                  {data?.photo ? (
                    <div className="h-10 w-10 cursor-pointer rounded-full">
                      <img
                        className="h-full w-full rounded-full"
                        src={data.photo || "./user.png"}
                        alt="user profile"
                        onError={(e) => {
                          e.target.src = "./user.png";
                        }}
                      />
                    </div>
                  ) : (
                    <CiUser className="h-9 w-9 rounded-full bg-blue-600 p-1 text-2xl font-medium text-white" />
                  )}
                </>
              ) : (
                <p className="rounded-[10px] border-[1px] border-gray-400 px-2 py-1.5">
                  Login
                </p>
              )}
            </Link>
          </div>
        </nav>
        <div className="flex w-full items-center justify-between">
          {" "}
          <Searchbar inputHandler={inputHandler} />
          <FilterButton
            filterHandler={filterHandler}
            clickHandler={clickHandler}
            openFilter={openFilter}
          />
        </div>
      </div>
      <UploadModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onclickHandler={onclickHandler}
        handleImageUrl={handleImageUrl}
        imageURL={imageURL}
        isFile={isFile}
        setIsFile={setIsFile}
        uploadLoading={uploadLoading}
      />
      <main className="hide-scrollbar xs:px-4 max-h-[calc(100vh-128px)] overflow-y-auto scroll-smooth px-2 pt-2">
        <Gallery imageURL={imageURL} filterKey={filterKey} search={search} />
      </main>
      <Footer />
    </>
  );
};

export default home;
