import { isValidObjectId } from "mongoose";
import Product, { IProduct } from "models/product.model";
import { ProductDto, ReviewDto } from "dtos/products.dtos";

const getAllProducts = async (keyword: string, page: number, limit: number) => {
  try {
    const options = keyword
      ? {
          name: {
            $regex: keyword,
            $options: "i",
          },
        }
      : {};

    const count = await Product.countDocuments({ ...options });
    const products = (await Product.find({ ...options })
      .limit(limit)
      .skip(limit * (page - 1))) as IProduct[];
    const pages = Math.ceil(count / limit);
    return { products, page, pages };
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getProductById = async (id: string) => {
  const isValid = isValidObjectId(id);
  if (!isValid) return undefined;
  try {
    const product = (await Product.findById(id)) as IProduct;
    return product;
  } catch (error) {
    return null;
  }
};

const deleteProductById = async (id: string) => {
  const isValid = isValidObjectId(id);
  if (!isValid) return undefined;
  try {
    const product = (await Product.findByIdAndDelete(id)) as IProduct;
    return product;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const createProduct = async (id: string) => {
  try {
    // const product = new Product(productDto) as IProduct;
    const product = new Product({
      name: "Sample name",
      price: 0,
      user: id,
      image: "/images/sample.jpg",
      brand: "Sample brand",
      category: "Sample category",
      countInStock: 0,
      numReviews: 0,
      description: "Sample description",
    }) as IProduct;
    await product.save();

    return product;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const updateProducById = async (id: string, productDto: ProductDto) => {
  const isValid = isValidObjectId(id);
  if (!isValid) return undefined;
  try {
    const product = await Product.findByIdAndUpdate(id, productDto, {
      new: true,
    });
    return product;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const createProductReview = async (id: string, reviewDto: ReviewDto) => {
  const isValid = isValidObjectId(id);
  if (!isValid) return undefined;
  try {
    const product = (await Product.findById(id)) as IProduct;
    const existReview = product.reviews.find((review) => review.user.toString() === reviewDto.user.toString());
    if (existReview) return undefined;
    product.reviews.push(reviewDto);
    product.numReviews = product.reviews.length;
    product.rating = product.reviews.reduce((acc, review) => review.rating + acc, 0) / product.reviews.length;
    await product.save();
    return product;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getTopProducts = async () => {
  try {
    const products = (await Product.find({}).sort({ rating: -1 }).limit(3)) as IProduct[];
    return products;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default {
  getAllProducts,
  getProductById,
  deleteProductById,
  createProduct,
  updateProducById,
  createProductReview,
  getTopProducts,
};
