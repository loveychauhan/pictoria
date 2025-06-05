import { useEffect, useState } from "react";
import useDocData from "../hooks/useDocData";
import Button from "./Button";
import { Link } from "react-router";
import { toast } from "react-toastify";
import { auth } from "../firebase/firebase";
import { createPortal } from "react-dom";

const LoginDetail = ({ isOpen }) => {
  const { userDetail, loading } = useDocData();
  const clickHandler = async () => {
    try {
      await auth.signOut();
      toast.success("Logout Successfully", {
        position: "top-center",
      });
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
      });
    }
  };

  useEffect(() => {
    console.log(userDetail);
  }, [userDetail]);

  return createPortal(
    <>
      {userDetail ? (
        <div className="absolute top-0 grid h-screen w-screen place-items-center backdrop-blur">
          <div className="bg-light-gray relative mx-auto grid w-full max-w-[320px] gap-3 rounded-[10px] p-4">
            <h2 className="text-center text-2xl font-medium">
              Welcome {userDetail.fname}
            </h2>
            <div>
              <h3>Name</h3>
              <p>{userDetail.fname}</p>
            </div>
            <div>
              <h3>Email</h3>
              <p>{userDetail.email}</p>
            </div>

            <Link to="/" onClick={clickHandler}>
              <Button text="Logout" color="favorites" />
            </Link>
          </div>
        </div>
      ) : (
        ""
      )}
    </>,
    document.getElementById("modal-root"),
  );
};

export default LoginDetail;
