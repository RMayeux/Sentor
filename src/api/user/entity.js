import { objectType } from "nexus";

const User = objectType({
  name: "User",
  definition(t) {
    t.nonNull.int("id");
    t.string("name");
    t.nonNull.string("email");
    t.nonNull.list.nonNull.field("posts", {
      type: "Post",
      resolve: (parent, _, context) => {
        return context.prisma.user
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .posts();
      },
    });
  },
});

export default User;
