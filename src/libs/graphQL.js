import client from "../../apollo-client";

export const query = async (query, context, variables) => {
  const { data } = await client.query({
    context: { headers: { cookie: context.req.headers.cookie } },
    query,
    ...(variables && { variables }),
  });
  return data;
};
