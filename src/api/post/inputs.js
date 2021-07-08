import { inputObjectType } from "nexus";

const inputs = [
  inputObjectType({
    name: "PostOrderByUpdatedAtInput",
    definition(t) {
      t.nonNull.field("updatedAt", { type: "SortOrder" });
    },
  }),
  inputObjectType({
    name: "PostCreateInput",
    definition(t) {
      t.nonNull.string("title");
      t.string("content");
    },
  }),
];

export default inputs;
