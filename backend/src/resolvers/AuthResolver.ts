import { Arg, Mutation, Query } from "type-graphql";
import { User } from "../models/User";
import jwt from "jsonwebtoken";
import argon2 from "argon2";

export class AuthResolver {
  @Mutation(() => String)
  async register(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<string> {
    const user = await User.create({
      email,
      password: await argon2.hash(password),
    }).save();

    const token = jwt.sign(
      { userId: user.id },
      process.env.ACCESS_TOKEN_SECRET!
    );

    return token;
  }

  @Query(() => String)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<string> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error("User not found");
    }

    const valid = await argon2.verify(user.password, password);

    if (!valid) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.ACCESS_TOKEN_SECRET!
    );

    return token;
  }

  @Query(() => User)
  async me(@Arg("token") token: string): Promise<User> {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
    const user = await User.findOne({
      where: { id: (decoded as { userId: number }).userId },
    });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }
}
