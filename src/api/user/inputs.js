import { inputObjectType } from "nexus";

const inputs = [
  inputObjectType({
    name: "UserUniqueInput",
    definition(t) {
      t.int("id");
      t.string("email");
    },
  }),
  inputObjectType({
    name: "UserCreateInput",
    definition(t) {
      t.nonNull.string("email");
      t.string("name");
      t.list.nonNull.field("posts", { type: "PostCreateInput" });
    },
  }),
];

export default inputs;
