import { ApolloServer } from "apollo-server";
import dataSource from "./utils/dataSource";
import { config } from "dotenv";
import { apolloContext } from "./utils/apolloContext";
import { createApolloSchema } from "./utils/createApolloSchema";

config();

const start = async (): Promise<void> => {
  await dataSource.initialize();

  const server = new ApolloServer({
    schema: await createApolloSchema(),
    context: apolloContext,
  });

  try {
    const { url } = await server.listen({ port: 5000 });
    console.log(`Server ready at ${url}`);
  } catch {
    console.log("Error starting the server");
  }
};
void start();
