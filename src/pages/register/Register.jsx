import React, { useState } from "react";
import { Link } from "react-router";
import Button from "../../component/Button";

const Register = () => {
  const [fname, setFname] = useState(null);
  const [lname, setLname] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  return (
    <div className="grid h-[80vh] w-screen place-items-center backdrop-blur">
      <form
        action=""
        className="bg-light-gray mx-auto grid w-full max-w-[320px] gap-3 rounded-[10px] p-4"
      >
        <div className="w-full max-w-[320px]">
          <label htmlFor="fname">First Name</label>
          <input
            type="text"
            className="bg-background block w-full rounded-[6px] border-1 border-gray-300 p-1 outline-0"
            placeholder="John"
            id="fname"
            onChange={(e) => setFname(e.target.value)}
          />
        </div>
        <div className="w-full max-w-[320px]">
          <label htmlFor="lname">Last Name</label>
          <input
            type="text"
            className="bg-background block w-full rounded-[6px] border-1 border-gray-300 p-1 outline-0"
            placeholder="Denver"
            id="lname"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
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
          <Button text="Register" color="primary" />
        </div>

        <p className="text-gray text-end text-[14px]">
          Already User {""}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
