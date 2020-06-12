const webpack = require('webpack');
const path = require('path');

module.exports = function override(config, env) {
  const { plugins } = config;
  const { sep } = path;
  if (env === 'production') {
    plugins.push(
      new webpack.NormalModuleReplacementPlugin(
        sep === '/'
          ? /src\/configs\/axios.config.js/
          : /src[\\\/]configs[\\\/]axios.config.js/,
        path.resolve(__dirname, 'src/configs/axios.config.prod.js'),
      ),
      new webpack.NormalModuleReplacementPlugin(
        sep === '/'
          ? /src\/configs\/store.config.js/
          : /src[\\\/]configs[\\\/]store.config.js/,
        path.resolve(__dirname, 'src/configs/store.config.prod.js'),
      ),
    );
  }

  plugins.push(
    new webpack.NormalModuleReplacementPlugin(
      sep === '/'
        ? /src\/environments\/environment.js/
        : /src[\\\/]environments[\\\/]environment.js/,
      path.resolve(
        __dirname,
        `src/environments/environment.${process.env.STAGE}.js`,
      ),
    ),
  );

  return config;
};
