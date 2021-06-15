const redis = require("redis");
const axios = require("axios");

const client = redis.createClient(6379);

client.on("error", (err) => {
  console.log(err);
});

module.exports = client;
