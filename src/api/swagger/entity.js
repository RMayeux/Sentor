import { objectType } from "nexus";
const Swagger = objectType({
  name: "Swagger",
  definition(t) {
    t.string("content");
    t.string("error");
  },
});

export default Swagger;
