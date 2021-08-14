import { PrismaClient } from "@prisma/client";
import { registryOpenApi } from "src/api/openApi/helpers/registryOpenApi";
const prisma = new PrismaClient();

const githubWebhookReceiver = async ({ body }, res) => {
  if (!isEventPush(body)) return;
  console.log({ body });
  const repository = await prisma.repository.findUnique({ where: { id: body.repository.id } });

  if (shouldSkip(repository, body)) return;

  const openApi = await prisma.openApi.findFirst({ where: { repositoryId: repository.id } });

  await registryOpenApi(openApi, repository, body.head_commit.id);

  return res;
};

export default githubWebhookReceiver;

const isEventPush = (body) => body?.repository.id && body.ref;
const shouldSkip = (repository, body) =>
  body.ref !== `refs/heads/${repository.branchName}` || !body.head_commit.modified.includes(repository.filePath);
