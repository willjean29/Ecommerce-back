import mongoose, { model, Document, Schema } from "mongoose";
import bcrypt from "bcrypt";
import User from "models/user.model";
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  comparePassword(password: string): boolean;
}
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
UserSchema.pre("save", function (next: any) {
  const user = this as IUser;
  if (!user.isModified("password")) return next();
  // hashear password
  user.password = bcrypt.hashSync(user.password, 10);
  return next();
});
UserSchema.methods.comparePassword = function (password: string) {
  const user = this as IUser;
  const isEquals = bcrypt.compareSync(password, user.password);
  return isEquals;
};

export default model<IUser>("User", UserSchema);
