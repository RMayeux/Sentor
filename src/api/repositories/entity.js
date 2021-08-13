import { objectType } from "nexus";
const Repository = objectType({
  name: "Repository",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.boolean("hasWebhook");
    t.nonNull.string("name");
  },
});

export default Repository;
