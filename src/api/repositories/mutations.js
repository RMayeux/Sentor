import { extendType, nonNull, arg } from "nexus";
import { createWebhookResolver } from "./resolvers/createWebhookResolver";
import { deleteWebhookResolver } from "./resolvers/deleteWebhookResolver";

const Mutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createWebhook", {
      type: "Repository",
      args: {
        data: nonNull(
          arg({
            type: "CreateWebhookInput",
          })
        ),
      },
      resolve: (_, args, context) => createWebhookResolver(context, args.data),
    });

    t.field("deleteWebhook", {
      type: "Repository",
      args: {
        data: nonNull(
          arg({
            type: "DeleteWebhookInput",
          })
        ),
      },
      resolve: (_, args, context) => deleteWebhookResolver(context, args.data),
    });
  },
});

export default Mutation;
