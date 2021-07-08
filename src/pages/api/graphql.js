import { ApolloServer } from "apollo-server-micro";
import { schema } from "@/graphql/schema";
import { context } from "@/graphql/context";
const cors = require("micro-cors")(); // highlight-line

const server = new ApolloServer({
  schema,
  context,
});
const handler = server.createHandler({ path: "/api/graphql" });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default cors((req, res) =>
  req.method === "OPTIONS" ? res.end() : handler(req, res)
);
