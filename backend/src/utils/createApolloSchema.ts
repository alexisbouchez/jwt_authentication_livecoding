import { buildSchema } from "type-graphql";
import { AuthResolver } from "../resolvers/AuthResolver";

export const createApolloSchema = () =>
  buildSchema({
    resolvers: [AuthResolver],
    authChecker: ({ context }) => {
      return !!context.user;
    },
  });
