import axios from "axios";

const githubApiUrl = " https://api.github.com";

export const getRepositories = async (userName) => {
  const response = await axios.get(`${githubApiUrl}/users/${userName}/repos?sort=updated`);
  return response.data;
};

export const createWebhookForRepository = async (userName, repoName, token) => {
  const config = {
    url: process.env.WEBHOOK_GITHUB,
    content_type: "json",
    insecure_ssl: "0",
  };
  const url = `${githubApiUrl}/repos/${userName}/${repoName}/hooks`;
  const options = {
    headers: { Authorization: `token ${token}` },
    data: { config },
    url,
    method: "POST",
  };
  const response = await axios(options);
  return response.data;
};

export const deleteWebhookForRepository = async (userName, repoName, webhookId, token) => {
  const url = `${githubApiUrl}/repos/${userName}/${repoName}/hooks/${webhookId}`;
  const options = {
    headers: { Authorization: `token ${token}` },
    url,
    method: "DELETE",
  };
  await axios(options);
};

export const getBranchesForRepository = async (userName, repoName) => {
  const url = `${githubApiUrl}/repos/${userName}/${repoName}/branches`;
  const options = {
    url,
    method: "GET",
  };
  const response = await axios(options);
  return response.data;
};

export const getContent = async (userName, repoName, branchName, filePath) => {
  if (filePath[0] !== "/") filePath = `/${filePath}`;

  const url = `https://raw.githubusercontent.com/${userName}/${repoName}/${branchName}${filePath}`;
  const options = {
    url,
    method: "GET",
  };
  const response = await axios(options);
  return response;
};

export const getFileBuffer = async (userName, repoName, branchName, filePath) => {
  const fileContent = await getContent(userName, repoName, branchName, filePath);
  return Buffer.from(JSON.stringify(fileContent.data));
};
