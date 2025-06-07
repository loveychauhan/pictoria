import { Link, useNavigate } from "react-router";
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
        <div className="absolute top-0 grid h-screen w-screen place-items-center backdrop-blur">
          <div className="bg-light-gray relative mx-auto grid w-full max-w-[320px] gap-3 rounded-[10px] p-4">
            <h2 className="text-center text-2xl font-medium">
              Welcome {data.fname}
            </h2>
            <div>
              <h3>Name</h3>
              <p>{data.fname}</p>
            </div>
            <div>
              <h3>Email</h3>
              <p>{data.email}</p>
            </div>

            <Link onClick={clickHandler}>
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
