import { Response, Request } from "express";
import { ProductService } from "../services";

const getAllProducts = async (req: Request, res: Response) => {
  const pageSize = 6;
  const { keyword } = req.query;
  const pageCurrent = Number(req.query.pageNumber) || 1;
  const data = await ProductService.getAllProducts(keyword as string, pageCurrent, pageSize);

  if (!data) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  const { products, pages, page } = data;
  return res.json({
    success: true,
    products,
    pages,
    page,
  });
};

const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await ProductService.getProductById(id);
  if (product === undefined) {
    return res.status(400).json({
      success: false,
      message: "Error ObjectId invalid",
    });
  }

  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Product not found",
    });
  }
  return res.json({
    success: true,
    product,
  });
};

const deleteProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await ProductService.deleteProductById(id);
  if (product === undefined) {
    return res.status(400).json({
      success: false,
      message: "Error ObjectId invalid",
    });
  }

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }
  return res.json({
    success: true,
    product,
  });
};

const createProduct = async (req: Request, res: Response) => {
  // @ts-ignore
  const id = req.user._id;

  const product = await ProductService.createProduct(id);
  if (!product) {
    return res.status(400).json({
      success: false,
      message: "Error product not created",
    });
  }
  return res.json({
    success: true,
    product,
  });
};

const updateProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await ProductService.updateProducById(id, req.body);
  if (product === undefined) {
    return res.status(400).json({
      success: false,
      message: "Error ObjectId invalid",
    });
  }

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found or can not updated",
    });
  }
  return res.json({
    success: true,
    product,
  });
};

const createProductReview = async (req: Request, res: Response) => {
  const { id } = req.params;
  // @ts-ignore;
  const idUser = req.user._id;
  const review = {
    ...req.body,
    user: idUser,
  };
  const product = await ProductService.createProductReview(id as string, review);
  if (product === undefined) {
    return res.status(400).json({
      success: false,
      message: "ObjectId invalid or review already exists",
    });
  }

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  return res.json({
    success: true,
    product,
  });
};

const getTopProducts = async (req: Request, res: Response) => {
  const products = await ProductService.getTopProducts();
  if (!products) {
    return res.status(404).json({
      success: false,
      message: "Products not found",
    });
  }
  return res.json({
    success: true,
    products,
  });
};

export default {
  getAllProducts,
  getProductById,
  deleteProductById,
  createProduct,
  updateProductById,
  createProductReview,
  getTopProducts,
};
