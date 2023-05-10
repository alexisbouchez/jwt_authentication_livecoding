import { User } from "../models/User";
import * as argon2 from "argon2";
import { sign } from "jsonwebtoken";
import type { Request, Response } from "express";

export class AuthController {
  async signUp(request: Request, response: Response): Promise<void> {
    const { email, password } = request.body;

    const hashedPassword = await argon2.hash(password);

    const userFoundByEmail = await User.findOne({ where: { email } });
    if (userFoundByEmail) {
      response.status(400).json({ error: "Email already in use" });
      return;
    }

    const createdUser = await User.create({
      email,
      password: hashedPassword,
    }).save();

    const token = sign(
      { userId: createdUser.id },
      process.env.ACCESS_TOKEN_SECRET as string
    );

    response.json({ token });
  }

  async signIn(request: Request, response: Response): Promise<void> {
    const { email, password } = request.body;

    const userFoundByEmail = await User.findOne({ where: { email } });
    if (!userFoundByEmail) {
      response.status(400).json({ error: "Invalid credentials" });
      return;
    }

    const passwordValid: boolean = await argon2.verify(
      userFoundByEmail.password,
      password
    );
    if (!passwordValid) {
      response.status(400).json({ error: "Invalid credentials" });
      return;
    }

    const token = sign(
      { userId: userFoundByEmail.id },
      process.env.ACCESS_TOKEN_SECRET as string
    );

    response.json({ token });
  }

  async getProfile(request: Request, response: Response) {
    const { password, ...user } = response.locals.user;
    return response.json({ user });
  }
}
