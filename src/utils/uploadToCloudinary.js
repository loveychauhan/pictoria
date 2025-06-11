
import { toast } from "react-toastify";

export const uploadToCloudinary = async (file) => {

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "pictoria_uploads");
  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dswm21b6b/upload`,
      {
        method: "POST",
        body: formData,
      },
    );
    const data = await response.json();

    if (!data.secure_url) {
      toast.error("Image Failed to generate Url...", {
        position: "top-center",
      });
    }
    return [data.secure_url];
  } catch (error) {
    console.log(error.message);
  }
};
