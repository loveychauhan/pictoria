import { useState } from "react";
import { Link, useNavigate } from "react-router";
import Button from "../../component/Button";
import { auth, db } from "../../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { createPortal } from "react-dom";
import { toast, ToastContainer } from "react-toastify";

const Register = ({}) => {
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
        className="mx-auto grid w-full max-w-[360px] gap-4 rounded-xl border border-gray-200 bg-[var(--color-mild-gray)] p-6 shadow-md"
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
              className="bg-background block w-full rounded-[6px] border-1 border-gray-300 p-1 outline-0"
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
            className="text-[var(--color-primary)] hover:underline"
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
