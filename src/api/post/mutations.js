import { extendType, intArg, stringArg, nonNull, arg } from "nexus";

const Mutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createDraft", {
      type: "Post",
      args: {
        data: nonNull(
          arg({
            type: "PostCreateInput",
          })
        ),
        authorEmail: nonNull(stringArg()),
      },
      resolve: (_, args, context) => {
        return context.prisma.post.create({
          data: {
            title: args.data.title,
            content: args.data.content,
            author: {
              connect: { email: args.authorEmail },
            },
          },
        });
      },
    });

    t.field("togglePublishPost", {
      type: "Post",
      args: {
        id: nonNull(intArg()),
      },
      resolve: async (_, args, context) => {
        const post = await context.prisma.post.findUnique({
          where: { id: args.id || undefined },
          select: {
            published: true,
          },
        });

        if (!post) {
          throw new Error(
            `Post with ID ${args.id} does not exist in the database.`
          );
        }

        return context.prisma.post.update({
          where: { id: args.id || undefined },
          data: { published: !post.published },
        });
      },
    });

    t.field("incrementPostViewCount", {
      type: "Post",
      args: {
        id: nonNull(intArg()),
      },
      resolve: (_, args, context) => {
        return context.prisma.post.update({
          where: { id: args.id || undefined },
          data: {
            viewCount: {
              increment: 1,
            },
          },
        });
      },
    });

    t.field("deletePost", {
      type: "Post",
      args: {
        id: nonNull(intArg()),
      },
      resolve: (_, args, context) => {
        return context.prisma.post.delete({
          where: { id: args.id },
        });
      },
    });
  },
});

export default Mutation;
