import { MdAddCircle } from "react-icons/md";

import Button from "./Button";
import LoginLogoutChecker from "./LoginLogoutChecker";

const UploadAndLoginButtons = ({ uploadHandler }) => {
  return (
    <div className="flex gap-3 md:flex-col-reverse md:justify-center md:gap-6">
      <Button
        text="Upload"
        Icon={
          <MdAddCircle className="text-4xl text-[var(--color-primary)] transition-colors duration-300 hover:text-[var(--color-secondary)] xl:text-5xl" />
        }
        uploadHandler={uploadHandler}
      />

      <LoginLogoutChecker />
    </div>
  );
};

export default UploadAndLoginButtons;
