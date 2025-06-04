import { useState } from "react";
import Button from "../../component/Button";
import Searchbar from "../../component/Searchbar";
import UplaodModal from "../../component/UplaodModal";
import { Link } from "react-router";
import LoginDetail from "../../component/LoginDetail";
import { ToastContainer } from "react-toastify";

const home = () => {
  const [isOpen, setIsOpen] = useState(false);
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
              className={`w-full max-w-[96px] cursor-pointer rounded-[10px] border-[1px] border-gray-400 px-2 py-1.5`}
              to="/login"
            >
              Login
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
      <main>
        <LoginDetail />
      </main>

    </>
  );
};

export default home;
