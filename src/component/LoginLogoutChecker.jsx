import { Link } from "react-router-dom";
import useDocData from "../hooks/useDocData";
import { RiLoginCircleFill } from "react-icons/ri";
import { CiUser } from "react-icons/ci";

const LoginLogoutChecker = () => {
  const { data, loading } = useDocData("User");
  return (
    <div>
      <Link
        className={`flex w-full max-w-[96px] items-center justify-center rounded-full bg-[var(--color-light-gray)] shadow-sm transition-all duration-200 hover:shadow-md ${loading ? "" : "mx-auto"}`}
        to={data ? "/logout" : "/login"}
        title={data ? `${data.fname}\n${data.email}` : "Login"}
      >
        {data ? (
          data?.photo ? (
            <img
              className="h-10 w-10 rounded-full object-cover"
              src={data.photo || "./user.png"}
              alt="user profile"
              onError={(e) => {
                e.target.src = "./user.png";
              }}
            />
          ) : (
            <CiUser className="h-8 w-8 rounded-full bg-[var(--color-primary)] p-1 text-white shadow-sm" />
          )
        ) : (
          <RiLoginCircleFill className="text-4xl text-[var(--color-primary)] transition-colors duration-300 hover:text-[var(--color-secondary)] md:text-4xl" />
        )}
      </Link>
    </div>
  );
};

export default LoginLogoutChecker;
