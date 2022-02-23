import mongoose, { model, Document, Schema } from "mongoose";
import { ReviewSchema, IReview } from "./review.model";
import { IUser } from "./user.model";

export interface IProduct extends Document {
  user: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  reviews: IReview[];
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
}
const ProductSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    reviews: [
      {
        type: ReviewSchema,
        required: false,
        default: [],
      },
    ],
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default model<IProduct>("Product", ProductSchema);
