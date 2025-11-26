import express from "express"
import { loginController, logoutController, meController, signupController } from "../controllers/auth.controller.js"
import authMiddleware, { protect } from "../middleware/authMiddleware.js"

const router = express.Router()
router.post("/signup", signupController)
router.post("/login", loginController)
router.get("/logout", logoutController)

router.get("/me", authMiddleware, meController);

export default router