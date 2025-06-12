import UploadAndLoginButtons from "./UploadAndLoginButtons";

const NavBar = ({ uploadHandler }) => {
  return (
    <nav className="flex w-full items-center justify-between md:hidden">
      <h1 className="text-gray text-2xl font-medium md:text-3xl">Pictoria</h1>
      <UploadAndLoginButtons uploadHandler={uploadHandler} />
    </nav>
  );
};

export default NavBar;
