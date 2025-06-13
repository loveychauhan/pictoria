import UploadAndLoginButtons from "./UploadAndLoginButtons";

const NavBar = ({ uploadHandler, isDark }) => {
  return (
    <nav className="flex w-full items-center justify-between md:hidden">
      <h1
        className="text-2xl font-medium md:text-3xl"
        style={{ color: !isDark ? "#2c2c2e" : "#e0e0e0" }}
      >
        Pictoria
      </h1>
      <UploadAndLoginButtons uploadHandler={uploadHandler} />
    </nav>
  );
};

export default NavBar;
