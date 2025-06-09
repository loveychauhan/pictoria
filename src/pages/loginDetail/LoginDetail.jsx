import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createPortal } from "react-dom";
import Button from "../../component/Button";
import useDocData from "../../hooks/useDocData";
import { auth } from "../../firebase/firebase";

const LoginDetail = ({}) => {
  const { data, loading } = useDocData("User");
  const navigate = useNavigate();
  const clickHandler = async () => {
    try {
      await auth.signOut();
      toast.success("Logout Successfully", {
        position: "top-center",
      });
      navigate("/");
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
      });
    }
  };
  return createPortal(
    <>
      {data ? (
        <div className="fixed inset-0 z-50 grid place-items-center p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-sm space-y-4 rounded-2xl bg-white p-6 shadow-xl md:max-w-md lg:max-w-lg dark:bg-gray-800">
            <h2 className="text-center text-2xl font-semibold text-gray-800 dark:text-white">
              Welcome, {data.fname}
            </h2>

            <div className="mx-auto w-full max-w-[100px] rounded-full">
              {data.photo ? (
                <img
                  className="rounded-full"
                  src={data.photo}
                  alt="user Profile"
                  onError={(e) => {
                    e.target.src = "/user.png";
                  }}
                />
              ) : (
                ""
              )}
            </div>
            <div className="space-y-1">
              <h3 className="text-sm text-gray-500 dark:text-gray-300">Name</h3>
              <p className="text-base font-medium text-gray-700 dark:text-white">
                {data.fname}
              </p>
            </div>

            <div className="space-y-1">
              <h3 className="text-sm text-gray-500 dark:text-gray-300">
                Email
              </h3>
              <p className="text-base font-medium text-gray-700 dark:text-white">
                {data.email}
              </p>
            </div>

            <div className="pt-2">
              <Link onClick={clickHandler}>
                <Button text="Logout" color="favorites" />
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </>,
    document.getElementById("modal-root"),
  );
};

export default LoginDetail;
