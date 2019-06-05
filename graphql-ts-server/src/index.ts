import "reflect-metadata";
import { importSchema } from "graphql-import";
import { GraphQLServer } from "graphql-yoga";
import { resolvers } from "./resolvers";

const typeDefs = importSchema("schema.graphql");

const resolvers = {
  Query: {
    hello: (_: any, { name }: any) => `Bye ${name || "World"}`
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.log("Server is running on localhost:4000"));
