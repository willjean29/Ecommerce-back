import { UpdateUserDto } from "dtos/user.dtos";
import User, { IUser } from "models/user.model";
import { isValidObjectId } from "mongoose";
const updateUser = async (updateUserDto: UpdateUserDto, id: string) => {
  try {
    const user = (await User.findById(id)) as IUser;
    user.name = updateUserDto.name || user.name;
    user.email = updateUserDto.email || user.email;
    updateUserDto.password && (user.password = updateUserDto.password);
    await user.save();
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getAllUsers = async () => {
  try {
    const users = (await User.find()) as IUser[];
    return users;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const deleteUserById = async (id: string) => {
  const isValid = isValidObjectId(id);
  if (!isValid) return undefined;
  try {
    const user = (await User.findByIdAndDelete(id)) as IUser;
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getUserById = async (id: string) => {
  const isValid = isValidObjectId(id);
  if (!isValid) return undefined;
  try {
    const user = (await User.findById(id)) as IUser;
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const updateUserById = async (id: string, updateUserDto: UpdateUserDto) => {
  const isValid = isValidObjectId(id);
  if (!isValid) return undefined;
  try {
    const user = (await User.findById(id)) as IUser;
    user.name = updateUserDto.name || user.name;
    user.email = updateUserDto.email || user.email;
    user.isAdmin = updateUserDto.isAdmin as boolean;
    await user.save();
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default {
  updateUser,
  getAllUsers,
  deleteUserById,
  getUserById,
  updateUserById,
};
