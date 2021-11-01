const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');

const nextConfiguration = {
  target: 'serverless', //will output independent pages that don't require a monolithic server. It's only compatible with next start or Serverless deployment platforms (like ZEIT Now) — you cannot use the custom server API.
};

module.exports = withPlugins([optimizedImages], nextConfiguration);

const webpack = require("webpack");
console.log(webpack.version); // 5.21.2
module.exports = {
  future: {
    webpack5: true
  },
  webpack: function (config, options) {
      console.log(options.webpack.version); // 5.18.0
      config.experiments = {};
      return config;
  }
};

const withImages = require("next-images");
module.exports = withImages();


// const path = require("path");

// module.exports = {
//   trailingSlash: true,
//   webpackDevMiddleware: (config) => {
//     config.watchOptions = {
//       poll: 1000,
//       aggregateTimeout: 300,
//     };

//     return config;
//   },
//   sassOptions: {
//     includePaths: [path.join(__dirname, "styles")],
//   },
//   future: {
//     webpack5: true,
//   },
// };

