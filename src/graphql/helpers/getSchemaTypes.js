import glob from "glob";
import path from "path";

export const getSchemaTypes = () => {
  return [
    getSchemaTypesProps("queries"),
    getSchemaTypesProps("mutations"),
    getSchemaTypesProps("inputs"),
    getSchemaTypesProps("entity"),
  ];
};

const getSchemaTypesProps = (type) => {
  let props = [];

  glob.sync(path.resolve(`src/api/**/${type}.js`)).forEach((module) => {
    const modulePath = module.slice(module.indexOf("api"));
    const { default: prop } = require(`../../${modulePath}`);
    if (typeof prop === "array") prop && (props = [...props, ...prop]);

    prop && (props = [...props, prop]);
  });
  return props;
};
