import { Arg, Authorized, Ctx, Mutation, Query } from "type-graphql";
import { User } from "../models/User";
import * as argon2 from "argon2";
import { sign } from "jsonwebtoken";

export class AuthResolver {
  // Mutation signUp -> insérer un utilisateur en BDD (à partir d'identifiants)
  //                 -> (retourner le JWT)
  @Mutation(() => String)
  async signUp(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<string> {
    const hashedPassword = await argon2.hash(password);

    // Insérer un utilisateur en BDD
    const createdUser = await User.create({
      email,
      password: hashedPassword,
    }).save();

    const token = sign(
      { userId: createdUser.id },
      process.env.ACCESS_TOKEN_SECRET as string
    );

    return token;
  }

  @Query(() => String)
  async signIn(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<string> {
    const userFoundByEmail = await User.findOne({ where: { email } });
    if (!userFoundByEmail) {
      throw new Error("Invalid credentials");
    }

    const passwordValid: boolean = await argon2.verify(
      userFoundByEmail.password,
      password
    );
    if (!passwordValid) {
      throw new Error("Invalid credentials");
    }

    const token = sign(
      { userId: userFoundByEmail.id },
      process.env.ACCESS_TOKEN_SECRET as string
    );

    return token;
  }

  @Authorized()
  @Query(() => String)
  async getProfile(@Ctx() context: any) {
    console.log("user", context.user);
    return (context.user as any)?.email;
  }
}
