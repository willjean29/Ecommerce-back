import { Router, Request, Response } from "express";
import ProductRoutes from "./product.routes";
import AuthRoutes from "./auth.routes";
import UserRoutes from "./user.routes";
import OrderRoutes from "./order.routes";
import UploadRoutes from "./upload.routes";
const router = Router();

router.use("/api/products", ProductRoutes);
router.use("/api/auth", AuthRoutes);
router.use("/api/user", UserRoutes);
router.use("/api/orders", OrderRoutes);
router.use("/api/upload", UploadRoutes);
router.use("/api/config/paypal", (req: Request, res: Response) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});
export default router;
