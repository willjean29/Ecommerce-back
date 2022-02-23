import multer from "multer";
import path from "path";
import shortId from "shortid";
import { Request, Response, NextFunction } from "express";
const uploadImage = (req: Request, res: Response, next: NextFunction) => {
  upload(req, res, function (err) {
    if (err) {
      if (err instanceof multer.MulterError) {
        if (err.code == "LIMIT_FILE_SIZE") {
          return res.status(500).json({
            success: false,
            message: "El archivo es muy pesado : Peso max 500kb",
          });
        } else {
          return res.status(500).json({
            success: false,
            message: err.message,
          });
        }
      } else {
        return res.status(500).json({
          success: false,
          message: err,
        });
      }
    } else {
      return next();
    }
  });
};

const upload = multer({
  limits: { fieldSize: 500000 },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, "../uploads/img"));
    },
    filename: (req, file, cb) => {
      cb(null, shortId.generate() + path.extname(file.originalname));
    },
  }),
  fileFilter: (req, file, cb) => {
    const filesTypes = /jpeg|jpg|png/;
    const mimeType = filesTypes.test(file.mimetype);
    const extname = filesTypes.test(path.extname(file.originalname));
    if (mimeType && extname) {
      return cb(null, true);
    }
    cb(new Error("El archivo debe ser una imagen valida"));
  },
}).single("image");

export { uploadImage };
