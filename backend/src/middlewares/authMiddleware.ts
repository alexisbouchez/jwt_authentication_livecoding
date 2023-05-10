import * as jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { User } from "../models/User";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  try {
    const decodedPayload = await jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string
    );
    if (!decodedPayload || typeof decodedPayload !== "object") {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const user = await User.findOneOrFail({
      where: { id: decodedPayload.userId },
    });

    if (!user) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    res.locals.user = user;
  } catch (error) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  next();
};
