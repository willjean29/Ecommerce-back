import { OrderDto, UpdateOrderPayDto } from "../dtos/order.dtos";
import Order, { IOrder } from "../models/order.model";
import { isValidObjectId } from "mongoose";

const addOrderItems = async (orderDto: OrderDto, id: string) => {
  try {
    const order = new Order(orderDto) as IOrder;
    await order.save();
    return order;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getOrderById = async (id: string) => {
  const isValid = isValidObjectId(id);
  if (!isValid) return undefined;
  try {
    const order = (await Order.findById(id)) as IOrder;
    return order;
  } catch (error) {
    return null;
  }
};

const getAllMyOrders = async (id: string) => {
  const isValid = isValidObjectId(id);
  if (!isValid) return undefined;
  try {
    const orders = (await Order.find({
      user: id,
    })) as IOrder[];

    return orders;
  } catch (error) {
    return null;
  }
};

const updateOrderToPay = async (id: string, data: UpdateOrderPayDto) => {
  const isValid = isValidObjectId(id);
  if (!isValid) return undefined;
  try {
    const order = (await Order.findById(id)) as IOrder;
    order.isPaid = true;
    order.paidAt = new Date();
    order.paymentResult = data;
    await order.save();
    return order;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const updateOrderToDelivered = async (id: string) => {
  const isValid = isValidObjectId(id);
  if (!isValid) return undefined;
  try {
    const order = (await Order.findById(id)) as IOrder;
    order.isDelivered = true;
    order.deliverydAt = new Date();
    await order.save();
    return order;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getAllOrders = async () => {
  try {
    const orders = (await Order.find({}).populate("user")) as IOrder[];
    return orders;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default {
  addOrderItems,
  getOrderById,
  getAllMyOrders,
  updateOrderToPay,
  updateOrderToDelivered,
  getAllOrders,
};
