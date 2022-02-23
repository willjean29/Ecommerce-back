import { Router } from "express";
import { UserController } from "../controllers";
import { validateJwt, validateIsAdmin } from "../middlewares";
const router = Router();

router.put("/", validateJwt, UserController.updateUser);
router.get("/", validateJwt, validateIsAdmin, UserController.getAllUsers);
router.get("/:id", validateJwt, validateIsAdmin, UserController.getUserById);
router.put("/:id", validateJwt, validateIsAdmin, UserController.updateUserById);
router.delete("/:id", validateJwt, validateIsAdmin, UserController.deleteUserById);

export default router;
