import { Response, Request, NextFunction } from "express";
import { COLLECTIONS } from "../utils/enums";
const isValidCollection = (req: Request, res: Response, next: NextFunction) => {
  const { collection } = req.params;
  const validCollections = Object.values(COLLECTIONS) as string[];
  const isValid = validCollections.includes(collection);
  if (!isValid) {
    return res.status(400).json({
      success: false,
      message: `The collection is not valid, the support collections are ${validCollections}`,
    });
  }
  return next();
};

export { isValidCollection };
