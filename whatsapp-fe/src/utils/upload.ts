import axios from "axios";
import { CloudinaryResponse } from "../common/cloudinary.interface";

export const uploadFiles = async (files: {
    imgData: string | ArrayBuffer | null | undefined;
    file: File;
    type: string;
}[]) => {
    let formData = new FormData()
    formData.append("upload_preset", process.env.REACT_APP_CLOUD_SECRET!)
    let uploaded : {
        file: CloudinaryResponse,
        type: string
    }[] = []

    for (const { file, type } of files) {
        formData.append("file", file);
        try {
          const res = await uploadToCloudinary(formData);
          uploaded.push({
            file: res,
            type,
          });
        } catch (error) {
          console.error("Error uploading file:", error);
          // Handle the error if needed
        }
      }
    return uploaded 
}



const uploadToCloudinary = async (formData:FormData):Promise<CloudinaryResponse> => {
    return new Promise(async (resolve) => {
      return await axios
        .post(
          `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/raw/upload`,
          formData
        )
        .then(({ data }) => {
          resolve(data);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };