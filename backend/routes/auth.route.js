import express from "express"
import { loginController, logoutController, meController, signupController,deleteAccountController} from "../controllers/auth.controller.js"
import authMiddleware, { protect } from "../middleware/authMiddleware.js"
const router = express.Router()
router.post("/signup", signupController)
router.post("/login", loginController)
router.get("/logout", logoutController)
router.delete("/delete", protect, deleteAccountController);

router.get("/me", authMiddleware, meController);

export default router