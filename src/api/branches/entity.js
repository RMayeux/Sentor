import { objectType } from "nexus";

const Branch = objectType({
  name: "Branch",
  definition(t) {
    t.nonNull.string("name");
  },
});

export default Branch;
