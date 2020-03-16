const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true,
  }),
  addLessLoader({
       javascriptEnabled: true,
       modifyVars: {
         '@primary-color' : '#1794FC',
         '@normal-color' : '#BFBFBF',
         '@black' : '#232018',
         '@font-size-base' : '16px',
         '@border-radius-base' : '4px',
       },
  }),
);
