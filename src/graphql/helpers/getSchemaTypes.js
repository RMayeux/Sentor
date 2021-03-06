import glob from "glob";
import path from "path";

export const getSchemaTypes = () => {
  return [
    getSchemaTypesProps("queries"),
    getSchemaTypesProps("mutations"),
    getSchemaTypesProps("inputs"),
    getSchemaTypesProps("entity"),
    getSchemaTypesProps("subscriptions"),
  ];
};

const getSchemaTypesProps = (type) => {
  let props = [];

  glob.sync(path.resolve(`src/api/**/${type}.js`)).forEach((module) => {
    const modulePath = module.slice(module.indexOf("api"));
    const { default: prop } = require(`../../${modulePath}`);
    if (Array.isArray(prop)) prop && (props = [...props, ...prop]);

    prop && (props = [...props, prop]);
  });
  return props;
};
