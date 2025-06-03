import { Link } from "react-router";
import Button from "../../component/Button";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  return (
    <div className="grid h-[80vh] w-screen place-items-center backdrop-blur">
      <form
        action=""
        className="bg-light-gray mx-auto grid w-full max-w-[320px] gap-3 rounded-[10px] p-4"
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
        <div className="text-center">
          <Button text="Login" color="primary" />
        </div>

        <div>
          <p className="text-gray text-center text-[14px]">
            --Or Continue With--
          </p>
          <button className="mx-auto mt-1 block w-[70%] cursor-pointer">
            <img className="w-full" src="./google.png" alt="" />
          </button>
        </div>
        <p className="text-gray text-end text-[14px]">
          Not a User {""}
          <Link to="/register" className="text-blue-500">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
