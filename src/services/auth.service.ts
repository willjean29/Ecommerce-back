import jwt from "jsonwebtoken";
import User, { IUser } from "models/user.model";
import JwtGenerate from "helpers/jwt.helper";
import { SignInDto, SignUpDto } from "dtos/auth.dtos";
import ENV from "utils/enviroments";
import { JwtPayload } from "middlewares/auth.middleware";
import { isValidObjectId } from "mongoose";
const signIn = async (signInDto: SignInDto) => {
  try {
    const user = (await User.findOne({ email: signInDto.email })) as IUser;
    if (!user.comparePassword(signInDto.password)) return null;
    const token = (await JwtGenerate.generateJwt(
      user._id,
      ENV.JWT.ACCESS,
      ENV.JWT.ACCESS_EXPIRED
    )) as string;
    const token_refresh = (await JwtGenerate.generateJwt(
      user._id,
      ENV.JWT.REFRESH,
      ENV.JWT.REFRESH_EXPIRED
    )) as string;
    return {
      user,
      token,
      token_refresh,
    };
  } catch (error) {
    return null;
  }
};

const signUp = async (signUpDto: SignUpDto) => {
  try {
    const user = (await User.create(signUpDto)) as IUser;
    const token = (await JwtGenerate.generateJwt(
      user._id,
      ENV.JWT.ACCESS,
      ENV.JWT.ACCESS_EXPIRED
    )) as string;
    const token_refresh = (await JwtGenerate.generateJwt(
      user._id,
      ENV.JWT.REFRESH,
      ENV.JWT.REFRESH_EXPIRED
    )) as string;

    return {
      user,
      token,
      token_refresh,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

const refreshToken = async (jwtRefresh: string) => {
  if (!jwtRefresh) return undefined;
  try {
    const { payload } = jwt.verify(jwtRefresh, ENV.JWT.REFRESH) as JwtPayload;
    const user = (await User.findById(payload)) as IUser;

    const token = (await JwtGenerate.generateJwt(
      user._id,
      ENV.JWT.ACCESS,
      ENV.JWT.ACCESS_EXPIRED
    )) as string;
    const token_refresh = (await JwtGenerate.generateJwt(
      user._id,
      ENV.JWT.REFRESH,
      ENV.JWT.REFRESH_EXPIRED
    )) as string;

    return {
      user,
      token,
      token_refresh,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getCurrentUser = async (id: string) => {
  const isValid = isValidObjectId(id);
  if (!isValid) return undefined;
  try {
    const user = (await User.findById(id)) as IUser;
    return user;
  } catch (error) {
    return null;
  }
};

export default {
  signIn,
  signUp,
  refreshToken,
  getCurrentUser,
};
