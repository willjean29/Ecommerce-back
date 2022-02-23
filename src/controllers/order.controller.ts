import { OrderController } from "controllers";
import { Request, Response } from "express";
import { OrderService } from "services";
const addOrderItems = async (req: Request, res: Response) => {
  //@ts-ignore
  const id = req.user._id;
  const order = await OrderService.addOrderItems(req.body, id);
  if (!order) {
    return res.status(400).json({
      success: false,
      message: "Bad Requst invalid data order",
    });
  }

  return res.json({
    success: true,
    order,
  });
};

const getOrderById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const order = await OrderService.getOrderById(id);
  if (order === undefined) {
    return res.status(400).json({
      success: false,
      message: "Error ObjectId invalid",
    });
  }

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order not found",
    });
  }
  return res.json({
    success: true,
    order,
  });
};

const getAllMyOrders = async (req: Request, res: Response) => {
  // @ts-ignore
  const id = req.user._id;
  const orders = await OrderService.getAllMyOrders(id as string);
  if (orders === undefined) {
    return res.status(400).json({
      success: false,
      message: "Error ObjectId invalid",
    });
  }

  if (!orders) {
    return res.status(404).json({
      success: false,
      message: "Orders not found",
    });
  }
  return res.json({
    success: true,
    orders,
  });
};

const updateOrderToPay = async (req: Request, res: Response) => {
  const { id } = req.params;
  const order = await OrderService.updateOrderToPay(id, req.body);
  if (order === undefined) {
    return res.status(400).json({
      success: false,
      message: "Error ObjectId invalid",
    });
  }

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order not found",
    });
  }
  return res.json({
    success: true,
    order,
  });
};

const updateOrderToDelivered = async (req: Request, res: Response) => {
  const { id } = req.params;
  const order = await OrderService.updateOrderToDelivered(id);
  if (order === undefined) {
    return res.status(400).json({
      success: false,
      message: "Error ObjectId invalid",
    });
  }

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order not found",
    });
  }
  return res.json({
    success: true,
    order,
  });
};

const getAllOrders = async (req: Request, res: Response) => {
  const orders = await OrderService.getAllOrders();
  if (!orders) {
    return res.status(404).json({
      success: false,
      message: "Orders not found",
    });
  }
  return res.json({
    success: true,
    orders,
  });
};

export default {
  addOrderItems,
  getOrderById,
  getAllMyOrders,
  updateOrderToPay,
  updateOrderToDelivered,
  getAllOrders,
};
