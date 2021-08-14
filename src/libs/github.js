import axios from "axios";

const githubApiUrl = " https://api.github.com";

export const getRepositories = async (userName) => {
  const response = await axios.get(`${githubApiUrl}/users/${userName}/repos?sort=updated`);
  return response.data;
};

export const createWebhookForRepository = async (repoName, token) => {
  const config = {
    url: process.env.WEBHOOK_GITHUB,
    content_type: "json",
    insecure_ssl: "0",
  };
  const url = `${githubApiUrl}/repos/${repoName}/hooks`;
  const options = {
    headers: { Authorization: `token ${token}` },
    data: { config },
    url,
    method: "POST",
  };
  const response = await axios(options);
  return response.data;
};

export const deleteWebhookForRepository = async (repoName, webhookId, token) => {
  try {
    const url = `${githubApiUrl}/repos/${repoName}/hooks/${webhookId}`;
    const options = {
      headers: { Authorization: `token ${token}` },
      url,
      method: "DELETE",
    };
    await axios(options);
  } catch (e) {
    console.log({ e });
  }
};

export const getBranchesForRepository = async (repoName) => {
  const url = `${githubApiUrl}/repos/${repoName}/branches`;
  const options = {
    url,
    method: "GET",
  };
  const response = await axios(options);
  return response.data;
};

export const getContent = async (repoName, branchName, filePath, commitId) => {
  if (filePath[0] !== "/") filePath = `/${filePath}`;
  let url;
  if (commitId) url = `https://raw.githubusercontent.com/${repoName}/${commitId}${filePath}`;
  else url = `https://raw.githubusercontent.com/${repoName}/${branchName}${filePath}`;
  const options = {
    url,
    method: "GET",
  };
  const response = await axios(options);
  return response;
};

export const getFileBuffer = async (repoName, branchName, filePath, commitId) => {
  const fileContent = await getContent(repoName, branchName, filePath, commitId);
  return Buffer.from(JSON.stringify(fileContent.data));
};

export const getWebhookByUrl = async (repoName, token) => {
  const url = `${githubApiUrl}/repos/${repoName}/hooks`;
  const options = {
    url,
    method: "GET",
    headers: { Authorization: `token ${token}` },
  };
  const response = await axios(options);
  return response.data.find((webhook) => (webhook.config.url = process.env.WEBHOOK_GITHUB));
};
