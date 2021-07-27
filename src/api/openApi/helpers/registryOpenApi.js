import { getFileBuffer } from "src/libs/github";
import { s3GetObject, s3PutObject } from "src/libs/aws/s3";
import isEqual from "lodash.isequal";

const openApiBucket = process.env.BUCKET_OPEN_API;

export const registryOpenApi = async (openApi, session, repositoryName, prisma, { branchName, filePath, repositoryId, userId }) => {
  const newOpenApiFileBuffer = await getFileBuffer(session.user.name, repositoryName, branchName, filePath);
  if (openApi) return updateOpenApi(openApi, repositoryId, newOpenApiFileBuffer, prisma);
  return createOpenApi(newOpenApiFileBuffer, repositoryId, userId, prisma);
};

const createOpenApi = async (newOpenApiFileBuffer, repositoryId, userId, prisma) => {
  return Promise.all([
    s3PutObject(newOpenApiFileBuffer, openApiBucket, `${repositoryId}/openApi-1.json`),
    prisma.openApi.create({ data: { repositoryId, userId } }),
  ]);
};

const updateOpenApi = async (openApi, repositoryId, newOpenApiFileBuffer, prisma) => {
  const openApiFileBuffer = await s3GetObject(openApiBucket, `${openApi.repositoryId}/openApi-${openApi.version}.json`);
  const openApiFileContent = JSON.parse(openApiFileBuffer.Body.toString("utf-8"));
  const newOpenApiFileContent = JSON.parse(newOpenApiFileBuffer.toString("utf-8"));
  if (isEqual(openApiFileContent, newOpenApiFileContent)) return;
  return Promise.all([
    await s3PutObject(newOpenApiFileBuffer, openApiBucket, `${repositoryId}/openApi-${openApi.version + 1}.json`),
    prisma.openApi.update({
      where: {
        id: openApi.id,
      },
      data: {
        ...openApi,
        version: openApi.version + 1,
      },
    }),
  ]);
};
