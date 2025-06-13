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

const Login = ({ isDark }) => {
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
        isDark: false,
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
        <div
          className={`mx-auto grid w-full max-w-[360px] gap-4 rounded-xl border p-6 shadow-md transition-all duration-300 ${
            isDark
              ? "border-[#3a3a3c] bg-[#1c1c1e] text-gray-100"
              : "border-[#d1d5db] bg-[#f3f4f6] text-[#2c2c2e]"
          } `}
        >
          <form
            onSubmit={handleSubmit}
            className="grid w-full max-w-[320px] gap-4"
          >
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="example@g.co"
                onChange={(e) => setEmail(e.target.value)}
                className={`mt-1 w-full rounded-md border px-3 py-2 transition outline-none ${
                  isDark
                    ? "border-[#3a3a3c] bg-[#2c2c2e] text-gray-100 placeholder-gray-400"
                    : "border-gray-300 bg-white text-gray-800 placeholder-gray-500"
                } `}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="*******"
                onChange={(e) => setPassword(e.target.value)}
                className={`mt-1 w-full rounded-md border px-3 py-2 transition outline-none ${
                  isDark
                    ? "border-[#3a3a3c] bg-[#2c2c2e] text-gray-100 placeholder-gray-400"
                    : "border-gray-300 bg-white text-gray-800 placeholder-gray-500"
                } `}
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
              className="mx-auto mt-1 block w-[70%] cursor-pointer rounded-md transition hover:brightness-110"
              onClick={clickHandler}
            >
              <img
                className="w-full"
                src="./google.png"
                alt="Continue with Google"
              />
            </button>
          </div>

          <p className="text-right text-xs">
            Not a user?{" "}
            <Link
              to="/register"
              className={`font-medium hover:underline ${
                isDark ? "text-[#38bdf8]" : "text-blue-500"
              }`}
            >
              Register
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </>,
    document.getElementById("modal-root"),
  );
};

export default Login;
