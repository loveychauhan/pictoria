import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createPortal } from "react-dom";
import Button from "../../component/Button";
import useDocData from "../../hooks/useDocData";
import { auth } from "../../firebase/firebase";
import { CiUser } from "react-icons/ci";

const LoginDetail = ({}) => {
  const { data } = useDocData("User");
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
          <div
            className="relative w-full max-w-sm space-y-4 rounded-2xl p-6 shadow-lg md:max-w-md lg:max-w-lg"
            style={{
              backgroundColor: "var(--color-light-gray)",
              color: "var(--color-gray)",
            }}
          >
            <h2 className="text-center text-2xl font-semibold text-[var(--color-gray)]">
              Welcome, {data.fname}
            </h2>

            <div className="mx-auto flex w-full max-w-[100px] justify-center rounded-full">
              {data.photo ? (
                <img
                  className="rounded-full border border-gray-300 shadow-sm"
                  src={data.photo}
                  alt="User Profile"
                  onError={(e) => {
                    e.target.src = "/user.png";
                  }}
                />
              ) : (
                <CiUser className="h-20 w-20 rounded-full bg-[var(--color-primary)] p-2 text-white shadow-md" />
              )}
            </div>

            <div className="space-y-1">
              <h3 className="text-sm text-gray-500">Name</h3>
              <p className="text-base font-medium">{data.fname}</p>
            </div>

            <div className="space-y-1">
              <h3 className="text-sm text-gray-500">Email</h3>
              <p className="text-base font-medium">{data.email}</p>
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
