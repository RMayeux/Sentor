import { objectType } from "nexus";
const OpenApi = objectType({
  name: "OpenApi",
  definition(t) {
    t.string("content");
    t.string("error");
  },
});

export default OpenApi;
