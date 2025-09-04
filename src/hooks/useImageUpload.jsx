import { useState } from "react";

export const useImageUpload = (apiProvider = "imgbb") => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const upload = async (file) => {
    setLoading(true);
    setError("");

    try {
      let url;

      switch (apiProvider) {
        case "imgbb":
          url = await uploadToImgBB(file);
          break;
        case "cloudinary":
          url = await uploadToCloudinary(file);
          break;
        case "imgur":
          url = await uploadToImgur(file);
          break;
        default:
          throw new Error("不支持的API提供商");
      }

      setImageUrl(url);
      return url;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  const uploadToImgBB = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    let key = import.meta.env.VITE_APP_APIKEY;

    const response = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    return data.data.url;
  };
  const uploadToCloudinary = async (file) => {};
  const uploadToImgur = async (file) => {};
  return { upload, loading, error, imageUrl, setImageUrl };
};
