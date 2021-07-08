const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({ log: ["query"] });

export const context = { prisma };
