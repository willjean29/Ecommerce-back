import User from "models/user.model";
import Product from "models/product.model";

const DB_MODELS = {
  products: Product,
};

const models = Object.values(DB_MODELS).map((model) => model);
export type ModelsTypes = typeof models[0];

export const selectModel = (collection: string) => {
  return DB_MODELS[collection as keyof typeof DB_MODELS];
};
