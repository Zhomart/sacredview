let config = {
  port: 3000,
  mongodb: {
    uri: process.env.SACRED_MONGO_URI,
  },
};

module.exports = config;
