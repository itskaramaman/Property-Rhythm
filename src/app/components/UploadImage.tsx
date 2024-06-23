"use client";

import axios from "axios";
import { useState } from "react";

const UploadImage = () => {
  const [uploading, setUploading] = useState<Boolean>(false);
  const [imageUrls, setImageUrls] = useState<String[]>([]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const { files } = e.target;
      const formData = new FormData();

      // @ts-ignore
      Array.from(files).map((file, index) =>
        formData.append(`file${index}`, file)
      );

      const response = await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response);
    } catch (error: any) {
      throw new Error(error.message);
    }

    // setUploading(true);
    // const files: FileList | null = e.target?.files;
    // Array.from(files).map(async (file) => {
    //   try {
    //     const { data: signatureData } = await axios.get("/api/upload");
    //     // generate form data
    //     const formData = new FormData();
    //     formData.append("file", file);
    //     formData.append("timestamp", signatureData.timestamp);
    //     formData.append("signature", signatureData.signature);
    //     formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);
    //     // Upload file to Cloudinary
    //     const uploadResponse = await axios.post(
    //       `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
    //       formData,
    //       { headers: { "Content-Type": "multipart/form-data" } }
    //     );
    //     setImageUrls()
    //     return uploadResponse.data;
    //   } catch (error: any) {
    //     throw new Error("Failed to upload file: ", error.message);
    //   }
    //   setUploading(false);
    // });
  };
  return (
    <input
      type="file"
      className="border rounded w-full py-2 px-3"
      accept="image/*"
      multiple
      onChange={handleImageUpload}
    />
  );
};

export default UploadImage;
