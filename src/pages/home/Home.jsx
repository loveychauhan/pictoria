import { useState } from "react";
import Button from "../../component/Button";
import Searchbar from "../../component/Searchbar";
import UplaodModal from "../../component/UplaodModal";
import { Link } from "react-router";
import LoginDetail from "../../component/LoginDetail";
import useDocData from "../../hooks/useDocData";
import { CiUser } from "react-icons/ci";

const home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { userDetail, loading } = useDocData();
  const onclickHandler = (e) => {
    e.preventDefault();
    setIsOpen((prev) => !prev);
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
              to={userDetail ? "/logout" : "/login"}
            >
              {userDetail ? (
                <>
                  {userDetail.photo ? (
                    <div className="h-10 w-10 cursor-pointer rounded-full">
                      <img
                        className="h-full w-full rounded-full"
                        src={userDetail.photo}
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
      <UplaodModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onclickHandler={onclickHandler}
      />
      <main></main>
    </>
  );
};

export default home;
