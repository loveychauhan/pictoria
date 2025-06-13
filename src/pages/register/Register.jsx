import { useState } from "react";
import { Link, useNavigate } from "react-router";
import Button from "../../component/Button";
import { auth, db } from "../../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { createPortal } from "react-dom";
import { toast, ToastContainer } from "react-toastify";

const Register = ({ isDark }) => {
  const [fname, setFname] = useState(null);
  const [lname, setLname] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, "User", user.uid), {
          fname: fname,
          lname: lname,
          email: user.email,
          photo: null,
          isDark: false,
        });
        toast.success("User Logged In Successfully", {
          position: "top-center",
        });
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Server is failed to create user account", {
        position: "top-center",
      });
    }
  };

  return createPortal(
    <div className="mx-auto flex min-h-screen w-full items-center justify-center px-4 backdrop-blur-sm sm:px-6">
      <form
        action=""
        onSubmit={handleSubmit}
        className={`mx-auto grid w-full max-w-[360px] gap-4 rounded-xl border p-6 shadow-md transition-all duration-300 ${
          isDark
            ? "border-[#3a3a3c] bg-[#1c1c1e] text-gray-100"
            : "border-[#d1d5db] bg-[#f3f4f6] text-[#2c2c2e]"
        } `}
      >
        {[
          {
            id: "fname",
            label: "First Name",
            setter: setFname,
            placeholder: "John",
            type: "text",
          },
          {
            id: "lname",
            label: "Last Name",
            setter: setLname,
            placeholder: "Denver",
            type: "text",
          },
          {
            id: "email",
            label: "Email",
            setter: setEmail,
            placeholder: "example@g.co",
            type: "email",
          },
          {
            id: "password",
            label: "Password",
            setter: setPassword,
            placeholder: "*******",
            type: "password",
          },
        ].map(({ id, type, label, placeholder, setter }) => (
          <div key={id} className="w-full">
            <label htmlFor={id} className="text-sm text-gray-600">
              {label}
            </label>
            <input
              type={type}
              className={`mt-1 w-full rounded-md border px-3 py-2 transition outline-none ${
                isDark
                  ? "border-[#3a3a3c] bg-[#2c2c2e] text-gray-100 placeholder-gray-400"
                  : "border-gray-300 bg-white text-gray-800 placeholder-gray-500"
              } `}
              placeholder={placeholder}
              id={id}
              onChange={(e) => setter(e.target.value)}
            />
          </div>
        ))}

        <div className="pt-2 text-center">
          <Button text="Register" color="primary" />
        </div>
        <p className="text-right text-xs text-gray-500">
          Already a user?{" "}
          <Link
            to="/login"
            className={`font-medium hover:underline ${
              isDark ? "text-[#38bdf8]" : "text-blue-500"
            }`}
          >
            Login
          </Link>
        </p>
      </form>
      <ToastContainer />
    </div>,
    document.getElementById("modal-root"),
  );
};

export default Register;
