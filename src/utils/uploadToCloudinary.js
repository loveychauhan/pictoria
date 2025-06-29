
import { toast } from "react-toastify";

export const uploadToCloudinary = async (file) => {

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "pictoriaUploads");
  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dlxvavkz0/upload`,
      {
        method: "POST",
        body: formData,
      },
    );
    const data = await response.json();
    console.log(data)

    if (!data.secure_url) {
      toast.error("Image Failed to generate Url...", {
        position: "top-center",
      });
      return false
    }
    return [data.secure_url];
  } catch (error) {
    console.log(error.message);
  }
};
