import mongoose, { model, Document, Schema } from "mongoose";
import { IUser } from "./user.model";

export interface IReview {
  name: string;
  rating: number;
  comment: string;
  user: string;
}
export const ReviewSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    comment: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
