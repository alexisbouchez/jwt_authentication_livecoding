import { ContextFunction } from "apollo-server-core";
import { JwtPayload, verify } from "jsonwebtoken";
import { User } from "../models/User";

export const apolloContext: ContextFunction = async ({ req }) => {
  if (!req.headers.authorization) {
    return {};
  }

  // "authorization": `Bearer ${token}`
  try {
    const bearer = req.headers.authorization.split("Bearer ")[1];
    if (bearer.length === 0) {
      return {};
    }

    const decodedPayload = verify(
      bearer,
      process.env.ACCESS_TOKEN_SECRET as string
    );
    if (typeof (decodedPayload as unknown as JwtPayload)?.userId === "number") {
      const user = await User.findOne({
        where: { id: (decodedPayload as unknown as JwtPayload).userId },
      });
      return { user };
    }
    return {};
  } catch (error) {
    console.log("error", error);
    return {};
  }
};
