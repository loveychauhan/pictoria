import { useState } from "react";
import Button from "../../component/Button";
import Searchbar from "../../component/Searchbar";
import UploadModal from "../../component/UploadModal";
import { Link } from "react-router-dom";
import useDocData from "../../hooks/useDocData";
import { CiUser } from "react-icons/ci";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";
import Gallery from "../../component/Gallery";

const home = ({}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, loading } = useDocData("User");
  const [imageURL, setImageURL] = useState(null);
  const [isFile, setIsFile] = useState(false);
  console.log("hello home");

  const onclickHandler = (e) => {
    e.preventDefault();
    setIsOpen((prev) => !prev);
  };

  const handleImageUrl = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      <p className="text-red text-center">No File Present!</p>;
      return;
    }
    const imgUrl = await uploadToCloudinary(file);
    setImageURL(imgUrl);
    setIsFile(true);
  };

  return (
    <>
      <div>
        <nav className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-medium">Pictoria</h1>
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
                    <CiUser className="text-2xl" />
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
        <Searchbar />
      </div>
      <UploadModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onclickHandler={onclickHandler}
        handleImageUrl={handleImageUrl}
        imageURL={imageURL}
        isFile={isFile}
        setIsFile={setIsFile}
      />
      <main>
        <Gallery imageURL={imageURL} />
      </main>
    </>
  );
};

export default home;
