import { Request, Response } from "express";
import { UserService } from "services";

const updateUser = async (req: Request, res: Response) => {
  //@ts-ignore
  const user = await UserService.updateUser(req.body, req.user._id);
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Error update data user",
    });
  }
  return res.json({
    success: true,
    user,
  });
};

const getAllUsers = async (req: Request, res: Response) => {
  const users = await UserService.getAllUsers();
  if (!users) {
    return res.status(404).json({
      success: false,
      message: "Error get all users",
    });
  }

  return res.json({
    success: true,
    users,
  });
};

const deleteUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await UserService.deleteUserById(id);
  if (user === undefined) {
    return res.status(404).json({
      success: false,
      message: "Object Id Invalid",
    });
  }

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  return res.json({
    success: true,
    user,
  });
};

const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await UserService.getUserById(id);
  if (user === undefined) {
    return res.status(404).json({
      success: false,
      message: "Object Id Invalid",
    });
  }

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  return res.json({
    success: true,
    user,
  });
};

const updateUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await UserService.updateUserById(id, req.body);
  if (user === undefined) {
    return res.status(404).json({
      success: false,
      message: "Object Id Invalid",
    });
  }

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  return res.json({
    success: true,
    user,
  });
};

export default {
  updateUser,
  getAllUsers,
  deleteUserById,
  getUserById,
  updateUserById,
};
