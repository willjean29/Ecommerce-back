import { Router } from "express";
import { validateIsAdmin, validateJwt } from "middlewares";
import { OrderController } from "controllers";
const router = Router();

router.post("/", validateJwt, OrderController.addOrderItems);
router.get("/", validateJwt, validateIsAdmin, OrderController.getAllOrders);
router.get("/me", validateJwt, OrderController.getAllMyOrders);
router.get("/:id", validateJwt, OrderController.getOrderById);
router.put("/:id/pay", validateJwt, OrderController.updateOrderToPay);
router.put(
  "/:id/deliver",
  validateJwt,
  validateIsAdmin,
  OrderController.updateOrderToDelivered
);

export default router;
