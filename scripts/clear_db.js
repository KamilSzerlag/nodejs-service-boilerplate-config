const mongoose = require("mongoose");

const connect = (
  url = "mongodb://localhost:27017/test-db",
  opts = {}
) => {
  console.log(`Connecting MongoDB on url ${url}...`);
  return mongoose.connect(url, { ...opts, useNewUrlParser: true });
};

return connect().then(async () => {
  try {
    mongoose.connection.dropDatabase();
  } catch (err) {
    console.log(err);
  }
});
