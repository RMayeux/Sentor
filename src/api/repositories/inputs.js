import { inputObjectType } from "nexus";

const inputs = [
  inputObjectType({
    name: "CreateWebhookInput",
    definition(t) {
      t.nonNull.int("repositoryId");
      t.nonNull.string("repositoryName");
      t.nonNull.string("filePath");
      t.nonNull.string("branchName");
    },
  }),
  inputObjectType({
    name: "DeleteWebhookInput",
    definition(t) {
      t.nonNull.int("repositoryId");
      t.nonNull.string("repositoryName");
    },
  }),
];

export default inputs;
