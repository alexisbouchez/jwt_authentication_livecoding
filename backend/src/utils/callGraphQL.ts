import { ApolloServer } from "apollo-server";
import { createApolloSchema } from "../utils/createApolloSchema";
import { GraphQLRequest } from "apollo-server-core";

export async function callGraphQL(
  request: Omit<GraphQLRequest, "query"> & {
    query?: string;
  }
) {
  const schema = await createApolloSchema();
  const testServer = new ApolloServer({ schema });

  return await testServer.executeOperation(request);
}
