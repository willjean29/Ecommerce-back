import { UploadController } from "../controllers";
import { Router } from "express";
import { uploadImage, isValidCollection } from "../middlewares";

const router = Router();
router.post("/:collection/:id", isValidCollection, uploadImage, UploadController.uploadImage);
export default router;
