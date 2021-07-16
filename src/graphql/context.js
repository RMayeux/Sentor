const { PrismaClient } = require("@prisma/client");
import { getSession } from "next-auth/client";

const prisma = new PrismaClient({ log: ["query"] });

export const context = async (context) => {
  const session = await getSession(context);
  return { session, prisma };
};
