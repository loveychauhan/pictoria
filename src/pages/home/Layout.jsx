import { useState } from "react";
import UploadModal from "../../component/UploadModal";
import Searchbar from "../../component/SearchBar";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";
import { auth } from "../../firebase/firebase";
import { toast } from "react-toastify";
import FilterButton from "../../component/FilterButton";
import Footer from "../../component/Footer";
import NavBar from "../../component/NavBar";
import SideNav from "../../component/SideNav";
import { Outlet } from "react-router";

const Layout = ({ isDark, darkModeHandler }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [imageURL, setImageURL] = useState(null);
  const [isFile, setIsFile] = useState(false);
  const [filterKey, setFilterKey] = useState();
  const [search, setSearch] = useState("");
  const [openFilter, setOpenFilter] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [customCollection, setCustomCollection] = useState(false);
  const [settingOpen, setSettingOpen] = useState(false);

  const uploadHandler = (e) => {
    e.preventDefault();
    if (!auth.currentUser) {
      toast.info("Login to upload images , It's free 😊", {});
      return;
    }
    setIsOpen((prev) => !prev);
  };

  const favCollection = () => {
    if (!auth.currentUser) {
      toast.info("Login to see collection, It's free 😊", {
        position: "top-center",
      });
      return;
    }
    setCustomCollection((prev) => !prev);
  };

  const handleImageUrl = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      toast.warn("No file selected!", { position: "top-center" });
      return;
    }
    try {
      setUploadLoading(true);
      const imgUrl = await uploadToCloudinary(file);
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

  const settingHandler = () => {
    setSettingOpen((prev) => !prev);
  };

  return (
    <div className="h-screen md:flex">
      <SideNav
        uploadHandler={uploadHandler}
        favCollection={favCollection}
        settingHandler={settingHandler}
        settingOpen={settingOpen}
        darkModeHandler={darkModeHandler}
        isDark={isDark}
      />
      <div className="w-full">
        <div className="xs:px-4 px-2 pt-2">
          <NavBar uploadHandler={uploadHandler} isDark={isDark} />
          <div className="flex w-full items-center justify-between">
            {" "}
            <Searchbar inputHandler={inputHandler} isDark={isDark} />
            <FilterButton
              filterHandler={filterHandler}
              clickHandler={clickHandler}
              openFilter={openFilter}
              isDark={isDark}
            />
          </div>
        </div>
        <UploadModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          uploadHandler={uploadHandler}
          handleImageUrl={handleImageUrl}
          imageURL={imageURL}
          isFile={isFile}
          setIsFile={setIsFile}
          uploadLoading={uploadLoading}
          isDark={isDark}
        />
        <main className="hide-scrollbar xs:px-4 max-h-[calc(100vh-128px)] overflow-y-auto scroll-smooth px-2 pt-2 pb-1">
          <Outlet context={{ filterKey, search, customCollection, isDark }} />
        </main>
      </div>
      <Footer
        favCollection={favCollection}
        settingHandler={settingHandler}
        settingOpen={settingOpen}
        darkModeHandler={darkModeHandler}
        isDark={isDark}
      />
    </div>
  );
};

export default Layout;
