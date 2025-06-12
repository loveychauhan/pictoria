import { Link } from "react-router";
import Button from "../../component/Button";
import { useState } from "react";
import { auth, db } from "../../firebase/firebase";
import { useNavigate } from "react-router";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { createPortal } from "react-dom";
import { toast, ToastContainer } from "react-toastify";

const Login = ({}) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("user logged in successfully");
      toast.success("User Logged In Successfully", {
        position: "top-center",
      });
      navigate("/");
    } catch (error) {
      console.log(error.message);
      toast.error("Server is failed to login", {
        position: "top-center",
      });
    }
  };

  const clickHandler = async () => {
    const res = await signInWithPopup(auth, provider);
    if (res.user) {
      await setDoc(doc(db, "User", res.user.uid), {
        fname: res.user.displayName,
        email: res.user.email,
        photo: res.user.photoURL,
      });
      toast.success("User Logged In Successfully", {
        position: "top-center",
      });
      navigate("/");
    }
  };
  return createPortal(
    <>
      <div className="mx-2 my-1 grid h-[80vh] grid-rows-1 place-items-center">
        <div className="mx-auto grid w-full max-w-[360px] gap-4 rounded-xl border border-gray-200 bg-[var(--color-mild-gray)] p-6 shadow-md">
          <form
            action=""
            onSubmit={handleSubmit}
            className="grid w-full max-w-[320px] gap-3"
          >
            <div className="w-full max-w-[320px]">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="bg-background block w-full rounded-[6px] border-1 border-gray-300 p-1 outline-0"
                placeholder="example@g.co"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="w-full max-w-[320px]">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="bg-background block w-full rounded-[6px] border-1 border-gray-300 p-1 outline-0"
                placeholder="*******"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="pt-2 text-center">
              <Button text="Login" color="primary" />
            </div>
          </form>
          <div>
            <p className="text-center text-xs text-gray-500">
              — or continue with —
            </p>

            <button
              className="mx-auto mt-1 block w-[70%] cursor-pointer"
              onClick={clickHandler}
            >
              <img className="w-full" src="./google.png" alt="" />
            </button>
          </div>

          <p className="text-right text-xs text-gray-500">
            Not a user?{" "}
            <Link
              to="/register"
              className="text-[var(--color-primary)] hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </>,
    document.getElementById("modal-root"),
  );
};

export default Login;
