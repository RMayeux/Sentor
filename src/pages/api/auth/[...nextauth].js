import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import Adapters from "next-auth/adapters";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const options = {
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      scope: "user:email repo write:repo_hook repository_hooks:write",
      profile(profile) {
        return {
          id: profile.id,
          name: profile.login,
          image: profile.avatar_url,
          email: profile.email,
        };
      },
    }),
  ],
  callbacks: {
    session: async (session, user) => {
      session.userId = user.id;
      return Promise.resolve(session);
    },
  },
  adapter: Adapters.Prisma.Adapter({ prisma }),
  secret: process.env.SECRET,
};

const authHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;
