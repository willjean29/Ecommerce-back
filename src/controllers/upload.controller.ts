import { Request, Response } from "express";
import { selectModel } from "../helpers/upload.helper";
import cloudinary from "../config/cloudinary";
const uploadImage = async (req: Request, res: Response) => {
  const { collection, id } = req.params;
  const model = selectModel(collection);
  // subir imagen a cloudinary
  try {
    const collection = await model.findById(id);
    if (!collection) {
      return res.status(404).json({
        success: false,
        message: "Collection not found",
      });
    }
    if (req.file) {
      console.log(req.file);
      const upload = await cloudinary.v2.uploader.upload(req.file.path);
      collection.image = upload.secure_url;
      await collection.save();
      return res.json({
        success: true,
        url: collection.image,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Files empty",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error upload image",
    });
  }
};
export default { uploadImage };
