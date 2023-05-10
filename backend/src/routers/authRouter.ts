import express from "express";
import { AuthController } from "../controllers/AuthController";
import { authMiddleware } from "../middlewares/authMiddleware";

const authController = new AuthController();

export const authRouter = express.Router();
authRouter.post("/sign-up", authController.signUp);
authRouter.post("/sign-in", authController.signIn);
authRouter.get("/profile", authMiddleware, authController.getProfile);
