import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/user.model";
import ENV from "../utils/enviroments";
export interface JwtPayload {
  payload: string;
  iat: number;
  exp: number;
}
const validateJwt = async (req: Request, res: Response, next: NextFunction) => {
  let existToken = req.headers.authorization && req.headers.authorization.startsWith("Bearer");
  if (!existToken) {
    return res.status(401).json({
      success: false,
      message: "Not Authorization - token is required",
    });
  }
  try {
    const token = req.headers.authorization?.split(" ")[1] as string;
    const { payload } = jwt.verify(token, ENV.JWT.ACCESS) as JwtPayload;
    // console.log(payload);
    const user = (await User.findById(payload)) as IUser;
    // @ts-ignore
    req.user = user;
    return next();
  } catch (error: any) {
    return res.status(401).json({
      success: false,
      message: "Not Authorization - User not found or token expired",
      detail: error,
    });
  }
};

const validateIsAdmin = (req: Request, res: Response, next: NextFunction) => {
  //@ts-ignore
  const user = req.user as IUser;
  if (user && user.isAdmin) {
    return next();
  }
  return res.status(401).json({
    success: false,
    message: "Not authorized as an admin",
  });
};

export { validateJwt, validateIsAdmin };
