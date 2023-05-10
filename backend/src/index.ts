import { ApolloServer } from "apollo-server";
import dataSource from "./dataSource";
import { buildSchema } from "type-graphql";
import { AuthResolver } from "./resolvers/AuthResolver";
import { JwtPayload, verify } from "jsonwebtoken";
import { User } from "./models/User";
import { config } from "dotenv";

config();

const start = async (): Promise<void> => {
  await dataSource.initialize();
  const schema = await buildSchema({
    resolvers: [AuthResolver],
    authChecker: ({ context }) => {
      return !!context.user;
    },
  });
  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
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
        if (typeof (decodedPayload as JwtPayload)?.userId === "number") {
          const user = await User.findOne({
            where: { id: (decodedPayload as JwtPayload).userId },
          });
          return { user };
        }
        return {};
      } catch (error) {
        console.log("error", error);
        return {};
      }
    },
  });
  try {
    const { url } = await server.listen({ port: 5000 });
    console.log(`Server ready at ${url}`);
  } catch {
    console.log("Error starting the server");
  }
};
void start();
