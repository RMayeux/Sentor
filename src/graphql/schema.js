import { makeSchema, asNexusMethod, enumType } from "nexus";
import { DateTimeResolver } from "graphql-scalars";
import { getSchemaTypes } from "./helpers/getSchemaTypes.js";

const DateTime = asNexusMethod(DateTimeResolver, "date");

const SortOrder = enumType({
  name: "SortOrder",
  members: ["asc", "desc"],
});

const schema = makeSchema({
  types: [...getSchemaTypes(), DateTime, SortOrder],
  outputs: {
    schema: __dirname + "/../../prisma/schema.graphql",
  },
  sourceTypes: {
    modules: [
      {
        module: "@prisma/client",
        alias: "prisma",
      },
    ],
  },
});

module.exports = {
  schema: schema,
};
