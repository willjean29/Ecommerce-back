import { Request, Response } from "express";
import { AuthService } from "../services";

const signIn = async (req: Request, res: Response) => {
  const auth = await AuthService.signIn(req.body);

  if (!auth) {
    return res.status(400).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  return res.status(200).json({
    success: true,
    user: auth.user,
    token: auth.token,
    token_refresh: auth.token_refresh,
  });
};

const signUp = async (req: Request, res: Response) => {
  const auth = await AuthService.signUp(req.body);
  console.log(auth);
  if (!auth) {
    return res.status(400).json({
      success: false,
      message: "Invalided data for new user",
    });
  }
  return res.status(200).json({
    success: true,
    user: auth.user,
    token: auth.token,
    token_refresh: auth.token_refresh,
  });
};

const refreshToken = async (req: Request, res: Response) => {
  const auth = await AuthService.refreshToken(req.body.refreshToken);
  if (auth === undefined) {
    return res.status(400).json({
      success: false,
      message: "Invalid token for refresh token",
    });
  }
  if (!auth) {
    return res.status(400).json({
      success: false,
      message: "User not found or token invalid",
    });
  }

  return res.status(200).json({
    success: true,
    user: auth.user,
    token: auth.token,
    token_refresh: auth.token_refresh,
  });
};

const getCurrentUser = async (req: Request, res: Response) => {
  //@ts-ignore
  const id = req.user._id;
  const user = await AuthService.getCurrentUser(id);
  if (user === undefined) {
    return res.status(400).json({
      success: false,
      message: "User not found",
    });
  }
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User not found",
    });
  }

  return res.status(200).json({
    success: true,
    user,
  });
};

export default {
  signIn,
  signUp,
  refreshToken,
  getCurrentUser,
};
