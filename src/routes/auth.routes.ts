import { AuthController } from "controllers";
import { validateJwt } from "middlewares";
import { Router } from "express";

const router = Router();

router.post("/signin", AuthController.signIn);
router.post("/signup", AuthController.signUp);
router.post("/refresh", AuthController.refreshToken);
router.get("/user", validateJwt, AuthController.getCurrentUser);
export default router;
